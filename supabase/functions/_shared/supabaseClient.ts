// supabase/functions/_shared/supabaseClient.ts
// FIX: Add Deno type reference to resolve error on 'Deno.env'.
/// <reference types="https://deno.land/x/deno/cli/types.d.ts" />

import { createClient } from '@supabase/supabase-js';

/**
 * Creates and returns an authenticated Supabase client for use in Edge Functions.
 * It uses the user's JWT from the request's Authorization header, which is essential
 * for respecting Row-Level Security (RLS) policies.
 * @param req - The incoming Deno.serve request object.
 * @returns An authenticated Supabase client instance.
 */
export const createSupabaseClient = (req: Request) => {
    const authHeader = req.headers.get('Authorization')!;
    
    return createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
    );
};
