import { Brief } from '../types';

const STORAGE_KEY = 'sunai_user_briefs';

// Mock data to initialize if local storage is empty
const initialMockBriefs: Brief[] = [
    {
        id: '1',
        company_name: 'Innovate Inc.',
        project_type: 'AI Web Application',
        status: 'submitted',
        created_at: '2024-08-15T14:30:00Z',
        overview: 'A platform to streamline product design workflows using AI.',
        key_goals: ['Reduce design time by 50%', 'Improve collaboration'],
        suggested_deliverables: ['AI-powered wireframing tool', 'Real-time feedback system'],
        brand_tone: 'Innovative and professional',
        budget_band: '$50k - $75k',
        website_summary_points: ['Leader in design automation', 'Trusted by Fortune 500 companies'],
    },
    {
        id: '2',
        company_name: 'MarketBoost',
        project_type: 'Social Media Automation',
        status: 'in-review',
        created_at: '2024-08-18T10:00:00Z',
        overview: 'An AI tool to automate social media content creation and scheduling.',
        key_goals: ['Increase engagement by 30%', 'Save 10 hours/week on content'],
        suggested_deliverables: ['AI content generator', 'Automated posting schedule'],
        brand_tone: 'Bold and engaging',
        budget_band: '$25k - $50k',
        website_summary_points: ['Specializes in B2B marketing', 'Proven results for SaaS companies'],
    },
];

// Helper to get all briefs from localStorage
const getAllBriefs = (): Brief[] => {
    try {
        const storedBriefs = localStorage.getItem(STORAGE_KEY);
        if (storedBriefs) {
            return JSON.parse(storedBriefs);
        } else {
            // If nothing is stored, initialize with mock data
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockBriefs));
            return initialMockBriefs;
        }
    } catch (error) {
        console.error("Failed to parse briefs from localStorage", error);
        return initialMockBriefs;
    }
};

// Helper to save all briefs to localStorage
const saveAllBriefs = (briefs: Brief[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(briefs));
    } catch (error) {
        console.error("Failed to save briefs to localStorage", error);
    }
};

// Public API: Get all briefs
export const getBriefsForUser = (userId: string): Promise<Brief[]> => {
    console.log(`Fetching briefs for user ${userId} from localStorage...`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getAllBriefs());
        }, 500); // Simulate network delay
    });
};

// Public API: Save a new brief
export const saveBrief = (newBriefData: Omit<Brief, 'id' | 'created_at'>): Promise<Brief> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const currentBriefs = getAllBriefs();
            const newBrief: Brief = {
                ...newBriefData,
                id: Math.random().toString(36).substring(2, 9), // Simple unique ID
                created_at: new Date().toISOString(),
            };
            const updatedBriefs = [newBrief, ...currentBriefs];
            saveAllBriefs(updatedBriefs);
            resolve(newBrief);
        }, 200);
    });
};