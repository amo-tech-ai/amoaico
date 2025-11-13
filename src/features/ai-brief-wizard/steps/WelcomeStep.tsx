import React from 'react';
import { XIcon, QuestionMarkCircleIcon } from '../../../assets/icons';

const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => (
    <div className="relative group flex items-center">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {text}
        </div>
    </div>
);

interface WelcomeStepProps {
    companyName: string;
    setCompanyName: (name: string) => void;
    websiteUrl: string;
    setWebsiteUrl: (url: string) => void;
    urlError: string;
    validateUrl: (url: string) => boolean;
    isComplete: boolean;
    onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
    companyName,
    setCompanyName,
    websiteUrl,
    setWebsiteUrl,
    urlError,
    validateUrl,
    isComplete,
    onNext,
}) => {
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWebsiteUrl(e.target.value);
        if (urlError) validateUrl(e.target.value);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Let's Start Your AI Brief</h2>
            <p className="text-center text-gray-600 mb-8">Tell us about your company to get started.</p>
            <div className="space-y-6">
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g., Sunai" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition" autoFocus />
                </div>
                <div>
                    <div className="flex items-center gap-1.5 mb-1">
                        <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">Website URL</label>
                        <Tooltip text="Our AI will analyze your website to understand your brand, tone, and services, helping us generate a more accurate and relevant project brief.">
                            <QuestionMarkCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
                        </Tooltip>
                    </div>
                    <input type="text" id="websiteUrl" value={websiteUrl} onChange={handleUrlChange} onBlur={() => validateUrl(websiteUrl)} placeholder="e.g., https://www.example.com" className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 transition ${urlError ? 'border-red-500' : 'border-gray-300 focus:ring-[#F97316] focus:border-[#F97316]'}`} />
                    {urlError && <div className="flex items-center gap-1.5 text-red-600 text-sm mt-1.5"><XIcon className="w-4 h-4 flex-shrink-0" /><span>{urlError}</span></div>}
                </div>
            </div>
            <div className="mt-8 text-right">
                <button onClick={onNext} disabled={!isComplete} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all disabled:bg-gray-300 active:scale-95">Next: Define Scope →</button>
            </div>
        </div>
    );
};