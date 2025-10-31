import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- TYPE DEFINITIONS ---
interface NavLink {
  href: string;
  label: string;
}

interface ServiceInfo {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
}

interface UseCaseInfo {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface ProgressMetric {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  before: {
    value: string;
  };
  after: {
    value: string;
    animatedValue: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
  };
}

interface ProcessStepInfo {
    step: number;
    title: string;
    subtitle: string;
    description: string;
}

interface FAQItemInfo {
    question: string;
    answer: string;
}

// --- SVG ICON COMPONENTS ---

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 6 9 17l-5-5"/></svg>
);

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
  );

const LeadGenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
);

const EcommIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);

const BookingIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="m9 14 2 2 4-4"/><path d="M3 10h18"/></svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);

const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);

const SmileIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);

const FastForwardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/></svg>
);
const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
);
const UserCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
);
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const BarChart2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const BotIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M18 14v-4.5a2.5 2.5 0 0 0-5 0V14"/><path d="M18 14v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z"/><path d="M9.5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/></svg>
);
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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
const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2a2.5 2.5 0 0 1 3 4"/><path d="M12 2a2.5 2.5 0 0 0-3 4"/><path d="M12 15h.01"/><path d="M12 12h.01"/><path d="M12 9h.01"/><path d="M4 12a1 1 0 0 1-1-1 4 4 0 0 1 4-4h1"/><path d="M17 8h1a4 4 0 0 1 4 4 1 1 0 0 1-1 1"/><path d="M12 22a2.5 2.5 0 0 1-3-4"/><path d="M12 22a2.5 2.5 0 0 0 3-4"/><path d="M15 12a1 1 0 0 0 1-1 4 4 0 0 0-4-4h-1"/><path d="M8 11a4 4 0 0 0-4 4 1 1 0 0 0 1 1h1"/></svg>
);
const PaletteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.667 0-.424-.103-.822-.284-1.172a2.5 2.5 0 0 1 .284-2.828c.8-1 2.3-1 3.8-1a5.5 5.5 0 0 0 4.5-5.5c0-3.5-3.5-5.5-5.5-5.5Z"/></svg>
);


const ServiceIcon = ({ children }: { children?: React.ReactNode }) => (
    <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
        {children}
    </div>
);

// --- DATA CONSTANTS ---

const NAV_LINKS: NavLink[] = [
    { href: "home", label: "Home" },
    { href: "home#services", label: "Services" },
    { href: "home#use-cases", label: "Use Cases" },
    { href: "home#progress", label: "Progress" },
    { href: "ai-web-dev", label: "AI Web Dev" },
    { href: "home#faq", label: "FAQ" },
];

const CORE_SERVICES: ServiceInfo[] = [
    { 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="23"/><line x1="8" x2="16" y1="23" y2="23"/></svg>,
        title: "WhatsApp Automation Setup",
        description: "We set up your verified WhatsApp Business API and build intelligent workflows to greet, qualify, and convert leads automatically.",
        features: ["Auto-replies", "Lead capture", "Payment & order updates", "Multi-language flows"]
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M18 14v-4.5a2.5 2.5 0 0 0-5 0V14"/><path d="M18 14v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z"/><path d="M9.5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/></svg>,
        title: "AI Chat Agents & Copilots",
        description: "We train AI agents to handle real conversations — qualifying leads, answering FAQs, booking services, and learning from each chat.",
        features: ["Conversational memory", "Smart human handoff", "Personalized tone", "Analytics dashboard"]
    },
     {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
        title: "CRM & Pipeline Integration",
        description: "We connect WhatsApp with your CRM or Supabase database so every interaction is tracked, tagged, and measurable.",
        features: ["Lead syncing", "Follow-up automations", "Deal tracking", "Performance reports"]
    },
];

const USE_CASES: UseCaseInfo[] = [
    { icon: <LeadGenIcon />, title: "Lead Generation Flow", description: "Ad → WhatsApp chat → AI qualifies lead → CRM sync" },
    { icon: <EcommIcon />, title: "E-commerce Flow", description: "Customer chats → Browse catalog → Add to cart → Pays in-chat" },
    { icon: <BookingIcon />, title: "Service Booking Flow", description: "Client messages → AI confirms slot → Invoice sent → Booking recorded" },
];

const PROGRESS_METRICS: ProgressMetric[] = [
    {
        icon: <ClockIcon className="w-full h-full" />,
        title: "Response Time",
        tagline: "From hours to instant.",
        before: { value: "2 hrs" },
        after: { value: "< 2 min", animatedValue: 2, prefix: "< ", suffix: " min" }
    },
    {
        icon: <FilterIcon className="w-full h-full" />,
        title: "Missed Leads",
        tagline: "From missed opportunities to full capture.",
        before: { value: "40%" },
        after: { value: "< 5%", animatedValue: 5, prefix: "< ", suffix: "%" }
    },
    {
        icon: <TrendingUpIcon className="w-full h-full" />,
        title: "Conversion Rate",
        tagline: "From interest to purchase.",
        before: { value: "12%" },
        after: { value: "+216%", animatedValue: 216, prefix: "+", suffix: "%" }
    },
    {
        icon: <SmileIcon className="w-full h-full" />,
        title: "Customer Satisfaction",
        tagline: "From average to delighted.",
        before: { value: "7 / 10" },
        after: { value: "9.4 / 10", animatedValue: 9.4, decimals: 1, suffix: " / 10" }
    }
];

