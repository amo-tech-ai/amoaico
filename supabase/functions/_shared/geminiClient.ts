// supabase/functions/_shared/geminiClient.ts
// FIX: Add Deno type reference to resolve error on 'Deno.env'.
/// <reference types="https://deno.land/x/deno/cli/types.d.ts" />

import { GoogleGenAI } from '@google/genai';

/**
 * Creates and returns a GoogleGenAI client instance.
 * It securely retrieves the API key from Supabase environment secrets.
 * @returns A GoogleGenAI client instance.
 */
export const createGeminiClient = () => {
    // FIX: Changed variable name to GEMINI_API_KEY to match documentation and setup instructions.
    const API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!API_KEY) {
      // FIX: Updated error message to reflect the correct variable name.
      throw new Error("GEMINI_API_KEY is not set in Supabase secrets.");
    }
    return new GoogleGenAI({ apiKey: API_KEY });
};
