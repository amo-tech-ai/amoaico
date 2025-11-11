import { BriefData, Brief } from '../types';
import { supabase } from './supabaseClient';

interface GenerationPayload {
    companyName: string;
    websiteUrl: string;
    projectType: string;
    selectedGoals: string[];
    budget: string;
}

/**
 * Generates a project brief by securely invoking the 'generate-brief' Supabase Edge Function.
 * This is the production-ready implementation that protects the API key.
 * @param payload - The user's input from the wizard.
 * @returns A promise that resolves to the newly created brief object from the database.
 */
export const generateBriefFromApi = async (payload: GenerationPayload): Promise<Brief> => {
    console.log("Invoking secure 'generate-brief' Edge Function...");

    const { data, error } = await supabase.functions.invoke('generate-brief', {
        body: payload,
    });

    if (error) {
        console.error("Error invoking Edge Function:", error);
        throw new Error(`Failed to generate brief: ${error.message}`);
    }

    // The edge function returns the full brief object from the database
    const briefData = data.brief_data || {};
    const returnedBrief: Brief = {
        id: data.id,
        company_name: data.company_name,
        project_type: data.project_type,
        status: data.status,
        created_at: data.created_at,
        overview: briefData.overview || '',
        key_goals: briefData.key_goals || [],
        suggested_deliverables: briefData.suggested_deliverables || [],
        brand_tone: briefData.brand_tone || '',
        budget_band: briefData.budget_band || '',
        website_summary_points: briefData.website_summary_points || [],
    };
    
    return returnedBrief;
};
