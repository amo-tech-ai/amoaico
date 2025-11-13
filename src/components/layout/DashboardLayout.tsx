import React from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { useAuth } from '../../hooks/useAuth';

interface DashboardLayoutProps {
    onStartWizard: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onStartWizard }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen bg-sunai-cream">
                <div className="w-12 h-12 border-4 border-t-sunai-orange border-gray-200 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 text-sunai-slate">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onStartWizard={onStartWizard} />
                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-sunai-cream">
                    {/* FIX: Pass onStartWizard via Outlet context to avoid prop drilling issues that may be causing typing errors. */}
                    <Outlet context={{ onStartWizard }} />
                </div>
            </div>
        </div>
    );
};