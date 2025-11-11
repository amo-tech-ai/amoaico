import { BriefData } from '../types';

interface GenerationPayload {
    companyName: string;
    websiteUrl: string;
    projectType: string;
    selectedGoals: string[];
    budget: string;
}

// This service simulates a secure call to a backend Edge Function.
// The actual Gemini API call would happen there, not on the client.
export const generateBriefFromApi = async (
    payload: GenerationPayload
): Promise<BriefData> => {
    console.log("Simulating secure API call to backend for brief generation with payload:", payload);
    
    // Simulate network delay of a real AI call
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Simulate potential failure
    if (payload.companyName.toLowerCase().includes('fail')) {
         throw new Error("Simulated API error: The company name triggered a failure condition.");
    }

    // Return a mock response that matches the expected schema and incorporates user input
    const mockResponse: BriefData = {
        overview: `This is a generated overview for ${payload.companyName}. Based on their website, they appear to be a key player in their industry, focusing on innovative solutions.`,
        key_goals: payload.selectedGoals,
        suggested_deliverables: [
            `A new ${payload.projectType} to address the goal of "${payload.selectedGoals[0]}"`,
            "An integrated analytics dashboard.",
            "A comprehensive user onboarding flow."
        ],
        brand_tone: "Professional, innovative, and customer-focused",
        budget_band: payload.budget,
        website_summary_points: [
            "Highlights a strong value proposition on their homepage.",
            "Features several positive customer testimonials.",
            "Clearly outlines their primary services or products."
        ]
    };

    return mockResponse;
};