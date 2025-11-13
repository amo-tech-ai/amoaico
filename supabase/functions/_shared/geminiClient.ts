// supabase/functions/_shared/geminiClient.ts
// FIX: Update Deno types reference to a stable, versioned URL to resolve "Cannot find name 'Deno'" error.
/// <reference types="npm:@supabase/functions-js/src/edge-runtime.d.ts" />

import { GoogleGenAI } from 'npm:@google/genai@0.14.0';

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