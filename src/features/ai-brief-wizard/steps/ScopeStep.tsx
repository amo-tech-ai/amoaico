import React from 'react';

interface ScopeStepProps {
    projectType: string;
    setProjectType: (type: string) => void;
    selectedGoals: string[];
    handleGoalToggle: (goal: string) => void;
    budget: string;
    setBudget: (budget: string) => void;
    isComplete: boolean;
    onNext: () => void;
    onBack: () => void;
}

const PROJECT_TYPES = ["AI Web Application", "AI App Development", "Social Media Automation", "WhatsApp AI Assistant"];
const GOALS = ["Increase Leads", "Automate Support", "Improve Engagement", "Boost Sales", "Enhance UX", "Optimize Ops"];
const BUDGET_MARKS: { [key: string]: string } = {
    '10000': '$10k', '25000': '$25k', '50000': '$50k', '75000': '$75k', '100000': '$100k+',
};

export const ScopeStep: React.FC<ScopeStepProps> = ({
    projectType,
    setProjectType,
    selectedGoals,
    handleGoalToggle,
    budget,
    setBudget,
    isComplete,
    onNext,
    onBack,
}) => {
    return (
        <div>
            <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Define Your Project Scope</h2>
            <p className="text-center text-gray-600 mb-8">Help us understand what you want to achieve.</p>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What type of project is this?</label>
                    <div className="grid grid-cols-2 gap-3">
                        {PROJECT_TYPES.map(type => <button key={type} onClick={() => setProjectType(type)} className={`p-3 text-sm font-medium border rounded-lg transition-all text-left active:scale-95 ${projectType === type ? 'bg-[#00334F] text-white border-[#00334F] ring-2' : 'hover:bg-gray-50'}`}>{type}</button>)}
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What are your primary goals? (Select up to 3)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {GOALS.map(goal => <button key={goal} onClick={() => handleGoalToggle(goal)} disabled={selectedGoals.length >= 3 && !selectedGoals.includes(goal)} className={`p-3 text-sm font-medium border rounded-lg transition-all active:scale-95 disabled:opacity-50 ${selectedGoals.includes(goal) ? 'bg-[#00334F] text-white border-[#00334F] ring-2' : 'hover:bg-gray-50'}`}>{goal}</button>)}
                    </div>
                </div>
                <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget: <span className="font-bold text-[#00334F]">{BUDGET_MARKS[budget]}</span></label>
                    <input type="range" id="budget" min="10000" max="100000" step="15000" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-[#F97316]" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">{Object.values(BUDGET_MARKS).map(label => <span key={label}>{label}</span>)}</div>
                </div>
            </div>
            <div className="mt-8 flex justify-between items-center">
                 <button onClick={onBack} className="px-6 py-2 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100 active:scale-95">Back</button>
                <button onClick={onNext} disabled={!isComplete} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all disabled:bg-gray-300 active:scale-95">Next: AI Enrichment →</button>
            </div>
        </div>
    );
};
