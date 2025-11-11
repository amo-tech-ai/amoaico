
export type Page = '/' | '/services' | '/process' | '/projects' | '/about' | '/contact' | '/ai-brief' | 
            '/services/web-applications' | '/services/social-media' | '/services/ecommerce' | '/services/whatsapp-automation' |
            '/tech-stack' | '/resources' | '/privacy-policy' | '/terms-of-service';

export interface NavLink {
  href: Page | '/services' | '/'; // Allow for more generic paths
  label: string;
}

export interface Brief {
    overview: string;
    key_goals: string[];
    suggested_deliverables: string[];
    brand_tone: string;
    budget_band: string;
    website_summary_points: string[];
}