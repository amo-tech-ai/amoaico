import { BriefData } from '../types';
import { supabase } from './supabaseClient';

interface GenerationPayload {
    companyName: string;
    websiteUrl: string;
    projectType: string;
    selectedGoals: string[];
    budget: string;
}

// This service makes a secure call to our Supabase Edge Function.
export const generateBriefFromApi = async (payload: GenerationPayload): Promise<BriefData> => {
    console.log("Invoking secure Supabase Edge Function 'generate-brief' with payload:", payload);

    const { data, error } = await supabase.functions.invoke('generate-brief', {
        body: payload,
    });

    if (error) {
        console.error("Error invoking Supabase function:", error);
        throw new Error(`Failed to generate brief: ${error.message}`);
    }
    
    // The function returns the full new brief object from the DB.
    // We just need to return the brief_data part to the UI for the review screen.
    if (!data || !data.brief_data) {
        throw new Error("Invalid response from Edge Function.");
    }

    return data.brief_data as BriefData;
};