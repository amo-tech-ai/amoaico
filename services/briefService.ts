import { Brief } from '../types';
import { supabase } from './supabaseClient';

// Public API: Get all briefs for the currently authenticated user
export const getBriefsForUser = async (): Promise<Brief[]> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("No user logged in, returning empty list of briefs.");
        return [];
    }

    console.log(`Fetching briefs for user ${user.id} from Supabase...`);
    const { data, error } = await supabase
        .from('briefs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching briefs:', error);
        throw error;
    }

    if (!data) return [];

    // The data from Supabase has 'brief_data' JSONB column. We need to flatten it
    // to match the application's 'Brief' type.
    return data.map(brief => ({
        id: brief.id,
        company_name: brief.company_name,
        project_type: brief.project_type,
        status: brief.status,
        created_at: brief.created_at,
        // Spread the content of the brief_data JSON object
        ...brief.brief_data 
    }));
};