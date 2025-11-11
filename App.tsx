
import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

// --- TYPE DEFINITIONS ---
type Page = 'home' | 'services' | 'process' | 'projects' | 'about' | 'contact' | 'ai-brief' | 
            'services/web-applications' | 'services/social-media' | 'services/ecommerce' | 'services/whatsapp-automation' |
            'tech-stack' | 'resources' | 'privacy-policy' | 'terms-of-service';

interface NavLink {
  href: Page;
  label: string;
}

interface Brief {
    overview: string;
    key_goals: string[];
    suggested_deliverables: string[];
    brand_tone: string;
    budget_band: string;
    website_summary_points: string[];
}


// --- SVG ICON COMPONENTS ---
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 6 9 17l-5-5"/></svg>
);
const BotIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M18 14v-4.5a2.5 2.5 0 0 0-5 0V14"/><path d="M18 14v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z"/><path d="M9.5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/></svg>
);
const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const Share2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);
const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const DatabaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 9 0 0 0 18 0V5"/><path d="M3 12a9 9 0 0 0 18 0"/></svg>
);
const MessageCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
);
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const PencilRulerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 5 4 4"/><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2 2"/><path d="M17 11 9 3"/><path d="M22 12c-2 2-7 7-7 7s-5-5-7-7c-2-2-2-5 0-7 2-2 5-2 7 0 2 2 2 5 0 7Z"/><path d="M16 16c.5.5 1.5 1.5 1.5 1.5"/><path d="M19 13c.5.5 1.5 1.5 1.5 1.5"/></svg>
);
const FlaskConicalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 2v7.31"/><path d="M14 9.31V2"/><path d="M8.5 2h7"/><path d="M14 9.31 5.5 22h13L14 9.31Z"/><path d="M9.5 13h5"/></svg>
);
const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.11.63-1.4 1.3-3.13 1.9-4.75.63-1.65 1.46-3.4 2.8-4.5.5-.42 1.1-.7 1.7-.7.9-.1 1.7.6 2.5 1.4.8.8 1.5 1.6 1.4 2.5.1.6-.2 1.2-.7 1.7-1.1 1.34-2.85 2.87-4.5 2.8-1.62-.63-3.35-1.27-4.75-1.9-1.3-.6-2.6-1.1-3.1-1.1z"/><path d="m12 12-1.5 1.5"/><path d="M11 13 9 15"/><path d="M16 8 18 6"/><path d="M13.5 10.5 15 9"/></svg>
);
const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.5 7c.2.2.3.4.4.6.2.4.3.8.3 1.2 0 .3 0 .6-.1.9-.1.3-.2.6-.4.8s-.4.4-.7.6a2.1 2.1 0 0 1-2.2-.2c-.3-.2-.5-.5-.7-.8s-.3-.7-.3-1.1.1-.8.2-1.2c.2-.4.4-.8.7-1.1.3-.3.7-.6 1.1-.8.5-.2 1-.2 1.5.1s.9.6 1.2 1Z"/><path d="M14.5 16a2.1 2.1 0 0 1-1.2 1 2.1 2.1 0 0 1-2.3-.2c-.3-.2-.5-.5-.7-.8s-.3-.7-.3-1.1.1-.8.2-1.2c.2-.4.4-.8.7-1.1.3-.3.7-.6 1.1-.8.5-.2 1-.2 1.5.1s.9.6 1.2 1c.2.2.3.4.4.6.2.4.3.8.3 1.2 0 .3 0 .6-.1.9-.1.3-.2.6-.4.8a2.1 2.1 0 0 1-.7.6Z"/><path d="M12 12v-2h-.5"/><path d="M12 12h-2"/><path d="M12 18v-2h-.5"/><path d="M12 18h-2"/><path d="M12 6V4h-.5"/><path d="M12 6h-2"/><path d="m15 9-.5-1"/><path d="m14 9-1.5-1"/><path d="m9 15 .5 1"/><path d="m10 15 1.5 1"/><path d="m5 12-1-.5"/><path d="m5 12-1 1.5"/><path d="m19 12 1 .5"/><path d="m19 12 1-1.5"/><path d="M12 20a8 8 0 0 0 8-8"/><path d="M4 12a8 8 0 0 0 8 8"/></svg>
);
const UserCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);
const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
);
const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);


const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
);

// --- WhatsApp Page Icons ---
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="M14.05 2.9A10.37 10.37 0 0 1 21.1 10M14.05 6.4A6.37 6.37 0 0 1 17.6 10"/></svg>
);
const CrmIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 12h.01"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M16 6a4 4 0 0 0-8 0"/><path d="M16 18a4 4 0 0 1-8 0"/></svg>
);
const ShoppingCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);
const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);
const ArrowDownRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m7 7 10 10"/><path d="M17 7v10H7"/></svg>
);
const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 17V7h10"/><path d="M7 7l10 10"/></svg>
);

// --- DATA CONSTANTS ---
const NAV_LINKS: NavLink[] = [
    { href: "home", label: "Home" },
    { href: "services", label: "Services" },
    { href: "process", label: "Process" },
    { href: "projects", label: "Projects" },
    { href: "tech-stack", label: "Tech Stack" },
    { href: "resources", label: "Resources" },
    { href: "about", label: "About" },
    { href: "contact", label: "Contact" },
];

const HOME_CORE_SERVICES = [
    { icon: <CodeIcon />, title: "AI Web Development", description: "From prompt to production-ready websites in record time." },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>, title: "AI App Development", description: "Intelligent, scalable mobile applications that learn and adapt." },
    { icon: <Share2Icon />, title: "Social Media Automation", description: "Automated content creation, scheduling, and engagement." },
    { icon: <MessageCircleIcon />, title: "WhatsApp AI Assistant", description: "24/7 customer support and sales on the world's most popular messaging app." }
];

const HOME_PROCESS_STEPS = [
    { title: "Design Sprint", description: "Collaborative sessions to define goals, user flows, and architecture." },
    { title: "Rapid Build", description: "AI-assisted development for accelerated frontend and backend creation." },
    { title: "Integration & Testing", description: "Connecting APIs, databases, and third-party services with rigorous QA." },
    { title: "Launch & Scale", description: "Deploying to Vercel with ongoing monitoring and performance optimization." }
];

const HOME_RESULT_METRICS = [
    { value: "<2", unit: "min", label: "Response Time" },
    { value: "<5", unit: "%", label: "Missed Leads" },
    { value: "+216", unit: "%", label: "Conversion" },
    { value: "9.4", unit: "/10", label: "Satisfaction" }
];

const INVESTMENT_LEVELS = [
    { name: "MVP", price: "$10k - $25k", features: ["1 Core Feature", "Basic UI/UX", "3-Week Delivery", "Community Support"], recommended: false },
    { name: "Production Ready", price: "$25k - $75k", features: ["Up to 3 Core Features", "Custom UI/UX Design", "8-Week Delivery", "Dedicated Support"], recommended: true },
    { name: "Enterprise", price: "$75k+", features: ["Unlimited Features", "Advanced AI Models", "Continuous Delivery", "24/7 Enterprise Support"], recommended: false }
];

// Process Page Data
const PROCESS_TIMELINE_STEPS = [
    { phase: "01", title: "Discovery", summary: "Define goals", icon: <PencilRulerIcon className="w-6 h-6"/> },
    { phase: "02", title: "Design Sprint", summary: "Wireframe & prototype", icon: <PencilRulerIcon className="w-6 h-6"/> },
    { phase: "03", title: "Frontend Build", summary: "UI development", icon: <CodeIcon className="w-6 h-6"/> },
    { phase: "04", title: "Backend Build", summary: "API & database", icon: <DatabaseIcon className="w-6 h-6"/> },
    { phase: "05", title: "Integration", summary: "Connect systems", icon: <ZapIcon className="w-6 h-6"/> },
    { phase: "06", title: "Testing", summary: "QA & feedback", icon: <FlaskConicalIcon className="w-6 h-6"/> },
    { phase: "07", title: "Pre-Launch", summary: "Final review", icon: <CheckCircleIcon className="w-6 h-6"/> },
    { phase: "08", title: "Launch", summary: "Deploy & monitor", icon: <RocketIcon className="w-6 h-6"/> }
];

