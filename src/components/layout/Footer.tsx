import React from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { Link } from 'react-router-dom';
import { SectionContainer } from './SectionContainer';
import { AnimatedElement } from '../animations/AnimatedElement';
import { BotIcon, LogoIcon } from '../../assets/icons';
import { SERVICE_LINKS, CONTACT_INFO } from '../../data';
import { useAuth } from '../../hooks/useAuth';

export const Footer = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    const { user } = useAuth();

    return (
        <>
            <SectionContainer className="bg-white border-t border-gray-200">
                <div className="text-center max-w-2xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#00334F]">Ready to Build Your AI Vision?</h2>
                        <p className="mt-4 text-lg text-[#0F172A]/80 max-w-2xl mx-auto">Use our AI Brief Generator to scope your project in minutes. It's fast, free, and the first step to production.</p>
                        <div className="mt-8">
                            <button
                                onClick={onStartWizard}
                                className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105 inline-flex items-center gap-2"
                            >
                                <BotIcon className="w-5 h-5" /> Start Your AI Brief
                            </button>
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>
            <footer className="bg-[#00334F] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-3">
                            <Link to="/" className="flex items-center gap-2">
                                <LogoIcon className="w-8 h-8" />
                                <span className="text-xl font-semibold font-poppins">Sunai</span>
                            </Link>
                            <p className="mt-4 text-gray-300 text-sm">Built by Intelligence, Measured by Results.</p>
                             <div className="mt-6 space-y-2 text-sm">
                                {CONTACT_INFO.map(info => (
                                     <a key={info.label} href={info.href} target={info.isWa ? '_blank' : undefined} rel={info.isWa ? 'noopener noreferrer' : undefined} className="block text-gray-300 hover:text-white transition-colors">{info.label}</a>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Company</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    {['about', 'process', 'projects', 'contact'].map(p => <li key={p}><Link to={`/${p}`} className="text-gray-300 hover:text-white">{p.charAt(0).toUpperCase() + p.slice(1)}</Link></li>)}
                                    {user && <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Services</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    {SERVICE_LINKS.map(link => (
                                        <li key={link.href}>
                                            <Link to={link.href} className="text-gray-300 hover:text-white">{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Resources</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li><Link to="/resources" className="text-gray-300 hover:text-white">Blog</Link></li>
                                    <li><Link to="/projects" className="text-gray-300 hover:text-white">Case Studies</Link></li>
                                    <li><Link to="/tech-stack" className="text-gray-300 hover:text-white">Tech Stack</Link></li>
                                    <li><button onClick={onStartWizard} className="text-gray-300 hover:text-white text-left">AI Brief</button></li>
                                    {user && <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">Legal</h3>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                                    <li><Link to="/terms-of-service" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Sunai — All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </>
    );
};