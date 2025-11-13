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
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new HttpError('Unauthorized: User not authenticated.', 401);
    }

    const ai = createGeminiClient();

    // Define the schema for the function call to ensure structured JSON output
    const generateBriefFunctionDeclaration: FunctionDeclaration = {
      name: 'generateProjectBrief',
      parameters: {
        type: Type.OBJECT,
        description: 'A structured project brief generated from user inputs and website analysis.',
        properties: {
          overview: { type: Type.STRING, description: 'A concise overview of the company based on their website.' },
          key_goals: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'A list of key project goals derived from user input and website analysis.'
          },
          suggested_deliverables: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'A list of suggested deliverables for the project.'
          },
          brand_tone: { type: Type.STRING, description: 'The perceived brand tone from the website content.' },
          website_summary_points: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'A list of key takeaways or summary points from the website.'
          },
          budget_band: { type: Type.STRING, description: 'The provided budget for the project.' },
        },
        required: ['overview', 'key_goals', 'suggested_deliverables', 'brand_tone', 'website_summary_points', 'budget_band']
      }
    };

    // Update the prompt to instruct the AI to use the search tool and then call the function
    const prompt = `You are a senior project strategist. A client named "${companyName}" has provided their website URL, project type "${projectType}", goals "${selectedGoals.join(', ')}", and budget "${budget}". Analyze their website at "${websiteUrl}" using the search tool. Based on your analysis and the provided information, call the "generateProjectBrief" function with the fully populated arguments to create a structured project brief.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [
              { googleSearch: {} },
              { functionDeclarations: [generateBriefFunctionDeclaration] }
            ],
        }
    });

    const functionCall = response.functionCalls?.[0];

    // Validate that the AI returned the expected function call
    if (!functionCall || functionCall.name !== 'generateProjectBrief') {
      console.error("Gemini did not call the expected function. Response:", JSON.stringify(response, null, 2));
      throw new HttpError("The AI service failed to generate a structured brief. Please try again.", 502);
    }

    // The arguments of the function call are our structured JSON object
    const briefData = functionCall.args;

    if (!briefData || typeof briefData !== 'object') {
        throw new HttpError("The AI service returned an empty or invalid brief object.", 502);
    }

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