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
    -   **Purpose:** A top-level page that will eventually serve as a directory for all service offerings. Currently redirects to the AI Web Applications page.
    -   **Component:** `AiWebApplicationsPage.tsx` (acting as a placeholder)
    -   **Status:** ✅ Implemented

-   **/process**
    -   **Purpose:** A detailed page explaining the agency's 8-week development methodology.
    -   **Status:** 🔴 Not Implemented

-   **/projects**
    -   **Purpose:** A portfolio page showcasing case studies and successful client projects.
    -   **Status:** 🔴 Not Implemented
    
-   **/tech-stack**
    -   **Purpose:** A page detailing the frameworks, languages, and platforms used for development.
    -   **Status:** 🔴 Not Implemented

-   **/resources**
    -   **Purpose:** A blog or knowledge center for articles, guides, and industry insights.
    -   **Status:** 🔴 Not Implemented

-   **/about**
    -   **Purpose:** A page introducing the Sunai team, mission, and company values.
    -   **Status:** 🔴 Not Implemented

-   **/contact**
    -   **Purpose:** A page with contact information, a contact form, and location details.
    -   **Status:** 🔴 Not Implemented

---

### 2. Service Pages (Sub-Pages)

These pages provide in-depth information on specific service offerings and are nested under the `/services` route.

-   **/services/web-applications**
    -   **Purpose:** Details the AI Web Application development service, including features, use cases, ROI, and technical architecture.
    -   **Component:** `AiWebApplicationsPage.tsx`
    -   **Status:** ✅ Implemented

-   **/services/social-media**
    -   **Purpose:** Describes AI-powered social media automation services.
    -   **Status:** ✅ Implemented

-   **/services/ecommerce**
    -   **Purpose:** Outlines AI solutions tailored for e-commerce platforms.
    -   **Status:** ✅ Implemented

-   **/services/whatsapp-automation**
    -   **Purpose:** Explains services for creating AI-driven WhatsApp assistants and automations.
    -   **Status:** ✅ Implemented

---

### 3. Legal & Utility Pages

These pages are typically linked from the footer and provide important legal and informational content.

-   **/privacy-policy**
    -   **Purpose:** Details the company's data handling and privacy practices.
    -   **Status:** 🔴 Not Implemented

-   **/terms-of-service**
    -   **Purpose:** Outlines the terms and conditions for using the website and its services.
    -   **Status:** 🔴 Not Implemented

---

### 4. Interactive Features (Non-Page Components)

This section lists major features that are not standalone pages but are critical to the user experience.

-   **AI Brief Wizard**
    -   **Purpose:** A multi-step modal that guides potential clients through generating a project brief using AI. It is accessible from multiple pages via "Start Your AI Brief" buttons.
    -   **Component:** `AiBriefWizard.tsx`
    -   **Status:** ✅ Implemented

---

### 5. Routing Logic

-   **Fallback Route (`*`)**
    -   **Behavior:** Any route that does not match the defined paths will redirect the user to the Home page.
    -   **Component:** `HomePage.tsx`
    -   **Status:** ✅ Implemented