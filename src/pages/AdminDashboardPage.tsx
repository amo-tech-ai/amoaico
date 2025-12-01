
import React, { useState, useEffect, useCallback } from 'react';
import { Brief } from '../types';
import { getAllBriefs, updateBriefStatus } from '../services/briefService';
import { supabase } from '../services/supabaseClient';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { useDebounce } from '../hooks/useDebounce';
import { useToast } from '../hooks/useToast';
import { FileTextIcon, XIcon, SearchIcon } from '../assets/icons';

export const AdminDashboardPage = () => {
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({ status: 'all', search: '' });
    const [pagination, setPagination] = useState({ page: 1, pageSize: 10, totalCount: 0 });
    const { showToast } = useToast();

    const debouncedSearch = useDebounce(filters.search, 500);
    const briefStatuses: Brief['status'][] = ['draft', 'submitted', 'in-review', 'approved', 'rejected'];

    const fetchAllBriefs = useCallback(async (page: number, currentFilters: typeof filters, debouncedSearchQuery: string) => {
        setLoading(true);
        setError(null);
        try {
            const { briefs: data, count } = await getAllBriefs({
                page,
                pageSize: pagination.pageSize,
                statusFilter: currentFilters.status,
                searchQuery: debouncedSearchQuery,
            });
            setBriefs(data);
            setPagination(p => ({ ...p, totalCount: count }));
        } catch (err: any) {
            console.error("Failed to fetch all briefs:", err);
            setError(`Could not load briefs. You may not have admin privileges. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, [pagination.pageSize]);

    useEffect(() => {
        fetchAllBriefs(pagination.page, filters, debouncedSearch);
    }, [pagination.page, filters.status, debouncedSearch, fetchAllBriefs]);
    
    // Real-time subscription for new and updated briefs
    useEffect(() => {
        const handleRealtimeChange = (payload: any) => {
            console.log('Realtime change received on admin channel:', payload);
            // The most robust way to handle inserts/updates with pagination and filters
            // is to simply refetch the current view.
            fetchAllBriefs(pagination.page, filters, debouncedSearch);
        };

        const channel = supabase
            .channel('admin-briefs-realtime')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'briefs' },
                handleRealtimeChange
            )
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'briefs' },
                handleRealtimeChange
            )
            .subscribe();
        
        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, pagination.page, filters, debouncedSearch, fetchAllBriefs]);

    const handleStatusChange = async (briefId: string, newStatus: Brief['status']) => {
        try {
            // Optimistic update for a better UX
            setBriefs(prevBriefs => prevBriefs.map(b => b.id === briefId ? { ...b, status: newStatus } : b));
            await updateBriefStatus(briefId, newStatus);
            showToast(`Brief status updated to "${newStatus.replace('-', ' ')}"`, 'success');
        } catch (error) {
            console.error("Failed to update status:", error);
            showToast("Could not update brief status. Please try again.", 'error');
            // Revert on failure
            fetchAllBriefs(pagination.page, filters, debouncedSearch);
        }
    };
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPagination(p => ({ ...p, page: 1 })); // Reset to first page on any filter change
    };

    const statusStyles: { [key in Brief['status']]: string } = {
        draft: 'bg-gray-200 text-gray-800',
        submitted: 'bg-blue-200 text-blue-800',
        'in-review': 'bg-yellow-200 text-yellow-800',
        approved: 'bg-green-200 text-green-800',
        rejected: 'bg-red-200 text-red-800',
    };

    const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);

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
                 <div className="mb-8 p-4 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="relative w-full sm:w-auto">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="search"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search company or project..."
                            className="bg-slate-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-sunai-orange focus:border-sunai-orange w-full sm:w-64 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-4 self-end">
                        <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">Filter:</label>
                        <select
                            id="statusFilter"
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        >
                            <option value="all">All Statuses</option>
                            {briefStatuses.map(status => (
                                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</option>
                            ))}
                        </select>
                    </div>
                </div>

                 {loading && briefs.length === 0 ? (
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
                ) : briefs.length > 0 ? (
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
                                <tbody className={`bg-white divide-y divide-gray-200 transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
                                    {briefs.map((brief) => (
                                        <tr key={brief.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-[#00334F]">{brief.company_name}</div>
                                                <div className="text-xs text-gray-500">{brief.project_type}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{brief.user?.full_name || 'N/A'}</td>
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
                        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(pagination.page - 1) * pagination.pageSize + 1}</span> to <span className="font-medium">{Math.min(pagination.page * pagination.pageSize, pagination.totalCount)}</span> of <span className="font-medium">{pagination.totalCount}</span> results
                            </div>
                            <div className="flex-1 flex justify-between sm:justify-end gap-2">
                                <button onClick={() => setPagination(p => ({...p, page: p.page - 1}))} disabled={pagination.page <= 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-opacity">Previous</button>
                                <button onClick={() => setPagination(p => ({...p, page: p.page + 1}))} disabled={pagination.page >= totalPages} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-opacity">Next</button>
                            </div>
                        </div>
                    </div>
                ) : (
                     <AnimatedElement className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <FileTextIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-[#00334F]">No Briefs Found</h2>
                        <p className="mt-2 text-gray-600">There are no briefs matching the current filters.</p>
                    </AnimatedElement>
                )}
            </SectionContainer>
        </main>
    );
};
