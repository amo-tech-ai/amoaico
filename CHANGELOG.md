# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Future feature development will be tracked here.

## [0.4.0] - 2024-08-23

### Added
-   **Service Pages:** Created new pages for AI Social Media, E-Commerce, and WhatsApp Automation services, accessible via `/services/social-media`, `/services/ecommerce`, and `/services/whatsapp-automation`.
-   **Content Pages:** Implemented all remaining static pages as defined in the sitemap, including Process, Tech Stack, Resources, About, and legal pages.

### Changed
-   **Project Status:** Marked the project as feature-complete and production-ready. All core user journeys, backend services, and security requirements have been implemented and validated.
-   **Documentation:** Archived outdated planning documents to create a single source of truth for project status and architecture.

## [0.3.0] - 2024-08-22

### Added
-   **Full Backend Integration:** The entire application is now connected to a secure Supabase backend. This includes user authentication, data persistence, and secure AI logic via Edge Functions.
-   **User Profile Management:** A new `ProfileManager` component on the dashboard allows users to update their full name and upload a custom avatar to Supabase Storage.
-   **Admin Dashboard:** A new, role-protected `/admin/dashboard` page allows administrators to view, filter, and manage all project briefs submitted by users.
-   **Dedicated Login Page:** A new `/login` page centralizes the authentication flow, providing a clear entry point for users.
-   **Dynamic Content Pages:** The `/projects` and `/contact` pages are now connected to the Supabase backend, fetching portfolio data and saving contact form submissions.

### Changed
-   **Critical Security Fix:** Migrated all client-side AI API calls to a secure Supabase Edge Function (`/generate-brief`), completely removing the API key from the frontend.
-   **Data Persistence:** Replaced all mock data and `localStorage` usage with live database calls to Supabase, ensuring user data is persistent and secure.
-   **Authentication Flow:** The `useAuth` hook and `AuthContext` now manage real user sessions and profiles from Supabase Auth.

## [0.2.0] - 2024-08-20

### Added
-   **User Dashboard Page:** Created a new `/dashboard` route and page (`DashboardPage.tsx`) for authenticated users to view their generated project briefs.
-   **Mock Authentication:** Implemented a new `useAuth.ts` hook to simulate a logged-in user, enabling the development of user-specific features.
-   **Mock Data Service:** Added `services/briefService.ts` to provide mock data for the dashboard, simulating a real API call and separating data logic from the UI.
-   **Conditional UI in Header:** The main header now dynamically displays a "Dashboard" link and a user avatar when a user is logged in, and hides the primary "Start Your AI Brief" button.

## [0.1.0] - 2024-08-19

### Added
-   **Initial Project Structure:** Set up a new React 19 application with Tailwind CSS for styling and `react-router-dom` for navigation.
-   **Core Layout Components:** Created responsive `Header`, `Footer`, and `SectionContainer` components for consistent page structure.
-   **Static Pages:** Implemented the `HomePage` and `AiWebApplicationsPage` with content, animations, and responsive layouts.
-   **AI Brief Wizard Feature:** Developed a complete multi-step UI (`AiBriefWizard.tsx`) for guiding users through project brief creation.
-   **Gemini API Integration (Prototype):** Integrated the `@google/genai` SDK for client-side brief generation, utilizing `gemini-2.5-flash` with `responseSchema` for structured output.
-   **Comprehensive Documentation:** Established a `/docs` directory containing detailed planning documents, including a PRD, sitemap, database schema, refactor plans, and progress trackers.
-   **Changelog:** Added this `CHANGELOG.md` file to track the project's history and versions.

### Changed
-   **Project Renaming:** Renamed the project brand from "AMO AI" to "Sunai" across all relevant UI components, documentation, and configuration files.
-   **Architecture Refactor:** Transformed the initial monolithic `App.tsx` into a clean, modular architecture with separate directories for `pages`, `features`, `components`, `hooks`, and `data`, improving maintainability.
-   **AI Logic Correction:** Replaced the non-standard `urlContext` tool (from initial planning docs) with the correct `googleSearch` tool for web grounding in the `AiBriefWizard`'s API call.

### Fixed
-   **TypeScript Errors in Data File:** Resolved JSX parsing errors in `data/index.ts` by replacing inline JSX icon definitions with `React.createElement` to ensure compatibility with TypeScript files.