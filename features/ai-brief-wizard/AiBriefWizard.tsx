import React, { useState, useCallback, useEffect } from 'react';
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
                                {