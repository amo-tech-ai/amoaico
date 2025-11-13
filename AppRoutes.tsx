import React from 'react';
// FIX: Ensured all react-router imports are from 'react-router-dom'.
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import { DashboardLayout } from './components/layout/DashboardLayout';

// Page Components
import { HomePage } from './pages/HomePage';
import { AiWebApplicationsPage } from './pages/AiWebApplicationsPage';
import { AiSocialMediaPage } from './pages/AiSocialMediaPage';
import { EcommercePage } from './pages/EcommercePage';
import { WhatsAppAutomationPage } from './pages/WhatsAppAutomationPage';
import { ProcessPage } from './pages/ProcessPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TechStackPage } from './pages/TechStackPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Dashboard Page Components
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { BriefsListPage } from './pages/dashboard/BriefsListPage';
import { BriefDetailPage } from './pages/dashboard/BriefDetailPage';
import { ProjectsListPage } from './pages/dashboard/ProjectsListPage';
import { ClientsListPage } from './pages/dashboard/ClientsListPage';
import { FinancialsPage } from './pages/dashboard/FinancialsPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { IntegrationsPage } from './pages/dashboard/IntegrationsPage';


// Feature Components
import { AdminRoute } from './components/AdminRoute';
import { BriefRedirect } from './components/BriefRedirect';

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

        {/* Auth Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- NEW DASHBOARD LAYOUT --- */}
        <Route element={<DashboardLayout onStartWizard={onStartWizard} />}>
            <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="/dashboard/overview" element={<OverviewPage />} />
            <Route path="/dashboard/briefs" element={<BriefsListPage onStartWizard={onStartWizard} />} />
            <Route path="/dashboard/briefs/:briefId" element={<BriefDetailPage />} />
            <Route path="/dashboard/projects" element={<ProjectsListPage />} />
            <Route path="/dashboard/clients" element={<ClientsListPage />} />
            <Route path="/dashboard/financials" element={<FinancialsPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/dashboard/settings/integrations" element={<IntegrationsPage />} />
        </Route>

        {/* --- LEGACY ROUTE REDIRECT --- */}
        <Route path="/brief/:briefId" element={<BriefRedirect />} />

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