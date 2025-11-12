import { createClient } from '@supabase/supabase-js';

// Vite exposes environment variables to the client via `import.meta.env`.
// The `VITE_` prefix is required for this to work correctly.
// FIX: Use type assertion on `import.meta` to access environment variables.
// This resolves TypeScript errors that occur when the `vite/client` type definitions
// cannot be found by the compiler, which is often an environment-specific issue.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://void.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (supabaseUrl === 'https://void.supabase.co') {
    console.warn(
        "Supabase environment variables are not set. The application is using placeholder credentials. " +
        "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment for the application to connect to your Supabase backend."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
