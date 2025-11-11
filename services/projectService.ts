import { supabase } from './supabaseClient';
import { ProjectStory } from '../types';

/**
 * Fetches all project stories from the 'projects' table.
 * This data is public and does not require authentication.
 * @returns A promise that resolves to an array of project stories.
 */
export const getProjectStories = async (): Promise<ProjectStory[]> => {
    console.log("Fetching project stories from Supabase...");
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching project stories:', error);
        throw error;
    }

    // The data from the DB is already in the correct shape for ProjectStory,
    // but a mapping function could be added here for more complex transformations.
    return data as ProjectStory[];
};
