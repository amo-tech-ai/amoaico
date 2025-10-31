import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- TYPE DEFINITIONS ---
type Page = 'home' | 'services' | 'process' | 'projects' | 'about' | 'contact';

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

// --- DATA CONSTANTS ---
const NAV_LINKS: NavLink[] = [
    { href: "home", label: "Home" },
    { href: "services", label: "Services" },
    { href: "process", label: "Process" },
    { href: "projects", label: "Projects" },
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

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        onNavigate(page);
        setIsOpen(false);
    };

    return (
        <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-[#FFF7F1]/80 backdrop-blur-lg border-b border-black/5' : 'bg-[#FFF7F1]'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#FF7A2F] rounded-full text-white flex items-center justify-center font-bold font-poppins text-lg">A</span>
                        <span className="text-xl font-semibold text-[#0B0C10]">AMO AI</span>
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map(link => (
                            <a key={link.label} href={`#${link.href}`} onClick={(e) => handleNavClick(e, link.href)} className={`text-sm font-medium transition-colors ${currentPage === link.href ? 'text-[#0B0C10]' : 'text-gray-500 hover:text-[#0B0C10]'}`}>{link.label}</a>
                        ))}
                    </div>
                    <div className="hidden md:block">
                        <button onClick={onStartWizard} className="px-5 py-2.5 rounded-full font-medium text-sm bg-[#FF7A2F] text-white transition-transform transform hover:scale-105">Start Your AI Brief</button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            {isOpen ? <XIcon className="w-6 h-6 text-[#0B0C10]" /> : <MenuIcon className="w-6 h-6 text-[#0B0C10]" />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
                        <div className="flex flex-col space-y-4">
                            {NAV_LINKS.map(link => (<a key={link.label} href={`#${link.href}`} className="text-[#0B0C10] hover:text-[#FF7A2F] transition-colors block" onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>))}
                            <button onClick={() => { onStartWizard(); setIsOpen(false); }} className="w-full px-5 py-2.5 rounded-full font-medium text-sm bg-[#FF7A2F] text-white">Start Your AI Brief</button>
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
        <footer className="bg-[#0B0C10] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="border-t border-[#FFC96A]/20 mb-16"></div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2">
                             <span className="w-8 h-8 bg-[#FF7A2F] rounded-full text-white flex items-center justify-center font-bold font-poppins text-lg">A</span>
                            <span className="text-xl font-semibold">AMO AI</span>
                        </a>
                        <p className="mt-4 text-[#C5D7E0] text-sm">Built by Intelligence, Measured by Results.</p>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Company</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                {['about', 'process', 'projects'].map(p => <li key={p}><a href={`#${p}`} onClick={(e) => handleNavClick(e, p as Page)} className="text-[#C5D7E0] hover:text-white">{p.charAt(0).toUpperCase() + p.slice(1)}</a></li>)}
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Services</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'services')} className="text-[#C5D7E0] hover:text-white">AI Web Dev</a></li>
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'services')} className="text-[#C5D7E0] hover:text-white">AI App Dev</a></li>
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'services')} className="text-[#C5D7E0] hover:text-white">Social Media</a></li>
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'services')} className="text-[#C5D7E0] hover:text-white">WhatsApp</a></li>
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Resources</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                 <li><a href="#" className="text-[#C5D7E0] hover:text-white">Docs</a></li>
                                 <li><a href="#" className="text-[#C5D7E0] hover:text-white">Blog</a></li>
                                 <li><a href="#" onClick={(e) => handleNavClick(e, 'projects')} className="text-[#C5D7E0] hover:text-white">Case Studies</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Contact</h3>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="text-[#C5D7E0] hover:text-white">Email</a></li>
                                <li><a href="#" className="text-[#C5D7E0] hover:text-white">WhatsApp</a></li>
                                <li><a href="#" className="text-[#C5D7E0] hover:text-white">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} AMO AI — All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

