import React, { useState, useEffect } from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getBriefsForUser } from '../../services/briefService';
import { Brief } from '../../types';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { FileTextIcon, ClockIcon, XIcon } from '../../assets/icons';
import { supabase } from '../../services/supabaseClient';

// FIX: Changed BriefCard to a React.FC to correctly type it as a React component, resolving an issue where the 'key' prop was being incorrectly included in the component's props type.
const BriefCard: React.FC<{ brief: Brief; index: number }> = ({ brief, index }) => {
    const statusStyles: { [key: string]: string } = {
        submitted: 'bg-blue-100 text-blue-800',
        'in-review': 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        draft: 'bg-gray-100 text-gray-800',
    };

    return (
        <AnimatedElement delay={100 * index} className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold font-poppins text-sunai-blue text-lg">{brief.company_name}</h3>
                        <p className="text-sm text-gray-500">{brief.project_type}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[brief.status] || statusStyles.draft}`}>
                        {brief.status.replace('-', ' ')}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mt-4 line-clamp-2">{brief.overview}</p>
            </div>
            <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{new Date(brief.created_at).toLocaleDateString()}</span>
                </div>
                <Link to={`/dashboard/briefs/${brief.id}`} className="font-semibold text-sunai-orange hover:text-orange-700">
                    View Brief →
                </Link>
            </div>
        </AnimatedElement>
    );
};

// FIX: Define context type for useOutletContext.
interface DashboardContext {
  onStartWizard: () => void;
}

export const BriefsListPage = () => {
    // FIX: Get onStartWizard from Outlet context instead of props to fix missing prop error.
    const { onStartWizard } = useOutletContext<DashboardContext>();
    const { user, loading: authLoading } = useAuth();
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchBriefs = async () => {
            if (!user) return;
            
            setLoading(true);
            setError(null);
            try {
                const data = await getBriefsForUser(user.id);
                if (isMounted) {
                    setBriefs(data);
                }
            } catch (err) {
                console.error("Failed to fetch briefs:", err);
                if (isMounted) {
                    setError("Could not load your project briefs. Please try again later.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (user) {
            fetchBriefs();
        } else if (!authLoading) {
            setLoading(false);
            setBriefs([]);
        }

        return () => {
            isMounted = false;
        };
    }, [user, authLoading]);

    // Set up a real-time subscription to the user's briefs
    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel(`user-briefs-realtime-${user.id}`)
            .on<Brief>(
                'postgres_changes',
                { 
                    event: 'UPDATE', 
                    schema: 'public', 
                    table: 'briefs',
                    filter: `user_id=eq.${user.id}` // Only listen to changes for this user's briefs
                },
                (payload) => {
                    console.log('Realtime brief update received for user!', payload.new);
                    const updatedBrief = payload.new as any;
                    
                    // Map the payload to the application's Brief type for consistency
                    const briefData = updatedBrief.brief_data || {};
                    const mappedBrief: Brief = {
                        id: updatedBrief.id,
                        company_name: updatedBrief.company_name,
                        project_type: updatedBrief.project_type,
                        status: updatedBrief.status,
                        created_at: updatedBrief.created_at,
                        overview: briefData.overview || '',
                        key_goals: briefData.key_goals || [],
                        suggested_deliverables: briefData.suggested_deliverables || [],
                        brand_tone: briefData.brand_tone || '',
                        budget_band: briefData.budget_band || '',
                        website_summary_points: briefData.website_summary_points || [],
                    };

                    setBriefs(currentBriefs =>
                        currentBriefs.map(b => (b.id === mappedBrief.id ? mappedBrief : b))
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, supabase]);

    return (
        <main>
            <SectionContainer className="pt-8 md:pt-12">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <AnimatedElement>
                            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                                My Project Briefs
                            </h1>
                        </AnimatedElement>
                        <AnimatedElement delay={100}>
                            <p className="mt-1 text-lg text-sunai-slate/80">
                                View, manage, and create new project briefs.
                            </p>
                        </AnimatedElement>
                    </div>
                </div>
            </SectionContainer>

            <SectionContainer className="pt-0">
                {loading ? (
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl p-6 bg-white animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                                <div className="h-4 bg-gray-200 rounded mt-6"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <AnimatedElement className="text-center py-16 border-2 border-dashed border-red-300 rounded-2xl bg-red-50/50">
                        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                            <XIcon className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-red-800">Something Went Wrong</h2>
                        <p className="mt-2 text-red-700">{error}</p>
                    </AnimatedElement>
                ) : briefs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {briefs.map((brief, index) => <BriefCard key={brief.id} brief={brief} index={index} />)}
                    </div>
                ) : (
                    <AnimatedElement className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <FileTextIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-sunai-blue">No Briefs Yet</h2>
                        <p className="mt-2 text-gray-600">You haven't created any project briefs. Let's build one!</p>
                        <div className="mt-6">
                            <button onClick={onStartWizard} className="px-6 py-2.5 rounded-lg font-semibold bg-sunai-blue text-white hover:opacity-90 transition-opacity">
                                Start Your First AI Brief
                            </button>
                        </div>
                    </AnimatedElement>
                )}
            </SectionContainer>
        </main>
    );
};