const PROCESS_PHASES = [
    { title: "Design Sprint", weeks: "Week 1-2", points: ["Goal definition & strategy workshops", "User flow & architecture mapping", "Interactive wireframing", "High-fidelity UI prototyping"] },
    { title: "Rapid Build", weeks: "Week 3-4", points: ["AI-assisted frontend development", "Headless CMS & API setup", "Backend logic and database schema", "Initial component library creation"] },
    { title: "Testing & Integration", weeks: "Week 5-6", points: ["Third-party API integrations", "End-to-end testing cycles", "User acceptance testing (UAT)", "Performance & security audits"] },
    { title: "Launch & Scale", weeks: "Week 7-8", points: ["Vercel/Supabase deployment", "CDN & caching configuration", "Live monitoring and analytics setup", "Post-launch support & handover"] }
];

const PROCESS_COMPARISON = {
    sixMonths: ["Lengthy discovery phases", "Slow, manual coding", "Siloed teams, delayed feedback", "Risk of scope creep"],
    eightWeeks: ["Agile, focused sprints", "AI-accelerated development", "Transparent, weekly check-ins", "Fixed scope, predictable delivery"]
};

const PROCESS_METRICS = [
    { value: "47", label: "Projects Completed" },
    { value: "8.2", label: "Avg. Weeks to Launch", decimals: 1 },
    { value: "9.4", label: "Avg. Satisfaction", unit: "/ 10", decimals: 1 },
    { value: "293", label: "Avg. Client ROI", unit: "%" }
];

const PROCESS_CALCULATOR_OPTIONS = [
    { name: "Website", time: "8 Weeks" },
    { name: "Automation", time: "6 Weeks" },
    { name: "App", time: "10 Weeks" },
];

// Projects Page Data
const PROJECTS_DATA = [
  {
    name: 'FashionOS',
    subtitle: 'From 3 Days to 3 Minutes',
    industry: 'Fashion & Events',
    duration: '8 weeks',
    challenge: 'Fashion Week Global struggled with a complex 3-day event setup process requiring 190+ staff members with a 1.2% error rate.',
    solution: 'Built FashionOS, a comprehensive AI-powered event management platform automating 90% of coordination between designers, models, venues, and sponsors.',
    metrics: [
      { value: '97%', label: 'Time Reduction', icon: <ClockIcon className="w-5 h-5" /> },
      { value: '$406K', label: 'Cost Savings', icon: <DollarSignIcon className="w-5 h-5" /> },
      { value: '300%', label: 'ROI', icon: <TrendingUpIcon className="w-5 h-5" /> },
    ],
    technologies: ['React', 'Next.js', 'Supabase', 'CrewAI', 'WhatsApp API', 'Stripe'],
    testimonial: {
      quote: "AMO AI transformed our entire operation. What used to take us 3 days and 190 people now happens in 3 minutes with complete accuracy.",
      author: 'David Kim',
      title: 'Operations Director'
    },
    image: 'FashionOS screenshot',
    roiBadge: '300% ROI'
  },
  {
    name: 'AutoMax AI',
    subtitle: '$4.3M Monthly GMV Marketplace',
    industry: 'Automotive',
    duration: '12 weeks',
    challenge: 'Needed to connect 500 dealers with a unified platform handling 50,000+ vehicle listings while providing intelligent search capabilities.',
    solution: 'Developed a comprehensive AI marketplace with advanced search algorithms, real-time inventory sync, and ML-powered recommendations.',
     metrics: [
      { value: '$4.3M', label: 'Monthly GMV', icon: <DollarSignIcon className="w-5 h-5" /> },
      { value: '500+', label: 'Dealers Connected', icon: <Share2Icon className="w-5 h-5" /> },
      { value: '95%', label: 'Search Accuracy', icon: <CheckCircleIcon className="w-5 h-5" /> },
    ],
    technologies: ['React', 'Next.js', 'Supabase', 'OpenAI', 'Elasticsearch', 'Stripe Connect'],
    testimonial: {
      quote: "The AI-powered search and recommendations completely transformed how our customers find vehicles. Conversion rates increased 60%.",
      author: 'Robert Wilson',
      title: 'VP of Technology'
    },
    image: 'AutoMax AI screenshot',
    roiBadge: '95% ROI'
  },
];

const TECH_STACK_CATEGORIES = [
    {
        title: "Frontend & Development",
        technologies: ["Vite", "React", "Tailwind", "Mantine"],
    },
    {
        title: "AI & Orchestration",
        technologies: ["CopilotKit", "CrewAI", "LangGraph", "Tavily"],
    },
    {
        title: "Integration & Automation",
        technologies: ["Supabase Functions", "n8n", "WhatsApp API"],
    },
    {
        title: "Infrastructure",
        technologies: ["Supabase", "Stripe", "GitHub", "Cloudinary"],
    },
];

const PROJECTS_METRICS = [
    { value: "47+", label: "Projects Delivered" },
    { value: "8.2", label: "Weeks Average Delivery Time" },
    { value: "94%", label: "On-Time Delivery" },
    { value: "293%", label: "ROI Average" }
];

// Services Page Data
const SERVICES_SUMMARY_FEATURES = [
    { icon: <MessageCircleIcon className="w-6 h-6" />, title: 'AI Chat Interfaces', description: 'Conversational copilots in dashboards' },
    { icon: <ZapIcon className="w-6 h-6" />, title: 'Predictive Automation', description: 'Data-driven next-best-action triggers' },
    { icon: <UserCheckIcon className="w-6 h-6" />, title: 'Personalized Journeys', description: 'Adaptive UI responding to user behavior' },
    { icon: <BarChartIcon className="w-6 h-6" />, title: 'Real-Time Analytics', description: 'Auto-generated insights' }
];

const AI_AGENTS_FEATURES = [
    "Conversational AI Agents (CopilotKit Actions)",
    "Crew AI Multi-Agent Teams",
    "LangGraph Context & Memory",
    "n8n Workflow Bridges"
];

const USE_CASES_PLATFORMS = [
    { platform: 'WhatsApp', useCase: 'Lead capture + AI follow-ups', result: '+42% engagement' },
    { platform: 'Instagram', useCase: 'Auto-captions + scheduling', result: '3× faster campaigns' },
    { platform: 'Facebook', useCase: 'Ad budget optimization', result: '–25% CPL' },
    { platform: 'TikTok', useCase: 'Trend detection + video edits', result: '+55% view duration' }
];

const ADDITIONAL_SERVICES = [
    { title: "Web Design", subtitle: "Design that Thinks.", description: "Minimal, accessible, responsive designs.", cta: "Explore Design →" },
    { title: "AI Social Media Marketing", subtitle: "Create Smarter. Post Faster.", description: "Automated content generation, captioning, scheduling.", cta: "See AI Marketing →" },
    { title: "E-Commerce Solutions", subtitle: "Shop with Intelligence.", description: "Dynamic pricing, AI recommendations, chat commerce.", cta: "Discover AI Commerce →" }
];

// WhatsApp Automation Page Data
const WHATSAPP_METRICS = [
    { value: '98%', label: 'Open Rate', subtext: 'vs 20% for email - your messages actually get seen' },
    { value: '70%', label: 'Response Rate', subtext: 'Customers engage instantly with automated conversations' },
    { value: '5-10x', label: 'ROI Potential', subtext: 'From automated sales, support, and customer retention' },
];

