// supabase/functions/_shared/supabaseClient.ts
// FIX: Updated Deno types reference to use a more reliable CDN (esm.sh)
// to resolve Deno runtime and Supabase functions type definition errors.
/// <reference types="https://esm.sh/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />

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
