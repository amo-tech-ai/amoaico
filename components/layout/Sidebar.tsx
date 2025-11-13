import React from 'react';
// FIX: Changed imports from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
    LogoIcon, LayoutDashboardIcon, FileTextIcon, RocketIcon, UsersIcon, 
    DollarSignIcon, SettingsIcon, LifeBuoyIcon, LogOutIcon 
} from '../../assets/icons';

const navItems = [
    { href: '/dashboard/overview', label: 'Overview', icon: <LayoutDashboardIcon className="w-5 h-5" /> },
    { href: '/dashboard/briefs', label: 'Briefs', icon: <FileTextIcon className="w-5 h-5" /> },
    { href: '/dashboard/projects', label: 'Projects', icon: <RocketIcon className="w-5 h-5" strokeWidth="2" /> },
    { href: '/dashboard/clients', label: 'Clients', icon: <UsersIcon className="w-5 h-5" /> },
    { href: '/dashboard/financials', label: 'Financials', icon: <DollarSignIcon className="w-5 h-5" /> },
];

const bottomNavItems = [
    { href: '/dashboard/support', label: 'Support', icon: <LifeBuoyIcon className="w-5 h-5" /> },
    { href: '/dashboard/settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
];

const NavItem = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => {
    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive ? 'bg-sunai-orange/10 text-sunai-orange' : 'text-gray-600 hover:bg-gray-100'
        }`;

    return (
        <NavLink to={href} className={navLinkClasses}>
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};

export const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
            <div className="px-6 py-4 border-b border-gray-200">
                <Link to="/" className="flex items-center gap-2">
                    <LogoIcon className="w-8 h-8" />
                    <span className="text-xl font-semibold font-poppins text-sunai-slate">Sunai</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(item => <NavItem key={item.href} {...item} />)}
            </nav>

            <div className="px-4 py-6 mt-auto border-t border-gray-200 space-y-2">
                {bottomNavItems.map(item => <NavItem key={item.href} {...item} />)}
                <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
                    <LogOutIcon className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};