const WHATSAPP_PROCESS_STEPS: ProcessStepInfo[] = [
    { step: 1, title: "Discovery Call", subtitle: "Understand Your Goals", description: "We start with a short consultation to map your communication needs, pain points, and automation potential." },
    { step: 2, title: "Workflow Blueprint", subtitle: "Design Your Automation Flow", description: "Our experts design a custom WhatsApp journey — from first message to sale or booking." },
    { step: 3, title: "Development & Integration", subtitle: "Build and Connect Everything", description: "We integrate with your WhatsApp Business API, CRM, Supabase, and any payment gateway you use." },
    { step: 4, title: "AI Training & Testing", subtitle: "Train Your Chat Agents", description: "We teach your Copilot to answer real customer questions, qualify leads, and adapt over time." },
    { step: 5, "title": "Launch & Optimize", "subtitle": "Go Live & Measure Results", "description": "Once launched, we monitor performance, tweak flows, and report conversions every week." },
];

const TECH_LOGOS: string[] = ["Supabase", "n8n", "CopilotKit", "CrewAI", "LangChain", "Stripe", "WhatsApp Business API", "Cloudinary"];

const FAQ_ITEMS: FAQItemInfo[] = [
    { question: "Do you use the official WhatsApp Business API?", answer: "Yes, we only use the official WhatsApp Business API to ensure reliability, security, and access to all official features. This guarantees your business is fully compliant with WhatsApp's policies." },
    { question: "Can I integrate WhatsApp with my CRM or database?", answer: "Absolutely. We specialize in integrating WhatsApp with CRMs like HubSpot, Salesforce, and custom databases like Supabase or PostgreSQL. This allows for seamless data syncing and automated follow-ups." },
    { question: "Is this AI or just a bot?", answer: "We build advanced AI agents, not simple chatbots. Our systems use Large Language Models (LLMs) like GPT-4 to understand context, handle complex queries, and learn from conversations, providing a much more human-like experience." },
    { question: "How long does setup take?", answer: "A typical setup, from discovery to launch, takes between 2 to 3 weeks. This includes designing the workflow, developing the integrations, training the AI, and testing everything thoroughly before going live." },
];

// --- ANIMATION HOOK & COMPONENT ---