const WHATSAPP_CORE_SERVICES = [
    { icon: <WhatsAppIcon />, title: 'WhatsApp Automation Setup', subtitle: 'Conversations that run themselves.', points: ['Auto-replies', 'Lead capture', 'Payment & order updates', 'Multi-language flows'] },
    { icon: <BotIcon />, title: 'AI Chat Agents & Copilots', subtitle: 'Your 24/7 sales and support team.', points: ['Conversational memory', 'Smart human handoff', 'Personalized tone', 'Analytics dashboard'] },
    { icon: <CrmIcon />, title: 'CRM & Pipeline Integration', subtitle: 'Every chat becomes a lead.', points: ['Lead syncing', 'Follow-up automations', 'Deal tracking', 'Performance reports'] },
    { icon: <MessageCircleIcon />, title: 'WhatsApp Marketing Campaigns', subtitle: 'Broadcast messages that get read.', points: ['Broadcast scheduling', 'Segmentation', 'Catalog cards', 'Real-time engagement tracking'] },
    { icon: <ShoppingCartIcon />, title: 'E-commerce & Payment Flows', subtitle: 'From chat to checkout in seconds.', points: ['Shopify / Stripe integration', 'Abandoned cart recovery', 'Order updates', 'Upsell automations'] },
    { icon: <GlobeIcon />, title: 'Industry Solutions', subtitle: 'Tailored automation for every sector.', points: ['Booking & reservation bots', 'Menu & catalog sharing', 'Feedback & surveys', 'Event registration'] },
];

const WHATSAPP_USE_CASES = [
    { icon: <UserCheckIcon />, title: 'Lead Generation Flow', steps: ['Ad → WhatsApp chat → AI qualifies lead → CRM sync → Auto follow-up → Payment link → Confirmation'] },
    { icon: <ShoppingCartIcon />, title: 'E-commerce Flow', steps: ['Customer chats → Browse catalog → Adds to cart → Pays in-chat → Receives updates'] },
    { icon: <CheckCircleIcon />, title: 'Service Booking Flow', steps: ['Client messages → AI confirms slot → Invoice sent → Booking recorded → CRM updated'] },
];

const WHATSAPP_RESULTS = [
    { before: '2 hours', after: '< 2 minutes', label: 'Response time', improved: true },
    { before: '40%', after: '< 5%', label: 'Missed leads', improved: true },
    { before: '12%', after: '38%', label: 'Conversion rate', improved: true },
    { before: '7 / 10', after: '9.4 / 10', label: 'Customer satisfaction', improved: true },
];

const WHATSAPP_PROCESS = [
    { step: 1, title: 'Discovery Call', subtitle: 'Understand Your Goals', description: 'A short consultation to map your communication needs, pain points, and automation potential.' },
    { step: 2, title: 'Workflow Blueprint', subtitle: 'Design Your Automation Flow', description: 'Our experts design a custom WhatsApp journey — from first message to sale or booking.' },
    { step: 3, title: 'Development & Integration', subtitle: 'Build and Connect Everything', description: 'We integrate with your CRM, Supabase, n8n, and any payment gateway you use.' },
    { step: 4, title: 'AI Training & Testing', subtitle: 'Train Your Chat Agents', description: 'We teach your Copilot to answer real customer questions, qualify leads, and adapt over time.' },
    { step: 5, title: 'Launch & Optimize', subtitle: 'Go Live & Measure Results', description: 'Once launched, we monitor performance, tweak flows, and report conversions every week.' },
];

const WHATSAPP_TECHNOLOGIES = ['Supabase', 'n8n', 'CopilotKit', 'CrewAI', 'LangChain', 'Stripe', 'Cloudinary', 'Webflow'];

const WHATSAPP_FAQ = [
    { q: 'Do you use the official WhatsApp Business API?', a: 'Yes, we only use the official WhatsApp Business API to ensure reliability, security, and access to all features.' },
    { q: 'Can I integrate WhatsApp with my CRM or database?', a: 'Absolutely. We specialize in integrating WhatsApp with CRMs like HubSpot, Salesforce, and custom databases via Supabase or other platforms.' },
    { q: 'Is this AI or just a bot?', a: 'We use advanced AI agents, not simple rule-based bots. Our systems understand context, have memory, and can handle complex conversations, including handing off to a human when necessary.' },
    { q: 'How long does setup take?', a: 'A standard setup can be launched in as little as 2 weeks, including discovery, development, and testing.' },
];

// Tech Stack Page Data
const TECH_STACK_WHY_FEATURES = [
    { icon: <TrendingUpIcon className="w-6 h-6"/>, title: "Enterprise-grade scalability & reliability" },
    { icon: <BrainCircuitIcon className="w-6 h-6"/>, title: "Context-aware agents & dynamic UI" },
    { icon: <RocketIcon className="w-6 h-6" strokeWidth="2"/>, title: "Fast go-to-market (weeks, not months)" },
    { icon: <Share2Icon className="w-6 h-6"/>, title: "Transparent, traceable workflows" },
];

const TECH_STACK_CORE_FRAMEWORKS = [
    { title: "CopilotKit", tagline: "Embed intelligent copilots in your UI.", copy: "CopilotKit enables contextual assistants, UI components and workflow triggers that live inside your app." },
    { title: "LangGraph", tagline: "Stateful agents. Complex workflows.", copy: "LangGraph empowers multi-step, multi-agent workflows with full memory and branching logic." },
    { title: "Crew AI", tagline: "Multi-agent teams working together.", copy: "Crew AI orchestrates agent groups with roles and tools, coordinating collaboration amongst agents." },
    { title: "Supabase", tagline: "Backend that just works.", copy: "Supabase handles your auth, database, realtime updates and storage — so you focus on value, not infrastructure." },
    { title: "OpenAI / Claude SDK", tagline: "The generative intelligence core.", copy: "We use OpenAI and Claude SDKs to power reasoning, generation, and natural-language workflows." },
];

const TECH_STACK_ADDITIONAL_TOOLS = ["Stripe", "n8n", "Webflow / Lovable", "AWS / Cloudflare", "Vercel", "GitHub"];

const TECH_STACK_USE_CASES = [
    { title: "Agent-enabled CRM", description: "Built with CopilotKit + LangGraph; reduced time-to-value by 60%." },
    { title: "Social-media automation platform", description: "Crew AI + Supabase powering 500k users/month." },
    { title: "E-commerce recommendation engine", description: "OpenAI + Supabase driving +28% conversion." },
];

const TECH_STACK_FAQ = [
    { q: "What frameworks do you support?", a: "Our core stack includes CopilotKit, LangGraph, Crew AI, and Supabase. However, we are flexible and can integrate with any modern framework or API to meet your project's specific needs." },
    { q: "Can you integrate with our existing data stack?", a: "Yes. We specialize in creating seamless integrations with existing databases, CRMs, and internal tools. Our process includes a thorough discovery phase to map out all necessary data connections." },
    { q: "How do you maintain security & compliance?", a: "Security is paramount. We leverage Supabase's enterprise-grade security features, including row-level security and JWT-based authentication. All code undergoes security audits, and we follow best practices for data handling and compliance." },
    { q: "What’s the timeline for stack deployment?", a: "Our 8-week process includes full stack deployment. A basic infrastructure can be up in the first two weeks, with continuous deployment and integration throughout the project lifecycle." },
];


// --- ANIMATION HOOK & COMPONENTS ---
const useOnScreen = (ref: React.RefObject<HTMLElement>, options: IntersectionObserverInit & { triggerOnce?: boolean } = {}) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;
        
        const { triggerOnce, ...observerOptions } = options;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIntersecting(true);
                if (triggerOnce) {
                    observer.unobserve(currentRef);
                }
            }
        }, observerOptions);
        observer.observe(currentRef);
        return () => { if(currentRef) observer.unobserve(currentRef) };
    }, [ref, options]);
    return isIntersecting;
};

