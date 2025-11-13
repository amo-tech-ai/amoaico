import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Brief, BriefData } from '../../types';
import { getBriefById, updateBrief } from '../../services/briefService';
import { useAuth } from '../../hooks/useAuth';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { ClockIcon, XIcon, ArrowLeftIcon, CheckCircleIcon } from '../../assets/icons';

// Reusable component for editable text fields (input/textarea)
const EditableField = ({ label, value, name, onChange, type = 'text' }: { label: string, value: string, name: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, type?: 'text' | 'textarea' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
        {type === 'textarea' ? (
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sunai-orange focus:ring-sunai-orange sm:text-sm bg-slate-50 p-3 transition"
            />
        ) : (
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sunai-orange focus:ring-sunai-orange sm:text-sm bg-slate-50 p-3 transition"
            />
        )}
    </div>
);

// Reusable component for editable list fields (rendered as a textarea)
const EditableList = ({ label, items, name, onChange }: { label: string, items: string[], name: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
        <textarea
            id={name}
            name={name}
            value={items.join('\n')}
            onChange={onChange}
            rows={items.length > 3 ? items.length + 1 : 4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sunai-orange focus:ring-sunai-orange sm:text-sm bg-slate-50 p-3 transition"
            placeholder="Enter each item on a new line"
        />
    </div>
);

export const BriefDetailPage = () => {
    const { briefId } = useParams<{ briefId: string }>();
    const { user, loading: authLoading } = useAuth();
    
    // State for the canonical brief data from the server
    const [brief, setBrief] = useState<Brief | null>(null);
    
    // State for the form data being edited by the user
    const [editableData, setEditableData] = useState<Partial<BriefData>>({});
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    useEffect(() => {
        if (!briefId) {
            setError("No brief ID provided.");
            setLoading(false);
            return;
        }

        if (authLoading) return;

        if (!user) {
            setLoading(false);
            return;
        }

        const fetchBrief = async () => {
            try {
                const data = await getBriefById(briefId);
                if (data) {
                    setBrief(data);
                    // Initialize the editable form state
                    setEditableData({
                        overview: data.overview,
                        key_goals: data.key_goals,
                        suggested_deliverables: data.suggested_deliverables,
                        brand_tone: data.brand_tone,
                        budget_band: data.budget_band,
                        website_summary_points: data.website_summary_points,
                    });
                } else {
                    setError("Brief not found or you do not have permission to view it.");
                }
            } catch (err) {
                setError("Failed to load the brief. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBrief();
    }, [briefId, user, authLoading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIsDirty(true);
        setEditableData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleListChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIsDirty(true);
        // Split by newline and filter out empty lines
        setEditableData(prev => ({ ...prev, [name]: value.split('\n').filter(item => item.trim() !== '') }));
    };

    const handleSaveChanges = async () => {
        if (!briefId || !isDirty) return;
        setIsSaving(true);
        setError(null);
        try {
            const updatedBrief = await updateBrief(briefId, editableData);
            setBrief(updatedBrief); // Update the canonical state
            setIsDirty(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000); // Hide success message after 2s
        } catch (err) {
            console.error(err);
            setError("Failed to save changes. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleCancelChanges = () => {
        if (brief) {
            setEditableData({
                overview: brief.overview,
                key_goals: brief.key_goals,
                suggested_deliverables: brief.suggested_deliverables,
                brand_tone: brief.brand_tone,
                budget_band: brief.budget_band,
                website_summary_points: brief.website_summary_points,
            });
            setIsDirty(false);
        }
    };

    const statusStyles: { [key: string]: string } = {
        submitted: 'bg-blue-100 text-blue-800',
        'in-review': 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        draft: 'bg-gray-100 text-gray-800',
    };

    if (loading || authLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-12 h-12 border-4 border-t-sunai-orange border-gray-200 rounded-full animate-spin"></div>
            </div>
        );
    }
    
    if (error && !isSaving) { // Don't show main error if a save-specific error occurs
         return (
            <SectionContainer className="text-center py-16 border-2 border-dashed border-red-300 rounded-2xl bg-red-50/50 max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                    <XIcon className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="mt-6 text-xl font-semibold font-poppins text-red-800">Error Loading Brief</h2>
                <p className="mt-2 text-red-700">{error}</p>
                <Link to="/dashboard/briefs" className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold bg-sunai-blue text-white hover:opacity-90 transition-opacity">
                   <ArrowLeftIcon className="w-4 h-4" /> Go Back to Briefs
                </Link>
            </SectionContainer>
        );
    }

    if (!brief) {
        return <SectionContainer><p>Brief not found.</p></SectionContainer>;
    }

    return (
        <main>
            <SectionContainer className="pt-8 md:pt-12">
                <AnimatedElement>
                    <Link to="/dashboard/briefs" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-sunai-slate transition-colors mb-4">
                        <ArrowLeftIcon className="w-4 h-4" /> Back to All Briefs
                    </Link>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                                {brief.company_name}
                            </h1>
                            <p className="mt-1 text-lg text-sunai-slate/80">
                                {brief.project_type}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                             <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusStyles[brief.status] || statusStyles.draft}`}>
                                {brief.status.replace('-', ' ')}
                            </span>
                             <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                <ClockIcon className="w-4 h-4" />
                                <span>{new Date(brief.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </AnimatedElement>
            </SectionContainer>
            
            <SectionContainer className="pt-0">
                <AnimatedElement>
                    <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-lg max-w-4xl mx-auto">
                        <div className="space-y-8">
                            <EditableField label="Company Overview" name="overview" value={editableData.overview || ''} onChange={handleInputChange} type="textarea" />
                            <EditableList label="Key Website Takeaways" name="website_summary_points" items={editableData.website_summary_points || []} onChange={handleListChange} />
                            <EditableList label="Primary Project Goals" name="key_goals" items={editableData.key_goals || []} onChange={handleListChange} />
                            <EditableList label="Suggested Deliverables" name="suggested_deliverables" items={editableData.suggested_deliverables || []} onChange={handleListChange} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
                                <EditableField label="Brand Tone" name="brand_tone" value={editableData.brand_tone || ''} onChange={handleInputChange} />
                                <EditableField label="Budget" name="budget_band" value={editableData.budget_band || ''} onChange={handleInputChange} />
                            </div>

                            {error && <p className="text-red-600 text-sm">{error}</p>}
                            
                            {(isDirty || isSaving || showSuccess) && (
                                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                                    {showSuccess && (
                                        <div className="flex items-center gap-2 text-green-600 text-sm font-semibold animate-fade-in">
                                            <CheckCircleIcon className="w-5 h-5" />
                                            <span>Changes saved!</span>
                                        </div>
                                    )}
                                    <button onClick={handleCancelChanges} disabled={isSaving} className="px-6 py-2 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                                        Cancel
                                    </button>
                                    <button onClick={handleSaveChanges} disabled={isSaving || !isDirty} className="px-6 py-2 rounded-lg font-semibold bg-sunai-orange text-white hover:opacity-90 disabled:bg-orange-300 disabled:cursor-not-allowed">
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </AnimatedElement>
            </SectionContainer>
        </main>
    );
};
