

import React, { useState, useEffect } from 'react';

// --- TYPE DEFINITIONS ---
interface NavLink {
  href: string;
  label: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Tech {
  name: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface PricingTier {
  title: string;
  price: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  cta: string;
}

// --- SVG ICON COMPONENTS ---

const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z"/><path d="M12 2v3"/><path d="m4.93 4.93 2.12 2.12"/><path d="M2 12h3"/><path d="m4.93 19.07 2.12-2.12"/><path d="M12 19v3"/><path d="m16.95 16.95 2.12 2.12"/><path d="M19 12h3"/><path d="m16.95 7.05 2.12-2.12"/></svg>
);

const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.33-.04-3.08S5.21 15.66 4.5 16.5Z"/><path d="m12 15-3-3a2.25 2.25 0 0 1 0-3l3-3a2.25 2.25 0 0 1 3 0l3 3a2.25 2.25 0 0 1 0 3l-3 3a2.25 2.25 0 0 1-3 0Z"/><path d="M9 12V2.5l3 3-3 3"/><path d="M12 15V21.5"/><path d="M15 12V2.5l-3 3 3 3"/></svg>
);

const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 6 9 17l-5-5"/></svg>
);

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);


// --- DATA CONSTANTS ---

const NAV_LINKS: NavLink[] = [
  { href: "#", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

const FEATURES: Feature[] = [
  {
    icon: <BrainCircuitIcon className="w-8 h-8 text-[#E77E4D]" />,
    title: "Intelligent Applications",
    description: "AI-native solutions that learn, adapt, and automate complex tasks.",
  },
  {
    icon: <RocketIcon className="w-8 h-8 text-[#E77E4D]" />,
    title: "From Concept to Launch",
    description: "Our agile process takes your idea to a production-ready app in record time.",
  },
  {
    icon: <ZapIcon className="w-8 h-8 text-[#E77E4D]" />,
    title: "Automate Everything",
    description: "Streamline workflows and eliminate repetitive tasks with smart automation.",
  },
];

const TECH_STACK: Tech[] = [
    { name: "Supabase" }, { name: "CopilotKit" }, { name: "Claude 3" }, { name: "OpenAI GPT-4" },
    { name: "Next.js" }, { name: "Vercel" }, { name: "LangChain" }, { name: "Replicate" },
];

const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "Design Sprint", description: "We kick off with an intensive workshop to define your product vision, strategy, and core features." },
  { step: "02", title: "Rapid Build", description: "Our expert team builds your MVP using a modern tech stack, delivering a functional prototype in weeks." },
  { step: "03", title: "Integration & Testing", description: "We integrate with your existing systems and conduct rigorous testing to ensure a seamless, reliable experience." },
  { step: "04", title: "Launch & Scale", description: "Post-launch, we provide support and a roadmap for future iterations and scaling your application." },
];

const PRICING_TIERS: PricingTier[] = [
  {
    title: "Proof of Concept",
    price: "$15K+",
    description: "Validate your idea with a functional AI-powered MVP.",
    features: ["1 Core AI Feature", "Basic UI/UX Design", "2-4 Week Delivery", "Dedicated Project Manager"],
    isFeatured: false,
    cta: "Start Your MVP"
  },
  {
    title: "Production Ready",
    price: "$50K - $150K",
    description: "A robust, scalable application ready for your first users.",
    features: ["Up to 3 AI Features", "Full UI/UX & Branding", "4-8 Week Delivery", "Scalable Architecture", "Post-Launch Support"],
    isFeatured: true,
    cta: "Build My App"
  },
  {
    title: "Enterprise",
    price: "$200K+",
    description: "Custom solutions for complex business challenges.",
    features: ["Unlimited AI Features", "Advanced Security & Compliance", "Dedicated AI/ML Engineers", "On-Premise Deployment", "24/7 Enterprise Support"],
    isFeatured: false,
    cta: "Contact Us"
  },
];

// FIX: Moved UI component definitions before they are used to prevent "used before defined" errors.
// --- UI COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '' }: { children: React.ReactNode, variant?: 'primary' | 'secondary', className?: string }) => {
    const baseClasses = "px-6 py-3 rounded-full font-semibold transition-transform transform hover:scale-105";
    const variants = {
        primary: "bg-[#E77E4D] text-white shadow-lg hover:bg-opacity-90",
        secondary: "bg-transparent border-2 border-[#E6E2DF] text-[#181818] hover:bg-white/50",
    };
    return <button className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</button>;
};

