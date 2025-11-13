

import React, { useState, useEffect, useRef } from 'react';
// FIX: Changed import of `Link` from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { Link } from 'react-router-dom';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { 
    MessageCircleIcon, FileTextIcon, UserCheckIcon, BotIcon, PencilRulerIcon, 
    UsersIcon, BrainCircuitIcon, CheckCircleIcon, CheckIcon, ArrowRightIcon, ChevronDownIcon 
} from '../assets/icons';

export const AiWebApplicationsPage = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    
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
                    <SectionContainer id="tool-stack" ref={el => { sectionRefs.current['tool-stack'] = el; }} className="bg-white" contained={false}>
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Recommended Tool Stack</h2></AnimatedElement>
                                <AnimatedElement delay={100}><p className="mt-4 text-lg text-[#0F172A]/80">We build on a modern, scalable, and reliable foundation to ensure your application performs from day one.</p></AnimatedElement>
                                <AnimatedElement delay={200} className="mt-6">
                                    <Link to="/tech-stack" className="font-semibold text-[#F97316] hover:text-orange-700 transition-colors">Explore Our Tech Stack →</Link>
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