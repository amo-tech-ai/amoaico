import React, { useState, useEffect, useMemo } from 'react';
import { Brief } from '../types';
import { getAllBriefs, updateBriefStatus } from '../services/briefService';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { ClockIcon, FileTextIcon, UsersIcon, XIcon } from '../assets/icons';

const AdminDashboardPage = () => {
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState('all');

    const briefStatuses: Brief['status'][] = ['draft', 'submitted', 'in-review', 'approved', 'rejected'];

    const fetchAllBriefs = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllBriefs();
            setBriefs(data);
        } catch (err: any) {
            console.error("Failed to fetch all briefs:", err);
            setError(`Could not load briefs. You may not have admin privileges. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllBriefs();
    }, []);

    const handleStatusChange = async (briefId: string, newStatus: Brief['status']) => {
        try {
            const updatedBrief = await updateBriefStatus(briefId, newStatus);
            setBriefs(prevBriefs => prevBriefs.map(b => b.id === briefId ? { ...b, status: updatedBrief.status } : b));
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Could not update brief status. Please try again.");
        }
    };

    const filteredBriefs = useMemo(() => {
        if (statusFilter === 'all') return briefs;
        return briefs.filter(b => b.status === statusFilter);
    }, [briefs, statusFilter]);
    
    const statusStyles: { [key in Brief['status']]: string } = {
        draft: 'bg-gray-200 text-gray-800',
        submitted: 'bg-blue-200 text-blue-800',
        'in-review': 'bg-yellow-200 text-yellow-800',
        approved: 'bg-green-200 text-green-800',
        rejected: 'bg-red-200 text-red-800',
    };

    return (
        <main>
            <SectionContainer className="bg-slate-50 pt-16 md:pt-24">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                        Admin Dashboard
                    </h1>
                    <p className="mt-2 text-lg text-[#0F172A]/80">
                        Manage all submitted project briefs.
                    </p>
                </AnimatedElement>
            </SectionContainer>
            <SectionContainer>
                 <div className="mb-8 p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg font-semibold font-poppins text-[#00334F]">All Project Briefs ({filteredBriefs.length})</h2>
                    <div className="flex items-center gap-4">
                        <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">Filter by status:</label>
                        <select
                            id="statusFilter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        >
                            <option value="all">All</option>
                            {briefStatuses.map(status => (
                                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</option>
                            ))}
                        </select>
                    </div>
                </div>

                 {loading ? (
                    <div className="text-center py-16">
                        <div className="w-12 h-12 border-4 border-t-[#F97316] border-gray-200 rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading briefs...</p>
                    </div>
                ) : error ? (
                    <AnimatedElement className="text-center py-16 border-2 border-dashed border-red-300 rounded-2xl bg-red-50/50">
                        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                            <XIcon className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-red-800">Access Denied or Error</h2>
                        <p className="mt-2 text-red-700 max-w-xl mx-auto">{error}</p>
                    </AnimatedElement>
                ) : filteredBriefs.length > 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredBriefs.map((brief) => (
                                        <tr key={brief.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-[#00334F]">{brief.company_name}</div>
                                                <div className="text-xs text-gray-500">{brief.project_type}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{brief.user?.full_name || brief.user?.email || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(brief.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <select
                                                    value={brief.status}
                                                    onChange={(e) => handleStatusChange(brief.id, e.target.value as Brief['status'])}
                                                    className={`text-xs font-medium py-1 pl-2 pr-7 border-transparent rounded-full appearance-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${statusStyles[brief.status]}`}
                                                >
                                                    {briefStatuses.map(s => <option key={s} value={s}>{s.replace('-', ' ')}</option>)}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                     <AnimatedElement className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <FileTextIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-[#00334F]">No Briefs Found</h2>
                        <p className="mt-2 text-gray-600">There are no briefs matching the current filter.</p>
                    </AnimatedElement>
                )}
            </SectionContainer>
        </main>
    );
};

export { AdminDashboardPage };
