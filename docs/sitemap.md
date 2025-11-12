# 🗺️ Sunai Website Sitemap

**Document Status:** Published - 2024-08-19
**Author:** Senior Frontend Architect
**Goal:** To provide a clear, hierarchical overview of all current and planned pages, routes, and key interactive features for the Sunai website.

---

### 1. Main Navigation & Core Pages

This section outlines the primary pages accessible from the main header and footer navigation.

-   **/ (Home)**
    -   **Purpose:** The main landing page introducing Sunai's value proposition, core services, process, and key results.
    -   **Component:** `HomePage.tsx`
    -   **Status:** ✅ Implemented

-   **/services**
    -   **Purpose:** A top-level page that serves as a directory for all service offerings.
    -   **Component:** `AiWebApplicationsPage.tsx` (and others)
    -   **Status:** ✅ Implemented

-   **/process**
    -   **Purpose:** A detailed page explaining the agency's 8-week development methodology.
    -   **Component:** `ProcessPage.tsx`
    -   **Status:** ✅ Implemented

-   **/projects**
    -   **Purpose:** A portfolio page showcasing case studies and successful client projects.
    -   **Component:** `ProjectsPage.tsx`
    -   **Status:** ✅ Implemented

-   **/tech-stack**
    -   **Purpose:** A page detailing the frameworks, languages, and platforms used for development.
    -   **Component:** `TechStackPage.tsx`
    -   **Status:** ✅ Implemented

-   **/resources**
    -   **Purpose:** A blog or knowledge center for articles, guides, and industry insights.
    -   **Component:** `ResourcesPage.tsx`
    -   **Status:** ✅ Implemented

-   **/about**
    -   **Purpose:** A page introducing the Sunai team, mission, and company values.
    -   **Component:** `AboutPage.tsx`
    -   **Status:** ✅ Implemented

-   **/contact**
    -   **Purpose:** A page with contact information and a form for inquiries.
    -   **Component:** `ContactPage.tsx`
    -   **Status:** ✅ Implemented

---

### 2. Service Pages (Sub-Pages)

These pages provide in-depth information on specific service offerings and are nested under the `/services` route.

-   **/services/web-applications**
    -   **Purpose:** Details the AI Web Application development service, including features, use cases, ROI, and technical architecture.
    -   **Component:** `AiWebApplicationsPage.tsx`
    -   **Status:** ✅ Implemented

-   **/services/social-media**
    -   **Purpose:** Describes AI-powered social media automation services.
    -   **Component:** `AiSocialMediaPage.tsx`
    -   **Status:** ✅ Implemented

-   **/services/ecommerce**
    -   **Purpose:** Outlines AI solutions tailored for e-commerce platforms.
    -   **Component:** `EcommercePage.tsx`
    -   **Status:** ✅ Implemented

-   **/services/whatsapp-automation**
    -   **Purpose:** Explains services for creating AI-driven WhatsApp assistants and automations.
    -   **Component:** `WhatsAppAutomationPage.tsx`
    -   **Status:** ✅ Implemented

---

### 3. Legal & Utility Pages

These pages are typically linked from the footer and provide important legal and informational content.

-   **/privacy-policy**
    -   **Purpose:** Details the company's data handling and privacy practices.
    -   **Component:** `PrivacyPolicyPage.tsx`
    -   **Status:** ✅ Implemented

-   **/terms-of-service**
    -   **Purpose:** Outlines the terms and conditions for using the website and its services.
    -   **Component:** `TermsOfServicePage.tsx`
    -   **Status:** ✅ Implemented

---

### 4. User & Admin Pages (Authentication Required)

This section lists pages that require a user to be logged in.

-   **/login**
    -   **Purpose:** The dedicated page for users to sign up or sign in to their accounts.
    -   **Component:** `LoginPage.tsx`
    -   **Status:** ✅ Implemented

-   **/dashboard**
    -   **Purpose:** The personal dashboard for a logged-in user to view and manage their generated project briefs.
    -   **Component:** `DashboardPage.tsx`
    -   **Status:** ✅ Implemented

-   **/brief/:briefId**
    -   **Purpose:** A detailed view of a single project brief, accessible from the user's dashboard.
    -   **Component:** `BriefDetailPage.tsx`
    -   **Status:** ✅ Implemented

-   **/admin/dashboard**
    -   **Purpose:** A protected dashboard for agency administrators to view, filter, and manage all briefs submitted by all users.
    -   **Component:** `AdminDashboardPage.tsx` (Protected by `AdminRoute.tsx`)
    -   **Status:** ✅ Implemented

---

### 5. Interactive Features (Non-Page Components)

This section lists major features that are not standalone pages but are critical to the user experience.

-   **AI Brief Wizard**
    -   **Purpose:** A multi-step modal that guides potential clients through generating a project brief using AI. It is accessible from multiple pages via "Start Your AI Brief" buttons.
    -   **Component:** `AiBriefWizard.tsx`
    -   **Status:** ✅ Implemented

---

### 6. Routing Logic

-   **Fallback Route (`*`)**
    -   **Behavior:** Any route that does not match the defined paths will redirect the user to the Home page.
    -   **Component:** `HomePage.tsx`
    -   **Status:** ✅ Implemented
