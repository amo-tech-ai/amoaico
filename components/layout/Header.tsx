import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data';
import { useAuth } from '../../hooks/useAuth';
import { MenuIcon, XIcon, ChevronDownIcon, LogoIcon } from '../../assets/icons';

const UserMenu = ({ user, logout }: { user: any; logout: () => void; }) => (
    <div className="relative group">
        <button className="flex items-center gap-2 focus:outline-none">
             <img src={user.avatarUrl} alt={user.fullName} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
             <span className="text-sm font-medium text-gray-700">{user.fullName}</span>
             <ChevronDownIcon className="w-4 h-4 text-gray-500 transition-transform group-hover:rotate-180" />
        </button>
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
            <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
            {user.role === 'admin' && <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</Link>}
            <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
        </div>
    </div>
);

export const Header = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const location = useLocation();
    const { user, loading, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        setIsOpen(false); // Close menu on navigation
    }, [location.pathname]);
    
    useEffect(() => {
        if (!isOpen) {
            setMobileServicesOpen(false); // Close services dropdown when main menu closes
        }
    }, [isOpen]);

    const isServicePage = location.pathname.startsWith('/services');
    
    const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
        `text-sm font-medium transition-colors ${isActive ? 'text-[#0F172A]' : 'text-gray-500 hover:text-[#0F172A]'}`;
    
    const serviceDropdownLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isActive ? 'font-semibold' : ''}`;

    const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) => 
        `block py-2.5 text-base font-medium transition-colors ${isActive ? 'text-[#F97316]' : 'text-[#0F172A] hover:text-[#F97316]'}`;

    const mobileServiceLinkClasses = ({ isActive }: { isActive: boolean }) => 
        `block py-2 text-base text-gray-600 transition-colors ${isActive ? 'font-semibold text-[#F97316]' : 'hover:text-[#F97316]'}`;


    return (
        <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/80' : 'bg-white'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <LogoIcon className="w-8 h-8" />
                        <span className="text-xl font-semibold font-poppins text-[#0F172A]">Sunai</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map(link => {
                            if (link.href === '/services') {
                                return (
                                    <div key={link.label} className="relative group">
                                        <NavLink to={link.href}
                                           className={`flex items-center gap-1 text-sm font-medium transition-colors ${isServicePage ? 'text-[#0F172A]' : 'text-gray-500 hover:text-[#0F172A]'}`}>
                                            {link.label} <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                        </NavLink>
                                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                                            <NavLink to="/services" end className={serviceDropdownLinkClasses}>All Services</NavLink>
                                            <NavLink to="/services/web-applications" className={serviceDropdownLinkClasses}>Web Applications</NavLink>
                                            <NavLink to="/services/social-media" className={serviceDropdownLinkClasses}>AI Social Media</NavLink>
                                            <NavLink to="/services/ecommerce" className={serviceDropdownLinkClasses}>E-Commerce Solutions</NavLink>
                                            <NavLink to="/services/whatsapp-automation" className={serviceDropdownLinkClasses}>WhatsApp Automation</NavLink>
                                        </div>
                                    </div>
                                );
                            }
                            return <NavLink key={link.label} to={link.href} end={link.href==='/'} className={navLinkClasses}>{link.label}</NavLink>
                        })}
                        {user && user.role === 'admin' && <NavLink to="/admin/dashboard" className={navLinkClasses}>Admin</NavLink>}
                        {user && <NavLink to="/dashboard" className={navLinkClasses}>Dashboard</NavLink>}
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        {loading ? <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div> : user ? <UserMenu user={user} logout={logout} /> : (
                            <>
                                <Link to="/login" className="px-5 py-2.5 rounded-lg font-medium text-sm text-[#0F172A] hover:bg-gray-100 transition-colors">Login</Link>
                                <button onClick={onStartWizard} className="px-5 py-2.5 rounded-lg font-medium text-sm bg-[#F97316] text-white transition-transform transform hover:scale-105">Start Your AI Brief</button>
                            </>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className="relative z-50">
                            {isOpen ? <XIcon className="w-6 h-6 text-[#0F172A]" /> : <MenuIcon className="w-6 h-6 text-[#0F172A]" />}
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-4 flex flex-col h-full">
                        <nav className="flex-grow space-y-2">
                            {NAV_LINKS.map(link => {
                                if (link.href === '/services') {
                                    return (
                                        <div key={link.label}>
                                            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex justify-between items-center py-2.5 text-base font-medium text-[#0F172A] hover:text-[#F97316] transition-colors">
                                                <span>{link.label}</span>
                                                <ChevronDownIcon className={`w-5 h-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'max-h-96' : 'max-h-0'}`}>
                                                <div className="pl-4 pt-2 pb-1 space-y-1 border-l-2 border-gray-200 ml-2">
                                                    <NavLink to="/services" end className={mobileServiceLinkClasses}>All Services</NavLink>
                                                    <NavLink to="/services/web-applications" className={mobileServiceLinkClasses}>Web Applications</NavLink>
                                                    <NavLink to="/services/social-media" className={mobileServiceLinkClasses}>AI Social Media</NavLink>
                                                    <NavLink to="/services/ecommerce" className={mobileServiceLinkClasses}>E-Commerce Solutions</NavLink>
                                                    <NavLink to="/services/whatsapp-automation" className={mobileServiceLinkClasses}>WhatsApp Automation</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return <NavLink key={link.label} to={link.href} end={link.href==='/'} className={mobileNavLinkClasses}>{link.label}</NavLink>;
                            })}
                            {user && user.role === 'admin' && <NavLink to="/admin/dashboard" className={mobileNavLinkClasses}>Admin</NavLink>}
                            {user && <NavLink to="/dashboard" className={mobileNavLinkClasses}>Dashboard</NavLink>}
                        </nav>
                        
                        <div className="border-t border-gray-200 pt-4 mt-4">
                             {loading ? <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div> : user ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatarUrl} alt={user.fullName} className="w-10 h-10 rounded-full border-2 border-gray-200" />
                                        <div>
                                            <p className="font-semibold text-sm text-[#0F172A]">{user.fullName}</p>
                                            <button onClick={logout} className="text-xs text-red-600 hover:underline">Logout</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" className="w-full text-center px-5 py-3 rounded-lg font-semibold text-base text-[#0F172A] bg-gray-100 hover:bg-gray-200 transition-colors">Login</Link>
                                    <button onClick={() => { onStartWizard(); setIsOpen(false); }} className="w-full px-5 py-3 rounded-lg font-semibold text-base bg-[#F97316] text-white transition-transform transform hover:scale-105">Start Your AI Brief</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};