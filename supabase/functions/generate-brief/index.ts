// supabase/functions/generate-brief/index.ts

// FIX: Add a type declaration for the Deno global to resolve TypeScript errors
// in environments where Deno types are not automatically available.
declare const Deno: any;

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { GoogleGenAI, FunctionDeclaration, Type, ToolConfig, FunctionCallingMode } from "npm:@google/genai@0.14.0";
import { corsHeaders } from '../_shared/cors.ts';
import { HttpError, parseJSON, requireFields } from '../_shared/validation.ts';

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
    
    const userSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    const { data: { user }, error: userError } = await userSupabaseClient.auth.getUser();

    if (userError) throw new HttpError(userError.message, 401);
    if (!user) throw new HttpError('Unauthorized: User not authenticated.', 401);

    // 2. AI Step 1: Research Agent
    console.log(`[${user.id}] AI Step 1: Researching ${websiteUrl}`);
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) throw new HttpError('Server configuration error: GEMINI_API_KEY not set.', 500);
    
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    const researchPrompt = `Analyze the website "${websiteUrl}" and provide a concise, factual summary of the company's mission, key services/products, target audience, and overall brand tone. Do not invent or infer information. Stick strictly to the content on the site.`;
    
    const researchResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: researchPrompt,
      config: { tools: [{ googleSearch: {} }] },
    });
    const groundedContext = researchResponse.text;
    console.log(`[${user.id}] AI Step 1 Complete. Duration: ${Date.now() - startTime}ms`);

    // 3. AI Step 2: Generation Agent
    const generateBriefFunctionDeclaration: FunctionDeclaration = {
      name: 'generateProjectBrief',
      parameters: {
        type: Type.OBJECT,
        description: 'A structured project brief generated from user inputs and website analysis.',
        properties: {
          overview: { type: Type.STRING, description: 'A concise overview of the company based on the provided summary.' },
          key_goals: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'A list of key project goals derived from user input.' },
          suggested_deliverables: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'A list of suggested deliverables for the project.' },
          brand_tone: { type: Type.STRING, description: 'The perceived brand tone from the website content summary.' },
          website_summary_points: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'A list of key takeaways or summary points from the website summary.' },
          budget_band: { type: Type.STRING, description: 'The provided budget for the project.' },
        },
        required: ['overview', 'key_goals', 'suggested_deliverables', 'brand_tone', 'website_summary_points', 'budget_band']
      }
    };
    
    const generationPrompt = `You are a senior project strategist. Based on the following factual summary: "${groundedContext}", and the client's direct inputs (project type: "${projectType}", goals: "${selectedGoals.join(', ')}", budget: "${budget}"), you must call the "generateProjectBrief" function to create a structured project brief. Do not add any information not present in the provided context.`;

    const toolConfig: ToolConfig = {
      functionCallingConfig: {
        mode: FunctionCallingMode.ANY,
      }
    };

    console.log(`[${user.id}] AI Step 2: Generating structured brief.`);
    const generationResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: generationPrompt,
      config: {
        tools: [{ functionDeclarations: [generateBriefFunctionDeclaration] }],
        toolConfig: toolConfig,
      }
    });
    
    const functionCall = generationResponse.functionCalls?.[0];

    if (!functionCall || functionCall.name !== 'generateProjectBrief') {
      console.error(`[${user.id}] Gemini did not call the expected function. Response:`, JSON.stringify(generationResponse, null, 2));
      throw new HttpError("The AI service failed to generate a structured brief. Please try again.", 502);
    }
    const briefData = functionCall.args;
    console.log(`[${user.id}] AI Step 2 Complete. Duration: ${Date.now() - startTime}ms`);

    // 4. Database Persistence
    const adminSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

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