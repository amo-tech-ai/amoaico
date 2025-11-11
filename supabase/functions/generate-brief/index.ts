// FIX: Add a triple-slash directive to reference Deno's types. This resolves "Cannot find name 'Deno'" errors by providing the necessary type definitions for Deno runtime globals.
/// <reference types="https://deno.land/x/deno@v1.44.0/cli/main.d.ts" />

import { createClient } from 'npm:@supabase/supabase-js@2';
import { GoogleGenAI } from "npm:@google/genai@0.14.0";
import { corsHeaders } from '../_shared/cors.ts';

// Deno.serve is the modern, built-in way to create an HTTP server in Deno.
// All Supabase Edge Functions should use this instead of the deprecated std/http library.
Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests immediately. This is a best practice.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // FIX: Use the 'API_KEY' environment variable for the Gemini API key as per project guidelines.
    // Environment variables are securely accessed via Deno.env.get().
    const API_KEY = Deno.env.get('API_KEY');
    if (!API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const { companyName, websiteUrl, projectType, selectedGoals, budget } = await req.json();

    // 1. Authenticate the user by creating a Supabase client with their JWT.
    // This is a critical security step to ensure only logged-in users can use the function.
    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );
    
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    // 2. Construct the prompt and call the Gemini API securely from the server.
    // The googleSearch tool requires the prompt to explicitly ask for a JSON object.
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
    const briefData = JSON.parse(textResponse);
    briefData.budget_band = budget; // Ensure budget is correctly included.

    // 3. Persist the generated brief to the PostgreSQL database.
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

    // 4. Return the newly created brief record to the client.
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