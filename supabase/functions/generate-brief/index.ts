// FIX: Replaced faulty Deno type reference with a direct import of `serve` from `deno.land/std` to resolve Deno runtime errors.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseClient } from '../_shared/supabaseClient.ts';
import { createGeminiClient } from '../_shared/geminiClient.ts';
import { parseJSON, requireFields, HttpError } from '../_shared/validation.ts';
import { FunctionDeclaration, Type } from '@google/genai';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await parseJSON(req);
    requireFields({ body, fields: ['companyName', 'websiteUrl', 'projectType', 'selectedGoals', 'budget'] });
    const { companyName, websiteUrl, projectType, selectedGoals, budget } = body;
    
    const supabaseClient = createSupabaseClient(req);
    
    // FIX: Replaced `supabaseClient.auth.api.getUser(jwt)` with `supabaseClient.auth.getUser()`. The `api` property does not exist on the auth client. `getUser()` is the correct method for `supabase-js` v2 to get the user from the JWT in the `Authorization` header.
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

    if (userError) throw new HttpError(userError.message, 401);
    if (!user) {
      throw new HttpError('Unauthorized: User not authenticated.', 401);
    }

    const ai = createGeminiClient();

    // --- ARCHITECTURAL REFACTOR: TWO-STEP AI CHAIN ---
    // This new architecture separates research from structured generation for greater reliability.

    // STEP 1: Research and Grounding
    // Use Google Search to analyze the website and get a factual summary.
    console.log(`Step 1: Researching website: ${websiteUrl}`);
    const researchPrompt = `Analyze the website "${websiteUrl}" and provide a concise summary of the company's mission, key services/products, target audience, and overall brand tone. Focus on factual information presented on the site.`;
    const researchResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: researchPrompt,
        config: { tools: [{ googleSearch: {} }] },
    });
    const groundedContext = researchResponse.text;
    console.log("Step 1 complete. Grounded context:", groundedContext);


    // STEP 2: Structured Generation
    // Use the grounded context and user input to generate the structured brief.
    console.log("Step 2: Generating structured brief...");
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
    
    const generationPrompt = `You are a senior project strategist. Based on the following company summary: "${groundedContext}", and the client's inputs: project type "${projectType}", goals "${selectedGoals.join(', ')}", and budget "${budget}", call the "generateProjectBrief" function to create a structured project brief.`;

    const generationResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: generationPrompt,
        config: {
            tools: [{ functionDeclarations: [generateBriefFunctionDeclaration] }],
        }
    });
    
    const functionCall = generationResponse.functionCalls?.[0];

    if (!functionCall || functionCall.name !== 'generateProjectBrief') {
      console.error("Gemini did not call the expected function. Response:", JSON.stringify(generationResponse, null, 2));
      throw new HttpError("The AI service failed to generate a structured brief. Please try again.", 502);
    }
    console.log("Step 2 complete. Function call received.");
    const briefData = functionCall.args;

    // --- DATABASE PERSISTENCE ---
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
    console.log("Step 3: Brief saved to database.");

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