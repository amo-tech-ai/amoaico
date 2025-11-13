// supabase/functions/_shared/geminiClient.ts
// FIX: Add a type declaration for the Deno global to resolve TypeScript errors
// in environments where Deno types are not automatically available.
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

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