# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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