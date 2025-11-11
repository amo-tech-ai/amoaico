
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.14.0";
import { corsHeaders } from '../_shared/cors.ts'

// FIX: Declare Deno to address TypeScript error "Cannot find name 'Deno'".
// Supabase Edge Functions run in a Deno environment where 'Deno' is a global object.
declare const Deno: any;

// FIX: Use API_KEY environment variable to align with coding guidelines.
const API_KEY = Deno.env.get('API_KEY');
if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

// FIX: Initialize GoogleGenAI with the correct API key variable.
const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        overview: { type: Type.STRING, description: 'A concise summary of the company based on its website content.' },
        key_goals: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'A list of primary project goals based on user input.' },
        suggested_deliverables: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'A list of suggested deliverables to achieve the goals.' },
        brand_tone: { type: Type.STRING, description: 'The overall brand tone detected from the website (e.g., Professional, Playful).' },
        budget_band: { type: Type.STRING, description: 'The user-provided budget.' },
        website_summary_points: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Key factual takeaways from the website scan.' },
    }
};

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { companyName, websiteUrl, projectType, selectedGoals, budget } = await req.json();

    // 1. Create a Supabase client with the user's auth token
    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    
    // 2. Get the authenticated user
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    // 3. Call the Gemini API
    // FIX: Enhanced prompt to request JSON output explicitly, as responseSchema cannot be used with googleSearch tool.
    const prompt = `You are a senior project strategist. A client named "${companyName}" has provided their website URL, project type "${projectType}", goals "${selectedGoals.join(', ')}", and budget "${budget}". Analyze their website at "${websiteUrl}" and generate a structured project brief. The output MUST be a valid JSON object that conforms to the following schema. Do not output anything other than the JSON object, including markdown fences.
Schema:
${JSON.stringify(responseSchema, null, 2)}`;

    // FIX: Removed responseMimeType and responseSchema from config, as they are not allowed when using the googleSearch tool, per coding guidelines.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    // FIX: Implemented robust JSON parsing to handle potential variations in the model's text response.
    let textResponse = response.text.trim();
    if (textResponse.startsWith("```json") && textResponse.endsWith("```")) {
        textResponse = textResponse.slice(7, -3).trim();
    } else if (textResponse.startsWith("```") && textResponse.endsWith("```")) {
        textResponse = textResponse.slice(3, -3).trim();
    }
    const briefData = JSON.parse(textResponse);

    // 4. Insert the generated brief into the database
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

    if (dbError) {
      throw dbError;
    }

    return new Response(JSON.stringify(newBrief), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
