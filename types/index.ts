export type Page = '/' | '/services' | '/process' | '/projects' | '/about' | '/contact' | '/ai-brief' | 
            '/services/web-applications' | '/services/social-media' | '/services/ecommerce' | '/services/whatsapp-automation' |
            '/tech-stack' | '/resources' | '/privacy-policy' | '/terms-of-service' | '/dashboard';

export interface NavLink {
  href: Page | '/services' | '/'; // Allow for more generic paths
  label: string;
}

export interface BriefData {
    overview: string;
    key_goals: string[];
    suggested_deliverables: string[];
    brand_tone: string;
    budget_band: string;
    website_summary_points: string[];
}

export interface Brief extends BriefData {
    id: string;
    company_name: string;
    project_type: string;
    status: 'draft' | 'submitted' | 'in-review' | 'approved' | 'rejected';
    created_at: string;
    user?: {
      id: string;
      full_name: string;
      email: string;
    }
}

export type Project = Brief;

export interface User {
    id: string;
    fullName: string;
    avatarUrl?: string;
    role?: string;
}

// Type for a single project story/case study
export interface ProjectStory {
    id: string;
    name: string;
    industry: string;
    subtitle: string;
    challenge: string;
    solution: string;
    metrics: { value: string; unit: string; label: string; prefix?: string; }[];
    techStack: string[];
    testimonial: { quote: string; author: string; title: string; };
}

// --- NEW TYPES FOR DASHBOARD PAGES ---

export interface Client {
    company_name: string;
    project_count: number;
}

export interface FinancialSummary {
    totalRevenue: number;
    netProfit: number;
    outstandingInvoices: number;
    expenses: number;
}

export interface Invoice {
    id: string;
    clientName: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    dueDate: string;
}
