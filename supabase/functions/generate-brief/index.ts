
// supabase/functions/generate-brief/index.ts

// FIX: Add a type declaration for the Deno global to resolve TypeScript errors
declare const Deno: any;

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { Type, Schema } from "npm:@google/genai@0.14.0";
import { corsHeaders } from '../_shared/cors.ts';
import { HttpError, parseJSON, requireFields } from '../_shared/validation.ts';
import { createSupabaseClient } from '../_shared/supabaseClient.ts';
import { createGeminiClient } from '../_shared/geminiClient.ts';

// Main function to handle requests
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    // 1. Auth & Validation
    const body = await parseJSON(req);
    requireFields({ body, fields: ['companyName', 'websiteUrl', 'projectType', 'selectedGoals', 'budget'] });
    const { companyName, websiteUrl, projectType, selectedGoals, budget } = body;
    
    // Use shared client for consistent auth handling
    const userSupabaseClient = createSupabaseClient(req);
    const { data: { user }, error: userError } = await userSupabaseClient.auth.getUser();

    if (userError) throw new HttpError(userError.message, 401);
    if (!user) throw new HttpError('Unauthorized: User not authenticated.', 401);

    // RATE LIMITING (Safety Check)
    // Create admin client to check request count (bypassing RLS for accurate count)
    const adminSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await adminSupabaseClient
        .from('briefs')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gt('created_at', oneHourAgo);

    if (countError) {
        console.error("Rate limit check failed:", countError);
    } else if (count !== null && count >= 5) {
        throw new HttpError("Rate limit exceeded: You have created too many briefs recently. Please try again in an hour.", 429);
    }

    // Init Gemini Client using shared helper (handles GEMINI_API_KEY logic)
    const ai = createGeminiClient();

    // 2. AI Step 1: Research Agent (Gemini 3 Pro - Search)
    console.log(`[${user.id}] AI Step 1: Researching ${websiteUrl}`);
    
    const researchPrompt = `Analyze the website "${websiteUrl}" for company "${companyName}". 
    Provide a concise, factual summary covering:
    1. Core Mission/Value Proposition
    2. Key Products/Services
    3. Target Audience (inferred)
    4. Brand Tone/Voice (inferred)
    
    Do not invent information. Stick strictly to the content available via Search.`;
    
    const researchResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: researchPrompt,
      config: { 
        tools: [{ googleSearch: {} }],
      },
    });
    
    const groundedContext = researchResponse.text;
    console.log(`[${user.id}] AI Step 1 Complete. Duration: ${Date.now() - startTime}ms`);

    // 3. AI Step 2: Generation Agent (Gemini 3 Pro - High Thinking)
    // Define the JSON Schema for the brief
    const briefSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        brief_type: { type: Type.STRING, enum: ["website", "campaign", "brand", "product", "other"] },
        project_title: { type: Type.STRING },
        summary: { type: Type.STRING },
        goals: { type: Type.ARRAY, items: { type: Type.STRING } },
        target_audience: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            segments: { type: Type.ARRAY, items: { type: Type.STRING } },
            key_insights: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["description", "segments"]
        },
        deliverables: { type: Type.ARRAY, items: { type: Type.STRING } },
        scope: { type: Type.STRING },
        tone_and_style: {
            type: Type.OBJECT,
            properties: {
                tone_keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                do: { type: Type.ARRAY, items: { type: Type.STRING } },
                dont: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        timeline: {
            type: Type.OBJECT,
            properties: {
                milestones: { type: Type.ARRAY, items: { type: Type.STRING } },
                estimated_duration: { type: Type.STRING }
            }
        },
        budget: {
            type: Type.OBJECT,
            properties: {
                range: { type: Type.STRING },
                notes: { type: Type.STRING }
            }
        },
        success_metrics: { type: Type.ARRAY, items: { type: Type.STRING } },
        website_summary_points: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["project_title", "summary", "goals", "target_audience", "deliverables", "scope", "tone_and_style", "timeline", "budget", "success_metrics"]
    };
    
    const generationPrompt = `
    You are an expert product and marketing strategist. Create a detailed Project Brief based on the provided context.
    
    **Inputs:**
    - Research Context: "${groundedContext}"
    - Client Project Type: "${projectType}"
    - Client Goals: "${selectedGoals.join(', ')}"
    - Client Budget Range: "${budget}"
    
    **Instructions:**
    - Synthesize the research and client goals into a cohesive strategy.
    - Ensure the 'tone_and_style' matches the researched brand voice.
    - Make the 'deliverables' specific to the Project Type.
    - Populate 'website_summary_points' with 3 key facts from the research.
    `;

    console.log(`[${user.id}] AI Step 2: Generating structured brief.`);
    
    const generationResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: generationPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: briefSchema,
      }
    });
    
    const briefData = JSON.parse(generationResponse.text || "{}");
    console.log(`[${user.id}] AI Step 2 Complete. Duration: ${Date.now() - startTime}ms`);

    // 4. Database Persistence
    const { data: newBrief, error: dbError } = await adminSupabaseClient
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
      console.error(`[${user.id}] DB Insert Error:`, dbError);
      throw dbError;
    }
    console.log(`[${user.id}] DB Insert Complete. Total duration: ${Date.now() - startTime}ms`);

    // 5. Return Response
    return new Response(JSON.stringify(newBrief), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in generate-brief function:", error);
    const status = error instanceof HttpError ? error.status : 500;
    const message = error.message || 'An internal server error occurred.';
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status,
    });
  }
});
