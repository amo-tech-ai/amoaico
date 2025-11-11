import { Brief } from '../types';

// Mock brief data service
// In a real app, this would fetch data from Supabase
const mockBriefs: Brief[] = [
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
    {
        id: '3',
        company_name: 'Connecta',
        project_type: 'WhatsApp AI Assistant',
        status: 'draft',
        created_at: '2024-08-20T18:45:00Z',
        overview: 'A 24/7 AI assistant for customer support on WhatsApp.',
        key_goals: ['Reduce support tickets by 40%', 'Improve customer satisfaction'],
        suggested_deliverables: ['FAQ chatbot', 'Live agent handoff system'],
        brand_tone: 'Friendly and helpful',
        budget_band: '$10k - $25k',
        website_summary_points: ['Provides instant support solutions', 'Integrates with existing CRMs'],
    },
];

export const getBriefsForUser = (userId: string): Promise<Brief[]> => {
    console.log(`Fetching briefs for user ${userId}...`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockBriefs);
        }, 1000); // Simulate network delay
    });
};
