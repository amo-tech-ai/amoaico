# 🚀 Product Requirements Document (PRD): Sun AI

**Version:** 1.0  
**Status:** Published  
**Author:** Senior Product Architect  
**Last Updated:** 2024-08-26  

---

## 1. Executive Summary

### 1.1. What is Sun AI?
Sun AI is a comprehensive, AI-powered ecosystem platform designed to accelerate the startup journey. It serves as a central hub for founders, accelerators, event organizers, and investors, providing intelligent tools to build pitch decks, plan events, find talent, and discover resources—all within a single, integrated dashboard.

### 1.2. Who It Serves
Our primary audience includes early-stage startup founders, accelerator program managers, community and event organizers, and job seekers within the startup ecosystem.

### 1.3. What Problems It Solves
The startup ecosystem is fragmented and inefficient. Founders waste countless hours on manual, repetitive tasks like building pitch decks and finding resources. Accelerators struggle to manage cohorts and track progress. Sun AI solves this by:
-   **Automating Creation:** Using AI to turn simple inputs into professional pitch decks and event plans.
-   **Centralizing Resources:** Providing a single platform for jobs, perks, and startup discovery.
-   **Providing Insights:** Leveraging AI to offer data-driven suggestions and analysis.

### 1.4. Why Now?
The convergence of powerful, accessible AI (like Google's Gemini 2.5 series) and robust backend-as-a-service platforms (like Supabase) makes it possible to build sophisticated, intelligent tools at a fraction of the traditional cost and time. The market is ready for a platform that moves beyond simple forms and directories to become an active, AI-powered partner in the startup journey.

---

## 2. Goals & Success Metrics

### 2.1. Primary Goals
-   Become the go-to platform for early-stage founders to create their initial pitch deck.
-   Establish a vibrant ecosystem by connecting founders, talent, and resources.
-   Drive qualified leads and engagement for partner accelerators and sponsors.

### 2.2. Secondary Goals
-   Become a recognized source of high-quality startup jobs.
-   Provide tangible value to users through a curated perks marketplace.
-   Position Sun AI as a thought leader in AI-driven startup tooling.

### 2.3. Key Performance Indicators (KPIs)

| Category | KPI | Target (First 6 Months) |
| :--- | :--- | :--- |
| **User Engagement** | Monthly Active Users (MAU) | > 5,000 |
| | New User Signups | > 1,000 / month |
| **Wizard Usage** | Pitch Decks Generated | > 2,500 |
| | Events Created | > 500 |
| | AI Generation Success Rate | > 98% |
| **Ecosystem Health**| Jobs Posted / Applied | > 1,000 / month |
| | Startup Profiles Created | > 1,500 |
| **Business Value** | Partner (Accelerator) Signups | > 10 |

---

## 3. User Personas

| Persona | Role | Goals | Pain Points |
| :--- | :--- | :--- | :--- |
| **Faye the Founder** | Early-stage Startup | - Create a compelling pitch deck quickly. <br>- Find relevant talent. <br>- Discover grants and perks. | - "I'm not a designer; my deck looks amateur." <br>- "Recruiting is expensive and time-consuming." <br>- "I spend more time on admin than building." |
| **Alex the Accelerator Manager** | Manages Startup Cohorts | - Track portfolio company progress. <br>- Organize valuable events for the cohort. <br>- Find promising new startups to invest in. | - "Managing 20 startups via spreadsheets is chaos." <br>- "Event planning is a huge time sink." <br>- "Sourcing quality deal flow is difficult." |
| **Eva the Event Organizer** | Community Builder | - Plan and promote community events. <br>- Find sponsors and speakers. <br>- Sell tickets and manage attendees. | - "Writing compelling event descriptions is hard." <br>- "Managing registrations is a manual process." <br>- "I need better tools to engage my community." |
| **Jordan the Job Seeker** | Tech Professional | - Find exciting roles at early-stage startups. <br>- Understand a startup's culture and vision. | - "Big job boards are noisy and full of stale listings." <br>- "It's hard to get a feel for a startup before applying." |
| **Ivan the Investor** | Angel Investor / VC | - Discover promising startups. <br>- Quickly evaluate pitch decks. <br>- Track companies in my portfolio. | - "I receive hundreds of decks; it's hard to filter." <br>- "Decks are often poorly structured." <br>- "I need a better way to manage my pipeline." |

---

## 4. User Journeys (Golden Paths)

### 4.1. Founder's Pitch Deck Journey
```mermaid
graph TD
    A[Lands on Homepage] --> B(Clicks "Create Pitch Deck");
    B --> C[Signs Up / Logs In];
    C --> D[Enters Pitch Deck Wizard];
    D --> E(Provides startup details);
    E --> F[AI Generates Draft Deck];
    F --> G[Enters Deck Editor];
    G --> H(Refines content with AI tools);
    H --> I[Exports PDF / Shareable Link];
    I --> J[Views deck on Dashboard];
```

### 4.2. Event Organizer's Journey
```mermaid
graph TD
    A[Logs into Dashboard] --> B(Clicks "Create New Event");
    B --> C[Enters Event Wizard];
    C --> D(Provides basic event details);
    D --> E[AI generates description, agenda, and images];
    E --> F[Publishes Event Page];
    F --> G[Shares public event URL];
```

### 4.3. Job Seeker's Journey
```mermaid
graph TD
    A[Visits Public Jobs Board] --> B(Filters by role/location);
    B --> C[Clicks on a Job Listing];
    C --> D[Views Job & Startup Profile];
    D --> E(Clicks "Apply");
```

---

## 5. Core Features & Requirements

### 5.1. Marketing Website
-   **Functional:** Publicly accessible pages for Home, Events, Jobs, Startups, Perks, and Blog. SEO-optimized content.
-   **Non-Functional:** Fast load times (Lighthouse > 95), fully responsive on all devices, accessible (WCAG AA).
-   **Acceptance Criteria:** A non-logged-in user can browse all public content seamlessly.

### 5.2. Pitch Deck Wizard
-   **Functional:** A multi-step wizard guiding users to input startup details (problem, solution, market, etc.). Uses AI to generate a complete, 10-slide pitch deck. Allows users to provide context via text or URL.
-   **Non-Functional:** Generation process must complete in < 20 seconds. Output must be a structured, editable format.
-   **Acceptance Criteria:** A user can go from signup to a complete, downloadable draft pitch deck in under 5 minutes.
-   **Edge Cases:** Handle cases where a user provides minimal input; the AI should generate a structured template with helpful placeholders.

### 5.3. Dashboard & Deck Editor
-   **Functional:** Authenticated users can view, edit, and manage their generated pitch decks. The editor allows text changes and AI-powered actions ("rewrite this slide," "generate image for this slide").
-   **Non-Functional:** Changes must be saved automatically (autosave). The UI must be intuitive for non-designers.
-   **Mobile Behavior:** The editor should be viewable on mobile. Editing functionality can be limited on smaller screens for MVP.

### 5.4. Event Wizard
-   **Functional:** A multi-step wizard for creating an event. AI generates compelling descriptions, suggests agendas based on event type, and creates banner images from a text prompt.
-   **Non-Functional:** Generates a publicly shareable event page with a unique URL.
-   **Acceptance Criteria:** A user can create and publish a professional-looking event page in under 5 minutes.

### 5.5. Startup Profiles & Jobs Board
-   **Functional:** Startups can create public profiles showcasing their mission, team, and open roles. Job seekers can browse, search, and filter job listings.
-   **Non-Functional:** Deep-linking to specific job posts must work correctly. Job listings must be easily shareable.
-   **Acceptance Criteria:** A job seeker can find and apply for a job. A founder can post a new job opening.

---

## 6. Sitemap & Navigation Structure

```mermaid
graph TD
    subgraph Public
        A["/"]
        B["/events"]
        C["/events/:id"]
        D["/jobs"]
        E["/jobs/:id"]
        F["/perks"]
        G["/startups"]
        H["/startups/:id"]
        I["/blog"]
        J["/login"]
    end
    
    subgraph Dashboard (Auth Required)
        K["/dashboard"]
        L["/dashboard/pitch-decks"]
        M["/dashboard/pitch-decks/new"]
        N["/dashboard/pitch-decks/:id"]
        O["/dashboard/events"]
        P["/dashboard/events/new"]
        Q["/dashboard/jobs/new"]
        R["/dashboard/settings"]
    end

    A --> B & D & F & G & I & J
    B --> C
    D --> E
    G --> H
    J --> K
    
    K --> L & O & Q & R
    L --> M & N
    O --> P
```

---

## 7. Frontend Requirements

-   **Framework:** React 19 + Vite for a fast development experience and optimized builds.
-   **Styling:** Tailwind CSS with shadcn/ui for unstyled, accessible component primitives. A design system should be documented.
-   **Component Architecture:** Follow a feature-based structure (`src/features/pitch-deck-wizard/`). Components should be small, reusable, and testable.
-   **State Management:**
    -   **Server State:** TanStack Query (React Query) for all data fetching, caching, and mutations.
    -   **Global UI State:** React Context for auth status, theme, etc.
    -   **Local Form State:** React Hook Form for complex forms and validation.
-   **Error Handling:** All data-fetching components must have explicit loading, error, and empty states. Use a global Toast/Notification system for non-blocking user feedback.
-   **Responsive Behavior:** All pages and components must be fully responsive, following a mobile-first approach.

---

## 8. Backend Requirements

-   **Platform:** Supabase (Cloud).
-   **Database Schema:** PostgreSQL schema managed via version-controlled migration files. Key tables: `users`, `startups`, `pitch_decks`, `slides`, `events`, `jobs`.
-   **Security Model:** **Row-Level Security (RLS) is mandatory on all tables containing user-generated content.** Policies must ensure users can only access their own data, with specific policies for shared or public data.
-   **Edge Functions:**
    -   All AI calls **MUST** go through an Edge Function to protect API keys.
    -   All database `write` operations (INSERT, UPDATE, DELETE) **MUST** go through an Edge Function for server-side validation.
    -   `Read` operations (SELECT) can be performed from the client, as RLS provides sufficient security.
-   **Storage:** Buckets for `avatars`, `pitch-deck-assets`, and `event-banners`, all protected by RLS policies.
-   **Environment Variables:** A clear strategy for managing `development`, `staging`, and `production` environments using `.env` files and Supabase project variables.

---

## 9. AI Requirements (Gemini)

-   **Model Strategy:**
    -   `gemini-2.5-pro`: For complex, structured generation tasks (e.g., initial pitch deck creation).
    -   `gemini-2.5-flash`: For faster, iterative tasks (e.g., rewriting a paragraph, generating headline variations).
    -   `gemini-2.5-flash-image`: For generating images for slides and events.
-   **Reliability:** **Function Calling** is the required method for all tasks that need a structured JSON output to ensure 99%+ reliability. Do not rely on parsing JSON from a raw text response.
-   **Prompt Management:** Prompts should be stored as version-controlled templates in `supabase/functions/_shared/prompts/`. This allows for easy iteration and testing separate from business logic.
-   **Guardrails & Error Handling:** Implement a retry mechanism (e.g., exponential backoff) for transient network errors. If AI generation fails, log the error and provide a clear message to the user with an option to retry. Sanitize all user input before including it in a prompt to prevent injection attacks.
-   **Image Generation:** For `gemini-2.5-flash-image`, prompts should be programmatically enhanced to include stylistic keywords (e.g., "minimalist, vector art, professional") to ensure a consistent visual identity.

---

## 10. Performance & Security Requirements

-   **Performance:**
    -   **Rendering Strategy:** Static rendering for marketing pages where possible. Client-side rendering for the dynamic dashboard.
    -   **Initial Page Load (LCP):** < 2.5 seconds.
    -   **API Response Time (P95):** < 500ms for standard data queries.
    -   **Database Indexing:** Add indexes to all foreign key columns and columns frequently used in `WHERE` clauses.
-   **Security:**
    -   **Authentication:** All dashboard routes must be protected. Use Supabase's built-in auth with JWTs.
    -   **API Rate Limits:** Implement rate limiting on expensive Edge Functions (e.g., `generate-pitch-deck`) to prevent abuse and control costs.
    -   **Secrets Handling:** No secret keys (Supabase keys, Gemini keys) may be present in the client-side code. All secrets must be managed via Supabase environment variables.

---

## 11. Dependencies & Integrations

-   **Core Backend:** Supabase
-   **AI Provider:** Google Cloud (Gemini API)
-   **Analytics:** Vercel Analytics or Plausible.
-   **Error Monitoring:** Sentry or LogRocket.
-   **Email:** Resend (for transactional emails like welcome messages and notifications).

---

## 12. Risks & Constraints

| Risk | Category | Mitigation Plan |
| :--- | :--- | :--- |
| **AI Output Inconsistency** | Technical | Use Function Calling for all critical JSON outputs. Implement a "repair prompt" chain for cases where the AI fails to generate a valid response. Log failed generations for manual review. |
| **High AI API Costs** | Business | Implement strict server-side rate limiting. Use `gemini-2.5-flash` for less critical tasks. Monitor token usage closely via a dedicated dashboard. |
| **"Cold Start" Latency** | Technical | Use Supabase's performance-tier functions for critical user-facing endpoints. Implement skeleton loaders on the frontend to improve perceived performance. |
| **Platform Lock-in** | Business | While built on Supabase, the core is PostgreSQL and standard React. The architecture is designed to be portable. Regularly back up the database. |

---

## 13. Milestones & Roadmap

-   **Phase 1: Foundation & Core Platform (MVP)**
    -   **Goal:** Launch the core value proposition.
    -   **Features:** Public Website, User Auth, Dashboard Shell, Pitch Deck Wizard (end-to-end), Deck Viewer.
    -   **Timeline:** 4-6 Weeks.

-   **Phase 2: Editor & Enrichment**
    -   **Goal:** Enhance the core creation experience.
    -   **Features:** Full Deck Editor with AI rewrite/image generation tools, Shareable Links for decks.
    -   **Timeline:** +3 Weeks.

-   **Phase 3: Ecosystem Launch**
    -   **Goal:** Build out the community and marketplace features.
    -   **Features:** Event Wizard & Public Pages, Startup Profiles, Jobs Board.
    -   **Timeline:** +4 Weeks.

-   **Phase 4: Monetization & Advanced Features**
    -   **Goal:** Introduce revenue streams and pro-level tools.
    -   **Features:** Perks Marketplace (partner commissions), Pro subscription tier with advanced AI analytics ("Grade my Deck").
    -   **Timeline:** Ongoing.

-   **Phase 5: Scale & Partnerships**
    -   **Goal:** Grow the platform through strategic partnerships.
    -   **Features:** Accelerator-specific dashboards, API for integrations.
    -   **Timeline:** Ongoing.
