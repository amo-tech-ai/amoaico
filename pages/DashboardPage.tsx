import React, { useState, useEffect } from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getBriefsForUser } from '../services/briefService';
import { Brief } from '../types';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { ProfileManager } from '../components/ProfileManager';
import { BotIcon, FileTextIcon, ClockIcon, PlusCircleIcon, XIcon } from '../assets/icons';

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
                        <h3 className="font-bold font-poppins text-[#00334F] text-lg">{brief.company_name}</h3>
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
                <Link to={`/brief/${brief.id}`} className="font-semibold text-[#F97316] hover:text-orange-700">
                    View Brief →
                </Link>
            </div>
        </AnimatedElement>
    );
};


export const DashboardPage = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    const { user, loading: authLoading } = useAuth();
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const fetchBriefs = async () => {
            if (!user) return;
            
            setLoading(true);
            setError(null);
            try {
                // The briefService now fetches from the live Supabase backend.
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

    if (authLoading) {
        return (
            <SectionContainer className="text-center">
                 <div className="w-12 h-12 border-4 border-t-[#F97316] border-gray-200 rounded-full animate-spin mx-auto"></div>
                 <p className="mt-4 text-gray-600">Authenticating...</p>
            </SectionContainer>
        );
    }

    if (!user) {
         return (
            <SectionContainer className="text-center max-w-md mx-auto">
                 <h1 className="text-2xl font-bold font-poppins">Access Your Dashboard</h1>
                 <p className="mt-2 text-gray-600">Please sign in to view your project briefs.</p>
                 <button onClick={() => navigate('/login')} className="mt-6 px-6 py-2.5 rounded-lg font-semibold bg-[#00334F] text-white hover:opacity-90 transition-opacity">
                    Sign In or Sign Up
                </button>
            </SectionContainer>
        );
    }
    
    return (
        <main>
            <SectionContainer className="bg-slate-50 pt-16 md:pt-24">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <AnimatedElement>
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                                Your Dashboard
                            </h1>
                        </AnimatedElement>
                        <AnimatedElement delay={100}>
                            <p className="mt-2 text-lg text-[#0F172A]/80">
                                Welcome back, {user.fullName}. Here are your generated project briefs.
                            </p>
                        </AnimatedElement>
                    </div>
                    <AnimatedElement delay={200}>
                        <button onClick={onStartWizard} className="px-6 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105 inline-flex items-center gap-2 whitespace-nowrap">
                            <PlusCircleIcon className="w-5 h-5" /> Create New Brief
                        </button>
                    </AnimatedElement>
                </div>
            </SectionContainer>

            <SectionContainer>
                <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold font-poppins text-[#00334F]">My Project Briefs</h2>
                        {loading ? (
                             <div className="grid md:grid-cols-2 gap-8">
                                {[...Array(2)].map((_, i) => (
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
                            <div className="grid md:grid-cols-2 gap-8">
                                {briefs.map((brief, index) => <BriefCard key={brief.id} brief={brief} index={index} />)}
                            </div>
                        ) : (
                            <AnimatedElement className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl">
                                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                                    <FileTextIcon className="w-8 h-8 text-gray-500" />
                                </div>
                                <h2 className="mt-6 text-xl font-semibold font-poppins text-[#00334F]">No Briefs Yet</h2>
                                <p className="mt-2 text-gray-600">You haven't created any project briefs. Let's build one!</p>
                                <div className="mt-6">
                                    <button onClick={onStartWizard} className="px-6 py-2.5 rounded-lg font-semibold bg-[#00334F] text-white hover:opacity-90 transition-opacity">
                                        Start Your First AI Brief
                                    </button>
                                </div>
                            </AnimatedElement>
                        )}
                    </div>
                    <aside className="sticky top-28">
                        <ProfileManager />
                    </aside>
                </div>
            </SectionContainer>
        </main>
    );
};