import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Feature Components
import { AdminRoute } from './components/AdminRoute';
import { BriefRedirect } from './components/BriefRedirect';

// --- Page Components (Lazy Loaded) ---
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AiWebApplicationsPage = lazy(() => import('./pages/AiWebApplicationsPage').then(m => ({ default: m.AiWebApplicationsPage })));
const AiSocialMediaPage = lazy(() => import('./pages/AiSocialMediaPage').then(m => ({ default: m.AiSocialMediaPage })));
const EcommercePage = lazy(() => import('./pages/EcommercePage').then(m => ({ default: m.EcommercePage })));
const WhatsAppAutomationPage = lazy(() => import('./pages/WhatsAppAutomationPage').then(m => ({ default: m.WhatsAppAutomationPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then(m => ({ default: m.ProcessPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const TechStackPage = lazy(() => import('./pages/TechStackPage').then(m => ({ default: m.TechStackPage })));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(m => ({ default: m.TermsOfServicePage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));

// Dashboard Page Components (Lazy Loaded)
const OverviewPage = lazy(() => import('./pages/dashboard/OverviewPage').then(m => ({ default: m.OverviewPage })));
const BriefsListPage = lazy(() => import('./pages/dashboard/BriefsListPage').then(m => ({ default: m.BriefsListPage })));
const BriefDetailPage = lazy(() => import('./pages/dashboard/BriefDetailPage').then(m => ({ default: m.BriefDetailPage })));
const ProjectsListPage = lazy(() => import('./pages/dashboard/ProjectsListPage').then(m => ({ default: m.ProjectsListPage })));
const ClientsListPage = lazy(() => import('./pages/dashboard/ClientsListPage').then(m => ({ default: m.ClientsListPage })));
const FinancialsPage = lazy(() => import('./pages/dashboard/FinancialsPage').then(m => ({ default: m.FinancialsPage })));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage').then(m => ({ default: m.SettingsPage })));
const IntegrationsPage = lazy(() => import('./pages/dashboard/IntegrationsPage').then(m => ({ default: m.IntegrationsPage })));
const SupportPage = lazy(() => import('./pages/dashboard/SupportPage').then(m => ({ default: m.SupportPage })));

interface AppRoutesProps {
    onStartWizard: () => void;
}

const PageLoader = () => (
    <div className="flex items-center justify-center h-screen w-screen bg-sunai-cream">
        <div className="w-12 h-12 border-4 border-t-sunai-orange border-gray-200 rounded-full animate-spin"></div>
    </div>
);

export const AppRoutes: React.FC<AppRoutesProps> = ({ onStartWizard }) => (
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {/* --- PUBLIC-FACING PAGES (with Header/Footer) --- */}
            <Route element={<PublicLayout onStartWizard={onStartWizard} />}>
                <Route path="/" element={<HomePage />} />
                {/* Service Pages */}
                <Route path="/services" element={<AiWebApplicationsPage />} />
                <Route path="/services/web-applications" element={<AiWebApplicationsPage />} />
                <Route path="/services/social-media" element={<AiSocialMediaPage />} />
                <Route path="/services/ecommerce" element={<EcommercePage />} />
                <Route path="/services/whatsapp-automation" element={<WhatsAppAutomationPage />} />
                {/* Core Pages */}
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/tech-stack" element={<TechStackPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Legal Pages */}
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            </Route>

            {/* --- AUTH PAGE (Standalone, No Layout) --- */}
            <Route path="/login" element={<LoginPage />} />

            {/* --- DASHBOARD PAGES (Dashboard Layout) --- */}
            <Route path="/dashboard" element={<DashboardLayout onStartWizard={onStartWizard} />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<OverviewPage />} />
                <Route path="briefs" element={<BriefsListPage />} />
                <Route path="briefs/:briefId" element={<BriefDetailPage />} />
                <Route path="projects" element={<ProjectsListPage />} />
                <Route path="clients" element={<ClientsListPage />} />
                <Route path="financials" element={<FinancialsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="settings/integrations" element={<IntegrationsPage />} />
                <Route path="support" element={<SupportPage />} />
            </Route>

            {/* --- ADMIN ROUTE WRAPPER --- */}
            <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            </Route>

            {/* --- UTILITY & FALLBACK ROUTES --- */}
            <Route path="/brief/:briefId" element={<BriefRedirect />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Suspense>
);