const useOnScreen = (ref: React.RefObject<HTMLElement>, options: IntersectionObserverInit = {}) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIntersecting(true);
                observer.unobserve(entry.target);
            }
        }, options);
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
    const onScreen = useOnScreen(ref, { threshold: 0.1 });
    return (
        <div ref={ref} className={`${className} transition-all duration-700 ease-out ${onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

// --- UI COMPONENTS ---
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
                const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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


// --- PAGE SECTION COMPONENTS ---
const Header = ({ onStartWizard, onNavigate, currentPage }: { onStartWizard: () => void; onNavigate: (page: string) => void; currentPage: string; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const [page, hash] = href.split('#');
        onNavigate(page || 'home');
        
        // Timeout to allow page to render before scrolling
        setTimeout(() => {
            if (hash) {
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);

        setIsOpen(false);
    };

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/80' : 'bg-white'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#FF7A2F] rounded-full text-white flex items-center justify-center font-bold text-lg">A</span>
                        <span className="text-xl font-semibold text-[#181818]">AMO AI</span>
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map(link => (
                            <a key={link.label} href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className="text-sm font-medium text-gray-600 hover:text-[#181818] transition-colors">{link.label}</a>
                        ))}
                    </div>
                    <div className="hidden md:block">
                        <button onClick={onStartWizard} className="px-5 py-2.5 rounded-full font-medium text-sm bg-[#FF7A2F] text-white transition-transform transform hover:scale-105">Get Started</button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            {isOpen ? <XIcon className="w-6 h-6 text-[#181818]" /> : <MenuIcon className="w-6 h-6 text-[#181818]" />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
                        <div className="flex flex-col space-y-4">
                            {NAV_LINKS.map(link => (<a key={link.label} href={`#${link.href}`} className="text-[#181818] hover:text-[#25D366] transition-colors block" onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>))}
                            <button onClick={() => { onStartWizard(); setIsOpen(false); }} className="w-full px-5 py-2.5 rounded-full font-medium text-sm bg-[#FF7A2F] text-white">Get Started</button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

const Hero = ({ onStartWizard }: { onStartWizard: () => void; }) => (
    <SectionContainer className="bg-white pt-16 md:pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#181818] tracking-tighter leading-tight">
                        Automate, Sell & Support — <br/>All on <span className="text-[#25D366]">WhatsApp</span>
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-xl mx-auto lg:mx-0 mt-6 text-lg text-gray-600">
                        We help businesses turn WhatsApp into a 24/7 sales and customer service channel — powered by automation, AI agents, and real data. No delays. No missed messages. Just seamless conversations that convert into revenue.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200}>
                    <button onClick={onStartWizard} className="mt-8 px-8 py-4 rounded-full font-semibold text-white bg-[#25D366] shadow-lg hover:opacity-90 transition-all transform hover:scale-105">
                        <span className="mr-2">🚀</span> Create Your AI Project Brief
                    </button>
                </AnimatedElement>
            </div>
            <AnimatedElement delay={150}>
                <div className="bg-gray-100 p-4 rounded-2xl shadow-lg">
                    <div className="bg-white rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white">AI</div>
                            <div>
                                <p className="font-semibold">AMO AI Assistant</p>
                                <p className="text-xs text-green-600">Always Active</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-xl self-start max-w-xs">Hi! How can I help you today? 👋</div>
                        <div className="bg-gray-100 p-3 rounded-xl self-start max-w-xs">Check my order status</div>
                        <div className="bg-[#E2FDD7] p-3 rounded-xl self-end max-w-xs ml-auto">Your order #4821 is out for delivery! 🚚</div>
                    </div>
                </div>
            </AnimatedElement>
        </div>
    </SectionContainer>
);

const CoreServices = () => (
    <SectionContainer id="services" className="bg-white">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#181818]">Our Core Services</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
                <p className="mt-4 text-lg text-gray-600">From setup to scale, we provide end-to-end WhatsApp automation solutions that drive real business results.</p>
            </AnimatedElement>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {CORE_SERVICES.map((service, index) => (
                <AnimatedElement key={service.title} delay={100 * index}>
                    <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-200/80 h-full flex flex-col">
                        <ServiceIcon>{service.icon}</ServiceIcon>
                        <h3 className="mt-4 text-xl font-semibold text-[#181818]">{service.title}</h3>
                        <p className="mt-2 text-gray-600 flex-grow">{service.description}</p>
                        <ul className="mt-6 space-y-2">
                            {service.features.map(feature => (
                                <li key={feature} className="flex items-center gap-3">
                                    <CheckIcon className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </AnimatedElement>
            ))}
        </div>
    </SectionContainer>
);

const UseCases: React.FC<{id?: string}> = ({ id }) => (
    <SectionContainer id={id} className="bg-[#0B0C10] text-white">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Real-World Use Cases</h2>
            </AnimatedElement>
             <AnimatedElement delay={100}>
                <p className="mt-4 text-lg text-gray-400">See how businesses like yours are using WhatsApp automation to generate leads, close sales, and support customers.</p>
            </AnimatedElement>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
            {USE_CASES.map((useCase, index) => (
                <AnimatedElement key={useCase.title} delay={100*index}>
                    <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 transition-all duration-300 hover:border-[#25D366]/50 hover:shadow-2xl hover:shadow-[#25D366]/10 h-full flex flex-col">
                        <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                            {useCase.icon}
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-white">{useCase.title}</h3>
                        <p className="mt-2 text-gray-400 text-base leading-relaxed flex-grow">{useCase.description}</p>
                    </div>
                </AnimatedElement>
            ))}
        </div>
    </SectionContainer>
);

const ProgressCard: React.FC<{ metric: ProgressMetric; delay: number }> = ({ metric, delay }) => {
    const ref = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(ref, { threshold: 0.3 });

    return (
        <AnimatedElement className="h-full group" delay={delay}>
            <div ref={ref} className="rounded-2xl border border-gray-200/80 shadow-sm h-full flex flex-col text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                <div className="grid grid-cols-2 flex-grow relative">
                    <div className="p-8 flex flex-col justify-center items-center text-center space-y-3 bg-[#F1F1F1]">
                        <div className="text-[#A3A3A3] w-10 h-10">{metric.icon}</div>
                        <p className="text-sm font-medium text-[#A3A3A3]">Before AI</p>
                        <p className="text-4xl font-bold text-[#A3A3A3]">{metric.before.value}</p>
                    </div>

                    <div className="p-8 flex flex-col justify-center items-center text-center space-y-3 relative bg-[#F9FFFB]">
                         <div className={`absolute inset-0 bg-white z-10 transform transition-transform duration-700 ease-in-out ${onScreen ? 'translate-x-full' : 'translate-x-0'}`} style={{transitionDelay: '200ms'}}></div>
                        <div className="relative text-[#25D366] w-10 h-10">
                            {metric.icon}
                            <div className={`absolute -inset-2 bg-[#25D366] rounded-full blur-lg transition-opacity duration-1000 delay-700 ${onScreen ? 'opacity-25 animate-pulse' : 'opacity-0'}`}></div>
                        </div>
                        <p className="text-sm font-medium text-green-800">After AMO AI</p>
                        <div className="w-full">
                             <p className="text-4xl font-bold text-[#25D366] tabular-nums">
                                 {onScreen ? (
                                    <>
                                        {metric.after.prefix || ''}
                                        <Counter endValue={metric.after.animatedValue} decimals={metric.after.decimals || 0} duration={1500} />
                                        {metric.after.suffix || ''}
                                    </>
                                 ) : (
                                    <span>{metric.after.value}</span>
                                 )}
                            </p>
                             <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div
                                    className="h-1.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] transition-all ease-out"
                                    style={{ 
                                        width: onScreen ? '100%' : '0%',
                                        transitionDuration: '2000ms',
                                        transitionDelay: '700ms',
                                     }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="p-5 border-t border-gray-200/80 bg-white">
                     <p className="text-center text-base text-gray-500 font-serif italic">"{metric.tagline}"</p>
                </div>
            </div>
        </AnimatedElement>
    );
};

const ProgressSection: React.FC<{id?: string}> = ({ id }) => (
    <SectionContainer id={id} className="bg-[#F6FAF8]">
        <div className="text-center max-w-3xl mx-auto">
             <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0B0C10]">The Proof Is in the Progress.</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
                <p className="mt-4 text-lg text-gray-600">See how AMO AI transforms every key metric — from first message to final satisfaction.</p>
            </AnimatedElement>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
            {PROGRESS_METRICS.map((metric, index) => (
                <ProgressCard key={metric.title} metric={metric} delay={100 * (index + 1)} />
            ))}
        </div>
        <AnimatedElement delay={500}>
             <p className="text-center text-sm text-gray-500 mt-12">Measured across 100+ AMO AI clients worldwide.</p>
        </AnimatedElement>
    </SectionContainer>
);

const ProgressCTA = ({ onStartWizard }: { onStartWizard: () => void; }) => (
    <div className="bg-gradient-to-r from-[#25D366] to-[#FFC96A]">
        <SectionContainer className="py-16 md:py-20">
            <AnimatedElement>
                <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">Ready to see your own progress in real time?</h3>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={onStartWizard} className="px-8 py-3 rounded-full font-semibold bg-white text-black shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 w-full sm:w-auto">Start My AI Project →</button>
                        <button className="px-8 py-3 rounded-full font-semibold bg-transparent text-white border-2 border-white hover:bg-white/10 transition-all w-full sm:w-auto">Calculate My ROI →</button>
                    </div>
                </div>
            </AnimatedElement>
        </SectionContainer>
    </div>
);


const WhatsappProcess = () => (
    <SectionContainer id="process" className="bg-[#0B0C10] text-white">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">The AMO AI WhatsApp Process</h2>
            </AnimatedElement>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mt-16 relative">
             <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-800 hidden lg:block"></div>
            {WHATSAPP_PROCESS_STEPS.map((step, index) => (
                <AnimatedElement key={step.step} delay={100 * index}>
                    <div className="relative">
                        <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-xl font-bold text-black">{step.step}</div>
                        <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                        <p className="text-sm text-[#25D366]">{step.subtitle}</p>
                        <p className="mt-2 text-gray-400 text-sm">{step.description}</p>
                    </div>
                </AnimatedElement>
            ))}
        </div>
    </SectionContainer>
);

const TechLogos = () => (
    <SectionContainer className="bg-white">
        <div className="text-center">
            <AnimatedElement>
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#181818]">Built on Proven Technology</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
                <div className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 max-w-4xl mx-auto">
                    {TECH_LOGOS.map(logo => (
                        <span key={logo} className="text-gray-500 font-medium px-3 py-1 bg-gray-100 rounded-lg">{logo}</span>
                    ))}
                </div>
            </AnimatedElement>
        </div>
    </SectionContainer>
);

const FAQItem: React.FC<{ item: FAQItemInfo; }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <AnimatedElement className="border-b border-gray-200 py-6">
            <button className="w-full flex justify-between items-center text-left" onClick={() => setIsOpen(!isOpen)}>
                <h3 className="text-lg font-semibold text-[#181818]">{item.question}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <p className="pt-4 text-gray-600">{item.answer}</p>
                </div>
            </div>
        </AnimatedElement>
    );
}

const FAQ = () => (
    <SectionContainer id="faq" className="bg-white">
         <div className="text-center max-w-3xl mx-auto">
             <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#181818]">Frequently Asked Questions</h2>
            </AnimatedElement>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item) => (
                <FAQItem key={item.question} item={item} />
            ))}
        </div>
    </SectionContainer>
);