interface AnimatedElementProps {
    children?: React.ReactNode;
    className?: string;
    delay?: number;
}
const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className = '', delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(ref, { threshold: 0.1, triggerOnce: true });
    return (
        <div ref={ref} className={`${className} transition-all duration-700 ease-out ${onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

const Counter: React.FC<{
    endValue: number;
    duration?: number;
    decimals?: number;
}> = ({ endValue, duration = 2000, decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const onScreen = useOnScreen(ref);

    useEffect(() => {
        if (onScreen) {
            let startTime: number | null = null;
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
                const currentCount = easedProgress * endValue;
                setCount(currentCount);
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(endValue);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [onScreen, endValue, duration]);

    return <span ref={ref}>{count.toFixed(decimals)}</span>;
};

// --- SHARED UI COMPONENTS ---
interface SectionContainerProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    contained?: boolean;
}
const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(({ children, className = '', id = '', contained = true }, ref) => {
    const content = <>{children}</>;
    return (
        <section id={id} ref={ref} className={`w-full py-20 md:py-28 overflow-hidden ${className}`}>
            {contained ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {content}
                </div>
            ) : content}
        </section>
    );
});
SectionContainer.displayName = 'SectionContainer';


const Header = ({ onNavigate, currentPage, onStartWizard }: { onNavigate: (page: Page) => void; currentPage: Page; onStartWizard: () => void; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        onNavigate(page);
        setIsOpen(false);
        setServicesOpen(false);
    };

    const isServicePage = currentPage.startsWith('services');

    return (
        <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/80' : 'bg-white'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2">
                        <span className="text-xl font-semibold font-poppins text-[#0F172A]">AMO AI</span>
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map(link => {
                            if (link.href === 'services') {
                                return (
                                    <div key={link.label} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                                        <a href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} 
                                           className={`flex items-center gap-1 text-sm font-medium transition-colors ${isServicePage ? 'text-[#0F172A]' : 'text-gray-500 hover:text-[#0F172A]'}`}>
                                            {link.label} <ChevronDownIcon className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                                        </a>
                                        {servicesOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                                                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Services</a>
                                                <a href="#services/web-applications" onClick={(e) => handleNavClick(e, 'services/web-applications')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Web Applications</a>
                                                <a href="#services/social-media" onClick={(e) => handleNavClick(e, 'services/social-media')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AI Social Media</a>
                                                <a href="#services/ecommerce" onClick={(e) => handleNavClick(e, 'services/ecommerce')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">E-Commerce Solutions</a>
                                                <a href="#services/whatsapp-automation" onClick={(e) => handleNavClick(e, 'services/whatsapp-automation')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">WhatsApp Automation</a>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return <a key={link.label} href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className={`text-sm font-medium transition-colors ${currentPage === link.href ? 'text-[#0F172A]' : 'text-gray-500 hover:text-[#0F172A]'}`}>{link.label}</a>
                        })}
                    </div>
                    <div className="hidden md:block">
                        <button onClick={onStartWizard} className="px-5 py-2.5 rounded-lg font-medium text-sm bg-[#F97316] text-white transition-transform transform hover:scale-105">Start Your AI Brief</button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            {isOpen ? <XIcon className="w-6 h-6 text-[#0F172A]" /> : <MenuIcon className="w-6 h-6 text-[#0F172A]" />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
                        <div className="flex flex-col space-y-4">
                            {NAV_LINKS.map(link => {
                                if (link.href === 'services') {
                                    return (
                                        <div key={link.label}>
                                            <a href={`#${link.href}`} className="text-[#0F172A] hover:text-[#F97316] transition-colors block" onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
                                            <div className="pl-4 mt-2 space-y-2">
                                                <a href="#services/web-applications" className="text-gray-600 hover:text-[#F97316] transition-colors block" onClick={(e) => handleNavClick(e, 'services/web-applications')}>- Web Applications</a>
                                                <a href="#services/social-media" className="text-gray-600 hover:text-[#F97316] transition-colors block" onClick={(e) => handleNavClick(e, 'services/social-media')}>- AI Social Media</a>
                                                <a href="#services/ecommerce" className="text-gray-600 hover:text-[#F97316] transition-colors block" onClick={(e) => handleNavClick(e, 'services/ecommerce')}>- E-Commerce Solutions</a>
                                                <a href="#services/whatsapp-automation" className="text-gray-600 hover:text-[#F97316] transition-colors block" onClick={(e) => handleNavClick(e, 'services/whatsapp-automation')}>- WhatsApp Automation</a>
                                            </div>
                                        </div>
                                    )
                                }
                                return <a key={link.label} href={`#${link.href}`} className="text-[#0F172A] hover:text-[#F97316] transition-colors block" onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
                            })}
                            <button onClick={() => { onStartWizard(); setIsOpen(false); }} className="w-full px-5 py-2.5 rounded-lg font-medium text-sm bg-[#F97316] text-white">Start Your AI Brief</button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

