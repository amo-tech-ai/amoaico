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
 * It securely retrieves the API key from Supabase environment secrets,
 * checking for both the recommended and a common legacy name for robustness.
 * @returns A GoogleGenAI client instance.
 */
export const createGeminiClient = () => {
    // Check for the recommended, specific secret name first.
    let apiKey = Deno.env.get('GEMINI_API_KEY');
    
    // As a fallback, check for the legacy/common name to improve robustness.
    if (!apiKey) {
      apiKey = Deno.env.get('API_KEY');
    }

    // If neither is found, throw a clear error.
    if (!apiKey) {
      throw new Error("Could not find GEMINI_API_KEY or API_KEY in Supabase secrets. Please ensure one is set.");
    }
    
    return new GoogleGenAI({ apiKey: apiKey });
};