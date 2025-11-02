
import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- TYPE DEFINITIONS ---
type Page = 'home' | 'services' | 'process' | 'projects' | 'about' | 'contact' | 'ai-brief' | 
            'services/web-applications' | 'services/social-media' | 'services/ecommerce' | 'services/whatsapp-automation' |
            'tech-stack' | 'resources' | 'privacy-policy' | 'terms-of-service';

interface NavLink {
  href: Page;
  label: string;
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
}
const SectionContainer: React.FC<SectionContainerProps> = ({ children, className = '', id = '' }) => (
    <section id={id} className={`w-full py-20 md:py-28 overflow-hidden ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    </section>
);

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
            <SectionContainer className="bg-[#F3F6F9]">
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
            <SectionContainer className="bg-[#F3F6F9]">
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#00334F]">Investment Levels</h2></AnimatedElement>
                 </div>
                 <div className="grid lg:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto items-center">
                    {INVESTMENT_LEVELS.map((level, i) => (
                        <AnimatedElement key={level.name} delay={100 * i} className={`p-8 rounded-2xl border ${level.recommended ? 'bg-[#00334F] text-white border-transparent shadow-2xl shadow-[#00334F]/20' : 'bg-white