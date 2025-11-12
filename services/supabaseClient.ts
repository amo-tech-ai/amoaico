import { createClient } from '@supabase/supabase-js';

// Use process.env to access environment variables, as import.meta.env is not available
// in this application's non-standard Vite setup. This aligns with how other secrets
// like the Gemini API key are handled.
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://void.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (supabaseUrl === 'https://void.supabase.co') {
    console.warn(
        "Supabase environment variables are not set. The application is using placeholder credentials. " +
        "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment for the application to connect to your Supabase backend."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);