const SectionContainer = ({ children, className = '', id = '' }: { children: React.ReactNode, className?: string, id?: string }) => (
    <section id={id} className={`w-full py-16 md:py-24 ${className}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    </section>
);


// --- PAGE SECTION COMPONENTS ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200/50' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-serif font-bold text-[#181818]">AMO AI</a>
          
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} className="text-[#181818] hover:text-[#E77E4D] transition-colors">{link.label}</a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="primary">Start Project</Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <XIcon className="w-6 h-6 text-[#181818]" /> : <MenuIcon className="w-6 h-6 text-[#181818]" />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href} className="text-[#181818] hover:text-[#E77E4D] transition-colors block" onClick={() => setIsOpen(false)}>{link.label}</a>
              ))}
              <Button variant="primary" className="w-full">Start Project</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const Hero = () => (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 -left-16 w-48 h-48 bg-[#F9C97B] rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-0 -right-16 w-48 h-48 bg-[#E77E4D] rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#025A63] rounded-full opacity-20 blur-xl"></div>
      
      <SectionContainer className="pt-24 md:pt-32 text-center">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#181818] tracking-tight leading-tight">
          Turn Ideas Into AI-Powered <br/> Applications in <span className="text-[#E77E4D]">Weeks</span>
        </h1>
        <p className="max-w-3xl mx-auto mt-6 text-lg md:text-xl text-gray-600">
          We build intelligent systems using CopilotKit, Supabase, and GPT-4 to help businesses automate, scale, and innovate — faster than ever.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" className="text-lg w-full sm:w-auto">Start Your AI Project</Button>
          <Button variant="secondary" className="text-lg w-full sm:w-auto">View Live Projects</Button>
        </div>
        <div className="mt-12 text-sm text-gray-500">
            <p>293% average ROI in 8 months. $3.5M in monthly client revenue already delivered.</p>
        </div>
      </SectionContainer>
    </div>
);

const FeaturesSection = () => (
    <SectionContainer id="services" className="bg-white/50">
        <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#181818]">Intelligent AI Solutions, Delivered Fast</h2>
            <p className="mt-4 text-lg text-gray-600">8 Weeks. Not 8 Months. That's our promise.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map(feature => (
            <div key={feature.title} className="bg-white p-8 rounded-2xl border border-[#E6E2DF] shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-[#FDF7F2] rounded-full mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#181818] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
    </SectionContainer>
);

const TechStack = () => (
    <div className="bg-[#025A63]">
        <SectionContainer>
            <div className="text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">We Build With The Best</h2>
                <p className="mt-4 text-lg text-white/80">Our technology stack is built on modern, scalable, and AI-native tools.</p>
                <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6">
                    {TECH_STACK.map(tech => (
                        <div key={tech.name} className="bg-white/10 text-white px-5 py-2 rounded-full text-sm md:text-base font-medium">
                            {tech.name}
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    </div>
);

const Process = () => (
    <SectionContainer id="process">
        <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#181818]">Our Proven Process</h2>
            <p className="mt-4 text-lg text-gray-600">From initial idea to scalable application, we guide you every step of the way.</p>
        </div>
        <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#E6E2DF] -translate-y-1/2"></div>
            <div className="grid md:grid-cols-4 gap-12">
                {PROCESS_STEPS.map((step, index) => (
                    <div key={step.step} className="relative">
                        <div className="md:hidden absolute top-0 left-4 bottom-0 w-0.5 bg-[#E6E2DF]"></div>
                        <div className="flex items-center md:flex-col md:items-center md:text-center gap-6 md:gap-0">
                           <div className="relative z-10 flex-shrink-0">
                             <div className="w-12 h-12 flex items-center justify-center bg-[#FDF7F2] border-2 border-[#E6E2DF] text-[#025A63] font-bold text-lg rounded-full">
                                {step.step}
                             </div>
                           </div>
                           <div className="md:mt-6">
                               <h3 className="text-xl font-semibold text-[#181818] mb-2">{step.title}</h3>
                               <p className="text-gray-600">{step.description}</p>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </SectionContainer>
);

const Pricing = () => (
    <SectionContainer id="pricing" className="bg-white/50">
        <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#181818]">Investment Levels</h2>
            <p className="mt-4 text-lg text-gray-600">Clear pricing for every stage of your AI journey.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
            {PRICING_TIERS.map(tier => (
                <div key={tier.title} className={`p-8 rounded-2xl border transition-all duration-300 ${tier.isFeatured ? 'bg-[#025A63] text-white border-transparent shadow-2xl scale-105' : 'bg-white border-[#E6E2DF] shadow-sm'}`}>
                    <h3 className={`font-serif text-2xl font-bold ${tier.isFeatured ? 'text-white' : 'text-[#181818]'}`}>{tier.title}</h3>
                    <p className={`mt-2 ${tier.isFeatured ? 'text-white/80' : 'text-gray-600'}`}>{tier.description}</p>
                    <p className={`font-serif text-4xl font-bold my-6 ${tier.isFeatured ? 'text-[#F9C97B]' : 'text-[#181818]'}`}>{tier.price}</p>
                    <ul className="space-y-3">
                        {tier.features.map(feature => (
                            <li key={feature} className="flex items-start">
                                <CheckIcon className={`flex-shrink-0 w-4 h-4 mt-1 mr-3 ${tier.isFeatured ? 'text-[#F9C97B]' : 'text-[#E77E4D]'}`} />
                                <span className={tier.isFeatured ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <button className={`w-full mt-8 px-6 py-3 rounded-full font-semibold transition-transform transform hover:scale-105 ${tier.isFeatured ? 'bg-[#E77E4D] text-white' : 'bg-transparent border-2 border-[#E6E2DF] text-[#181818] hover:bg-gray-50'}`}>
                      {tier.cta}
                    </button>
                </div>
            ))}
        </div>
    </SectionContainer>
);

const CTA = () => (
    <SectionContainer>
      <div className="bg-white rounded-2xl shadow-lg border border-[#E6E2DF] overflow-hidden p-8 md:p-12 lg:flex lg:items-center lg:justify-between gap-8">
        <div className="lg:w-1/2">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#181818]">Create Your Project Brief in Minutes</h2>
            <p className="mt-4 text-lg text-gray-600">Save time and get a clear project scope. Our guided brief process ensures we understand your vision from day one.</p>
            <Button variant="primary" className="mt-8 text-lg">Start Project Brief</Button>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-sm p-6 bg-[#FDF7F2] rounded-xl">
                <p className="text-sm font-medium text-gray-500">Project Progress</p>
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-semibold text-[#025A63]">30min</p>
                    <p className="text-lg font-bold text-[#E77E4D]">98%</p>
                </div>
                <div className="w-full bg-[#E6E2DF] rounded-full h-2.5 mt-3">
                    <div className="bg-[#E77E4D] h-2.5 rounded-full" style={{ width: '98%' }}></div>
                </div>
                <div className="mt-6">
                    <img src="https://picsum.photos/400/250" alt="Project mockup" className="rounded-lg shadow-md" />
                </div>
            </div>
        </div>
      </div>
    </SectionContainer>
);

const FinalCTA = () => (
  <div className="bg-[#025A63]">
    <SectionContainer id="contact">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">Ready to Build Something Extraordinary?</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-white/80">From idea to production-ready AI in as little as 2-8 weeks.</p>
          <Button variant="primary" className="mt-8 text-xl">Start Your AI Project</Button>
          <div className="mt-6 text-sm text-white/60">
            <p>Free 30-min strategy call • No commitment required • Expert AI guidance</p>
          </div>
        </div>
    </SectionContainer>
  </div>
);

const Footer = () => (
  <footer className="bg-[#FDF7F2] border-t border-[#E6E2DF]">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
                <h3 className="text-xl font-serif font-bold text-[#181818]">AMO AI</h3>
                <p className="mt-2 text-sm text-gray-600">Building the future of intelligent applications.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#181818]">Solutions</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-[#E77E4D]">AI Automation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#E77E4D]">Custom Chatbots</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#E77E4D]">Data Analysis</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#E77E4D]">Enterprise AI</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#181818]">Resources</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-[#E77E4D]">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#E77E4D]">Case Studies</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#E77E4D]">Whitepapers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#181818]">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-[#E77E4D]">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#E77E4D]">Terms of Service</a></li>
              </ul>
            </div>
        </div>
        <div className="mt-12 border-t border-[#E6E2DF] pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} AMO AI. All Rights Reserved.</p>
        </div>
    </div>
  </footer>
);


// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <div className="bg-[#FDF7F2] text-[#181818]">
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <TechStack />
        <Process />
        <Pricing />
        <CTA />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}