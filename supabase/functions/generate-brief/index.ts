// FIX: Updated Deno types reference to use a more reliable CDN (esm.sh)
// to resolve Deno runtime and Supabase functions type definition errors.
/// <reference types="https://esm.sh/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />

import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseClient } from '../_shared/supabaseClient.ts';
import { createGeminiClient } from '../_shared/geminiClient.ts';
import { parseJSON, requireFields, HttpError } from '../_shared/validation.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await parseJSON(req);
    requireFields({ body, fields: ['companyName', 'websiteUrl', 'projectType', 'selectedGoals', 'budget'] });
    const { companyName, websiteUrl, projectType, selectedGoals, budget } = body;
    
    const supabaseClient = createSupabaseClient(req);
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new HttpError('Unauthorized: User not authenticated.', 401);
    }

    const ai = createGeminiClient();

    const prompt = `You are a senior project strategist. A client named "${companyName}" has provided their website URL, project type "${projectType}", goals "${selectedGoals.join(', ')}", and budget "${budget}". Analyze their website at "${websiteUrl}" and generate a structured project brief. The output MUST be a valid JSON object. Do not output anything other than the raw JSON object itself, without any markdown fences.
    
    The JSON schema should contain:
    - overview: string
    - key_goals: string[]
    - suggested_deliverables: string[]
    - brand_tone: string
    - website_summary_points: string[]
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    let textResponse = response.text.trim();
    if (textResponse.startsWith("```json") && textResponse.endsWith("```")) {
        textResponse = textResponse.slice(7, -3).trim();
    }
    
    let briefData;
    try {
        briefData = JSON.parse(textResponse);
    } catch (parseError) {
        console.error("Failed to parse Gemini response as JSON:", textResponse, parseError);
        throw new HttpError("The AI service returned an invalid response. Please try generating the brief again.", 502);
    }

    if (!briefData || typeof briefData !== 'object') {
        throw new HttpError("The AI service returned an empty or invalid brief object.", 502);
    }

    briefData.budget_band = budget;

    const { data: newBrief, error: dbError } = await supabaseClient
      .from('briefs')
      .insert({
        user_id: user.id,
        company_name: companyName,
        project_type: projectType,
        status: 'draft',
        brief_data: briefData,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return new Response(JSON.stringify(newBrief), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in generate-brief function:", error);
    const status = error instanceof HttpError ? error.status : 500;
    return new Response(JSON.stringify({ error: error.message || 'An internal server error occurred.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status,
    });
  }
});