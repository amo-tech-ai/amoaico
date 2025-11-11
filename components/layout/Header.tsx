import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data';
import { useAuth } from '../../hooks/useAuth';
import { MenuIcon, XIcon, ChevronDownIcon, LogoIcon } from '../../assets/icons';

const UserMenu = ({ user, logout }: { user: any; logout: () => void; }) => (
    <div className="relative">
        <button className="flex items-center gap-2">
             <img src={user.avatarUrl} alt={user.fullName} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
        </button>
        {/* Dropdown can be added here */}
    </div>
);

export const Header = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const location = useLocation();
    const { user, loading } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const isServicePage = location.pathname.startsWith('/services');
    
    const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
        `text-sm font-medium transition-colors ${isActive ? 'text-[#0F172A]' : 'text-gray-500 hover:text-[#0F172A]'}`;
    
    const serviceDropdownLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isActive ? 'font-semibold' : ''}`;

    return (
        <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/80' : 'bg-white'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <LogoIcon className="w-8 h-8" />
                        <span className="text-xl font-semibold font-poppins text-[#0F172A]">Sunai</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map(link => {
                            if (link.href === '/services') {
                                return (
                                    <div key={link.label} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                                        <NavLink to={link.href}
                                           className={`flex items-center gap-1 text-sm font-medium transition-colors ${isServicePage ? 'text-[#0F172A]' : 'text-gray-500 hover:text-[#0F172A]'}`}>
                                            {link.label} <ChevronDownIcon className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                                        </NavLink>
                                        {servicesOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                                                <NavLink to="/services" end className={serviceDropdownLinkClasses}>All Services</NavLink>
                                                <NavLink to="/services/web-applications" className={serviceDropdownLinkClasses}>Web Applications</NavLink>
                                                <NavLink to="/services/social-media" className={serviceDropdownLinkClasses}>AI Social Media</NavLink>
                                                <NavLink to="/services/ecommerce" className={serviceDropdownLinkClasses}>E-Commerce Solutions</NavLink>
                                                <NavLink to="/services/whatsapp-automation" className={serviceDropdownLinkClasses}>WhatsApp Automation</NavLink>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return <NavLink key={link.label} to={link.href} end={link.href==='/'} className={navLinkClasses}>{link.label}</NavLink>
                        })}
                        {user && <NavLink to="/dashboard" className={navLinkClasses}>Dashboard</NavLink>}
                    </div>
                    <div className="hidden md:block">
                        {loading ? <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div> : user ? <UserMenu user={user} logout={() => {}} /> : <button onClick={onStartWizard} className="px-5 py-2.5 rounded-lg font-medium text-sm bg-[#F97316] text-white transition-transform transform hover:scale-105">Start Your AI Brief</button>}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            {isOpen ? <XIcon className="w-6 h-6 text-[#0F172A]" /> : <MenuIcon className="w-6 h-6 text-[#0F172A]" />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
                        <div className="flex flex-col space-y-4">
                            {NAV_LINKS.map(link => {
                                if (link.href === '/services') {
                                    return (
                                        <div key={link.label}>
                                            <NavLink to={link.href} className="text-[#0F172A] hover:text-[#F97316] transition-colors block">{link.label}</NavLink>
                                            <div className="pl-4 mt-2 space-y-2">
                                                <NavLink to="/services/web-applications" className="text-gray-600 hover:text-[#F97316] transition-colors block">- Web Applications</NavLink>
                                                <NavLink to="/services/social-media" className="text-gray-600 hover:text-[#F97316] transition-colors block">- AI Social Media</NavLink>
                                                <NavLink to="/services/ecommerce" className="text-gray-600 hover:text-[#F97316] transition-colors block">- E-Commerce Solutions</NavLink>
                                                <NavLink to="/services/whatsapp-automation" className="text-gray-600 hover:text-[#F97316] transition-colors block">- WhatsApp Automation</NavLink>
                                            </div>
                                        </div>
                                    )
                                }
                                return <NavLink key={link.label} to={link.href} end={link.href==='/'} className="text-[#0F172A] hover:text-[#F97316] transition-colors block">{link.label}</NavLink>
                            })}
                             {user && <NavLink to="/dashboard" className="text-[#0F172A] hover:text-[#F97316] transition-colors block">Dashboard</NavLink>}
                            <button onClick={() => { onStartWizard(); setIsOpen(false); }} className="w-full px-5 py-2.5 rounded-lg font-medium text-sm bg-[#F97316] text-white">Start Your AI Brief</button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};