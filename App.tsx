
import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Page Components
import { HomePage } from './pages/HomePage';
import { AiWebApplicationsPage } from './pages/AiWebApplicationsPage';

// Feature Components
import { AiBriefWizard } from './features/ai-brief-wizard/AiBriefWizard';

const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
};

const App = () => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const startWizard = useCallback(() => setIsWizardOpen(true), []);
    const closeWizard = useCallback(() => setIsWizardOpen(false), []);

    return (
        <HashRouter>
            <ScrollToTop />
            <div className="bg-[#FFF9F5]">
                <Header onStartWizard={startWizard} />
                <Routes>
                    <Route path="/" element={<HomePage onStartWizard={startWizard} />} />
                    <Route path="/services" element={<AiWebApplicationsPage onStartWizard={startWizard} />} />
                    <Route path="/services/web-applications" element={<AiWebApplicationsPage onStartWizard={startWizard} />} />
                    {/* Fallback route to home */}
                    <Route path="*" element={<HomePage onStartWizard={startWizard} />} />
                </Routes>
                <Footer onStartWizard={startWizard} />
                {isWizardOpen && <AiBriefWizard onClose={closeWizard} />}
            </div>
        </HashRouter>
    );
};

export default App;