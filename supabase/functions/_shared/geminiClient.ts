
// supabase/functions/_shared/geminiClient.ts
// FIX: Add a type declaration for the Deno global to resolve TypeScript errors
// in environments where Deno types are not automatically available.
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

import { GoogleGenAI } from 'npm:@google/genai@0.14.0';

/**
 * Creates and returns a GoogleGenAI client instance.
 * It securely retrieves the API key from Supabase environment secrets.
 * @returns A GoogleGenAI client instance.
 */
export const createGeminiClient = () => {
    // Strictly use GEMINI_API_KEY as the single source of truth for the server-side key.
    // This removes ambiguity and aligns with the project documentation.
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      console.error("Configuration Error: GEMINI_API_KEY is not set in the environment.");
      throw new Error(
        "Server configuration error: GEMINI_API_KEY environment variable is missing. Please set this secret in your Supabase project."
      );
    }
    
    return new GoogleGenAI({ apiKey: apiKey });
};
