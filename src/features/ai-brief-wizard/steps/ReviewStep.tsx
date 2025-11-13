import React from 'react';
import { Link } from 'react-router-dom';
import { Brief } from '../../../types';

interface ReviewStepProps {
    brief: Brief;
    onBack: () => void;
    onClose: () => void;
}

const BriefSection = ({ title, content }: { title: string, content: string | string[] }) => (
    <div>
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h4>
        {Array.isArray(content) ? (
            <ul className="mt-2 space-y-2 list-disc list-inside text-[#0F172A]/90">
                {(content || []).map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        ) : (<p className="mt-2 text-[#0F172A]/90">{content}</p>)}
    </div>
);

export const ReviewStep: React.FC<ReviewStepProps> = ({ brief, onBack, onClose }) => {
    return (
        <div>
             <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Review Your AI-Generated Brief</h2>
            <p className="text-center text-gray-600 mb-8">Here's what our AI put together. It's now saved to your dashboard.</p>
            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-4">
                <BriefSection title="Company Overview" content={brief.overview} />
                <BriefSection title="Key Website Takeaways" content={brief.website_summary_points} />
                <BriefSection title="Primary Project Goals" content={brief.key_goals} />
                <BriefSection title="Suggested Deliverables" content={brief.suggested_deliverables} />
                <div className="grid grid-cols-2 gap-4">
                    <BriefSection title="Brand Tone" content={brief.brand_tone} />
                    <BriefSection title="Budget" content={brief.budget_band} />
                </div>
            </div>
             <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                <button onClick={onBack} className="w-full sm:w-auto px-6 py-2 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100 active:scale-95">Back to Edit</button>
                <Link to="/dashboard" onClick={onClose} className="w-full sm:w-auto text-center px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all transform hover:scale-105 active:scale-95">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};