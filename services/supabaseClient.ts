import { createClient } from '@supabase/supabase-js';

// Vite exposes environment variables to the client via `import.meta.env`.
// The `VITE_` prefix is required for this to work correctly.
// FIX: Use optional chaining (`?.`) to safely access environment variables. This prevents
// a runtime crash if `import.meta.env` is undefined in the deployment environment.
const supabaseUrl = (import.meta as any)?.env?.VITE_SUPABASE_URL || 'https://void.supabase.co';
const supabaseAnonKey = (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (supabaseUrl === 'https://void.supabase.co') {
    console.warn(
        "Supabase environment variables are not set. The application is using placeholder credentials. " +
        "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your deployment environment for the application to connect to your Supabase backend."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);