const FinalCTA = ({ onStartWizard }: { onStartWizard: () => void; }) => (
    <SectionContainer id="contact" className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Ready to build your AI project?</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
                <p className="mt-4 text-lg text-gray-200">Generate a custom brief in minutes with our AI wizard, or book a free consultation to discuss your project with our experts.</p>
            </AnimatedElement>
            <AnimatedElement delay={200}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={onStartWizard} className="px-8 py-3 rounded-full font-semibold bg-white text-black shadow-lg hover:opacity-90 transition-all transform hover:scale-105 w-full sm:w-auto">Create Your Brief Now</button>
                    <button className="px-8 py-3 rounded-full font-semibold bg-transparent border-2 border-white text-white w-full sm:w-auto">Schedule a Demo Call</button>
                </div>
            </AnimatedElement>
        </div>
    </SectionContainer>
);

const Footer = ({ onStartWizard, onNavigate }: { onStartWizard: () => void; onNavigate: (page: string) => void; }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const [page, hash] = href.split('#');
        onNavigate(page || 'home');
        
        setTimeout(() => {
            if (hash) {
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <footer className="bg-white text-[#181818]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#FF7A2F] rounded-full text-white flex items-center justify-center font-bold text-lg">A</span>
                            <span className="text-xl font-semibold text-[#181818]">AMO AI</span>
                        </a>
                        <p className="mt-4 text-gray-600 text-sm">We build AI-powered platforms with speed, automation, and reliability.</p>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider">Solutions</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'ai-web-dev')} className="text-gray-600 hover:text-[#181818]">AI Web Development</a></li>
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'home#services')} className="text-gray-600 hover:text-[#181818]">WhatsApp Automation</a></li>
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'home#process')} className="text-gray-600 hover:text-[#181818]">Process Automation</a></li>
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider">Resources</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'home#use-cases')} className="text-gray-600 hover:text-[#181818]">Case Studies</a></li>
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'home#progress')} className="text-gray-600 hover:text-[#181818]">Progress</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-[#181818]">Blog</a></li>
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'home#faq')} className="text-gray-600 hover:text-[#181818]">FAQ & Support</a></li>
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider">Legal</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><a href="#" className="text-gray-600 hover:text-[#181818]">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-[#181818]">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                             <button onClick={onStartWizard} className="px-5 py-2.5 w-full rounded-full font-medium text-sm bg-[#FF7A2F] text-white">Book a Consultation</button>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} AMO AI — All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

// --- AI BRIEF WIZARD ---

const WIZARD_STEPS = ["Project Basics", "Add-on Services", "Customize Scope", "Finalize"];

const WIZARD_QUESTIONS = [
    { id: 'projectType', question: 'First, what type of AI project are you planning?', options: ['AI Web Design', 'Social Media AI', 'Process Automation', 'Other'] },
    { id: 'primaryGoal', question: 'Great! What is your primary goal for this project?', options: ['Generate Leads', 'Increase Sales', 'Improve Support', 'Boost Engagement'] },
    { id: 'timeline', question: 'And what is your ideal timeline?', options: ['2-4 Weeks', '1-2 Months', '3-6 Months', 'Flexible'] },
    { id: 'budget', question: 'Finally, what is your estimated budget range?', options: ['<$10k', '$10k - $50k', '$50k - $150k', '$150k+'] },
];

