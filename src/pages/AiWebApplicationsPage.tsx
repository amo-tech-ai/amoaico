
import React, { useState, useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { 
    MessageCircleIcon, FileTextIcon, UserCheckIcon, BotIcon, PencilRulerIcon, 
    UsersIcon, BrainCircuitIcon, CheckCircleIcon, CheckIcon, ArrowRightIcon, ChevronDownIcon,
    ZapIcon, BarChartIcon, GlobeIcon
} from '../assets/icons';

interface PublicLayoutContext {
  onStartWizard: () => void;
}

export const AiWebApplicationsPage = () => {
    const { onStartWizard } = useOutletContext<PublicLayoutContext>();
    
    const WEB_APP_FEATURES = [
        { icon: <MessageCircleIcon className="w-6 h-6"/>, title: 'Natural-Language Interfaces', description: 'Replace complex forms with intuitive, conversational UI for any workflow.' },
        { icon: <FileTextIcon className="w-6 h-6"/>, title: 'RAG Applications', description: 'Retrieval-Augmented Generation that lets users query your private data securely.' },
        { icon: <UserCheckIcon className="w-6 h-6"/>, title: 'Personalization Engines', description: 'Adaptive user experiences that change in real-time based on behavior.' },
        { icon: <BotIcon className="w-6 h-6"/>, title: 'AI Agents & Automations', description: 'Autonomous agents that execute complex, multi-step tasks in the background.' },
        { icon: <PencilRulerIcon className="w-6 h-6" strokeWidth="1.5"/>, title: 'AI Content Services', description: 'Generate, summarize, and moderate text or images at enterprise scale.' },
        { icon: <UsersIcon className="w-6 h-6"/>, title: 'CX Chatbots', description: 'Smart support bots that deflect tickets and improve user satisfaction scores.' },
        { icon: <BrainCircuitIcon className="w-6 h-6"/>, title: 'Predictive Models', description: 'Forecast trends and inform strategic decisions with machine learning.' },
        { icon: <ZapIcon className="w-6 h-6"/>, title: 'Decision Engines', description: 'Automate logic-heavy business rules with AI reasoning capabilities.' },
        { icon: <GlobeIcon className="w-6 h-6"/>, title: 'Custom AI Systems', description: 'Bespoke architectures designed for your specific business constraints.' },
    ];
    
    const WEB_APP_USE_CASES = [
        { title: "Sales Copilots", metric: "+30% Lead Quality", description: "Assist reps in real-time during calls." },
        { title: "Support Deflection", metric: "-40% Ticket Vol", description: "Resolve queries without humans." },
        { title: "Knowledge Ops", metric: "90% Faster Search", description: "Instant answers from internal docs." },
        { title: "E-commerce Uplift", metric: "+15% Conversions", description: "Personalized shopping assistants." },
    ];

    const WEB_APP_ROI = [
        { value: "72", unit: "%", label: "Adoption Rate" },
        { value: "1-4", unit: "mo", label: "Deployment Cycle" },
        { value: "45", unit: "%", label: "Productivity Gain", prefix: "+" },
    ];
    
    const WEB_APP_PATTERNS = [
        { title: "AI Help Center", description: "Instant, accurate answers from your knowledge base.", features: ["24/7 Availability", "Multi-lingual"] },
        { title: "Proposal Builder", description: "Generate project scopes from client requirements.", features: ["Auto-formatting", "Cost estimation"] },
        { title: "Product Advisor", description: "Guide users to the right product with smart recommendations.", features: ["Dynamic Quiz", "Inventory Sync"] },
        { title: "Ops Co-pilot", description: "Automate repetitive operational tasks with an AI assistant.", features: ["Data Entry", "Report Gen"] },
    ];
    
    const WEB_APP_BLUEPRINT = [
        { step: "01", title: "Discovery", description: "Align on KPIs." },
        { step: "02", title: "Data Prep", description: "Secure permissions." },
        { step: "03", title: "Prototype", description: "RAG/Agent logic." },
        { step: "04", title: "Review", description: "Human-in-loop." },
        { step: "05", title: "Hardening", description: "Security guardrails." },
        { step: "06", title: "Launch", description: "A/B testing." },
    ];

    const WEB_APP_TOOL_STACK = [
        { name: "OpenAI / Gemini", description: "Reasoning & Generation Models" },
        { name: "LangChain", description: "Agent Orchestration Framework" },
        { name: "CopilotKit", description: "Embedded UI Components" },
        { name: "Supabase", description: "Vector DB & Auth Backend" },
        { name: "Stripe", description: "Payment Infrastructure" },
        { name: "n8n", description: "Workflow Automation" },
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
        Object.values(currentRefs).forEach((ref) => {
            if (ref instanceof Element) observer.observe(ref);
        });
    
        return () => {
            Object.values(currentRefs).forEach((ref) => {
                if (ref instanceof Element) observer.unobserve(ref);
            });
        };
    }, []);

    const handleScrollToContact = () => {
        const contactSection = document.getElementById('contact-cta');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-sunai-cream">
            {/* 1. Hero Section */}
            <SectionContainer className="bg-white text-center pt-32 pb-20">
                <AnimatedElement>
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-50 text-sunai-orange text-sm font-semibold mb-6">
                        AI-First Engineering
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-sunai-slate tracking-tighter max-w-4xl mx-auto leading-tight">
                        AI Development for <br /><span className="text-sunai-blue">Modern Web Apps</span>
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-600">
                        We build intelligent assistants, predictive automation, and smart workflows that measurably move your business KPIs.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={onStartWizard} className="px-8 py-4 rounded-xl font-bold bg-sunai-orange text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300">
                        Start Your AI Brief
                    </button>
                    <button onClick={handleScrollToContact} className="px-8 py-4 rounded-xl font-bold text-sunai-slate border border-gray-200 hover:bg-gray-50 transition-all">
                        Book a Consultation
                    </button>
                </AnimatedElement>
            </SectionContainer>
            
            {/* 2. Main Services Grid */}
            <SectionContainer id="features" ref={(el: HTMLElement | null) => { sectionRefs.current['features'] = el; }} className="bg-slate-50">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate">Intelligent Capabilities</h2>
                        <p className="mt-4 text-slate-600">Modular AI components we can integrate into your existing or new platform.</p>
                    </AnimatedElement>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {WEB_APP_FEATURES.map((feature, index) => (
                        <AnimatedElement key={feature.title} delay={50 * index}>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-sunai-blue mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold font-poppins text-sunai-slate mb-3">{feature.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed flex-grow">{feature.description}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>

            {/* 3. Where It Pays Off (Impact Metrics) */}
            <SectionContainer id="use-cases" ref={(el: HTMLElement | null) => { sectionRefs.current['use-cases'] = el; }} className="bg-sunai-blue text-white">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <AnimatedElement>
                            <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight leading-tight">
                                Measurable Impact, <br /><span className="text-sunai-orange">Not Just Hype.</span>
                            </h2>
                            <p className="mt-6 text-blue-100 text-lg">
                                We focus on AI implementations that drive revenue, reduce costs, or significantly improve user retention.
                            </p>
                        </AnimatedElement>
                        <div className="mt-12 grid grid-cols-2 gap-6">
                            {WEB_APP_ROI.map((item, index) => (
                                <AnimatedElement key={item.label} delay={100 * index}>
                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                        <p className="text-4xl font-bold font-poppins text-white">
                                            {item.prefix}<Counter endValue={parseInt(item.value)} />{item.unit}
                                        </p>
                                        <p className="mt-2 text-sm text-blue-200 uppercase tracking-wide">{item.label}</p>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-6">
                         {WEB_APP_USE_CASES.map((useCase, index) => (
                            <AnimatedElement key={useCase.title} delay={100 * index}>
                                <div className="bg-white text-sunai-slate p-6 rounded-xl flex items-center justify-between shadow-lg transform transition-transform hover:scale-[1.02]">
                                    <div>
                                        <h4 className="font-bold font-poppins text-lg">{useCase.title}</h4>
                                        <p className="text-sm text-slate-500">{useCase.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-sunai-orange">{useCase.metric}</span>
                                    </div>
                                </div>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* 4. Real-World Patterns */}
            <SectionContainer id="patterns" ref={(el: HTMLElement | null) => { sectionRefs.current['patterns'] = el; }} className="bg-white">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate">Real-World Patterns</h2>
                        <p className="mt-4 text-slate-600">Common architectural patterns we deploy for immediate value.</p>
                    </AnimatedElement>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {WEB_APP_PATTERNS.map((pattern, index) => (
                        <AnimatedElement key={pattern.title} delay={100 * index}>
                            <div className="p-8 rounded-2xl border border-gray-200 bg-slate-50 h-full hover:bg-white hover:shadow-lg hover:border-orange-100 transition-all duration-300 group">
                                <CheckCircleIcon className="w-8 h-8 text-sunai-orange mb-4 group-hover:scale-110 transition-transform"/>
                                <h3 className="text-lg font-bold font-poppins text-sunai-slate mb-2">{pattern.title}</h3>
                                <p className="text-sm text-slate-600 mb-4">{pattern.description}</p>
                                <ul className="space-y-2">
                                    {pattern.features.map(f => (
                                        <li key={f} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-sunai-blue"></div> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* 5. Delivery Blueprint */}
            <SectionContainer id="blueprint" ref={(el: HTMLElement | null) => { sectionRefs.current['blueprint'] = el; }} className="bg-slate-50">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate">Delivery Blueprint</h2></AnimatedElement>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {WEB_APP_BLUEPRINT.map((step, index) => (
                        <AnimatedElement key={step.step} delay={50 * index}>
                            <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm h-full">
                                <span className="text-xs font-bold text-sunai-orange bg-orange-50 px-2 py-1 rounded-full mb-3">{step.step}</span>
                                <h3 className="font-bold text-sunai-slate text-sm mb-1">{step.title}</h3>
                                <p className="text-xs text-slate-500">{step.description}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* 6. Recommended Tool Stack */}
            <SectionContainer id="tool-stack" ref={(el: HTMLElement | null) => { sectionRefs.current['tool-stack'] = el; }} className="bg-white">
                 <div className="text-center max-w-3xl mx-auto mb-16">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate">Production-Ready Stack</h2>
                        <p className="mt-4 text-slate-600">We choose robust, scalable technologies over experimental hype.</p>
                    </AnimatedElement>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {WEB_APP_TOOL_STACK.map((tool, index) => (
                        <AnimatedElement key={tool.name} delay={50 * index}>
                            <div className="flex items-center gap-4 p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-sunai-blue text-white flex items-center justify-center font-bold text-xs">
                                    {tool.name.slice(0,2).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sunai-slate">{tool.name}</h4>
                                    <p className="text-xs text-slate-500">{tool.description}</p>
                                </div>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
                 <div className="mt-12 text-center">
                     <Link to="/tech-stack" className="text-sm font-semibold text-sunai-orange hover:text-orange-700 inline-flex items-center gap-2">
                        View Full Tech Stack <ArrowRightIcon className="w-4 h-4" />
                     </Link>
                 </div>
            </SectionContainer>

            {/* 7. Architecture & CTA */}
            <SectionContainer id="contact-cta" ref={(el: HTMLElement | null) => { sectionRefs.current['architecture'] = el; }} className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white text-center pt-20 pb-24">
                <AnimatedElement>
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 border border-white/20">
                        Ready to Build?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight mb-6">
                        Turn Your Vision into a <br /><span className="text-sunai-orange">Production Application</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10">
                        Stop guessing with prompts. Start building with engineers. Use our AI Brief Wizard to scope your project in minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={onStartWizard} className="px-8 py-4 rounded-xl font-bold bg-sunai-orange text-white shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105">
                            Start Your AI Brief
                        </button>
                        <Link to="/contact" className="px-8 py-4 rounded-xl font-bold text-white border border-slate-600 hover:bg-white/5 transition-all">
                            Contact Sales
                        </Link>
                    </div>
                </AnimatedElement>
                
                {/* Simple visual diagram */}
                <AnimatedElement delay={200} className="mt-20 pt-10 border-t border-white/10 max-w-4xl mx-auto">
                    <p className="text-sm text-slate-400 mb-8 font-mono uppercase tracking-widest">Typical Data Flow</p>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm font-mono text-slate-300">
                        <div className="px-4 py-2 rounded border border-slate-700 bg-slate-800">User Input</div>
                        <ArrowRightIcon className="w-4 h-4 text-slate-600" />
                        <div className="px-4 py-2 rounded border border-slate-700 bg-slate-800">Next.js App</div>
                        <ArrowRightIcon className="w-4 h-4 text-slate-600" />
                        <div className="px-4 py-2 rounded border border-orange-900/50 bg-orange-900/20 text-orange-200 border-dashed">AI Agent Router</div>
                        <ArrowRightIcon className="w-4 h-4 text-slate-600" />
                        <div className="flex flex-col gap-2">
                            <div className="px-4 py-1 rounded border border-slate-700 bg-slate-800">Vector DB</div>
                            <div className="px-4 py-1 rounded border border-slate-700 bg-slate-800">LLM API</div>
                        </div>
                    </div>
                </AnimatedElement>
            </SectionContainer>
        </div>
    );
};
