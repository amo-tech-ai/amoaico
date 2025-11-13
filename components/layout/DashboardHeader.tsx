import React from 'react';
// FIX: Changed import of `Link` from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { SearchIcon, BellIcon, ChevronDownIcon, PlusCircleIcon } from '../../assets/icons';

const UserMenu = () => {
    const { user, logout } = useAuth();
    if (!user) return null;

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 focus:outline-none">
                 <img src={user.avatarUrl} alt={user.fullName} className="w-8 h-8 rounded-full border-2 border-gray-200" />
                 <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.fullName}</span>
                 <ChevronDownIcon className="w-4 h-4 text-gray-500 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-10">
                <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                {user.role === 'admin' && <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</Link>}
                <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
            </div>
        </div>
    );
};


export const DashboardHeader = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    return (
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Search Bar */}
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Search anything..." className="bg-slate-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-sunai-orange focus:border-sunai-orange w-48 sm:w-64 transition-all" />
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-4">
                    <button onClick={onStartWizard} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-sunai-orange text-white transition-transform transform hover:scale-105">
                        <PlusCircleIcon className="w-5 h-5" /> New Brief
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <BellIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <UserMenu />
                </div>
            </div>
        </header>
    );
};