const WIZARD_SERVICES = [
    { id: 'webDev', icon: <CodeIcon/>, title: "Web Design & Development", description: "Modern UI built with React/Next.js and Tailwind." },
    { id: 'social', icon: <Share2Icon/>, title: "AI Social Media Marketing", description: "Automated content, chatbots, influencer analysis." },
    { id: 'automation', icon: <ZapIcon/>, title: "AI Automation & Integration", description: "Workflow design, CopilotKit orchestration, database & deployment." },
    { id: 'data', icon: <DatabaseIcon/>, title: "Data Infrastructure & Analytics", description: "Supabase, LangChain, real-time dashboards." }
];

const WelcomeStep = ({ onStart }: { onStart: () => void; }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 bg-[#FF7A2F]/10 rounded-full flex items-center justify-center mb-6">
            <BotIcon className="w-8 h-8 text-[#FF7A2F]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Let’s build your AI project brief</h1>
        <p className="mt-4 text-lg text-gray-400 max-w-xl">Answer a few questions and get a complete project scope tailored for AMO AI in under 5 minutes.</p>
        <button onClick={onStart} className="mt-8 px-8 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white transition-all transform hover:scale-105 hover:bg-[#FFC96A] hover:text-black">
            Start Building <ArrowRightIcon className="inline-block ml-2"/>
        </button>
    </div>
);

const QuestionsStep = ({ brief, updateBrief, nextStep }: { brief: any, updateBrief: (data: any) => void, nextStep: () => void }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (currentQuestionIndex < WIZARD_QUESTIONS.length) {
            const question = WIZARD_QUESTIONS[currentQuestionIndex];
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: question.question, options: question.options, id: question.id }]);
                setIsTyping(false);
            }, 1000);
        } else {
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: "Perfect, that's all the basic info I need." }]);
                setTimeout(nextStep, 1500);
            }, 1000);
        }
    }, [currentQuestionIndex, nextStep]);
    
    const handleAnswer = (questionId: string, answer: string) => {
        updateBrief({ [questionId]: answer });
        setMessages(prev => [...prev.slice(0, -1), { type: 'bot', text: prev[prev.length - 1].text }, { type: 'user', text: answer }]);
        setIsTyping(true);
        setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 500);
    };

    return (
        <div className="p-4 md:p-8 flex flex-col h-full">
            <div className="flex-grow overflow-y-auto space-y-6 pr-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 transition-all duration-500 animate-fade-in-up ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.type === 'bot' && <div className="w-8 h-8 bg-[#1F2937] rounded-full flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5 text-[#FF7A2F]"/></div>}
                        <div className={`p-4 rounded-2xl max-w-md ${msg.type === 'bot' ? 'bg-[#121318] rounded-bl-none' : 'bg-[#FF7A2F] text-white rounded-br-none'}`}>
                            <p>{msg.text}</p>
                            {msg.options && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {msg.options.map((opt: string) => (
                                        <button key={opt} onClick={() => handleAnswer(msg.id, opt)} className="px-4 py-2 text-sm bg-gray-700/50 hover:bg-gray-600 rounded-full transition-colors">
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && <div className="flex items-end gap-3"><div className="w-8 h-8 bg-[#1F2937] rounded-full flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5 text-[#FF7A2F]"/></div><div className="p-4 rounded-2xl max-w-md bg-[#121318] rounded-bl-none"><div className="flex gap-1.5 items-center"><div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div><div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div><div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></div></div></div></div>}
                <div ref={chatEndRef} />
            </div>
        </div>
    );
};

const ServicesStep = ({ brief, updateBrief, nextStep, prevStep }: { brief: any, updateBrief: (data: any) => void, nextStep: () => void, prevStep: () => void }) => {
    const toggleService = (serviceId: string) => {
        const currentServices = brief.services || [];
        const newServices = currentServices.includes(serviceId)
            ? currentServices.filter((id: string) => id !== serviceId)
            : [...currentServices, serviceId];
        updateBrief({ services: newServices });
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold tracking-tight">Add optional services</h2>
            <p className="mt-2 text-gray-400">Select any additional services to include in your project scope.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
                {WIZARD_SERVICES.map(service => (
                    <button key={service.id} onClick={() => toggleService(service.id)} className={`p-6 bg-[#121318] border-2 rounded-2xl text-left transition-all duration-300 ${brief.services?.includes(service.id) ? 'border-[#FF7A2F]' : 'border-gray-700 hover:border-gray-600'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 text-[#FFC96A]">{service.icon}</div>
                            <h3 className="font-semibold">{service.title}</h3>
                            <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${brief.services?.includes(service.id) ? 'bg-[#FF7A2F] border-[#FF7A2F]' : 'border-gray-500'}`}>
                                {brief.services?.includes(service.id) && <CheckIcon stroke="white" strokeWidth="3" className="w-3 h-3"/>}
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-400">{service.description}</p>
                    </button>
                ))}
            </div>
            <div className="flex gap-4 mt-8">
                <button onClick={prevStep} className="px-6 py-3 rounded-full font-semibold bg-[#1F2937] text-white transition-colors hover:bg-gray-700">Back</button>
                <button onClick={nextStep} className="px-6 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white transition-all transform hover:scale-105 hover:bg-[#FFC96A] hover:text-black">Continue</button>
            </div>
        </div>
    );
};

const CustomizeStep = ({ brief, updateBrief, nextStep, prevStep }: { brief: any, updateBrief: (data: any) => void, nextStep: () => void, prevStep: () => void }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateBrief({ [e.target.name]: e.target.value });
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold tracking-tight">Customize Your Scope</h2>
            <p className="mt-2 text-gray-400">Review and make any final adjustments to your project brief.</p>
            <div className="space-y-6 mt-8">
                <div>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-400">Project Name (Optional)</label>
                    <input type="text" name="projectName" id="projectName" value={brief.projectName || ''} onChange={handleInputChange} className="mt-1 block w-full bg-[#121318] border-gray-700 rounded-lg p-3 focus:ring-[#FF7A2F] focus:border-[#FF7A2F]"/>
                </div>
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-400">Additional Notes</label>
                    <textarea name="notes" id="notes" rows={4} value={brief.notes || ''} onChange={handleInputChange} className="mt-1 block w-full bg-[#121318] border-gray-700 rounded-lg p-3 focus:ring-[#FF7A2F] focus:border-[#FF7A2F]"/>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-400">Priority Support</h3>
                    <div className="mt-2 p-4 bg-[#121318] rounded-lg flex items-center justify-between">
                        <p>Add 3 months of 24/7 monitoring and support.</p>
                        <button onClick={() => updateBrief({ support: !brief.support })} className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${brief.support ? 'bg-[#FF7A2F]' : 'bg-gray-600'}`}>
                            <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${brief.support ? 'translate-x-5' : 'translate-x-0'}`}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <button onClick={prevStep} className="px-6 py-3 rounded-full font-semibold bg-[#1F2937] text-white transition-colors hover:bg-gray-700">Back</button>
                <button onClick={nextStep} className="px-6 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white transition-all transform hover:scale-105 hover:bg-[#FFC96A] hover:text-black">Finalize Brief</button>
            </div>
        </div>
    );
};

const ThankYouStep = ({ brief, onReset }: { brief: any, onReset: () => void }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mb-6 animate-pulse"/>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">All set, your brief is ready.</h1>
        <p className="mt-4 text-lg text-gray-400 max-w-xl">We’ll review it and you’ll get a full project proposal within 24 hours.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
             <button className="px-8 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white transition-all transform hover:scale-105 hover:bg-[#FFC96A] hover:text-black flex items-center gap-2">
                <DownloadIcon className="w-5 h-5"/> Download PDF
            </button>
            <button onClick={onReset} className="px-8 py-3 rounded-full font-semibold bg-[#1F2937] text-white transition-colors hover:bg-gray-700">Start a New Brief</button>
        </div>
        <p className="mt-12 text-sm text-gray-500">Already have a design? Bring it to us and we’ll accelerate your build.</p>
    </div>
);

const BriefPreview = ({ brief }: { brief: any }) => {
    const getServiceName = (id: string) => WIZARD_SERVICES.find(s => s.id === id)?.title || id;

    const renderItem = (label: string, value: string | undefined) => {
        if (!value) return null;
        return (
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-400">{label}</dt>
                <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">{value}</dd>
            </div>
        );
    };

    return (
        <div className="bg-[#121318] h-full p-8 sticky top-0">
            <h3 className="text-xl font-semibold text-white">Project Overview</h3>
            <div className="mt-6 border-t border-gray-700">
                <dl className="divide-y divide-gray-700">
                    {renderItem("Project Name", brief.projectName)}
                    {renderItem("Project Type", brief.projectType)}
                    {renderItem("Primary Goal", brief.primaryGoal)}
                    {renderItem("Timeline", brief.timeline)}
                    {renderItem("Budget", brief.budget)}
                    {brief.services && brief.services.length > 0 && (
                        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-400">Add-on Services</dt>
                            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                                <ul className="space-y-1">{brief.services.map((s: string) => <li key={s}>- {getServiceName(s)}</li>)}</ul>
                            </dd>
                        </div>
                    )}
                    {renderItem("Support", brief.support ? "3 months, 24/7" : "None")}
                    {renderItem("Notes", brief.notes)}
                </dl>
            </div>
        </div>
    );
};

const AIBriefWizard = ({ onExit }: { onExit: () => void; }) => {
    const [step, setStep] = useState(0);
    const [brief, setBrief] = useState({});

    const updateBrief = (data: any) => setBrief(prev => ({ ...prev, ...data }));
    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);
    const reset = () => {
        setStep(0);
        setBrief({});
    };

    const stepComponents = [
        <WelcomeStep onStart={nextStep} />,
        <QuestionsStep brief={brief} updateBrief={updateBrief} nextStep={nextStep} />,
        <ServicesStep brief={brief} updateBrief={updateBrief} nextStep={nextStep} prevStep={prevStep} />,
        <CustomizeStep brief={brief} updateBrief={updateBrief} nextStep={nextStep} prevStep={prevStep} />,
        <ThankYouStep brief={brief} onReset={reset} />,
    ];

    const currentStepComponent = stepComponents[step];

    return (
        <div className="bg-[#0B0C10] text-white min-h-screen font-sans antialiased">
            <header className="p-4 flex justify-between items-center absolute top-0 left-0 w-full z-10">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#FF7A2F] rounded-full text-white flex items-center justify-center font-bold text-lg">A</span>
                    <span className="text-xl font-semibold text-white">AMO AI</span>
                </div>
                <button onClick={onExit} className="w-10 h-10 rounded-full bg-[#1F2937]/50 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <XIcon className="w-6 h-6"/>
                </button>
            </header>
            
            <main className="pt-20">
                {step > 0 && step < stepComponents.length && (
                     <div className="px-8 mb-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-[#FF7A2F] h-2 rounded-full transition-all duration-500" style={{ width: `${(step / (WIZARD_STEPS.length)) * 100}%` }}></div>
                        </div>
                        <p className="text-right mt-2 text-sm text-gray-400">Step {step} of {WIZARD_STEPS.length}: {WIZARD_STEPS[step-1]}</p>
                    </div>
                )}

                {step === 0 || step === stepComponents.length - 1 ? (
                    <div className="h-[calc(100vh-80px)]">{currentStepComponent}</div>
                ) : (
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 lg:w-3/5 min-h-[60vh] md:min-h-0 md:h-[calc(100vh-130px)]">{currentStepComponent}</div>
                        <div className="w-full md:w-1/2 lg:w-2/5 md:h-[calc(100vh-130px)] md:overflow-y-auto">
                            <BriefPreview brief={brief} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

// --- LANDING PAGE (WHATSAPP) ---
const LandingPage = ({ onStartWizard }: { onStartWizard: () => void; }) => (
    <main>
        <Hero onStartWizard={onStartWizard} />
        <CoreServices />
        <UseCases id="use-cases" />
        <ProgressSection id="progress" />
        <ProgressCTA onStartWizard={onStartWizard} />
        <WhatsappProcess />
        <TechLogos />
        <FAQ />
        <FinalCTA onStartWizard={onStartWizard} />
    </main>
);

// --- AI WEB DEV PAGE ---

const AI_WEB_DEV_PROCESS_STEPS = [
    { icon: <UserIcon/>, title: "Client Brief", description: "Your ideas in plain English." },
    { icon: <BrainCircuitIcon/>, title: "AI Understanding", description: "Our systems interpret your vision." },
    { icon: <PaletteIcon/>, title: "Design Generation", description: "Generate layouts, colors, and UI." },
    { icon: <CopyIcon/>, title: "Content Creation", description: "AI crafts headlines, copy, & imagery." },
    { icon: <CodeIcon/>, title: "Code Generation", description: "Design to clean HTML, CSS & JS." },
    { icon: <TrendingUpIcon/>, title: "Optimization & Launch", description: "Fine-tune for SEO & performance." },
];

const AI_WEB_DEV_BENEFITS = [
    { icon: <FastForwardIcon />, title: "Speed", description: "Build full websites in minutes instead of weeks." },
    { icon: <DollarSignIcon />, title: "Cost Efficiency", description: "Reduces hours of manual coding and design." },
    { icon: <CopyIcon />, title: "Consistency", description: "Maintains brand alignment automatically." },
    { icon: <TrendingUpIcon />, title: "Scalability", description: "Easily generate multiple pages or variations." },
    { icon: <UserCheckIcon />, title: "Accessibility", description: "AI ensures design compliance (contrast, alt text)." },
    { icon: <SearchIcon />, title: "SEO Optimization", description: "Auto-generates metadata and keyword-optimized copy." },
    { icon: <UserIcon />, title: "User Personalization", description: "Dynamic content based on visitor behavior." },
    { icon: <BarChart2Icon />, title: "Data-Driven Decisions", description: "AI analytics suggest improvements from interactions." },
];

const AIWebDevHero = ({ onStartWizard }: { onStartWizard: () => void; }) => (
    <SectionContainer className="bg-[#FDF7F2] text-center pt-24 md:pt-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,122,47,0.05),_transparent_40%)] -z-10"></div>
        <AnimatedElement>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0B0C10] tracking-tighter">AI Web Design & Development</h1>
        </AnimatedElement>
        <AnimatedElement delay={100}>
            <p className="text-xl md:text-2xl font-serif italic text-[#0B0C10] mt-4">The Future of Smarter Websites is Here.</p>
        </AnimatedElement>
        <AnimatedElement delay={200}>
            <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-700">
                Turn Prompts into Production-Ready Websites. AMO AI transforms your ideas into fast, scalable, and beautiful web experiences, guided by intelligence at every step.
            </p>
        </AnimatedElement>
        <AnimatedElement delay={300}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={onStartWizard} className="px-8 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white shadow-lg hover:bg-[#FFC96A] hover:text-black transition-all transform hover:scale-105 w-full sm:w-auto">Start Your AI Brief →</button>
                <a href="#process" className="px-8 py-3 rounded-full font-semibold bg-transparent text-[#0B0C10] border-2 border-[#0B0C10] hover:bg-[#0B0C10]/5 transition-all w-full sm:w-auto">View the Process</a>
            </div>
        </AnimatedElement>
    </SectionContainer>
);

const AIWebDevProcess = () => {
    const processRef = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(processRef, { threshold: 0.2 });

    return (
        <SectionContainer id="process" className="bg-white">
            <div className="text-center max-w-3xl mx-auto">
                <AnimatedElement>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0B0C10]">Our AI-Powered Process</h2>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="mt-4 text-lg text-gray-600 font-serif italic">From vision to live site — every step guided by intelligence.</p>
                </AnimatedElement>
            </div>
            <div ref={processRef} className="mt-20 max-w-6xl mx-auto">
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-gray-200">
                        <div className="h-0.5 bg-gradient-to-r from-[#FF7A2F] to-[#FFC96A] transition-all duration-1000 ease-out" style={{width: onScreen ? '100%' : '0%'}}></div>
                    </div>
                    <div className="grid md:grid-cols-6 gap-x-8 gap-y-12">
                        {AI_WEB_DEV_PROCESS_STEPS.map((step, index) => (
                            <div key={step.title} className="relative flex md:flex-col items-center text-center group">
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500 ease-out ${onScreen ? 'border-[#FF7A2F] scale-100' : 'border-gray-200 scale-90'}`} style={{transitionDelay: `${index * 150}ms`}}>
                                    <div className={`text-gray-400 transition-colors duration-500 ${onScreen ? 'text-[#FF7A2F]' : ''}`} style={{transitionDelay: `${index * 150}ms`}}>
                                        {React.cloneElement(step.icon as React.ReactElement, { className: "w-8 h-8 md:w-10 md:h-10" })}
                                    </div>
                                </div>
                                <div className="md:mt-6 ml-6 md:ml-0">
                                    <h4 className="text-md font-semibold text-[#0B0C10]">{step.title}</h4>
                                    <p className="mt-1 text-gray-600 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

const AIWebDevDataViz = () => (
    <SectionContainer id="data" className="bg-[#0B0C10] text-white">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Results That Speak</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
                <p className="mt-4 text-lg text-gray-400">Measurable outcomes from AI-driven web design that impact your bottom line.</p>
            </AnimatedElement>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
            <AnimatedElement className="bg-[#121318] p-8 rounded-2xl border border-gray-800 text-center flex flex-col justify-center">
                <p className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF7A2F] to-[#FFC96A]">
                    <Counter endValue={60} duration={2000} />%
                </p>
                <h3 className="mt-2 text-xl font-semibold">Faster Build Time</h3>
                <p className="text-gray-400 mt-1">From months to weeks.</p>
            </AnimatedElement>
            <AnimatedElement delay={100} className="bg-[#121318] p-8 rounded-2xl border border-gray-800 text-center flex flex-col justify-center">
                <p className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF7A2F] to-[#FFC96A]">
                    <Counter endValue={40} duration={2000} />%
                </p>
                <h3 className="mt-2 text-xl font-semibold">Reduced Costs</h3>
                 <p className="text-gray-400 mt-1">Less manual overhead.</p>
            </AnimatedElement>
            <AnimatedElement delay={200} className="bg-[#121318] p-8 rounded-2xl border border-gray-800 text-center flex flex-col justify-center">
                <p className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF7A2F] to-[#FFC96A]">
                    <Counter endValue={98} duration={2000} />%
                </p>
                <h3 className="mt-2 text-xl font-semibold">Design Accuracy</h3>
                <p className="text-gray-400 mt-1">Perfect brand alignment.</p>
            </AnimatedElement>
        </div>
    </SectionContainer>
);

const AIWebDevBenefits = () => (
    <SectionContainer id="benefits" className="bg-[#FDF7F2]">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0B0C10]">Key Benefits of AI Web Design</h2>
            </AnimatedElement>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {AI_WEB_DEV_BENEFITS.map((benefit, index) => (
                <AnimatedElement key={benefit.title} delay={100 * index}>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200/80 h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#FFC96A]">
                        <div className="w-12 h-12 flex items-center justify-center text-[#FF7A2F] transition-transform duration-300 group-hover:scale-110">
                           {React.cloneElement(benefit.icon as React.ReactElement, { className: "w-8 h-8" })}
                        </div>
                        <h4 className="mt-4 text-lg font-semibold text-[#0B0C10]">{benefit.title}</h4>
                        <p className="mt-1 text-gray-600">{benefit.description}</p>
                    </div>
                </AnimatedElement>
            ))}
        </div>
    </SectionContainer>
);

const AIWebDevCTA = ({ onStartWizard }: { onStartWizard: () => void; }) => (
     <SectionContainer className="bg-gradient-to-r from-[#FF7A2F] to-[#FFC96A] relative">
        <div className="absolute inset-0 bg-repeat bg-center" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <div className="text-center max-w-3xl mx-auto relative">
            <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">Ready to Build Smarter?</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
                <p className="mt-4 text-lg text-white/90">Join hundreds of businesses using AMO AI for intelligent web design and automation that drives real results.</p>
            </AnimatedElement>
            <AnimatedElement delay={200}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={onStartWizard} className="px-8 py-3 rounded-full font-semibold bg-white text-black shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 w-full sm:w-auto">Start My AI Project →</button>
                    <button className="px-8 py-3 rounded-full font-semibold bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all w-full sm:w-auto">Book a Strategy Call</button>
                </div>
            </AnimatedElement>
        </div>
    </SectionContainer>
);

const AIWebDevPage = ({ onStartWizard }: { onStartWizard: () => void; }) => (
    <main>
        <AIWebDevHero onStartWizard={onStartWizard} />
        <AIWebDevProcess />
        <AIWebDevDataViz />
        <AIWebDevBenefits />
        <AIWebDevCTA onStartWizard={onStartWizard} />
    </main>
);

// --- MAIN APP COMPONENT ---
export default function App() {
    const [view, setView] = useState('landing'); // landing, wizard
    const [currentPage, setCurrentPage] = useState('home'); // home, ai-web-dev

    const startWizard = () => setView('wizard');
    const exitWizard = () => setView('landing');
    
    const handleNavigate = (page: string) => {
        setCurrentPage(page);
    };

    if (view === 'wizard') {
        return <AIBriefWizard onExit={exitWizard} />;
    }

    return (
        <div className="bg-white text-[#0B0C10] antialiased">
            <Header onStartWizard={startWizard} onNavigate={handleNavigate} currentPage={currentPage} />
            
            {currentPage === 'home' && <LandingPage onStartWizard={startWizard} />}
            {currentPage === 'ai-web-dev' && <AIWebDevPage onStartWizard={startWizard} />}

            <Footer onStartWizard={startWizard} onNavigate={handleNavigate} />
        </div>
    );
}