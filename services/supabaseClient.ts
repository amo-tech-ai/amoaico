import { createClient } from '@supabase/supabase-js';

// These variables are expected to be set in the environment.
// In a production environment, these variables must be set on the hosting platform.
// For local development, you might use a .env file.
const supabaseUrl = process.env.SUPABASE_URL || 'https://void.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (supabaseUrl === 'https://void.supabase.co') {
    console.warn(
        "Supabase environment variables are not set. The application is using placeholder credentials. " +
        "Please set SUPABASE_URL and SUPABASE_ANON_KEY in your environment for the application to connect to your Supabase backend."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
