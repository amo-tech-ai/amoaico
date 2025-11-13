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
    requireFields({ body, fields: ['briefId', 'updates'] });
    const { briefId, updates } = body;

    const supabaseClient = createSupabaseClient(req);
    // FIX: Replaced `supabaseClient.auth.getUser()` with the v1-compatible `supabaseClient.auth.api.getUser(jwt)`.
    // This resolves the error where `getUser` does not exist on the `auth` object in older client versions.
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new HttpError('Unauthorized: Missing Authorization header.', 401);
    }
    const jwt = authHeader.replace('Bearer ', '');
    const { user, error: userError } = await supabaseClient.auth.api.getUser(jwt);

    if (userError) throw new HttpError(userError.message, 401);
    if (!user) {
      throw new HttpError('Unauthorized: User not authenticated.', 401);
    }
    
    // Separate top-level fields from fields that belong in the brief_data JSONB column.
    const TOP_LEVEL_KEYS = ['company_name', 'project_type', 'status'];
    const topLevelUpdates: any = {};
    const briefDataUpdates: any = {};

    for (const key in updates) {
        // Ensure we only process own properties of the updates object
        if (Object.prototype.hasOwnProperty.call(updates, key)) {
            if (TOP_LEVEL_KEYS.includes(key)) {
                topLevelUpdates[key] = updates[key];
            } else {
                // Collect all other valid fields for the brief_data JSONB
                briefDataUpdates[key] = updates[key];
            }
        }
    }

    // Construct the final update payload
    const finalUpdatePayload: any = { ...topLevelUpdates };

    // If there are updates to the nested JSON data, fetch the existing data, merge it,
    // and add it to our final payload.
    if (Object.keys(briefDataUpdates).length > 0) {
        const { data: existingBrief, error: fetchError } = await supabaseClient
          .from('briefs')
          .select('brief_data')
          .eq('id', briefId)
          .single();

        if (fetchError) {
            throw new HttpError('Brief not found or access denied.', 404);
        }
        
        const newBriefData = { ...(existingBrief.brief_data || {}), ...briefDataUpdates };
        finalUpdatePayload.brief_data = newBriefData;
    }

    if (Object.keys(finalUpdatePayload).length === 0) {
        // If no valid fields were sent to update, we don't need to hit the DB.
        // Fetch and return the current record instead.
        const { data: currentRecord, error: currentFetchError } = await supabaseClient.from('briefs').select().eq('id', briefId).single();
        if (currentFetchError) throw currentFetchError;
        return new Response(JSON.stringify(currentRecord), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    }

    // Add the updated_at timestamp to every update
    finalUpdatePayload.updated_at = new Date().toISOString();
    
    // Update the record in the database.
    const { data: updatedRecord, error: updateError } = await supabaseClient
      .from('briefs')
      .update(finalUpdatePayload)
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