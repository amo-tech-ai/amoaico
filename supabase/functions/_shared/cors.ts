// supabase/functions/_shared/cors.ts

// This shared utility provides Cross-Origin Resource Sharing (CORS) headers.
// These headers are essential for allowing the frontend application, hosted on a different domain,
// to make requests to this Supabase Edge Function.
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
