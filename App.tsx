import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Page Components
import { HomePage } from './pages/HomePage';
import { AiWebApplicationsPage } from './pages/AiWebApplicationsPage';
import { AiSocialMediaPage } from './pages/AiSocialMediaPage';
import { EcommercePage } from './pages/EcommercePage';
import { WhatsAppAutomationPage } from './pages/WhatsAppAutomationPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ProcessPage } from './pages/ProcessPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TechStackPage } from './pages/TechStackPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';

// Feature Components
import { AiBriefWizard } from './features/ai-brief-wizard/AiBriefWizard';
import { AdminRoute } from './components/AdminRoute';

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
                    {/* Service Pages */}
                    <Route path="/services" element={<AiWebApplicationsPage onStartWizard={startWizard} />} />
                    <Route path="/services/web-applications" element={<AiWebApplicationsPage onStartWizard={startWizard} />} />
                    <Route path="/services/social-media" element={<AiSocialMediaPage onStartWizard={startWizard} />} />
                    <Route path="/services/ecommerce" element={<EcommercePage onStartWizard={startWizard} />} />
                    <Route path="/services/whatsapp-automation" element={<WhatsAppAutomationPage onStartWizard={startWizard} />} />
                    
                    {/* Core Pages */}
                    <Route path="/process" element={<ProcessPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/tech-stack" element={<TechStackPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* User Pages */}
                    <Route path="/dashboard" element={<DashboardPage onStartWizard={startWizard} />} />

                    {/* Admin Pages */}
                    <Route path="/admin" element={<AdminRoute />}>
                        <Route path="dashboard" element={<AdminDashboardPage />} />
                    </Route>

                    {/* Legal Pages */}
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-of-service" element={<TermsOfServicePage />} />

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