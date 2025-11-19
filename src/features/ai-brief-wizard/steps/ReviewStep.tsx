import React from 'react';
import { Link } from 'react-router-dom';
import { Brief } from '../../../types';

interface ReviewStepProps {
    brief: Brief;
    onBack: () => void;
    onClose: () => void;
}

const BriefSection = ({ title, content }: { title: string, content: React.ReactNode }) => (
    <div className="mb-6">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{title}</h4>
        <div className="text-sm text-[#0F172A]/90 leading-relaxed">
            {content}
        </div>
    </div>
);

const ListSection = ({ items }: { items?: string[] }) => (
    <ul className="space-y-1 list-disc list-inside">
        {(items || []).map((item, index) => <li key={index}>{item}</li>)}
    </ul>
);

export const ReviewStep: React.FC<ReviewStepProps> = ({ brief, onBack, onClose }) => {
    return (
        <div>
             <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Review Your AI-Generated Brief</h2>
            <p className="text-center text-gray-600 mb-8">Here's what our AI put together. It's now saved to your dashboard.</p>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-4 border border-gray-100 rounded-lg p-4 bg-slate-50">
                
                {/* Header Section */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-sunai-blue">{brief.project_title || "Untitled Project"}</h3>
                    <p className="text-sm text-gray-600 mt-1">{brief.summary}</p>
                </div>

                {/* Core Strategy */}
                <BriefSection title="Primary Goals" content={<ListSection items={brief.goals} />} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BriefSection title="Target Audience" content={
                        <div>
                            <p className="mb-2">{brief.target_audience?.description}</p>
                            <p className="text-xs font-semibold text-gray-500">Segments:</p>
                            <ListSection items={brief.target_audience?.segments} />
                        </div>
                    } />
                    <BriefSection title="Tone & Style" content={
                        <div>
                             <div className="flex flex-wrap gap-2 mb-2">
                                {brief.tone_and_style?.tone_keywords?.map(k => (
                                    <span key={k} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{k}</span>
                                ))}
                             </div>
                             <p className="text-xs font-semibold text-gray-500">Guidelines:</p>
                             <ListSection items={brief.tone_and_style?.do} />
                        </div>
                    } />
                </div>

                <BriefSection title="Deliverables" content={<ListSection items={brief.deliverables} />} />
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <BriefSection title="Timeline" content={
                        <ListSection items={brief.timeline?.milestones} />
                    } />
                    <BriefSection title="Budget" content={
                        <div>
                            <p className="font-semibold">{brief.budget?.range}</p>
                            <p className="text-xs text-gray-500">{brief.budget?.notes}</p>
                        </div>
                    } />
                </div>

                 <BriefSection title="Success Metrics" content={<ListSection items={brief.success_metrics} />} />
            </div>

             <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                <button onClick={onBack} className="w-full sm:w-auto px-6 py-2 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100 active:scale-95">Back to Edit</button>
                <Link to="/dashboard/briefs" onClick={onClose} className="w-full sm:w-auto text-center px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white transition-all transform hover:scale-105 active:scale-95">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};