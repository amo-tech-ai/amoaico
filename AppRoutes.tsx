import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
import { LoginPage } from './pages/LoginPage';
import { BriefDetailPage } from './pages/BriefDetailPage';

// Feature Components
import { AdminRoute } from './components/AdminRoute';

interface AppRoutesProps {
    onStartWizard: () => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ onStartWizard }) => (
    <Routes>
        <Route path="/" element={<HomePage onStartWizard={onStartWizard} />} />
        {/* Service Pages */}
        <Route path="/services" element={<AiWebApplicationsPage onStartWizard={onStartWizard} />} />
        <Route path="/services/web-applications" element={<AiWebApplicationsPage onStartWizard={onStartWizard} />} />
        <Route path="/services/social-media" element={<AiSocialMediaPage onStartWizard={onStartWizard} />} />
        <Route path="/services/ecommerce" element={<EcommercePage onStartWizard={onStartWizard} />} />
        <Route path="/services/whatsapp-automation" element={<WhatsAppAutomationPage onStartWizard={onStartWizard} />} />
        
        {/* Core Pages */}
        <Route path="/process" element={<ProcessPage onStartWizard={onStartWizard} />} />
        <Route path="/projects" element={<ProjectsPage onStartWizard={onStartWizard} />} />
        <Route path="/tech-stack" element={<TechStackPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/about" element={<AboutPage onStartWizard={onStartWizard} />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* User Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage onStartWizard={onStartWizard} />} />
        <Route path="/brief/:briefId" element={<BriefDetailPage />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
        </Route>

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />

        {/* Fallback route to home */}
        <Route path="*" element={<HomePage onStartWizard={onStartWizard} />} />
    </Routes>
);