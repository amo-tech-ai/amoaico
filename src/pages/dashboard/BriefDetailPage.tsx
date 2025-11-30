
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Brief } from '../../types';
import { getBriefById, updateBrief } from '../../services/briefService';
import { useAuth } from '../../hooks/useAuth';
import { useDebounce } from '../../hooks/useDebounce';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { ClockIcon, XIcon, ArrowLeftIcon, CheckCircleIcon } from '../../assets/icons';

// Reusable component for editable text fields (input/textarea)
const EditableField = ({ label, value, name, onChange, type = 'text' }: { label: string, value: string, name: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, type?: 'text' | 'textarea' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
        {type === 'textarea' ? (
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows={4}
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
        <label htmlFor={name} className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            value={(items || []).join('\n')}
            onChange={onChange}
            rows={(items || []).length > 3 ? items.length + 1 : 4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sunai-orange focus:ring-sunai-orange sm:text-sm bg-slate-50 p-3 transition"
            placeholder="Enter each item on a new line"
        />
    </div>
);

type AutosaveStatus = 'idle' | 'dirty' | 'saving' | 'success' | 'error';

const AutosaveStatusIndicator = ({ status }: { status: AutosaveStatus }) => {
    switch (status) {
        case 'dirty':
            return <span className="text-xs text-gray-500 font-medium">Unsaved changes</span>;
        case 'saving':
            return <div className="flex items-center gap-2 text-xs text-gray-500 font-medium"><div className="w-3 h-3 border-2 border-t-sunai-orange rounded-full animate-spin"></div>Saving...</div>;
        case 'success':
            return <div className="flex items-center gap-2 text-xs text-green-600 font-medium animate-fade-in"><CheckCircleIcon className="w-4 h-4" />All changes saved</div>;
        case 'error':
            return <span className="text-xs text-red-600 font-medium">Error saving</span>;
        default:
            return null;
    }
};

export const BriefDetailPage = () => {
    const { briefId } = useParams<{ briefId: string }>();
    const { user, loading: authLoading } = useAuth();
    
    const [brief, setBrief] = useState<Brief | null>(null);
    const [editableData, setEditableData] = useState<Partial<Brief>>({});
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>('idle');

    const debouncedData = useDebounce(editableData, 2000); 
    
    useEffect(() => {
        if (!briefId) {
            setError("No brief ID provided.");
            setLoading(false);
            return;
        }

        if (authLoading || !user) return;

        const fetchBrief = async () => {
            try {
                const data = await getBriefById(briefId);
                if (data) {
                    setBrief(data);
                    setEditableData(data);
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

    // Effect to trigger autosave
    useEffect(() => {
        const handleAutosave = async () => {
            if (!briefId || !isDirty) return;
            setAutosaveStatus('saving');
            setError(null);
            try {
                const updatedBrief = await updateBrief(briefId, debouncedData);
                setBrief(updatedBrief);
                // Don't overwrite editableData here, or cursor jumps/inputs might reset while typing
                setIsDirty(false);
                setAutosaveStatus('success');
                setTimeout(() => setAutosaveStatus('idle'), 3000);
            } catch (err) {
                console.error(err);
                setError("Failed to save changes. Please try again.");
                setAutosaveStatus('error');
            }
        };

        handleAutosave();
    }, [debouncedData, briefId]); // Removing isDirty from dep array to avoid loop, handled inside

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIsDirty(true);
        setAutosaveStatus('dirty');
        setEditableData(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedInputChange = (parent: string, field: string, value: string) => {
        setIsDirty(true);
        setAutosaveStatus('dirty');
        setEditableData(prev => ({
            ...prev,
            [parent]: {
                ...((prev as any)[parent] || {}),
                [field]: value
            }
        }));
    };
    
    const handleListChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIsDirty(true);
        setAutosaveStatus('dirty');
        setEditableData(prev => ({ ...prev, [name]: value.split('\n') }));
    };

    const handleNestedListChange = (parent: string, field: string, value: string) => {
        setIsDirty(true);
        setAutosaveStatus('dirty');
        setEditableData(prev => ({
            ...prev,
            [parent]: {
                ...((prev as any)[parent] || {}),
                [field]: value.split('\n')
            }
        }));
    };

    const statusStyles: { [key: string]: string } = {
        submitted: 'bg-blue-100 text-blue-800',
        'in-review': 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        draft: 'bg-gray-100 text-gray-800',
    };

    if (loading || authLoading) return <div className="flex items-center justify-center h-full"><div className="w-12 h-12 border-4 border-t-sunai-orange border-gray-200 rounded-full animate-spin"></div></div>;
    
    if (error && autosaveStatus !== 'error') return <SectionContainer className="text-center"><p>{error}</p></SectionContainer>;

    if (!brief) return <SectionContainer><p>Brief not found.</p></SectionContainer>;

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
                                {editableData.project_title || brief.company_name}
                            </h1>
                            <p className="mt-1 text-lg text-sunai-slate/80">
                                {brief.project_type} Brief
                            </p>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                             <AutosaveStatusIndicator status={autosaveStatus} />
                             <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusStyles[brief.status] || statusStyles.draft}`}>
                                {brief.status.replace('-', ' ')}
                            </span>
                        </div>
                    </div>
                </AnimatedElement>
            </SectionContainer>
            
            <SectionContainer className="pt-0">
                <AnimatedElement>
                    <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-lg max-w-4xl mx-auto">
                        <div className="space-y-10">
                            
                            {/* Core Info */}
                            <section className="space-y-6">
                                <h3 className="text-xl font-bold text-sunai-blue border-b pb-2">Core Strategy</h3>
                                <EditableField label="Project Title" name="project_title" value={editableData.project_title || ''} onChange={handleInputChange} />
                                <EditableField label="Executive Summary" name="summary" value={editableData.summary || ''} onChange={handleInputChange} type="textarea" />
                                <EditableList label="Primary Goals" name="goals" items={(editableData.goals || [])} onChange={handleListChange} />
                            </section>

                            {/* Audience */}
                            <section className="space-y-6">
                                <h3 className="text-xl font-bold text-sunai-blue border-b pb-2">Target Audience</h3>
                                <EditableField 
                                    label="Audience Description" 
                                    name="target_audience_description" 
                                    value={editableData.target_audience?.description || ''} 
                                    onChange={(e) => handleNestedInputChange('target_audience', 'description', e.target.value)} 
                                    type="textarea"
                                />
                                <EditableList 
                                    label="Key Segments" 
                                    name="target_audience_segments" 
                                    items={editableData.target_audience?.segments || []} 
                                    onChange={(e) => handleNestedListChange('target_audience', 'segments', e.target.value)} 
                                />
                            </section>

                            {/* Execution */}
                            <section className="space-y-6">
                                <h3 className="text-xl font-bold text-sunai-blue border-b pb-2">Execution</h3>
                                <EditableList label="Deliverables" name="deliverables" items={(editableData.deliverables || [])} onChange={handleListChange} />
                                <EditableField label="Scope & Constraints" name="scope" value={editableData.scope || ''} onChange={handleInputChange} type="textarea" />
                            </section>

                            {/* Tone & Style */}
                            <section className="space-y-6">
                                <h3 className="text-xl font-bold text-sunai-blue border-b pb-2">Tone & Brand</h3>
                                <EditableList 
                                    label="Tone Keywords" 
                                    name="tone_keywords" 
                                    items={editableData.tone_and_style?.tone_keywords || []} 
                                    onChange={(e) => handleNestedListChange('tone_and_style', 'tone_keywords', e.target.value)} 
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <EditableList 
                                        label="Do's" 
                                        name="tone_do" 
                                        items={editableData.tone_and_style?.do || []} 
                                        onChange={(e) => handleNestedListChange('tone_and_style', 'do', e.target.value)} 
                                    />
                                    <EditableList 
                                        label="Dont's" 
                                        name="tone_dont" 
                                        items={editableData.tone_and_style?.dont || []} 
                                        onChange={(e) => handleNestedListChange('tone_and_style', 'dont', e.target.value)} 
                                    />
                                </div>
                            </section>

                            {/* Logistics */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-sunai-blue border-b pb-2 mb-4">Timeline</h3>
                                    <EditableList 
                                        label="Key Milestones" 
                                        name="timeline_milestones" 
                                        items={editableData.timeline?.milestones || []} 
                                        onChange={(e) => handleNestedListChange('timeline', 'milestones', e.target.value)} 
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-sunai-blue border-b pb-2 mb-4">Budget</h3>
                                    <EditableField 
                                        label="Range" 
                                        name="budget_range" 
                                        value={editableData.budget?.range || ''} 
                                        onChange={(e) => handleNestedInputChange('budget', 'range', e.target.value)} 
                                    />
                                    <EditableField 
                                        label="Notes" 
                                        name="budget_notes" 
                                        value={editableData.budget?.notes || ''} 
                                        onChange={(e) => handleNestedInputChange('budget', 'notes', e.target.value)} 
                                    />
                                </div>
                            </section>

                            {autosaveStatus === 'error' && <p className="text-red-600 text-sm font-semibold">{error}</p>}
                        </div>
                    </div>
                </AnimatedElement>
            </SectionContainer>
        </main>
    );
};
