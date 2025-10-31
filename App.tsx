

import React, { useState, useEffect, useRef } from 'react';

// --- TYPE DEFINITIONS ---
interface NavLink {
  href: string;
  label: string;
}

interface MetricCardInfo {
    metric: string;
    label: string;
    description: string;
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

interface ResultInfo {
    icon: React.ReactNode;
    title: string;
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    change: string;
    description: string;
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


// Fix: Made the 'children' prop optional to resolve the TypeScript error.
const ServiceIcon = ({ children }: { children?: React.ReactNode }) => (
    <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
        {children}
    </div>
);

// --- DATA CONSTANTS ---

const NAV_LINKS: NavLink[] = [
    { href: "#", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
];

const METRIC_CARDS: MetricCardInfo[] = [
    { metric: "98%", label: "Open Rate", description: "vs 20% for email - your messages actually get seen." },
    { metric: "70%", label: "Response Rate", description: "Customers engage instantly with automated conversations." },
    { metric: "5-10x", label: "ROI Potential", description: "From automated sales, support, and customer retention." }
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

const RESULTS: ResultInfo[] = [
    {
        icon: <ClockIcon className="w-6 h-6" />,
        title: "Response Time",
        value: 2,
        prefix: "< ",
        suffix: " min",
        change: "From 2 hours",
        description: "Engage customers instantly, day or night, reducing wait times by over 98%."
    },
    {
        icon: <FilterIcon className="w-6 h-6" />,
        title: "Missed Leads",
        value: 5,
        prefix: "< ",
        suffix: "%",
        change: "Down from 40%",
        description: "Capture and qualify every inquiry automatically, ensuring no potential customer slips through."
    },
    {
        icon: <TrendingUpIcon className="w-6 h-6" />,
        title: "Conversion Rate",
        value: 216,
        prefix: "+",
        suffix: "%",
        change: "Average increase",
        description: "Guide users from conversation to conversion with automated product suggestions and checkouts."
    },
    {
        icon: <SmileIcon className="w-6 h-6" />,
        title: "Customer Satisfaction",
        value: 9.4,
        decimals: 1,
        suffix: " / 10",
        change: "Up from 7/10",
        description: "Provide consistent, high-quality support that resolves issues faster and builds brand loyalty."
    }
];

const WHATSAPP_PROCESS_STEPS: ProcessStepInfo[] = [
    { step: 1, title: "Discovery Call", subtitle: "Understand Your Goals", description: "We start with a short consultation to map your communication needs, pain points, and automation potential." },
    { step: 2, title: "Workflow Blueprint", subtitle: "Design Your Automation Flow", description: "Our experts design a custom WhatsApp journey — from first message to sale or booking." },
    { step: 3, title: "Development & Integration", subtitle: "Build and Connect Everything", description: "We integrate with your WhatsApp Business API, CRM, Supabase, and any payment gateway you use." },
    { step: 4, title: "AI Training & Testing", subtitle: "Train Your Chat Agents", description: "We teach your Copilot to answer real customer questions, qualify leads, and adapt over time." },
    { step: 5, title: "Launch & Optimize", subtitle: "Go Live & Measure Results", description: "Once launched, we monitor performance, tweak flows, and report conversions every week." },
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
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/80' : 'bg-white'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#FF7A2F] rounded-full text-white flex items-center justify-center font-bold text-lg">A</span>
                        <span className="text-xl font-semibold text-[#181818]">AMO AI</span>
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map(link => (
                            <a key={link.label} href={link.href} className="text-sm font-medium text-gray-600 hover:text-[#181818] transition-colors">{link.label}</a>
                        ))}
                    </div>
                    <div className="hidden md:block">
                        <button className="px-5 py-2.5 rounded-full font-medium text-sm bg-[#FF7A2F] text-white transition-transform transform hover:scale-105">Get Started</button>
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
                            {NAV_LINKS.map(link => (<a key={link.label} href={link.href} className="text-[#181818] hover:text-[#25D366] transition-colors block" onClick={() => setIsOpen(false)}>{link.label}</a>))}
                            <button className="w-full px-5 py-2.5 rounded-full font-medium text-sm bg-[#FF7A2F] text-white">Get Started</button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

const Hero = () => (
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
                    <button className="mt-8 px-8 py-4 rounded-full font-semibold text-white bg-[#25D366] shadow-lg hover:opacity-90 transition-all transform hover:scale-105">
                        <span className="mr-2">📞</span> Book a Free WhatsApp Automation Audit
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

const WhyMatters = () => (
    <SectionContainer className="bg-[#0B0C10] text-white">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Why WhatsApp Automation Matters</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
                <p className="mt-4 text-lg text-gray-400">Your customers are already on WhatsApp — we just make it work harder for you. Over 2 billion people use WhatsApp daily. AMO AI connects you to them with AI-powered chat flows, CRM integrations, and automated campaigns that scale your communication and sales — all through the official WhatsApp Business API.</p>
            </AnimatedElement>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            {METRIC_CARDS.map((card, index) => (
                <AnimatedElement key={card.label} delay={100 * index}>
                    <div className="bg-[#111111] p-8 rounded-2xl text-center border border-gray-800">
                        <p className="text-5xl font-bold text-[#25D366]">{card.metric}</p>
                        <p className="mt-2 text-xl font-semibold">{card.label}</p>
                        <p className="mt-2 text-gray-400 text-sm">{card.description}</p>
                    </div>
                </AnimatedElement>
            ))}
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

const UseCases = () => (
    <SectionContainer className="bg-[#0B0C10] text-white">
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

const Results = () => (
    <SectionContainer className="bg-[#F2F7F5]">
        <div className="text-center max-w-3xl mx-auto">
             <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#181818]">Results That Speak for Themselves</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
                <p className="mt-4 text-lg text-gray-600">Our WhatsApp automation solutions deliver measurable improvements across the entire customer lifecycle.</p>
            </AnimatedElement>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
            {RESULTS.map((result, index) => (
                <AnimatedElement key={result.title} delay={100 * (index + 1)}>
                    <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm h-full flex flex-col text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#25D366]/50">
                        <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                            {result.icon}
                        </div>
                        <p className="text-4xl lg:text-5xl font-bold text-[#181818] mt-6 tabular-nums">
                            {result.prefix}
                            <Counter endValue={result.value} decimals={result.decimals || 0} />
                            {result.suffix}
                        </p>
                        <h3 className="text-xl font-semibold text-[#181818] mt-2">{result.title}</h3>
                        <p className="text-sm text-gray-500">{result.change}</p>
                        <p className="mt-4 text-gray-600 text-base leading-relaxed flex-grow">{result.description}</p>
                    </div>
                </AnimatedElement>
            ))}
        </div>
    </SectionContainer>
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
        <AnimatedElement delay={500}>
            <div className="text-center mt-20">
                <button className="px-8 py-4 rounded-full font-semibold text-black bg-[#25D366] shadow-lg hover:opacity-90 transition-all transform hover:scale-105">Start Your WhatsApp Project</button>
                <p className="mt-4 text-sm text-gray-400">Launch in as little as 2 weeks.</p>
            </div>
        </AnimatedElement>
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

const FinalCTA = () => (
    <SectionContainer id="contact" className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white">
        <div className="text-center max-w-3xl mx-auto">
            <AnimatedElement>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Let’s automate your business on WhatsApp — start today.</h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
                <p className="mt-4 text-lg text-gray-200">Whether you want faster sales responses, automated booking, or AI-driven campaigns, our team will design and deploy your WhatsApp system — from strategy to launch.</p>
            </AnimatedElement>
            <AnimatedElement delay={200}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-3 rounded-full font-semibold bg-white text-black shadow-lg hover:opacity-90 transition-all transform hover:scale-105 w-full sm:w-auto">Book a Consultation</button>
                    <button className="px-8 py-3 rounded-full font-semibold bg-transparent border-2 border-white text-white w-full sm:w-auto">Schedule a Demo Call</button>
                </div>
            </AnimatedElement>
        </div>
    </SectionContainer>
);

const Footer = () => (
    <footer className="bg-white text-[#181818]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                    <a href="#" className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#FF7A2F] rounded-full text-white flex items-center justify-center font-bold text-lg">A</span>
                        <span className="text-xl font-semibold text-[#181818]">AMO AI</span>
                    </a>
                    <p className="mt-4 text-gray-600 text-sm">We build AI-powered platforms with speed, automation, and reliability.</p>
                </div>
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider">Solutions</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-[#181818]">AI Development</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#181818]">WhatsApp Automation</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#181818]">Process Automation</a></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider">Resources</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-[#181818]">Case Studies</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#181818]">Blog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#181818]">FAQ & Support</a></li>
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
                         <button className="px-5 py-2.5 w-full rounded-full font-medium text-sm bg-[#FF7A2F] text-white">Book a Consultation</button>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} AMO AI — All Rights Reserved</p>
            </div>
        </div>
    </footer>
);

// --- MAIN APP COMPONENT ---
export default function App() {
    return (
        <div className="bg-white text-[#181818] antialiased">
            <Header />
            <main>
                <Hero />
                <WhyMatters />
                <CoreServices />
                <UseCases />
                <Results />
                <WhatsappProcess />
                <TechLogos />
                <FAQ />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    );
}