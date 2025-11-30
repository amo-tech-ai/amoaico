import { supabase } from './supabaseClient';
import { Brief, Project, SearchResults } from '../types';

/**
 * Searches the dashboard data (briefs and projects) for a given query.
 * @param query - The search string.
 * @param userId - The ID of the authenticated user.
 * @returns A promise resolving to SearchResults.
 */
export const searchDashboard = async (query: string, userId: string): Promise<SearchResults> => {
    if (!query || query.trim().length < 2) return { briefs: [], projects: [] };

    // Perform a case-insensitive ILIKE search on relevant columns
    // Restrict to the current user's data
    const { data, error } = await supabase
        .from('briefs')
        .select('*')
        .eq('user_id', userId)
        .or(`company_name.ilike.%${query}%,project_type.ilike.%${query}%`)
        .limit(10);

    if (error) {
        console.error('Search error:', error);
        // Return empty results on error rather than throwing, for better UI resilience
        return { briefs: [], projects: [] };
    }

    // Map raw data to the Brief/Project structure
    const mappedItems = data.map((item: any) => {
        const briefData = item.brief_data || {};
        return {
            id: item.id,
            company_name: item.company_name,
            project_type: item.project_type,
            status: item.status,
            created_at: item.created_at,
            ...briefData,
            // Ensure safe defaults
            website_summary_points: briefData.website_summary_points || [],
            goals: briefData.goals || [],
            deliverables: briefData.deliverables || [],
            success_metrics: briefData.success_metrics || [],
        };
    });

    // Separate into Briefs (in-progress) and Projects (approved)
    const briefs = mappedItems.filter((item: any) => item.status !== 'approved') as Brief[];
    const projects = mappedItems.filter((item: any) => item.status === 'approved') as Project[];

    return { briefs, projects };
};