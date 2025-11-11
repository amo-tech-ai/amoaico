import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
// It's recommended to use environment variables for this
const supabaseUrl = 'https://your-project-ref.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project')) {
    console.warn("Supabase client is not configured. Please add your URL and Anon Key.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);