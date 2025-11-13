import { supabase } from './supabaseClient';
import { Brief, Client } from '../types';

/**
 * Fetches all briefs for a user and processes them to generate a unique list of clients.
 * A "client" is defined by a unique company_name, and the service calculates the project count for each.
 * @param userId - The ID of the user whose clients are to be fetched.
 * @returns A promise that resolves to an array of clients, sorted by name.
 */
export const getClientsForUser = async (userId: string): Promise<Client[]> => {
    console.log(`Deriving client list for user ${userId} from briefs...`);
    
    // Fetch all briefs for the user
    const { data, error } = await supabase
        .from('briefs')
        .select('company_name')
        .eq('user_id', userId);

    if (error) {
        console.error(`Error fetching briefs to derive clients for user ${userId}:`, error);
        throw error;
    }

    if (!data) {
        return [];
    }

    // Process the briefs to create a client list
    const clientMap = new Map<string, number>();
    for (const brief of data) {
        if (brief.company_name) {
            clientMap.set(brief.company_name, (clientMap.get(brief.company_name) || 0) + 1);
        }
    }

    // Convert the map to an array of Client objects
    const clients: Client[] = Array.from(clientMap, ([company_name, project_count]) => ({
        company_name,
        project_count,
    }));

    // Sort clients alphabetically by company name
    return clients.sort((a, b) => a.company_name.localeCompare(b.company_name));
};
