import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getBriefsForUser } from '../../services/briefService';
import { Brief } from '../../types';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { FileTextIcon, XIcon } from '../../assets/icons';
import { supabase } from '../../services/supabaseClient';
import { BriefCard } from '../../components/dashboard/BriefCard';

interface DashboardContext {
  onStartWizard: () => void;
}

export const BriefsListPage = () => {
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
        
        const mapPayloadToBrief = (payload: any): Brief => {
            const briefData = payload.brief_data || {};
            return {
                id: payload.id,
                company_name: payload.company_name,
                project_type: payload.project_type,
                status: payload.status,
                created_at: payload.created_at,
                overview: briefData.overview || '',
                key_goals: briefData.key_goals || [],
                suggested_deliverables: briefData.suggested_deliverables || [],
                brand_tone: briefData.brand_tone || '',
                budget_band: briefData.budget_band || '',
                website_summary_points: briefData.website_summary_points || [],
            };
        };

        const channel = supabase
            .channel(`user-briefs-realtime-${user.id}`)
            .on( 'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'briefs', filter: `user_id=eq.${user.id}`},
                (payload) => {
                    console.log('Realtime brief insert received!', payload.new);
                    const newBrief = mapPayloadToBrief(payload.new);
                    setBriefs(currentBriefs => [newBrief, ...currentBriefs]);
                }
            )
            .on( 'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'briefs', filter: `user_id=eq.${user.id}`},
                (payload) => {
                    console.log('Realtime brief update received!', payload.new);
                    const updatedBrief = mapPayloadToBrief(payload.new);
                    setBriefs(currentBriefs =>
                        currentBriefs.map(b => (b.id === updatedBrief.id ? updatedBrief : b))
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

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