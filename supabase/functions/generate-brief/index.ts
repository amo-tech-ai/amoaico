// FIX: Declare Deno to resolve TypeScript errors in a non-Deno environment.
// The Deno global is available in the Supabase Edge Function runtime.
declare const Deno: any;

import { createClient } from 'npm:@supabase/supabase-js@2';
import { GoogleGenAI } from "npm:@google/genai@0.14.0";
import { corsHeaders } from '../_shared/cors.ts';

// This function follows Supabase best practices by using Deno.serve to handle requests.
Deno.serve(async (req: Request) => {
  // Immediately handle CORS preflight requests.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { companyName, websiteUrl, projectType, selectedGoals, budget } = await req.json();

    // Step 1: Securely authenticate the user.
    // A Supabase client is created using the user's JWT from the Authorization header.
    // This is a critical security measure to ensure only logged-in users can invoke this function.
    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized: User not authenticated.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    // Step 2: Access the Gemini API key from secure environment variables.
    // The API key is stored as a Supabase secret and is never exposed to the client.
    const API_KEY = Deno.env.get('API_KEY');
    if (!API_KEY) {
      throw new Error("API_KEY is not set in Supabase secrets.");
    }
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    // Step 3: Call the Gemini API from the server.
    // The prompt is constructed to request a structured JSON output, which is a best practice for reliability.
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

    // Clean and parse the AI's response, removing any markdown formatting.
    let textResponse = response.text.trim();
    if (textResponse.startsWith("```json") && textResponse.endsWith("```")) {
        textResponse = textResponse.slice(7, -3).trim();
    }
    const briefData = JSON.parse(textResponse);
    briefData.budget_band = budget; // Ensure the user's budget selection is included.

    // Step 4: Persist the generated brief to the database.
    // The brief is linked to the authenticated user's ID in a transactional database insert.
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

    // Step 5: Return the newly created record to the client.
    return new Response(JSON.stringify(newBrief), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in generate-brief function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});