import React, { useState, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';

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
        <BrowserRouter>
            <ScrollToTop />
            <AppRoutes onStartWizard={startWizard} />
            {isWizardOpen && <AiBriefWizard onClose={closeWizard} />}
        </BrowserRouter>
    );
};

export default App;
