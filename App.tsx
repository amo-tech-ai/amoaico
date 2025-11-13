import React, { useState, useCallback } from 'react';
import { HashRouter } from 'react-router-dom';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Feature Components
import { AiBriefWizard } from './features/ai-brief-wizard/AiBriefWizard';

// Custom Components
import { ScrollToTop } from './components/ScrollToTop';
import { AppRoutes } from './AppRoutes';
import { LogoIcon } from './assets/icons';

const App = () => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const startWizard = useCallback(() => setIsWizardOpen(true), []);
    const closeWizard = useCallback(() => setIsWizardOpen(false), []);

    return (
        <HashRouter>
            <ScrollToTop />
            <div className="bg-[#FFF9F5] relative overflow-hidden">
                {/* Decorative background logos */}
                <div aria-hidden="true" className="absolute inset-0 opacity-50">
                    {/* FIX: Add unique clipId to prevent duplicate SVG IDs */}
                    <LogoIcon clipId="bg-logo-top" className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1500px] h-auto max-w-none" />
                    {/* FIX: Add unique clipId to prevent duplicate SVG IDs */}
                    <LogoIcon clipId="bg-logo-bottom" className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 w-[1500px] h-auto max-w-none" />
                </div>

                {/* Main content, layered on top of the background */}
                <div className="relative">
                    <Header onStartWizard={startWizard} />
                    <AppRoutes onStartWizard={startWizard} />
                    <Footer onStartWizard={startWizard} />
                </div>
                
                {/* Wizard modal is outside the relative content div to ensure its fixed positioning works correctly */}
                {isWizardOpen && <AiBriefWizard onClose={closeWizard} />}
            </div>
        </HashRouter>
    );
};

export default App;