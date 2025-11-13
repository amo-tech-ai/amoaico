import React, { useState, useCallback, useEffect } from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { Link } from 'react-router-dom';
import { Brief, BriefData } from '../../types';
import { XIcon, CheckCircleIcon } from '../../assets/icons';
import { generateBriefFromApi } from '../../services/aiService';
import { useAuth } from '../../hooks/useAuth';
import { Auth } from '../../components/Auth';


type WizardStep = 'auth' | 'welcome' | 'scope' | 'generating' | 'review';

export const AiBriefWizard = ({ onClose }: { onClose: () => void }) => {
    const { user, loading: authLoading } = useAuth();
    const [wizardStep, setWizardStep] = useState<WizardStep>('auth');
    
    // Step 1: Welcome State
    const [companyName, setCompanyName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    
    // Step 2: Scope State
    const [projectType, setProjectType] = useState('');
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [budget, setBudget] = useState('25000');
    
    // Step 3: Generation State
    const [generationStatus, setGenerationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [generationMessage, setGenerationMessage] = useState('');
    
    // Step 4: Review State
    const [brief, setBrief] = useState<Brief | null>(null);

    useEffect(() => {
        if (!authLoading) {
            setWizardStep(user ? 'welcome' : 'auth');
        }
    }, [user, authLoading]);
    
    const PROJECT_TYPES = ["AI Web Application", "AI App Development", "Social Media Automation", "WhatsApp AI Assistant"];
    const GOALS = ["Increase Leads", "Automate Support", "Improve Engagement", "Boost Sales", "Enhance UX", "Optimize Ops"];
    const BUDGET_MARKS: { [key: string]: string } = {
        '10000': '$10k', '25000': '$25k', '50000': '$50k', '75000': '$75k', '100000': '$100k+',
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setWebsiteUrl(value);
        if (urlError) validateUrl(value);
    };
    
    const validateUrl = (value: string): boolean => {
        const trimmedValue = value.trim();
        if (!trimmedValue) { 
            setUrlError('Website URL is required.'); 
            return false; 
        }
        
        const urlToParse = trimmedValue.startsWith('http') ? trimmedValue : `https://${trimmedValue}`;

        try {
            const url = new URL(urlToParse);
            
            // Block localhost as it's not a public website for analysis
            if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
                setUrlError('Local addresses cannot be analyzed. Please use a public URL.');
                return false;
            }

            const parts = url.hostname.split('.');
            // A valid hostname must have at least two parts (e.g., domain.com)
            // and the top-level domain (last part) must be at least 2 characters long.
            if (parts.length < 2 || parts[parts.length - 1].length < 2) {
                throw new Error('Invalid domain name.');
            }
            
            setUrlError(''); 
            return true;
        } catch (_) { 
            setUrlError('Please enter a valid URL (e.g., example.com).'); 
            return false; 
        }
    };
    
    const handleGoalToggle = (goal: string) => {
        setSelectedGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
    };
    
    const generateAndSaveBrief = useCallback(async () => {
        setWizardStep('generating');
        setGenerationStatus('loading');
        const loadingMessages = ["Analyzing your website...", "Identifying key objectives...", "Consulting with our AI strategist...", "Generating project summary...", "Finalizing the brief..."];
        
        let messageIndex = 0;
        const intervalId = setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setGenerationMessage(loadingMessages[messageIndex]);
        }, 2000);
        setGenerationMessage(loadingMessages[0]);

        try {
            // The call now goes to our secure Edge Function, which handles both AI generation and DB persistence.
            const newBrief = await generateBriefFromApi({ 
                companyName, 
                websiteUrl, 
                projectType, 
                selectedGoals, 
                budget: BUDGET_MARKS[budget] 
            });

            if (newBrief && newBrief.overview) {
                setBrief(newBrief);
                setGenerationStatus('success');
                setTimeout(() => setWizardStep('review'), 1000);
            } else { 
                throw new Error("The AI service did not return a valid brief object."); 
            }
        } catch (error) {
            console.error("Error generating brief:", error);
            setGenerationStatus('error');
        } finally {
            clearInterval(intervalId);
        }
    }, [companyName, websiteUrl, projectType, selectedGoals, budget]);

    const isWelcomeStepComplete = companyName.trim() !== '' && websiteUrl.trim() !== '' && !urlError;
    const isScopeStepComplete = projectType !== '' && selectedGoals.length > 0;

    const renderBriefSection = (title: string, content: string | string[]) => (
        <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h4>
            {Array.isArray(content) ? (
                <ul className="mt-2 space-y-2 list-disc list-inside text-[#0F172A]/90">
                    {content.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            ) : (<p className="mt-2 text-[#0F172A]/90">{content}</p>)}
        </div>
    );

    const renderContent = () => {
        if (authLoading) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-t-[#F97316] rounded-full animate-spin"></div></div>;

        switch (wizardStep) {
            case 'auth': return <Auth />;
            case 'welcome': return (
                <div>
                    <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Let's Start Your AI Brief</h2>
                    <p className="text-center text-gray-600 mb-8">Tell us about your company to get started.</p>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g., Sunai" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition" autoFocus />
                        </div>
                        <div>
                            <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                            <input type="text" id="websiteUrl" value={websiteUrl} onChange={handleUrlChange} onBlur={() => validateUrl(websiteUrl)} placeholder="e.g., https://www.example.com" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 transition ${urlError ? 'border-red-500' : 'border-gray-300 focus:ring-[#F97316] focus:border-[#F97316]'}`} />
                            {urlError && <p className="text-red-600 text-sm mt-1">{urlError}</p>}
                        </div>
                    </div>
                    <div className="mt-8 text-right">
                        <button onClick={() => setWizardStep('scope')} disabled={!isWelcomeStepComplete} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all disabled:bg-gray-300">Next: Define Scope →</button>
                    </div>
                </div>
            );
            case 'scope': return (
                <div>
                    <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Define Your Project Scope</h2>
                    <p className="text-center text-gray-600 mb-8">Help us understand what you want to achieve.</p>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">What type of project is this?</label>
                            <div className="grid grid-cols-2 gap-3">
                                {PROJECT_TYPES.map(type => <button key={type} onClick={() => setProjectType(type)} className={`p-3 text-sm font-medium border rounded-lg transition-all text-left ${projectType === type ? 'bg-[#00334F] text-white border-[#00334F] ring-2' : 'hover:bg-gray-50'}`}>{type}</button>)}
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">What are your primary goals? (Select up to 3)</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {--- START OF FILE pages/HomePage.tsx ---

import React, { useState, useEffect } from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { useLocation, useNavigate } from 'react-router-dom';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { HOME_CORE_SERVICES, HOME_PROCESS_STEPS, HOME_RESULT_METRICS, INVESTMENT_LEVELS } from '../data';
import { CodeIcon, Share2Icon, MessageCircleIcon, ClockIcon, DollarSignIcon, TrendingUpIcon, CheckCircleIcon, CheckIcon, XIcon } from '../assets/icons';

const PermissionErrorBanner = ({ message }: { message: string }) => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    if (!isVisible) return null;

    const handleDismiss = () => {
        setIsVisible(false);
        // Clean the location state to prevent the banner from reappearing on navigation
        navigate('.', { replace: true, state: {} });
    };

    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 max-w-7xl mx-auto" role="alert">
            <div className="flex">
                <div className="py-1">
                    <p className="font-bold">Access Denied</p>
                    <p className="text-sm">{message}</p>
                </div>
                <button onClick={handleDismiss} className="ml-auto pl-4">
                    <XIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};


export const HomePage = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    const location = useLocation();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (location.state?.error) {
            setError(location.state.error);
        }
    }, [location.state]);

    return (
        <main>
            {error && <PermissionErrorBanner message={error} />}
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