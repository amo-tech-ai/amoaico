import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSearch } from '../../hooks/useSearch';
import { SearchIcon, BellIcon, ChevronDownIcon, PlusCircleIcon, FolderKanbanIcon, FileTextIcon } from '../../assets/icons';

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
    const { query, setQuery, results, loading, isOpen, setIsOpen, containerRef } = useSearch();

    return (
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 z-20">
            <div className="flex items-center justify-between h-16">
                {/* Search Bar */}
                <div className="relative" ref={containerRef}>
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <input 
                        type="text" 
                        placeholder="Search projects..." 
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                        onFocus={() => setIsOpen(true)}
                        className="bg-slate-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-sunai-orange focus:border-sunai-orange w-48 sm:w-80 transition-all relative z-10" 
                    />

                    {/* Search Results Dropdown */}
                    {isOpen && query.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-full sm:w-96 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
                            {loading ? (
                                <div className="p-6 text-center text-sm text-gray-500">
                                    <div className="w-5 h-5 border-2 border-t-sunai-orange rounded-full animate-spin mx-auto mb-2"></div>
                                    Searching...
                                </div>
                            ) : (results.briefs.length === 0 && results.projects.length === 0) ? (
                                <div className="p-4 text-center text-sm text-gray-500">No results found for "{query}".</div>
                            ) : (
                                <div className="max-h-[60vh] overflow-y-auto py-2">
                                    {/* Projects Section */}
                                    {results.projects.length > 0 && (
                                        <div className="mb-2">
                                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2 bg-slate-50">Projects</div>
                                            {results.projects.map(p => (
                                                <Link 
                                                    to={`/dashboard/briefs/${p.id}`} 
                                                    key={p.id} 
                                                    onClick={() => setIsOpen(false)} 
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                        <FolderKanbanIcon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-sunai-slate">{p.company_name}</div>
                                                        <div className="text-xs text-gray-500">{p.project_type}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Briefs Section */}
                                    {results.briefs.length > 0 && (
                                        <div>
                                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2 bg-slate-50 border-t border-gray-100">Briefs</div>
                                            {results.briefs.map(b => (
                                                <Link 
                                                    to={`/dashboard/briefs/${b.id}`} 
                                                    key={b.id} 
                                                    onClick={() => setIsOpen(false)} 
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-sunai-orange flex items-center justify-center flex-shrink-0">
                                                        <FileTextIcon className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="text-sm font-medium text-sunai-slate">{b.company_name}</div>
                                                        <div className="text-xs text-gray-500">{b.project_type}</div>
                                                    </div>
                                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${b.status==='approved'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-600'}`}>
                                                        {b.status}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-4">
                    <button onClick={onStartWizard} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-sunai-orange text-white transition-transform transform hover:scale-105">
                        <PlusCircleIcon className="w-5 h-5" /> New Brief
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors relative">
                        <BellIcon className="w-5 h-5 text-gray-600" />
                        {/* Notification Dot Placeholder */}
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <UserMenu />
                </div>
            </div>
        </header>
    );
};