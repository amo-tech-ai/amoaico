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

    // The data from Supabase has a 'brief_data' JSONB column. This mapping
    // safely handles it and provides defaults to prevent crashes,
    // transforming the DB record into the application's 'Brief' type.
    return data.map((brief): Brief => {
        const briefData = brief.brief_data || {};
        return {
            id: brief.id,
            company_name: brief.company_name || 'Untitled Project',
            project_type: brief.project_type || 'N/A',
            status: brief.status || 'draft',
            created_at: brief.created_at,
            // Safely access properties from the briefData object, providing defaults
            overview: briefData.overview || 'No overview available.',
            key_goals: briefData.key_goals || [],
            suggested_deliverables: briefData.suggested_deliverables || [],
            brand_tone: briefData.brand_tone || 'N/A',
            budget_band: briefData.budget_band || 'N/A',
            website_summary_points: briefData.website_summary_points || [],
        };
    });
};


// Admin API: Get all briefs from all users
export const getAllBriefs = async (): Promise<Brief[]> => {
    console.log("Fetching ALL briefs for admin from Supabase...");
    // This query will only succeed if the user has the 'admin' role due to RLS policies.
    const { data, error } = await supabase
        .from('briefs')
        .select('*, profile:profiles(id, full_name, email)')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all briefs:', error);
        throw error;
    }
    if (!data) return [];
    
    return data.map((brief: any): Brief => {
        const briefData = brief.brief_data || {};
        return {
            id: brief.id,
            company_name: brief.company_name || 'Untitled',
            project_type: brief.project_type || 'N/A',
            status: brief.status || 'draft',
            created_at: brief.created_at,
            overview: briefData.overview || 'No overview.',
            key_goals: briefData.key_goals || [],
            suggested_deliverables: briefData.suggested_deliverables || [],
            brand_tone: briefData.brand_tone || 'N/A',
            budget_band: briefData.budget_band || 'N/A',
            website_summary_points: briefData.website_summary_points || [],
            user: brief.profile ? {
                id: brief.profile.id,
                full_name: brief.profile.full_name,
                email: brief.profile.email,
            } : undefined,
        };
    });
};


// Admin API: Update the status of a specific brief
export const updateBriefStatus = async (briefId: string, status: Brief['status']): Promise<Brief> => {
    console.log(`Admin updating brief ${briefId} to status ${status}...`);
    const { data, error } = await supabase
        .from('briefs')
        .update({ status })
        .eq('id', briefId)
        .select()
        .single();
    
    if (error) {
        console.error('Error updating brief status:', error);
        throw error;
    }

    return data;
};