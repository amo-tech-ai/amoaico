// supabase/functions/update-brief/index.ts
// This function securely updates a user's project brief.

// FIX: Replaced faulty Deno type reference with a direct import of `serve` from `deno.land/std` to resolve Deno runtime errors.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';
import { createSupabaseClient } from '../_shared/supabaseClient.ts';
import { parseJSON, requireFields, HttpError } from '../_shared/validation.ts';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await parseJSON(req);
    requireFields({ body, fields: ['briefId', 'updatedData'] });
    const { briefId, updatedData } = body;

    const supabaseClient = createSupabaseClient(req);
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new HttpError('Unauthorized: User not authenticated.', 401);
    }

    // First, fetch the existing brief_data to merge with updates.
    // RLS ensures the user can only fetch their own brief.
    const { data: existingBrief, error: fetchError } = await supabaseClient
      .from('briefs')
      .select('brief_data')
      .eq('id', briefId)
      .single();

    if (fetchError) {
        throw new HttpError('Brief not found or access denied.', 404);
    }
    
    // Merge the existing data with the incoming updates.
    const newBriefData = { ...(existingBrief.brief_data || {}), ...updatedData };

    // Update the record in the database.
    const { data: updatedRecord, error: updateError } = await supabaseClient
      .from('briefs')
      .update({ brief_data: newBriefData, updated_at: new Date().toISOString() })
      .eq('id', briefId)
      .select()
      .single();
    
    if (updateError) {
      console.error('Supabase DB error during update:', updateError);
      throw new HttpError('Failed to update brief in the database.', 500);
    }

    return new Response(JSON.stringify(updatedRecord), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in update-brief function:", error);
    const status = error instanceof HttpError ? error.status : 500;
    return new Response(JSON.stringify({ error: error.message || 'An internal server error occurred.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status,
    });
  }
});