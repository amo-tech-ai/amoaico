// supabase/functions/_shared/geminiClient.ts
// FIX: Updated Deno types reference to use a more reliable CDN (esm.sh)
// to resolve Deno runtime and Supabase functions type definition errors.
/// <reference types="https://esm.sh/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />

import { GoogleGenAI } from '@google/genai';

/**
 * Creates and returns a GoogleGenAI client instance.
 * It securely retrieves the API key from Supabase environment secrets.
 * @returns A GoogleGenAI client instance.
 */
export const createGeminiClient = () => {
    const API_KEY = Deno.env.get('API_KEY');
    if (!API_KEY) {
      throw new Error("API_KEY is not set in Supabase secrets.");
    }
    return new GoogleGenAI({ apiKey: API_KEY });
};
