import React, { useState, useEffect } from 'react';
// FIX: Changed import of `Link` from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Brief } from '../../types';
import { getBriefsForUser, getAllBriefs } from '../../services/briefService';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { StatCard } from '../../components/dashboard/overview/StatCard';
import { ActivityFeed } from '../../components/dashboard/overview/ActivityFeed';
import { QuickActions } from '../../components/dashboard/overview/QuickActions';
import { FileTextIcon, CheckCircleIcon, ClockIcon, UsersIcon, XIcon } from '../../assets/icons';

const StatCardSkeleton = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2 mt-3"></div>
    </div>
);

export const OverviewPage = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    const { user } = useAuth();
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBriefs = async () => {
            if (!user) return;
            try {
                const data = user.role === 'admin' 
                    ? (await getAllBriefs({ pageSize: 5 })).briefs
                    : await getBriefsForUser(user.id);
                setBriefs(data);
            } catch (err) {
                console.error("Failed to fetch briefs for overview:", err);
                setError("Could not load overview data.");
            } finally {
                setLoading(false);
            }
        };
        fetchBriefs();
    }, [user]);

    const stats = {
        totalBriefs: briefs.length,
        inReview: briefs.filter(b => b.status === 'in-review').length,
        approved: briefs.filter(b => b.status === 'approved').length,
        totalProjects: 0, // Placeholder
    };

    return (
        <SectionContainer className="pt-8 md:pt-12">
            <AnimatedElement>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                    Welcome back, {user?.fullName.split(' ')[0]}!
                </h1>
                <p className="mt-1 text-lg text-sunai-slate/80">
                    Here's a snapshot of your projects and activity.
                </p>
            </AnimatedElement>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {loading ? (
                    <>
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                    </>
                ) : (
                    <>
                        <StatCard icon={<FileTextIcon />} title="Total Briefs" value={stats.totalBriefs} />
                        <StatCard icon={<ClockIcon />} title="Pending Review" value={stats.inReview} />
                        <StatCard icon={<CheckCircleIcon />} title="Approved" value={stats.approved} />
                        <StatCard icon={<UsersIcon />} title="Active Projects" value={stats.totalProjects} />
                    </>
                )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 items-start">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold font-poppins text-sunai-blue mb-4">Recent Activity</h2>
                    {loading ? (
                        <div className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse space-y-4">
                            {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded"></div>)}
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 p-6 rounded-lg text-red-700 flex items-center gap-4">
                            <XIcon className="w-6 h-6" />
                            <div>
                                <h3 className="font-semibold">Error Loading Activity</h3>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    ) : (
                       <ActivityFeed briefs={briefs.slice(0, 5)} />
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-bold font-poppins text-sunai-blue mb-4">Quick Actions</h2>
                     <QuickActions onStartWizard={onStartWizard} />
                </div>
            </div>
        </SectionContainer>
    );
};