const Footer = ({ onNavigate, onStartWizard }: { onNavigate: (page: Page) => void; onStartWizard: () => void; }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        onNavigate(page);
    };

    return (
        <>
            <SectionContainer className="bg-white border-t border-gray-200">
                <div className="text-center max-w-2xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#00334F]">Ready to Build Your AI Vision?</h2>
                        <p className="mt-4 text-lg text-[#0F172A]/80 max-w-2xl mx-auto">Use our AI Brief Generator to scope your project in minutes. It's fast, free, and the first step to production.</p>
                        <div className="mt-8">
                            <button
                                onClick={onStartWizard}
                                className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105 inline-flex items-center gap-2"
                            >
                                <BotIcon className="w-5 h-5" /> Start Your AI Brief
                            </button>
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>
            <footer className="bg-[#00334F] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-3">
                            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2">
                                <span className="text-xl font-semibold font-poppins">AMO AI</span>
                            </a>
                            <p className="mt-4 text-gray-300 text-sm">Built by Intelligence, Measured by Results.</p>
                        </div>
                        <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Company</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    {['about', 'process', 'projects', 'contact'].map(p => <li key={p}><a href={`#${p}`} onClick={(e) => handleNavClick(e, p as Page)} className="text-gray-300 hover:text-white">{p.charAt(0).toUpperCase() + p.slice(1)}</a></li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Services</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li><a href="#services/web-applications" onClick={(e) => handleNavClick(e, 'services/web-applications')} className="text-gray-300 hover:text-white">Web Applications</a></li>
                                    <li><a href="#services/social-media" onClick={(e) => handleNavClick(e, 'services/social-media')} className="text-gray-300 hover:text-white">AI Social Media</a></li>
                                    <li><a href="#services/ecommerce" onClick={(e) => handleNavClick(e, 'services/ecommerce')} className="text-gray-300 hover:text-white">E-Commerce</a></li>
                                    <li><a href="#services/whatsapp-automation" onClick={(e) => handleNavClick(e, 'services/whatsapp-automation')} className="text-gray-300 hover:text-white">WhatsApp Automation</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Resources</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li><a href="#resources" onClick={(e) => handleNavClick(e, 'resources')} className="text-gray-300 hover:text-white">Blog</a></li>
                                    <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="text-gray-300 hover:text-white">Case Studies</a></li>
                                    <li><a href="#tech-stack" onClick={(e) => handleNavClick(e, 'tech-stack')} className="text-gray-300 hover:text-white">Tech Stack</a></li>
                                    <li><a href="#ai-brief" onClick={(e) => handleNavClick(e, 'ai-brief')} className="text-gray-300 hover:text-white">AI Brief</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Legal</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li><a href="#privacy-policy" onClick={(e) => handleNavClick(e, 'privacy-policy')} className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                                    <li><a href="#terms-of-service" onClick={(e) => handleNavClick(e, 'terms-of-service')} className="text-gray-300 hover:text-white">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} AMO AI — All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

// --- HOME PAGE ---
const HomePage = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    return (
        <main>
            {/* Hero Section */}
            <SectionContainer className="bg-white pt-16 md:pt-24 text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter leading-tight max-w-4xl mx-auto">
                        Turn Ideas Into <span className="text-[#F97316]">AI-Powered</span> Applications in Weeks
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Faster Launch. Smarter Automation. Measurable Growth. We build intelligent web and mobile apps that deliver results.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={onStartWizard} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105">Start Your AI Brief →</button>
                    <button className="px-8 py-3 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100 transition-all">See Live Projects</button>
                </AnimatedElement>
            </SectionContainer>
            
            {/* Core Services Section */}
            <SectionContainer className="bg-white pt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {HOME_CORE_SERVICES.map((service, index) => (
                        <AnimatedElement key={service.title} delay={100 * index}>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 h-full group transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                                <div className="w-12 h-12 flex items-center justify-center text-[#F97316]">{React.cloneElement(service.icon, { width: 32, height: 32 })}</div>
                                <h4 className="mt-4 text-lg font-semibold font-poppins text-[#00334F]">{service.title}</h4>
                                <p className="mt-1 text-[#0F172A]/80">{service.description}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* Tech Stack Section */}
            <SectionContainer className="bg-white">
                <div className="text-center">
                    <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">We Build With The Best</h2></AnimatedElement>
                    <AnimatedElement delay={100}>
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 max-w-4xl mx-auto">
                            {["CopilotKit", "LangChain", "Supabase", "OpenAI", "Vercel"].map(logo => (
                                <span key={logo} className="text-gray-500 text-lg font-semibold hover:text-gray-800 transition-colors">{logo}</span>
                            ))}
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>

            {/* Process Section */}
            <SectionContainer className="bg-slate-50">
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#0F172A]">From Brief to Production in 8 Weeks</h2></AnimatedElement>
                </div>
                <div className="mt-16 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-gray-200"></div>
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {HOME_PROCESS_STEPS.map((step, index) => (
                            <AnimatedElement key={step.title} delay={150 * index}>
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-[#F97316] text-white flex items-center justify-center text-xl font-bold mb-4">{index + 1}</div>
                                    <h3 className="font-semibold text-[#0F172A] font-poppins">{step.title}</h3>
                                    <p className="mt-1 text-gray-600 text-sm">{step.description}</p>
                                </div>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* Results Section */}
            <SectionContainer className="bg-white">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <AnimatedElement>
                            <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#00334F]">Results That Speak for Themselves</h2>
                        </AnimatedElement>
                        <AnimatedElement delay={100}>
                            <p className="mt-4 text-lg text-[#0F172A]/80">Our AI-driven approach doesn't just build apps faster—it builds them smarter, delivering tangible improvements to your key business metrics.</p>
                        </AnimatedElement>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        {HOME_RESULT_METRICS.map((metric, index) => (
                            <AnimatedElement key={metric.label} delay={150 * index} className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-lg">
                                <p className="text-4xl md:text-5xl font-bold font-poppins text-[#00334F]">
                                    <Counter endValue={parseFloat(metric.value.replace(/[<+]/g, ''))} decimals={metric.label === "Satisfaction" ? 1 : 0} />
                                    {metric.unit}
                                </p>
                                <p className="mt-2 text-[#0F172A]/80">{metric.label}</p>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* Investment Levels */}
            <SectionContainer className="bg-slate-50">
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#00334F]">Investment Levels</h2></AnimatedElement>
                 </div>
                 <div className="grid lg:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto items-center">
                    {INVESTMENT_LEVELS.map((level, i) => (
                        <AnimatedElement key={level.name} delay={100 * i} className={`p-8 rounded-2xl border ${level.recommended ? 'bg-[#00334F] text-white border-transparent shadow-2xl shadow-[#00334F]/20' : 'bg-white border-gray-200 shadow-lg'}`}>
                            {level.recommended && <div className="text-center mb-4"><span className="text-xs font-bold uppercase tracking-wider bg-[#F97316] text-white px-3 py-1 rounded-full">Recommended</span></div>}
                            <h3 className="text-2xl font-bold font-poppins text-center">{level.name}</h3>
                            <p className={`text-4xl font-bold font-poppins text-center my-4 ${level.recommended ? 'text-white' : 'text-[#00334F]'}`}>{level.price}</p>
                            <ul className="space-y-3 text-sm">
                                {level.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <CheckIcon className={`${level.recommended ? 'text-[#F97316]' : 'text-green-500'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedElement>
                    ))}
                 </div>
            </SectionContainer>
        </main>
    );
};

// --- AI WEB APPLICATIONS PAGE ---
const AiWebApplicationsPage = ({ onStartWizard, onNavigate }: { onStartWizard: () => void; onNavigate: (page: Page) => void; }) => {
    
    const WEB_APP_FEATURES = [
        { icon: <MessageCircleIcon className="w-8 h-8"/>, title: 'Natural-Language Interfaces', description: 'Intuitive, conversational UI for any workflow.' },
        { icon: <FileTextIcon className="w-8 h-8"/>, title: 'Retrieval-Augmented Apps (RAG)', description: 'Query your data with natural language.' },
        { icon: <UserCheckIcon className="w-8 h-8"/>, title: 'Personalization Engines', description: 'Adaptive user experiences that drive engagement.' },
        { icon: <BotIcon className="w-8 h-8"/>, title: 'AI Agents & Automations', description: 'Autonomous agents to execute complex tasks.' },
        { icon: <PencilRulerIcon className="w-8 h-8" strokeWidth="1.5"/>, title: 'AI Content Services', description: 'Generate, summarize, and moderate content at scale.' },
        { icon: <UsersIcon className="w-8 h-8"/>, title: 'CX Chatbots', description: 'Deflect support tickets and improve user satisfaction.' },
        { icon: <BrainCircuitIcon className="w-8 h-8"/>, title: 'Predictive & Decision Models', description: 'Forecast trends and inform strategic decisions.' },
    ];
    
    const WEB_APP_USE_CASES = [
        { title: "Sales & Marketing Copilots", metric: "+30% Lead Quality" },
        { title: "Support Deflection", metric: "-40% Ticket Volume" },
        { title: "Knowledge Ops", metric: "90% Faster Info Retrieval" },
        { title: "E-commerce Uplift", metric: "+15% Conversion Rate" },
        { title: "Risk & Finance", metric: "-25% Error Rate" },
    ];

    const WEB_APP_ROI = [
        { value: "72", unit: "%", label: "Adoption Rate" },
        { value: "1-4", unit: "mo", label: "Deployment Cycle" },
        { value: "45", unit: "%", label: "Productivity Gain", prefix: "+" },
    ];
    
    const WEB_APP_PATTERNS = [
        { title: "AI Help Center", description: "Instant, accurate answers from your knowledge base." },
        { title: "Proposal/Scope Builder", description: "Generate project scopes from client requirements." },
        { title: "AI Product Advisor", description: "Guide users to the right product with smart recommendations." },
        { title: "Ops Co-pilot", description: "Automate repetitive operational tasks with an AI assistant." },
    ];
    
    const WEB_APP_BLUEPRINT = [
        { step: "01", title: "Discovery & KPI", description: "Align on measurable business goals." },
        { step: "02", title: "Data & Permissions", description: "Securely connect and prep your data sources." },
        { step: "03", title: "Prototype (RAG/Agent)", description: "Build and test the core AI logic." },
        { step: "04", title: "Human-in-loop & Evals", description: "Refine responses with expert feedback." },
        { step: "05", title: "Hardening & Guardrails", description: "Implement security and reliability checks." },
        { step: "06", title: "Launch & A/B", description: "Deploy and optimize based on user data." },
    ];

    const WEB_APP_TOOL_STACK = [
        { name: "OpenAI API / Claude SDK", description: "State-of-the-art models for reasoning and generation." },
        { name: "LangChain / LangGraph", description: "Frameworks for building context-aware, stateful agents." },
        { name: "CopilotKit", description: "Embed AI copilots and agents directly into your application's UI." },
        { name: "Supabase", description: "The open-source backend for authentication, database, and storage." },
        { name: "Weaviate / Pinecone", description: "Vector databases for efficient similarity search in RAG." },
        { name: "Vercel / Next.js", description: "The modern framework for building performant web applications." },
    ];
    
    const WEB_APP_EXTRA_FEATURES = ["Agent Handoffs", "Citations & Sources", "Ask My Data Widgets", "Proactive Assistants"];

    const pageSections = [
        { id: 'features', title: 'What We Build' },
        { id: 'use-cases', title: 'Where It Pays' },
        { id: 'roi-snapshot', title: 'ROI Snapshot' },
        { id: 'patterns', title: 'Real-World Patterns' },
        { id: 'blueprint', title: 'Delivery Blueprint' },
        { id: 'tool-stack', title: 'Tool Stack' },
        { id: 'extra-features', title: 'Extra Features' },
        { id: 'architecture', title: 'Architecture' },
    ];

    const [activeSection, setActiveSection] = useState('');
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-25% 0px -75% 0px', threshold: 0.1 }
        );
    
        const currentRefs = sectionRefs.current;
        Object.values(currentRefs).forEach(ref => {
            if (ref) observer.observe(ref);
        });
    
        return () => {
            Object.values(currentRefs).forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[1fr_3.5fr] lg:gap-12">
                <aside className="hidden lg:block py-28">
                    <div className="sticky top-28">
                        <h3 className="font-semibold font-poppins text-sm text-[#00334F] mb-4">On this page</h3>
                        <nav>
                            <ul className="space-y-2">
                                {pageSections.map(section => (
                                    <li key={section.id}>
                                        <a href={`#${section.id}`} 
                                           onClick={(e) => handleAnchorClick(e, section.id)}
                                           aria-current={activeSection === section.id ? 'true' : 'false'}
                                           className={`block text-sm transition-all duration-200 border-l-2 pl-4 py-1 ${activeSection === section.id ? 'text-[#F97316] font-semibold border-[#F97316]' : 'text-gray-500 hover:text-[#0F172A] border-transparent hover:border-gray-300'}`}>
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>
                <main>
                    {/* Hero Section */}
                    <SectionContainer className="bg-white text-center" contained={false}>
                        <AnimatedElement>
                            <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter max-w-4xl mx-auto">
                                AI Development for Web Apps
                            </h1>
                        </AnimatedElement>
                        <AnimatedElement delay={100}>
                            <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                                Build assistants, search, and automations that measurably move your KPIs.
                            </p>
                        </AnimatedElement>
                        <AnimatedElement delay={200} className="mt-8">
                            <button onClick={onStartWizard} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105">Start Your AI Brief →</button>
                        </AnimatedElement>
                    </SectionContainer>
                    
                    {/* What We Build (Core Features) */}
                    {/* FIX: Correct ref callback. It should not return a value. */}
                    <SectionContainer id="features" ref={el => { sectionRefs.current['features'] = el; }} className="bg-slate-50" contained={false}>
                        <div className="text-center max-w-3xl mx-auto">
                            <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">What We Build</h2></AnimatedElement>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                            {WEB_APP_FEATURES.map((feature, index) => (
                                <AnimatedElement key={feature.title} delay={100 * (index % 3)}>
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 h-full text-center flex flex-col items-center">
                                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#FFD6B0]/40 text-[#0F172A]">{feature.icon}</div>
                                        <h3 className="mt-4 text-lg font-semibold font-poppins text-[#00334F]">{feature.title}</h3>
                                        <p className="mt-1 text-sm text-[#0F172A]/80 flex-grow">{feature.description}</p>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </SectionContainer>

                    {/* Where It Pays (Use Cases & Value) */}
                    {/* FIX: Correct ref callback. It should not return a value. */}
                    <SectionContainer id="use-cases" ref={el => { sectionRefs.current['use-cases'] = el; }} className="bg-white" contained={false}>
                        <div className="text-center max-w-3xl mx-auto">
                            <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Where It Pays Off</h2></AnimatedElement>
                        </div>
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                            {WEB_APP_USE_CASES.map((useCase, index) => (
                                <AnimatedElement key={useCase.title} delay={100*index}>
                                    <div className="p-6 rounded-xl border border-gray-200 bg-slate-50 text-center">
                                        <h4 className="font-semibold text-[#00334F] font-poppins">{useCase.title}</h4>
                                        <p className="mt-2 text-sm font-bold text-[#F97316]">{useCase.metric}</p>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </SectionContainer>

                    {/* ROI Snapshot */}
                    {/* FIX: Correct ref callback. It should not return a value. */}
                    <SectionContainer id="roi-snapshot" ref={el => { sectionRefs.current['roi-snapshot'] = el; }} className="bg-[#00334F] text-white" contained={false}>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            {WEB_APP_ROI.map((item, index) => (
                                <AnimatedElement key={item.label} delay={100 * index}>
                                    <p className="text-5xl md:text-6xl font-bold font-poppins">
                                        {item.prefix}<Counter endValue={parseInt(item.value)} />{item.unit}
                                    </p>
                                    <p className="mt-2 text-gray-300">{item.label}</p>
                                </AnimatedElement>
                            ))}
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-12">Source: McKinsey 2024</p>
                    </SectionContainer>
                    
                    {/* Real-World Patterns */}
                    {/* FIX: Correct ref callback. It should not return a value. */}
                    <SectionContainer id="patterns" ref={el => { sectionRefs.current['patterns'] = el; }} className="bg-white" contained={false}>
                        <div className="text-center max-w-3xl mx-auto">
                            <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Real-World Patterns</h2></AnimatedElement>
                        </div>
                        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {WEB_APP_PATTERNS.map((pattern, index) => (
                                <AnimatedElement key={pattern.title} delay={100 * index}>
                                    <div className="p-6 rounded-xl border-2 border-slate-100 bg-white h-full">
                                        <CheckCircleIcon className="w-8 h-8 text-[#F97316]"/>
                                        <h3 className="mt-4 text-lg font-semibold font-poppins text-[#00334F]">{pattern.title}</h3>
                                        <p className="mt-2 text-[#0F172A]/80">{pattern.description}</p>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </SectionContainer>
                    
                    {/* Delivery Blueprint */}
                    {/* FIX: Correct ref callback. It should not return a value. */}
                    <SectionContainer id="blueprint" ref={el => { sectionRefs.current['blueprint'] = el; }} className="bg-slate-50" contained={false}>
                        <div className="text-center max-w-3xl mx-auto">
                            <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Our Delivery Blueprint</h2></AnimatedElement>
                        </div>
                        <div className="mt-16 max-w-3xl mx-auto">
                            {WEB_APP_BLUEPRINT.map((step, index) => (
                                <AnimatedElement key={step.step} delay={100 * index} className="flex items-start gap-6 my-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FFD6B0] text-[#0F172A] font-bold text-lg">{step.step}</div>
                                        {index < WEB_APP_BLUEPRINT.length - 1 && <div className="w-px h-16 bg-gray-300 my-2"></div>}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold font-poppins text-[#00334F] mt-2.5">{step.title}</h3>
                                        <p className="text-[#0F172A]/80">{step.description}</p>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </SectionContainer>
                    
                    {/* Recommended Tool Stack */}
                    {/* FIX: Correct ref callback. It should not return a value. */}
                    <SectionContainer id="tool-stack" ref={el => { sectionRefs.current['tool-stack'] = el; }} className="bg-white" contained={false}>
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Recommended Tool Stack</h2></AnimatedElement>
                                <AnimatedElement delay={100}><p className="mt-4 text-lg text-[#0F172A]/80">We build on a modern, scalable, and reliable foundation to ensure your application performs from day one.</p></AnimatedElement>
                                <AnimatedElement delay={200} className="mt-6">
                                    <button onClick={() => onNavigate('tech-stack')} className="font-semibold text-[#F97316] hover:text-orange-700 transition-colors">Explore Our Tech Stack →</button>
                                </AnimatedElement>
                            </div>
                            <div className="space-y-4">
                                {WEB_APP_TOOL_STACK.slice(0, 3).map((tool, index) => (
                                    <AnimatedElement key={tool.name} delay={100 * index}>
                                        <div className="p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-semibold text-[#00334F]">{tool.name}</h4>
                                            <p className="text-sm text-[#0F172A]/80">{tool.description}</p>
                                        </div>
                                    </AnimatedElement>
                                ))}
                            </div>
                        </div>
                    </SectionContainer>

                    {/* Extra AI Features */}
                    {/* FIX: Correct ref callback. It should not return a value. */}
                    <SectionContainer id="extra-features" ref={el => { sectionRefs.current['extra-features'] = el; }} className="bg-slate-50" contained={false}>
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">More Than Just a Chatbot</h2></AnimatedElement>
                                <AnimatedElement delay={100}><p className="mt-4 text-lg text-[#0F172A]/80">We integrate advanced capabilities to create truly intelligent and useful AI experiences.</p></AnimatedElement>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {WEB_APP_EXTRA_FEATURES.map((feature, index) => (
                                    <AnimatedElement key={feature} delay={100 * index}>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                                            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="font-medium text-[#00334F]">{feature}</span>
                                        </div>
                                    </AnimatedElement>
                                ))}
                            </div>
                        </div>
                    </SectionContainer>

                    {/* Visuals / Architecture */}
                    {/* FIX: Correct ref callback. It should not return a value. */}
                    <SectionContainer id="architecture" ref={el => { sectionRefs.current['architecture'] = el; }} className="bg-white" contained={false}>
                        <div className="text-center max-w-3xl mx-auto">
                            <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Example Architecture</h2></AnimatedElement>
                            <AnimatedElement delay={100}><p className="mt-4 text-[#0F172A]/80">A typical RAG (Retrieval-Augmented Generation) application flow, built on our recommended stack.</p></AnimatedElement>
                        </div>
                        <AnimatedElement delay={200} className="mt-16 p-8 bg-slate-50 rounded-2xl border border-gray-200">
                            <div className="flex flex-col md:flex-row justify-center items-center gap-2 font-mono text-sm text-center">
                                <div className="p-4 bg-white border rounded-lg">User Query</div>
                                <ArrowRightIcon className="mx-2 hidden md:block" /> <ChevronDownIcon className="my-2 md:hidden" />
                                <div className="p-4 bg-white border rounded-lg">Next.js Frontend</div>
                                <ArrowRightIcon className="mx-2 hidden md:block" /> <ChevronDownIcon className="my-2 md:hidden" />
                                <div className="p-4 bg-[#FFD6B0]/40 border border-orange-200 rounded-lg">CopilotKit</div>
                                <ArrowRightIcon className="mx-2 hidden md:block" /> <ChevronDownIcon className="my-2 md:hidden" />
                                <div className="p-4 bg-white border rounded-lg">LangGraph Agent</div>
                                <ArrowRightIcon className="mx-2 hidden md:block" /> <ChevronDownIcon className="my-2 md:hidden" />
                                <div className="p-4 bg-white border rounded-lg flex flex-col gap-2"><span>OpenAI API</span><span>Weaviate DB</span></div>
                            </div>
                        </AnimatedElement>
                    </SectionContainer>
                </main>
            </div>
        </div>
    );
};

// --- AI BRIEF WIZARD COMPONENT ---
const AiBriefWizard = ({ onClose }: { onClose: () => void }) => {
    const [step, setStep] = useState(1);
    const [companyName, setCompanyName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    
    // Step 2 State
    const [projectType, setProjectType] = useState('');
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [budget, setBudget] = useState('25000');
    
    // Step 3/4 State
    const [generationStatus, setGenerationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [generationMessage, setGenerationMessage] = useState('');
    const [brief, setBrief] = useState<Brief | null>(null);


    const WIZARD_STEPS = [
        { number: 1, name: 'Welcome' },
        { number: 2, name: 'Scope Builder' },
        { number: 3, name: 'AI Enrichment' },
        { number: 4, name: 'Review Brief' },
        { number: 5, name: 'Dashboard' }
    ];
    
    const PROJECT_TYPES = ["AI Web Application", "AI App Development", "Social Media Automation", "WhatsApp AI Assistant"];
    const GOALS = ["Increase Leads", "Automate Support", "Improve Engagement", "Boost Sales", "Enhance UX", "Optimize Ops"];
    const BUDGET_MARKS: { [key: string]: string } = {
        '10000': '$10k', '25000': '$25k', '50000': '$50k', '75000': '$75k', '100000': '$100k+',
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setWebsiteUrl(value);
        if (urlError) {
            validateUrl(value);
        }
    };
    
    const validateUrl = (value: string): boolean => {
        if (!value.trim()) {
            setUrlError('Website URL is required.');
            return false;
        }
        try {
            const url = new URL(value.startsWith('http') ? value : `https://${value}`);
            if (!url.hostname.includes('.')) {
                throw new Error('Invalid hostname');
            }
            setUrlError('');
            return true;
        } catch (_) {
            setUrlError('Please enter a valid URL format.');
            return false;
        }
    };
    
    const handleUrlBlur = () => {
        validateUrl(websiteUrl);
    };

    const handleGoalToggle = (goal: string) => {
        setSelectedGoals(prev => 
            prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
        );
    };
    
    const generateBrief = useCallback(async () => {
        setGenerationStatus('loading');
        const loadingMessages = [
            "Analyzing your website...",
            "Identifying key objectives...",
            "Consulting with our AI strategist...",
            "Generating project summary...",
            "Finalizing the brief..."
        ];
        
        let messageIndex = 0;
        const intervalId = setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setGenerationMessage(loadingMessages[messageIndex]);
        }, 2000);
        setGenerationMessage(loadingMessages[0]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const model = 'gemini-2.5-flash';
            
            const schema = {
                type: Type.OBJECT,
                properties: {
                    overview: { type: Type.STRING, description: "A concise overview of the company based on its website." },
                    key_goals: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of key goals for the project." },
                    suggested_deliverables: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of suggested deliverables to achieve the goals." },
                    brand_tone: { type: Type.STRING, description: "The brand's tone of voice (e.g., Professional, Friendly)." },
                    budget_band: { type: Type.STRING, description: "The estimated budget band for the project." },
                    website_summary_points: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key summary points extracted from the website." },
                },
                required: ['overview', 'key_goals', 'suggested_deliverables', 'brand_tone', 'budget_band', 'website_summary_points']
            };

            const prompt = `You are a senior project strategist at a top-tier development agency. A potential client has provided the following details:
            - Company Name: ${companyName}
            - Website URL: ${websiteUrl}
            - Project Type: ${projectType}
            - Primary Goals: ${selectedGoals.join(', ')}
            - Estimated Budget: ${BUDGET_MARKS[budget]}

            Analyze the content of the website at the provided URL. Based on ALL the information, generate a structured project brief. The overview should be concise and based on the website's content. The 'suggested_deliverables' should align directly with the user's stated goals. Ensure the tone is factual and professional. Respond ONLY with the JSON object.`;
            
            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                    temperature: 0.2,
                }
            });
            
            const jsonText = response.text.trim();
            const parsedBrief = JSON.parse(jsonText) as Brief;
            setBrief(parsedBrief);
            setGenerationStatus('success');
            
            setTimeout(() => {
                setStep(4);
            }, 1000);

        } catch (error) {
            console.error("Error generating brief:", error);
            setGenerationStatus('error');
        } finally {
            clearInterval(intervalId);
        }
    }, [companyName, websiteUrl, projectType, selectedGoals, budget]);

    const isStep1Complete = companyName.trim() !== '' && websiteUrl.trim() !== '' && !urlError;
    const isStep2Complete = projectType !== '' && selectedGoals.length > 0;

    const handleNextStep = () => {
        if (step === 1 && isStep1Complete) setStep(2);
        else if (step === 2 && isStep2Complete) {
            setStep(3);
            generateBrief();
        } else if (step === 4) setStep(5);
        else setStep(s => Math.min(s + 1, WIZARD_STEPS.length));
    };
    
    const handlePrevStep = () => setStep(s => Math.max(s - 1, 1));

    const renderBriefSection = (title: string, content: string | string[]) => (
        <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h4>
            {Array.isArray(content) ? (
                <ul className="mt-2 space-y-2 list-disc list-inside text-[#0F172A]/90">
                    {content.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            ) : (
                <p className="mt-2 text-[#0F172A]/90">{content}</p>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full relative transform transition-all duration-300 ease-out animate-slide-up" style={{ minHeight: '550px' }}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"><XIcon className="w-6 h-6" /></button>
                
                <div className="mb-8">
                    <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                        <span>Step {step} of {WIZARD_STEPS.length}</span>
                        <span className="font-semibold">{WIZARD_STEPS[step-1].name}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#F97316] h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${(step/WIZARD_STEPS.length)*100}%` }}></div>
                    </div>
                </div>

                {step === 1 && (
                    <div>
                        <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Let's Start Your AI Brief</h2>
                        <p className="text-center text-gray-600 mb-8">Tell us about your company to get started.</p>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g., AMO AI" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition" autoFocus />
                            </div>
                            <div>
                                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                                <input type="text" id="websiteUrl" value={websiteUrl} onChange={handleUrlChange} onBlur={handleUrlBlur} placeholder="e.g., https://www.example.com" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 transition ${urlError ? 'border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#F97316] focus:border-[#F97316]'}`} aria-invalid={!!urlError} aria-describedby="url-error" />
                                {urlError && <p id="url-error" className="text-red-600 text-sm mt-1">{urlError}</p>}
                            </div>
                        </div>
                        <div className="mt-8 text-right">
                            <button onClick={handleNextStep} disabled={!isStep1Complete} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all transform disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F97316]">Next: Define Scope →</button>
                        </div>
                    </div>
                )}
                
                {step === 2 && (
                    <div>
                        <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Define Your Project Scope</h2>
                        <p className="text-center text-gray-600 mb-8">Help us understand what you want to achieve.</p>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">What type of project is this?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {PROJECT_TYPES.map(type => <button key={type} onClick={() => setProjectType(type)} className={`p-3 text-sm font-medium border rounded-lg transition-all text-left ${projectType === type ? 'bg-[#00334F] text-white border-[#00334F] ring-2 ring-offset-1 ring-[#00334F]' : 'bg-white hover:bg-gray-50 border-gray-300'}`}>{type}</button>)}
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">What are your primary goals? (Select up to 3)</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {GOALS.map(goal => <button key={goal} onClick={() => handleGoalToggle(goal)} disabled={selectedGoals.length >= 3 && !selectedGoals.includes(goal)} className={`p-3 text-sm font-medium border rounded-lg transition-all text-left disabled:opacity-50 ${selectedGoals.includes(goal) ? 'bg-[#00334F] text-white border-[#00334F] ring-2 ring-offset-1 ring-[#00334F]' : 'bg-white hover:bg-gray-50 border-gray-300'}`}>{goal}</button>)}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget: <span className="font-bold text-[#00334F]">{BUDGET_MARKS[budget]}</span></label>
                                <input type="range" id="budget" min="10000" max="100000" step="15000" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F97316]" />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">{Object.values(BUDGET_MARKS).map(label => <span key={label}>{label}</span>)}</div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between items-center">
                             <button onClick={handlePrevStep} className="px-6 py-2 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100 transition-all">Back</button>
                            <button onClick={handleNextStep} disabled={!isStep2Complete} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all transform disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F97316]">Next: AI Enrichment →</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                         {generationStatus === 'loading' && (
                             <>
                                 <div className="relative w-20 h-20">
                                     <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                     <div className="absolute inset-0 border-4 border-t-[#F97316] rounded-full animate-spin"></div>
                                 </div>
                                 <h2 className="text-2xl font-bold font-poppins mt-8 text-[#00334F]">Generating Your Brief...</h2>
                                 <p className="text-gray-600 mt-2">{generationMessage}</p>
                             </>
                         )}
                         {generationStatus === 'success' && (
                             <>
                                 <CheckCircleIcon className="w-20 h-20 text-green-500" />
                                 <h2 className="text-2xl font-bold font-poppins mt-8 text-[#00334F]">Success!</h2>
                                 <p className="text-gray-600 mt-2">Your AI-powered brief is ready.</p>
                             </>
                         )}
                         {generationStatus === 'error' && (
                             <>
                                 <XIcon className="w-20 h-20 text-red-500 bg-red-100 rounded-full p-4"/>
                                 <h2 className="text-2xl font-bold font-poppins mt-8 text-[#00334F]">Generation Failed</h2>
                                 <p className="text-gray-600 mt-2">We couldn't generate the brief. Please try again.</p>
                                 <button onClick={generateBrief} className="mt-6 px-6 py-2 rounded-lg font-semibold bg-[#F97316] text-white">Retry</button>
                             </>
                         )}
                    </div>
                )}
                
                {step === 4 && brief && (
                    <div>
                         <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Review Your AI-Generated Brief</h2>
                        <p className="text-center text-gray-600 mb-8">Here's what our AI put together. You can edit this later.</p>
                        <div className="space-y-6 max-h-[350px] overflow-y-auto pr-4">
                            {renderBriefSection("Company Overview", brief.overview)}
                            {renderBriefSection("Key Website Takeaways", brief.website_summary_points)}
                            {renderBriefSection("Primary Project Goals", brief.key_goals)}
                            {renderBriefSection("Suggested Deliverables", brief.suggested_deliverables)}
                            <div className="grid grid-cols-2 gap-4">
                                {renderBriefSection("Brand Tone", brief.brand_tone)}
                                {renderBriefSection("Budget", brief.budget_band)}
                            </div>
                        </div>
                         <div className="mt-8 flex justify-between items-center">
                             <button onClick={handlePrevStep} className="px-6 py-2 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100 transition-all">Back</button>
                            <button 
                                onClick={onClose}
                                className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all transform hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F97316]"
                            >
                                Save & Finish
                            </button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                     <div className="text-center py-12">
                        <h2 className="text-2xl font-bold font-poppins mb-4">Dashboard Placeholder</h2>
                        <p className="text-gray-600 mb-8">This is where your saved briefs will appear.</p>
                         <div className="flex justify-center gap-4">
                            <button onClick={handlePrevStep} className="px-6 py-2 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100 transition-all">Back</button>
                            <button onClick={onClose} className="px-6 py-2 rounded-lg font-semibold bg-[#F97316] text-white transition-all">Finish</button>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const App = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '') as Page;
            setCurrentPage(hash || 'home');
            window.scrollTo(0, 0);
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial load
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const navigateTo = (page: Page) => {
        window.location.hash = page;
    };
    
    const startWizard = useCallback(() => setIsWizardOpen(true), []);
    const closeWizard = useCallback(() => setIsWizardOpen(false), []);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onStartWizard={startWizard} />;
            case 'services/web-applications':
                return <AiWebApplicationsPage onStartWizard={startWizard} onNavigate={navigateTo} />;
            // Add other page components here as they are built
            default:
                // For now, redirect unhandled pages to home
                 // Find if it's a sub-service page
                if (currentPage.startsWith('services/')) {
                    // This is where you would render a generic service page or a specific one.
                    // For now, we only have web-applications.
                    return <AiWebApplicationsPage onStartWizard={startWizard} onNavigate={navigateTo} />;
                }
                return <HomePage onStartWizard={startWizard} />;
        }
    };
    
    return (
        <div className="bg-[#FFF9F5]">
            <Header onNavigate={navigateTo} currentPage={currentPage} onStartWizard={startWizard} />
            {renderPage()}
            <Footer onNavigate={navigateTo} onStartWizard={startWizard} />
            {isWizardOpen && <AiBriefWizard onClose={closeWizard} />}
        </div>
    );
};

export default App;