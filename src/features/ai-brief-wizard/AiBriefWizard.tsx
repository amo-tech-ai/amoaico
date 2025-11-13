import React, { useState, useCallback, useEffect } from 'react';
import { Brief } from '../../types';
import { XIcon } from '../../assets/icons';
import { generateBriefFromApi } from '../../services/aiService';
import { useAuth } from '../../hooks/useAuth';
import { Auth } from '../../components/Auth';
import { WelcomeStep } from './steps/WelcomeStep';
import { ScopeStep } from './steps/ScopeStep';
import { GeneratingStep } from './steps/GeneratingStep';
import { ReviewStep } from './steps/ReviewStep';

type WizardStep = 'auth' | 'welcome' | 'scope' | 'generating' | 'review';

const BUDGET_MARKS: { [key: string]: string } = {
    '10000': '$10k', '25000': '$25k', '50000': '$50k', '75000': '$75k', '100000': '$100k+',
};

export const AiBriefWizard = ({ onClose }: { onClose: () => void }) => {
    const { user, loading: authLoading } = useAuth();
    const [wizardStep, setWizardStep] = useState<WizardStep>('auth');
    const [animationDirection, setAnimationDirection] = useState<'right' | 'left'>('right');
    
    // State for all steps
    const [companyName, setCompanyName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    const [projectType, setProjectType] = useState('');
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [budget, setBudget] = useState('25000');
    const [generationStatus, setGenerationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [generationMessage, setGenerationMessage] = useState('');
    const [brief, setBrief] = useState<Brief | null>(null);

    useEffect(() => {
        if (!authLoading) {
            goToStep(user ? 'welcome' : 'auth');
        }
    }, [user, authLoading]);

    const goToStep = (step: WizardStep, direction: 'right' | 'left' = 'right') => {
        setAnimationDirection(direction);
        setWizardStep(step);
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
            if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
                setUrlError('Local addresses cannot be analyzed. Please use a public URL.');
                return false;
            }
            const parts = url.hostname.split('.');
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
        goToStep('generating');
        setGenerationStatus('loading');
        const loadingMessages = ["Analyzing your website...", "Identifying key objectives...", "Consulting with our AI strategist...", "Generating project summary...", "Finalizing the brief..."];
        
        let messageIndex = 0;
        const intervalId = setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setGenerationMessage(loadingMessages[messageIndex]);
        }, 2000);
        setGenerationMessage(loadingMessages[0]);

        try {
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
                setTimeout(() => goToStep('review'), 1000);
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

    const renderContent = () => {
        if (authLoading) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-t-[#F97316] rounded-full animate-spin"></div></div>;

        const animationClass = animationDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left';

        switch (wizardStep) {
            case 'auth': return <Auth />;
            case 'welcome': return (
                <div className={animationClass} key="welcome">
                    <WelcomeStep
                        companyName={companyName}
                        setCompanyName={setCompanyName}
                        websiteUrl={websiteUrl}
                        setWebsiteUrl={setWebsiteUrl}
                        urlError={urlError}
                        validateUrl={validateUrl}
                        isComplete={isWelcomeStepComplete}
                        onNext={() => goToStep('scope')}
                    />
                </div>
            );
            case 'scope': return (
                <div className={animationClass} key="scope">
                    <ScopeStep
                        projectType={projectType}
                        setProjectType={setProjectType}
                        selectedGoals={selectedGoals}
                        handleGoalToggle={handleGoalToggle}
                        budget={budget}
                        setBudget={setBudget}
                        isComplete={isScopeStepComplete}
                        onNext={generateAndSaveBrief}
                        onBack={() => goToStep('welcome', 'left')}
                    />
                </div>
            );
            case 'generating': return (
                <GeneratingStep status={generationStatus} message={generationMessage} onRetry={generateAndSaveBrief} />
            );
            case 'review': return (brief &&
                <div className={animationClass} key="review">
                    <ReviewStep brief={brief} onBack={() => goToStep('scope', 'left')} onClose={onClose} />
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full relative transform transition-all duration-300 ease-out animate-slide-up overflow-hidden" style={{ minHeight: '550px' }}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10"><XIcon className="w-6 h-6" /></button>
                {renderContent()}
            </div>
        </div>
    );
};
