import React from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { LogoIcon } from '../../assets/icons';

interface PublicLayoutProps {
    onStartWizard: () => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ onStartWizard }) => {
    return (
        <div className="bg-[#FFF9F5] relative overflow-hidden">
            {/* Decorative background logos */}
            <div aria-hidden="true" className="absolute inset-0 opacity-50">
                <LogoIcon clipId="bg-logo-top" className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1500px] h-auto max-w-none" />
                <LogoIcon clipId="bg-logo-bottom" className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 w-[1500px] h-auto max-w-none" />
            </div>

            {/* Main content, layered on top of the background */}
            <div className="relative">
                <Header onStartWizard={onStartWizard} />
                <div>
                    <Outlet />
                </div>
                <Footer onStartWizard={onStartWizard} />
            </div>
        </div>
    );
};