import React, { useState, useCallback, lazy, Suspense } from 'react';
// FIX: Corrected react-router-dom import. Changed `BrowserRouter as HashRouter` to `HashRouter` to resolve module resolution issues.
import { HashRouter } from 'react-router-dom';

// Custom Components
import { ScrollToTop } from './components/ScrollToTop';
import { AppRoutes } from './AppRoutes';
import { ToastContainer } from './components/ToastContainer';

// Lazily load the AiBriefWizard component. This creates a separate code chunk
// that is only downloaded when the user initiates the wizard flow.
const AiBriefWizard = lazy(() => import('./features/ai-brief-wizard/AiBriefWizard').then(module => ({ default: module.AiBriefWizard })));

// A loader component to show while the lazy-loaded wizard is being fetched.
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
            <AppRoutes onStartWizard={startWizard} />
            
            {/* The wizard is only rendered when triggered. The Suspense boundary handles the loading state. */}
            {isWizardOpen && (
                <Suspense fallback={<WizardLoader />}>
                    <AiBriefWizard onClose={closeWizard} />
                </Suspense>
            )}

            <ToastContainer />
        </HashRouter>
    );
};

export default App;