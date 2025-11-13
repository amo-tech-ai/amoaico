import React from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface PublicLayoutProps {
    onStartWizard: () => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ onStartWizard }) => {
    return (
        <div className="bg-[#FFF9F5] flex flex-col min-h-screen">
            <Header onStartWizard={onStartWizard} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer onStartWizard={onStartWizard} />
        </div>
    );
};
