import React, { useState, useCallback, lazy, Suspense } from 'react';
// FIX: Corrected react-router-dom import. Changed `BrowserRouter as HashRouter` to `HashRouter` to resolve module resolution issues.
import { HashRouter } from 'react-router-dom';

// Custom Components
import { ScrollToTop } from './src/components/ScrollToTop';
import { AppRoutes } from './src/AppRoutes';

const AiBriefWizard = lazy(() => import('./src/features/ai-brief-wizard/AiBriefWizard').then(module => ({ default: module.AiBriefWizard })));

const WizardLoader = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full relative flex items-center justify-center" style={{ minHeight: '550px' }}>
            <div className="w-12 h-12 border-4 border-t-sunai-orange border-gray-200 rounded-full animate-spin"></div>
        </div>
    </div>
);

const App = () => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const startWizard = useCallback(() => setIsWizardOpen(true), []);
    const closeWizard = useCallback(() => setIsWizardOpen(false), []);

    return (
        <HashRouter>
            <ScrollToTop />
            {/* 
              AppRoutes now controls which layout (PublicLayout, DashboardLayout, or none) is rendered
              for any given route, preventing the "double layout" bug.
            */}
            <AppRoutes onStartWizard={startWizard} />
            
            {isWizardOpen && (
                <Suspense fallback={<WizardLoader />}>
                    <AiBriefWizard onClose={closeWizard} />
                </Suspense>
            )}
        </HashRouter>
    );
};

export default App;