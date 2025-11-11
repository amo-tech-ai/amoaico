import { createClient } from '@supabase/supabase-js';

// In this environment, environment variables are injected into `process.env`.
// We use this instead of Vite's `import.meta.env`.
const supabaseUrl = process.env.SUPABASE_URL || 'https://void.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (supabaseUrl === 'https://void.supabase.co') {
    console.warn(
        "Supabase environment variables are not set. The application is using placeholder credentials. " +
        "Please set SUPABASE_URL and SUPABASE_ANON_KEY in your environment for the application to connect to your Supabase backend."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);