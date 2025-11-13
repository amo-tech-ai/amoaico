// supabase/functions/research-topic/index.ts
// Implements the research-topic Edge Function as per docs/21-edge-functions-prompts.md.

// FIX: Updated Deno types reference to use a direct URL for better resolution.
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
    requireFields({ body, fields: ['query'] });
    const { query } = body;

    const supabaseClient = createSupabaseClient(req);
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new HttpError('Unauthorized: User not authenticated.', 401);
    }

    const ai = createGeminiClient();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sourceMap = new Map<string, string>();

    for (const chunk of groundingChunks) {
      if (chunk.web && chunk.web.uri && !sourceMap.has(chunk.web.uri)) {
        sourceMap.set(chunk.web.uri, chunk.web.title || '');
      }
    }

    const sources = Array.from(sourceMap.keys());

    return new Response(JSON.stringify({ summary, sources }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in research-topic function:", error);
    const status = error instanceof HttpError ? error.status : 500;
    return new Response(JSON.stringify({ error: error.message || 'An internal server error occurred.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status,
    });
  }
});
