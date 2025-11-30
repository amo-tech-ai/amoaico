
import { supabase } from './supabaseClient';
import { Brief, BriefData, Project } from '../types';

/**
 * Fetches all briefs for a specific user from the Supabase database.
 * RLS policies ensure the user can only see their own briefs.
 * @param userId - The ID of the user whose briefs are to be fetched.
 * @returns A promise that resolves to an array of the user's briefs.
 */
export const getBriefsForUser = async (userId: string): Promise<Brief[]> => {
    console.log(`Fetching briefs for user ${userId} from Supabase...`);
    const { data, error } = await supabase
        .from('briefs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error(`Error fetching briefs for user ${userId}:`, error);
        throw error;
    }

    // Map the raw data, which has brief_data as a JSONB column, to the flat Brief type.
    return data.map((item: any) => {
        const briefData = item.brief_data || {};
        return {
            id: item.id,
            company_name: item.company_name,
            project_type: item.project_type,
            status: item.status,
            created_at: item.created_at,
            // Spread the brief_data to capture all dynamic AI fields
            ...briefData,
            // Explicit mappings or fallbacks if needed for legacy/compatibility
            website_summary_points: briefData.website_summary_points || [],
        };
    });
};

/**
 * Fetches all "approved" briefs for a user to be displayed as projects.
 * @param userId - The ID of the user whose projects are to be fetched.
 * @returns A promise that resolves to an array of projects.
 */
export const getProjectsForUser = async (userId: string): Promise<Project[]> => {
    console.log(`Fetching projects (approved briefs) for user ${userId}...`);
    const { data, error } = await supabase
        .from('briefs')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

    if (error) {
        console.error(`Error fetching projects for user ${userId}:`, error);
        throw error;
    }

    return data.map((item: any) => {
        const briefData = item.brief_data || {};
        return {
            id: item.id,
            company_name: item.company_name,
            project_type: item.project_type,
            status: item.status,
            created_at: item.created_at,
            ...briefData,
        };
    });
};


/**
 * Fetches a single brief by its ID from Supabase.
 * RLS policies ensure the user can only fetch a brief they own.
 * @param briefId - The UUID of the brief to fetch.
 * @returns A promise that resolves to the brief object, or null if not found.
 */
export const getBriefById = async (briefId: string): Promise<Brief | null> => {
    console.log(`Fetching brief with ID ${briefId} from Supabase...`);
    const { data, error } = await supabase
        .from('briefs')
        .select('*')
        .eq('id', briefId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // "pgrst_not_found"
            return null;
        }
        console.error(`Error fetching brief ${briefId}:`, error);
        throw error;
    }
    
    if (!data) return null;

    const briefData = data.brief_data || {};
    const brief: Brief = {
        id: data.id,
        company_name: data.company_name,
        project_type: data.project_type,
        status: data.status,
        created_at: data.created_at,
        ...briefData,
        // Ensure arrays are initialized
        website_summary_points: briefData.website_summary_points || [],
        goals: briefData.goals || [],
        deliverables: briefData.deliverables || [],
        success_metrics: briefData.success_metrics || [],
    };
    
    return brief;
};

interface GetAllBriefsParams {
    page?: number;
    pageSize?: number;
    statusFilter?: string;
    searchQuery?: string;
}

/**
 * Fetches a paginated and filtered list of all briefs. For admin use.
 * @returns A promise that resolves to an object containing the briefs and the total count.
 */
export const getAllBriefs = async ({
    page = 1,
    pageSize = 10,
    statusFilter = 'all',
    searchQuery = ''
}: GetAllBriefsParams): Promise<{ briefs: Brief[], count: number }> => {
    console.log(`Fetching briefs for admin: page ${page}, filter ${statusFilter}, search '${searchQuery}'`);
    
    let query = supabase
        .from('briefs')
        .select(`
            id,
            company_name,
            project_type,
            status,
            created_at,
            brief_data,
            user:profiles(id, full_name)
        `, { count: 'exact' });

    if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
    }
    
    if (searchQuery) {
        // Search on company name or user's full name
        query = query.or(`company_name.ilike.%${searchQuery}%,user.full_name.ilike.%${searchQuery}%`);
    }

    query = query
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);
        
    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching all briefs:', error);
        throw error;
    }

    const briefs = data.map((item: any) => {
        const briefData = item.brief_data || {};
        return {
            id: item.id,
            company_name: item.company_name,
            project_type: item.project_type,
            status: item.status,
            created_at: item.created_at,
            ...briefData,
            user: item.user ? {
                id: item.user.id,
                full_name: item.user.full_name,
                email: '', // Email is not in profiles table
            } : undefined,
        };
    });
    
    return { briefs, count: count || 0 };
};


/**
 * Updates the status of a specific brief. For admin use.
 * @param briefId - The UUID of the brief to update.
 * @param newStatus - The new status to set.
 * @returns A promise that resolves to the updated brief object.
 */
export const updateBriefStatus = async (briefId: string, newStatus: Brief['status']): Promise<Brief> => {
    console.log(`Updating status for brief ${briefId} to ${newStatus}`);
    const { data, error } = await supabase
        .from('briefs')
        .update({ status: newStatus })
        .eq('id', briefId)
        .select()
        .single();

    if (error) {
        console.error('Error updating brief status:', error);
        throw error;
    }
    
    const briefData = data.brief_data || {};
    const updatedBrief: Brief = {
        id: data.id,
        company_name: data.company_name,
        project_type: data.project_type,
        status: data.status,
        created_at: data.created_at,
        ...briefData,
    };
    return updatedBrief;
};

/**
 * Updates a specific brief with new data by invoking a secure Edge Function.
 * @param briefId - The UUID of the brief to update.
 * @param updates - An object containing the brief fields to update.
 * @returns A promise that resolves to the fully updated brief object.
 */
export const updateBrief = async (briefId: string, updates: Partial<Brief>): Promise<Brief> => {
    console.log(`Updating brief ${briefId} via Edge Function...`);

    const { data, error } = await supabase.functions.invoke('update-brief', {
        body: { briefId, updates },
    });

    if (error) {
        console.error("Error invoking update-brief function:", error);
        throw new Error(`Failed to update brief: ${error.message}`);
    }

    // The function returns the full updated record, which needs to be mapped to the Brief type
    const briefData = data.brief_data || {};
    const returnedBrief: Brief = {
        id: data.id,
        company_name: data.company_name,
        project_type: data.project_type,
        status: data.status,
        created_at: data.created_at,
        ...briefData,
    };
    
    return returnedBrief;
};
