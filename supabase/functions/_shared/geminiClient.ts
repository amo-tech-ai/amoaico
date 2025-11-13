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
    // Use the nullish coalescing operator (??) to check for the primary
    // environment variable and fall back to the secondary one.
    const apiKey = Deno.env.get("GEMINI_API_KEY") ?? Deno.env.get("API_KEY");

    if (!apiKey) {
      // Throw a single, clear error message if neither key is found.
      throw new Error(
        "Gemini API key not set. Expected GEMINI_API_KEY or API_KEY in server environment."
      );
    }
    
    return new GoogleGenAI({ apiKey: apiKey });
};
