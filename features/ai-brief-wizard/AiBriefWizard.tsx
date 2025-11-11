import React, { useState, useCallback, useEffect } from 'react';
import { Brief, BriefData } from '../../types';
import { XIcon, CheckCircleIcon } from '../../assets/icons';
import { generateBriefFromApi } from '../../services/aiService';
import { useAuth } from '../../hooks/useAuth';
import { Auth } from '../../components/Auth';


export const AiBriefWizard = ({ onClose }: { onClose: () => void }) => {
    const { user, loading: authLoading } = useAuth();
    const [currentStep, setCurrentStep] = useState<'auth' | 'form' | 'generating' | 'review' | 'dashboard'>('auth');
    
    const [companyName, setCompanyName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    
    // Step 2 State
    const [projectType, setProjectType] = useState('');
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [budget, setBudget] = useState('25000');
    
    // Generation State
    const [generationStatus, setGenerationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [generationMessage, setGenerationMessage] = useState('');
    const [brief, setBrief] = useState<BriefData | null>(null);

    const [formStep, setFormStep] = useState(1);

    useEffect(() => {
        if (!authLoading) {
            setCurrentStep(user ? 'form' : 'auth');
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
        if (!value.trim()) { setUrlError('Website URL is required.'); return false; }
        try {
            const url = new URL(value.startsWith('http') ? value : `https://${value}`);
            if (!url.hostname.includes('.')) { throw new Error('Invalid hostname'); }
            setUrlError(''); return true;
        } catch (_) { setUrlError('Please enter a valid URL format.'); return false; }
    };
    
    const handleGoalToggle = (goal: string) => {
        setSelectedGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
    };
    
    const generateAndSaveBrief = useCallback(async () => {
        setCurrentStep('generating');
        setGenerationStatus('loading');
        const loadingMessages = ["Analyzing your website...", "Identifying key objectives...", "Consulting with our AI strategist...", "Generating project summary...", "Finalizing the brief..."];
        
        let messageIndex = 0;
        const intervalId = setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setGenerationMessage(loadingMessages[messageIndex]);
        }, 2000);
        setGenerationMessage(loadingMessages[0]);

        try {
            const generatedData = await generateBriefFromApi({ companyName, websiteUrl, projectType, selectedGoals, budget: BUDGET_MARKS[budget] });
            if (generatedData && generatedData.overview) {
                setBrief(generatedData);
                setGenerationStatus('success');
                setTimeout(() => setCurrentStep('review'), 1000);
            } else { throw new Error("AI service did not return a valid brief object."); }
        } catch (error) {
            console.error("Error generating brief:", error);
            setGenerationStatus('error');
        } finally {
            clearInterval(intervalId);
        }
    }, [companyName, websiteUrl, projectType, selectedGoals, budget]);

    const isStep1Complete = companyName.trim() !== '' && websiteUrl.trim() !== '' && !urlError;
    const isStep2Complete = projectType !== '' && selectedGoals.length > 0;

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

        switch (currentStep) {
            case 'auth': return <Auth />;
            case 'form':
                if (formStep === 1) return (
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
                            <button onClick={() => setFormStep(2)} disabled={!isStep1Complete} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all disabled:bg-gray-300">Next: Define Scope →</button>
                        </div>
                    </div>
                );
                if (formStep === 2) return (
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
                                    {GOALS.map(goal => <button key={goal} onClick={() => handleGoalToggle(goal)} disabled={selectedGoals.length >= 3 && !selectedGoals.includes(goal)} className={`p-3 text-sm font-medium border rounded-lg transition-all disabled:opacity-50 ${selectedGoals.includes(goal) ? 'bg-[#00334F] text-white border-[#00334F] ring-2' : 'hover:bg-gray-50'}`}>{goal}</button>)}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget: <span className="font-bold text-[#00334F]">{BUDGET_MARKS[budget]}</span></label>
                                <input type="range" id="budget" min="10000" max="100000" step="15000" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-[#F97316]" />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">{Object.values(BUDGET_MARKS).map(label => <span key={label}>{label}</span>)}</div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between items-center">
                             <button onClick={() => setFormStep(1)} className="px-6 py-2 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100">Back</button>
                            <button onClick={generateAndSaveBrief} disabled={!isStep2Complete} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all disabled:bg-gray-300">Next: AI Enrichment →</button>
                        </div>
                    </div>
                );
                return null;
            case 'generating': return (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                     {generationStatus === 'loading' && (
                         <>
                             <div className="relative w-20 h-20"><div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div><div className="absolute inset-0 border-4 border-t-[#F97316] rounded-full animate-spin"></div></div>
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
                             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center"><XIcon className="w-10 h-10 text-red-500" /></div>
                             <h2 className="text-2xl font-bold font-poppins mt-8 text-[#00334F]">Generation Failed</h2>
                             <p className="text-gray-600 mt-2">We couldn't generate the brief. Please try again.</p>
                             <button onClick={generateAndSaveBrief} className="mt-6 px-6 py-2 rounded-lg font-semibold bg-[#F97316] text-white">Retry</button>
                         </>
                     )}
                </div>
            );
            case 'review': return (brief &&
                <div>
                     <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Review Your AI-Generated Brief</h2>
                    <p className="text-center text-gray-600 mb-8">Here's what our AI put together. It's now saved to your dashboard.</p>
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
                         <button onClick={() => { setCurrentStep('form'); setFormStep(2); }} className="px-6 py-2 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100">Back</button>
                        <button onClick={onClose} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all">Save & Close</button>
                    </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full relative transform transition-all duration-300 ease-out animate-slide-up" style={{ minHeight: '550px' }}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10"><XIcon className="w-6 h-6" /></button>
                {renderContent()}
            </div>
        </div>
    );
};