// --- HOME PAGE ---
const HomePage = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    return (
        <main>
            {/* Hero Section */}
            <SectionContainer className="bg-[#FFF7F1] pt-16 md:pt-24 text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#0B0C10] tracking-tighter leading-tight max-w-4xl mx-auto">
                        Turn Ideas Into <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF7A2F] to-[#FFC96A]">AI-Powered</span> Applications in Weeks
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600">
                        Faster Launch. Smarter Automation. Measurable Growth. We build intelligent web and mobile apps that deliver results.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={onStartWizard} className="px-8 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white shadow-lg shadow-[#FF7A2F]/30 hover:opacity-90 transition-all transform hover:scale-105">Start Your AI Brief →</button>
                    <button className="px-8 py-3 rounded-full font-semibold text-[#0B0C10] bg-black/5 hover:bg-black/10 transition-all">See Live Projects</button>
                </AnimatedElement>
            </SectionContainer>
            
            {/* Core Services Section */}
            <SectionContainer className="bg-[#FFF7F1] pt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {HOME_CORE_SERVICES.map((service, index) => (
                        <AnimatedElement key={service.title} delay={100 * index}>
                            <div className="bg-white p-6 rounded-2xl border border-black/5 h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#FFC96A]/50">
                                <div className="w-12 h-12 flex items-center justify-center text-[#FF7A2F]">{service.icon}</div>
                                <h4 className="mt-4 text-lg font-semibold text-[#0B0C10]">{service.title}</h4>
                                <p className="mt-1 text-gray-600">{service.description}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* Tech Stack Section */}
            <SectionContainer className="bg-[#0B0C10] text-white">
                <div className="text-center">
                    <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold tracking-tighter">We Build With The Best</h2></AnimatedElement>
                    <AnimatedElement delay={100}>
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 max-w-4xl mx-auto">
                            {["CopilotKit", "LangChain", "Supabase", "OpenAI", "Vercel"].map(logo => (
                                <span key={logo} className="text-gray-400 text-lg font-semibold hover:text-white transition-colors">{logo}</span>
                            ))}
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>

            {/* Process Section */}
            <SectionContainer className="bg-[#004B6B]">
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">From Brief to Production in 8 Weeks</h2></AnimatedElement>
                </div>
                <div className="mt-16 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-[#FFC96A]/20"></div>
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {HOME_PROCESS_STEPS.map((step, index) => (
                            <AnimatedElement key={step.title} delay={150 * index}>
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-[#FFC96A] text-[#004B6B] flex items-center justify-center text-xl font-bold mb-4">{index + 1}</div>
                                    <h3 className="font-semibold text-white">{step.title}</h3>
                                    <p className="mt-1 text-[#C5D7E0] text-sm">{step.description}</p>
                                </div>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* Results Section */}
            <SectionContainer className="bg-[#FFF7F1]">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <AnimatedElement>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0B0C10]">Results That Speak for Themselves</h2>
                        </AnimatedElement>
                        <AnimatedElement delay={100}>
                            <p className="mt-4 text-lg text-gray-600">Our AI-driven approach doesn't just build apps faster—it builds them smarter, delivering tangible improvements to your key business metrics.</p>
                        </AnimatedElement>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        {HOME_RESULT_METRICS.map((metric, index) => (
                            <AnimatedElement key={metric.label} delay={150 * index} className="bg-white p-6 rounded-2xl border border-black/5 text-center">
                                <p className="text-4xl md:text-5xl font-bold font-poppins text-[#004B6B]">
                                    <Counter endValue={parseFloat(metric.value.replace(/[<+]/g, ''))} decimals={metric.label === "Satisfaction" ? 1 : 0} />
                                    {metric.unit}
                                </p>
                                <p className="mt-2 text-gray-600">{metric.label}</p>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* Investment Levels */}
            <SectionContainer>
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0B0C10]">Investment Levels</h2></AnimatedElement>
                 </div>
                 <div className="grid lg:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto items-center">
                    {INVESTMENT_LEVELS.map((level, i) => (
                        <AnimatedElement key={level.name} delay={100 * i} className={`p-8 rounded-3xl border ${level.recommended ? 'bg-[#004B6B] text-white border-transparent scale-105 shadow-2xl shadow-[#004B6B]/30' : 'bg-white border-black/10'}`}>
                            <h3 className={`text-xl font-semibold ${level.recommended ? 'text-[#FFC96A]' : 'text-[#0B0C10]'}`}>{level.name}</h3>
                            <p className={`text-4xl font-bold mt-4 font-poppins ${level.recommended ? 'text-white' : 'text-[#004B6B]'}`}>{level.price}</p>
                            <ul className={`mt-6 space-y-3 ${level.recommended ? 'text-[#C5D7E0]' : 'text-gray-600'}`}>
                                {level.features.map(f => <li key={f} className="flex items-center gap-3"><CheckIcon className="w-4 h-4" stroke={level.recommended ? '#FFC96A' : '#004B6B'} /> {f}</li>)}
                            </ul>
                            <button className={`w-full mt-8 py-3 rounded-full font-semibold transition-colors ${level.recommended ? 'bg-[#FFC96A] text-[#004B6B]' : 'bg-[#004B6B] text-white'}`}>Get Started</button>
                        </AnimatedElement>
                    ))}
                 </div>
            </SectionContainer>
            
            {/* Final CTA */}
            <SectionContainer className="bg-gradient-to-r from-[#FF7A2F] to-[#FFC96A]">
                <div className="text-center max-w-2xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">Ready to Build Something Extraordinary?</h2>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                           <button onClick={onStartWizard} className="px-8 py-3 rounded-full font-semibold bg-white text-black shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105">Start My AI Brief</button>
                           <button className="px-8 py-3 rounded-full font-semibold bg-transparent text-white border-2 border-white hover:bg-white/10 transition-all">Book Free Consultation</button>
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>
        </main>
    );
};

// --- OTHER PAGES (PLACEHOLDERS) ---
const PlaceholderPage = ({ title }: { title: string }) => (
    <SectionContainer className="bg-[#FFF7F1]">
        <div className="text-center py-24">
            <h1 className="text-4xl md:text-6xl font-bold text-[#0B0C10] tracking-tighter">{title}</h1>
            <p className="mt-4 text-lg text-gray-600">Content for this page is coming soon.</p>
        </div>
    </SectionContainer>
);

const ServicesPage = () => <PlaceholderPage title="Our Services" />;
const ProcessPage = () => <PlaceholderPage title="Our Process" />;
const ProjectsPage = () => <PlaceholderPage title="Our Projects" />;
const AboutPage = () => <PlaceholderPage title="About Us" />;
const ContactPage = () => <PlaceholderPage title="Contact Us" />;

// --- AI BRIEF WIZARD ---
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

const AIBriefWizard = ({ onExit }: { onExit: () => void; }) => {
    const [step, setStep] = useState(0); // 0: Welcome, 1: Questions, 2: Services, 3: Summary, 4: Thank you
    const [brief, setBrief] = useState<Record<string, any>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAnswer = (questionId: string, answer: string) => {
        setBrief(prev => ({ ...prev, [questionId]: answer }));
        if (currentQuestionIndex < WIZARD_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
        } else {
            setStep(2); // Move to services
        }
    };
    
    const toggleService = (serviceId: string) => {
        setBrief(prev => ({
            ...prev,
            services: {
                ...(prev.services || {}),
                [serviceId]: !prev.services?.[serviceId]
            }
        }));
    };

    const nextStep = () => setStep(s => s + 1);
    
    // Welcome Screen (step 0)
    if (step === 0) {
        return (
            <div className="fixed inset-0 bg-[#0B0C10]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8 text-white">
                <AnimatedElement className="bg-[#0B0C10] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                    <BotIcon className="w-16 h-16 mx-auto text-[#FFC96A]" />
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mt-6">Let’s build your AI project brief</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-xl">Answer a few questions and get a complete project scope tailored for AMO AI in under 5 minutes.</p>
                    <button onClick={nextStep} className="mt-8 px-8 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white transition-transform transform hover:scale-105">Start Building</button>
                    <button onClick={onExit} className="mt-4 text-sm text-gray-500 hover:text-white">Exit Wizard</button>
                </AnimatedElement>
            </div>
        );
    }
    
    // Thank you screen (step 4)
    if (step === 4) {
        return (
            <div className="fixed inset-0 bg-[#0B0C10]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8 text-white">
                 <AnimatedElement className="bg-[#0B0C10] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                    <CheckCircleIcon className="w-16 h-16 mx-auto text-green-400" />
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mt-6">All set, your brief is ready.</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-xl">We’ll review it and you’ll get a full project proposal within 24 hours.</p>
                    <button className="mt-8 px-8 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white transition-transform transform hover:scale-105 inline-flex items-center gap-2"><DownloadIcon className="w-5 h-5"/> Download PDF</button>
                    <button onClick={onExit} className="mt-4 text-sm text-gray-500 hover:text-white">Back to site</button>
                </AnimatedElement>
            </div>
        )
    }

    // Main Wizard flow
    return (
        <div className="fixed inset-0 bg-[#0B0C10]/80 backdrop-blur-sm z-50 text-white overflow-y-auto">
            <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-8">
                <div className="w-full max-w-2xl bg-[#0B0C10] border border-white/10 rounded-3xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold font-poppins">AI Brief Wizard</h2>
                         <button onClick={onExit} className="text-gray-500 hover:text-white text-2xl">&times;</button>
                    </div>

                    {/* Questions (Step 1) */}
                    {step === 1 && (
                        <AnimatedElement key={currentQuestionIndex}>
                            <h3 className="text-2xl md:text-3xl font-semibold mb-6">{WIZARD_QUESTIONS[currentQuestionIndex].question}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {WIZARD_QUESTIONS[currentQuestionIndex].options.map(option => (
                                    <button key={option} onClick={() => handleAnswer(WIZARD_QUESTIONS[currentQuestionIndex].id, option)}
                                        className="p-4 rounded-lg bg-[#121318] hover:bg-[#FF7A2F] text-left transition-colors">
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </AnimatedElement>
                    )}
                    
                    {/* Services (Step 2) */}
                    {step === 2 && (
                        <AnimatedElement>
                            <h3 className="text-2xl md:text-3xl font-semibold mb-6">Add optional services to your brief.</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {WIZARD_SERVICES.map(service => (
                                    <div key={service.id} onClick={() => toggleService(service.id)}
                                        className={`p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all border-2 ${brief.services?.[service.id] ? 'bg-[#004B6B] border-[#FFC96A]' : 'bg-[#121318] border-transparent hover:border-gray-700'}`}>
                                        <div className="flex-shrink-0 w-8 h-8 text-[#FFC96A]">{service.icon}</div>
                                        <div>
                                            <h4 className="font-semibold">{service.title}</h4>
                                            <p className="text-sm text-gray-400">{service.description}</p>
                                        </div>
                                        <div className={`ml-auto w-6 h-6 rounded-full flex items-center justify-center border-2 ${brief.services?.[service.id] ? 'bg-[#FFC96A] border-[#FFC96A]' : 'border-gray-500'}`}>
                                            {brief.services?.[service.id] && <CheckIcon className="w-4 h-4 text-[#004B6B]" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={nextStep} className="mt-8 w-full px-8 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white">Continue</button>
                        </AnimatedElement>
                    )}
                    
                    {/* Summary (Step 3) */}
                    {step === 3 && (
                         <AnimatedElement>
                            <h3 className="text-2xl md:text-3xl font-semibold mb-6">Review your brief.</h3>
                             <div className="bg-[#121318] p-6 rounded-lg max-h-60 overflow-y-auto">
                                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(brief, null, 2)}</pre>
                             </div>
                             <button onClick={nextStep} className="mt-8 w-full px-8 py-3 rounded-full font-semibold bg-[#FF7A2F] text-white">Finalize & Submit</button>
                        </AnimatedElement>
                    )}
                </div>
            </div>
        </div>
    )
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [view, setView] = useState('site'); // site, wizard
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const startWizard = () => setView('wizard');
    const exitWizard = () => setView('site');
    
    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);
    
    useEffect(() => {
        // Prevent scrolling on the body when the wizard is open
        if (view === 'wizard') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto' }; // Cleanup on unmount
    }, [view]);

    const renderPage = () => {
        switch(currentPage) {
            case 'home': return <HomePage onStartWizard={startWizard} />;
            case 'services': return <ServicesPage />;
            case 'process': return <ProcessPage />;
            case 'projects': return <ProjectsPage />;
            case 'about': return <AboutPage />;
            case 'contact': return <ContactPage />;
            default: return <HomePage onStartWizard={startWizard} />;
        }
    };

    return (
        <div className="bg-[#FFF7F1] text-[#0B0C10] antialiased">
            <Header onStartWizard={startWizard} onNavigate={handleNavigate} currentPage={currentPage} />
            {renderPage()}
            <Footer onStartWizard={startWizard} onNavigate={handleNavigate} />
            {view === 'wizard' && <AIBriefWizard onExit={exitWizard} />}
        </div>
    );
}
