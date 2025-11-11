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

const App = () => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const startWizard = useCallback(() => setIsWizardOpen(true), []);
    const closeWizard = useCallback(() => setIsWizardOpen(false), []);

    return (
        <HashRouter>
            <ScrollToTop />
            <div className="bg-[#FFF9F5]">
                <Header onStartWizard={startWizard} />
                <AppRoutes onStartWizard={startWizard} />
                <Footer onStartWizard={startWizard} />
                {isWizardOpen && <AiBriefWizard onClose={closeWizard} />}
            </div>
        </HashRouter>
    );
};

export default App;