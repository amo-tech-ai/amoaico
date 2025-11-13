import React, { useState, useEffect } from 'react';
// FIX: Changed imports from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { useParams, Link } from 'react-router-dom';
import { Brief } from '../types';
import { getBriefById } from '../services/briefService';
import { useAuth } from '../hooks/useAuth';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { ClockIcon, FileTextIcon, XIcon, ArrowLeftIcon } from '../assets/icons';

const BriefDetailSection = ({ title, content }: { title: string, content: React.ReactNode }) => (
    <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
        <div className="mt-2 text-gray-800">{content}</div>
    </div>
);

export const BriefDetailPage = () => {
    const { briefId } = useParams<{ briefId: string }>();
    const { user, loading: authLoading } = useAuth();
    const [brief, setBrief] = useState<Brief | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (!briefId) {
            setError("No brief ID provided.");
            setLoading(false);
            return;
        }

        if (authLoading) return; // Wait for authentication to complete

        if (!user) {
            setError("You must be logged in to view this page.");
            setLoading(false);
            return;
        }

        const fetchBrief = async () => {
            try {
                // The briefService now fetches from the live Supabase backend.
                // RLS policies on the server ensure the user can only fetch their own brief.
                const data = await getBriefById(briefId);
                if (data) {
                    setBrief(data);
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

    const statusStyles: { [key: string]: string } = {
        submitted: 'bg-blue-100 text-blue-800',
        'in-review': 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        draft: 'bg-gray-100 text-gray-800',
    };

    if (loading || authLoading) {
        return (
            <SectionContainer className="text-center">
                <div className="w-12 h-12 border-4 border-t-[#F97316] border-gray-200 rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading Brief Details...</p>
            </SectionContainer>
        );
    }
    
    if (error) {
         return (
            <SectionContainer className="text-center py-16 border-2 border-dashed border-red-300 rounded-2xl bg-red-50/50 max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                    <XIcon className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="mt-6 text-xl font-semibold font-poppins text-red-800">Error Loading Brief</h2>
                <p className="mt-2 text-red-700">{error}</p>
                <Link to="/dashboard" className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold bg-[#00334F] text-white hover:opacity-90 transition-opacity">
                   <ArrowLeftIcon className="w-4 h-4" /> Go Back to Dashboard
                </Link>
            </SectionContainer>
        );
    }

    if (!brief) {
        return <SectionContainer><p>Brief not found.</p></SectionContainer>; // Should be caught by error state
    }

    return (
        <main>
            <SectionContainer className="bg-slate-50 pt-16 md:pt-24">
                <AnimatedElement>
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#0F172A] transition-colors mb-4">
                        <ArrowLeftIcon className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                                {brief.company_name}
                            </h1>
                            <p className="mt-2 text-lg text-[#0F172A]/80">
                                {brief.project_type}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
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
            
            <SectionContainer>
                <AnimatedElement>
                    <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-lg max-w-4xl mx-auto">
                        <div className="space-y-8">
                            <BriefDetailSection title="Company Overview" content={<p>{brief.overview}</p>} />
                            <BriefDetailSection title="Key Website Takeaways" content={
                                <ul className="list-disc list-inside space-y-1">
                                    {brief.website_summary_points.map((point, i) => <li key={i}>{point}</li>)}
                                </ul>
                            } />
                            <BriefDetailSection title="Primary Project Goals" content={
                                <ul className="list-disc list-inside space-y-1">
                                    {brief.key_goals.map((goal, i) => <li key={i}>{goal}</li>)}
                                </ul>
                            } />
                            <BriefDetailSection title="Suggested Deliverables" content={
                                <ul className="list-disc list-inside space-y-1">
                                    {brief.suggested_deliverables.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            } />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
                                <BriefDetailSection title="Brand Tone" content={<p className="font-semibold">{brief.brand_tone}</p>} />
                                <BriefDetailSection title="Budget" content={<p className="font-semibold">{brief.budget_band}</p>} />
                            </div>
                        </div>
                    </div>
                </AnimatedElement>
            </SectionContainer>
        </main>
    );
};