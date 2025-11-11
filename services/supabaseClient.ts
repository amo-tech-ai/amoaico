import { createClient } from '@supabase/supabase-js';

// Use Vite's standard import.meta.env for client-side environment variables.
// These variables must be prefixed with VITE_ to be exposed to the browser.
// FIX: Cast import.meta to 'any' to resolve TypeScript error "Property 'env' does not exist on type 'ImportMeta'".
// This is necessary because the Vite client types are not globally available in this context, and new files cannot be added.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://void.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (supabaseUrl === 'https://void.supabase.co') {
    console.warn(
        "Supabase environment variables are not set. The application is using placeholder credentials. " +
        "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment for the application to connect to your Supabase backend."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
