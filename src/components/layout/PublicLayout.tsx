
import React from 'react';
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
                <Outlet context={{ onStartWizard }} />
            </main>
            <Footer onStartWizard={onStartWizard} />
        </div>
    );
};
