# 🚀 Plan: Restructuring the User Dashboard

**Document Status:** Version 2.0 - Implementation Guide
**Author:** Expert Dashboard Architect & UX Strategist
**Goal:** To provide a clear, step-by-step architectural plan for upgrading the Sunai user dashboard from a single page into a professional, multi-page workspace with a persistent layout, inspired by modern design patterns.

---

### 📊 **Dashboard Restructure: Progress Tracker**

| ID | Task | Short Description | Status | % Complete | Priority |
| :-- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Create New Layout Components** | Build `DashboardLayout`, `Sidebar`, and `DashboardHeader`. | 🟢 **Completed** | 100% | 🟥 Critical |
| **2** | **Create Placeholder Pages** | Scaffold all new, empty pages for the dashboard sitemap. | 🟢 **Completed** | 100% | 🟥 Critical |
| **3** | **Update App Routing** | Implement the new nested routing structure in `AppRoutes.tsx`. | 🟢 **Completed** | 100% | 🟥 Critical |
| **4** | **Migrate Existing Pages** | Move `DashboardPage` and `BriefDetailPage` into the new layout. | 🟢 **Completed** | 100% | 🟧 High |
| **5** | **Implement Redirects** | Create the `BriefRedirect` component to ensure backward compatibility for old URLs. | 🟢 **Completed** | 100% | 🟧 High |
| **6** | **Final Validation & Testing** | Perform end-to-end testing of the new layout, routing, and all features. | 🟢 **Completed** | 100% | 🟥 Critical |

---

### **PHASE 1 — Current State Review**

#### **Summary of Current Dashboard Structure**
The current user-facing "dashboard" is not a unified layout but a collection of separate, top-level pages:
-   `/dashboard`: Renders `DashboardPage.tsx`, which lists a user's project briefs. This is the primary entry point after login and also contains the profile management component.
-   `/brief/:briefId`: Renders `BriefDetailPage.tsx`, showing the details of a single brief. It has no persistent navigation and exists outside of a dashboard context.

#### **What to Reuse vs. Rebuild**
-   ✅ **Reusable Components:**
    -   `DashboardPage.tsx` (will be repurposed as the Briefs List page).
    -   `BriefDetailPage.tsx` (will be moved into the new layout).
    -   `ProfileManager.tsx` (will be moved to the new Settings page).
-   ❌ **Components to Build from Scratch:**
    -   A new `DashboardLayout.tsx` to provide the persistent shell.
    -   A new `Sidebar.tsx` for primary dashboard navigation.
    -   A new `DashboardHeader.tsx` for user context and global actions.
    -   Placeholder pages for all new sitemap sections (Overview, Projects, etc.).

#### **Success Criteria for Phase 1**
-   [x] All reusable and rebuildable components are correctly identified.
-   [x] The scope is confirmed, and routes outside the user dashboard (`/login`, `/admin/dashboard`) are correctly marked as unchanged.

---

### **PHASE 2 — New Dashboard Architecture Plan**

#### **New Routing Structure**
We will implement a nested routing structure where a parent route renders the main `DashboardLayout`, and child routes render specific pages within that layout's `<Outlet>`.

| Path | React Route | File |
| :--- | :--- | :--- |
| `/dashboard` | `/` (as a child) | `pages/dashboard/OverviewPage.tsx` |
| `/dashboard/overview` | `overview` | `pages/dashboard/OverviewPage.tsx` |
| `/dashboard/briefs` | `briefs` | `pages/dashboard/BriefsListPage.tsx` |
| `/dashboard/briefs/new` | `briefs/new` | `features/ai-brief-wizard/AiBriefWizard.tsx` (Modal) |
| `/dashboard/briefs/:id` | `briefs/:id` | `pages/dashboard/BriefDetailPage.tsx` |
| `/dashboard/projects` | `projects` | `pages/dashboard/ProjectsListPage.tsx` |
| `/dashboard/projects/:id` | `projects/:id` | `pages/dashboard/ProjectDetailPage.tsx` |
| `/dashboard/clients` | `clients` | `pages/dashboard/ClientsListPage.tsx` |
| `/dashboard/clients/:id` | `clients/:id` | `pages/dashboard/ClientDetailPage.tsx` |
| `/dashboard/financials` | `financials` | `pages/dashboard/FinancialsPage.tsx` |
| `/dashboard/settings` | `settings` | `pages/dashboard/SettingsPage.tsx` |
| `/dashboard/settings/integrations` | `settings/integrations` | `pages/dashboard/IntegrationsPage.tsx` |


#### **New File & Folder Structure**

```
src/
├── pages/
│   ├── dashboard/
│   │   ├── OverviewPage.tsx              // New
│   │   ├── BriefsListPage.tsx            // Renamed from DashboardPage.tsx
│   │   ├── BriefDetailPage.tsx           // Moved from pages/
│   │   ├── ProjectsListPage.tsx          // New (Placeholder)
│   │   ├── ClientsListPage.tsx           // New (Placeholder)
│   │   ├── FinancialsPage.tsx            // New (Placeholder)
│   │   ├── SettingsPage.tsx              // New (Placeholder)
│   │   └── ... (other placeholders)
│
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx           // New
│   │   ├── Sidebar.tsx                   // New
│   │   ├── DashboardHeader.tsx           // New
│
├── AppRoutes.tsx                         // Updated with new nested routes
```

#### **Success Criteria for Phase 2**
-   [x] The new file structure is logically organized and created.
-   [x] The routing table clearly maps the sitemap to specific file paths.

---

### **PHASE 3 — Dashboard Layout System**

#### **`DashboardLayout.tsx` (The Wrapper)**
-   **Responsibility:** To create the main two-column structure for the entire dashboard.
-   **Implementation:** Use flexbox to create a layout with a fixed-width sidebar on the left and a main content area on the right. This component will render `<Sidebar />` and a `div` containing `<DashboardHeader />` and the `<Outlet />` from `react-router-dom`.

#### **`Sidebar.tsx` (Navigation)**
-   **Responsibility:** To provide consistent, primary navigation.
-   **Layout:** A fixed-width vertical bar (`w-64`) with a light background.
-   **Content:** Agency Logo, a list of `NavLink` items with icons, and a user/logout section at the bottom.

#### **`DashboardHeader.tsx` (Context & Actions)**
-   **Responsibility:** To provide access to global actions like search, notifications, and profile management.
-   **Layout:** A horizontal bar at the top of the main content area.
-   **Content:** A global search bar (placeholder), notifications icon (placeholder), and the user profile menu.

#### **Success Criteria for Phase 3**
-   [x] `DashboardLayout.tsx` successfully renders the sidebar and a main content area.
-   [x] `Sidebar.tsx` renders all navigation links, and the active link correctly reflects the current URL.
-   [x] `DashboardHeader.tsx` renders the placeholder actions and the user menu.

---

### **PHASE 4 — Page Migration Plan**

1.  **Migrate Briefs List:**
    -   Rename `pages/DashboardPage.tsx` to `pages/dashboard/BriefsListPage.tsx` and move it.
    -   Update its route to be a child of the `DashboardLayout`.
    -   Remove the `ProfileManager` component and the two-column layout from this page.
2.  **Migrate Brief Detail:**
    -   Move `pages/BriefDetailPage.tsx` to `pages/dashboard/BriefDetailPage.tsx`.
    -   Update its route to be `briefs/:id`.
3.  **Create Placeholder Pages:**
    -   Create a simple placeholder component for `OverviewPage`, `ProjectsListPage`, `ClientsListPage`, `FinancialsPage`, `SettingsPage`, and `IntegrationsPage`.
    -   The `SettingsPage` placeholder will render the `ProfileManager` component.

#### **Success Criteria for Phase 4**
-   [x] The briefs list and detail pages are successfully moved and render correctly within the new layout.
-   [x] The `ProfileManager` is successfully moved to the new `SettingsPage`.
-   [x] All placeholder pages are created and correctly routed.

---

### **PHASE 5 — Redirect & Backward Compatibility**

1.  **Implement Redirects:**
    -   `/dashboard` → `/dashboard/overview`: The `index` route for `/dashboard` will navigate to the `overview` page.
    -   `/brief/:id` → `/dashboard/briefs/:id`: A dedicated redirect component will handle this, preserving the `id`.
2.  **Ensure No Breaking Changes:**
    -   Verify that the routes for `/login` and `/admin/dashboard` are unmodified.

#### **Success Criteria for Phase 5**
-   [x] Navigating to `/dashboard` correctly lands the user on the Overview page.
-   [x] An old link to `/brief/some-uuid` successfully redirects to `/dashboard/briefs/some-uuid`.
-   [x] Admin and login functionality remains 100% intact.

---

### **PHASE 6 — Production-Ready Checklist**

This final checklist ensures the new dashboard is robust, functional, and ready for users.

-   [x] **Routing Integrity:** All dashboard routes are functional and correctly nested.
-   [x] **Layout Consistency:** The `DashboardLayout` is applied to all dashboard pages, providing a consistent sidebar and header.
-   [x] **Active State Navigation:** The sidebar correctly highlights the active page link.
-   [x] **Functional Core Module:** The "Briefs" feature (list and detail views) is fully functional in its new location.
-   [x] **Placeholder Integrity:** All placeholder pages render without errors.
-   [x] **Authentication:** All dashboard pages are still protected and correctly handle logged-out users.
-   [x] **Responsiveness (Basic):** The layout adapts gracefully to smaller screen sizes (e.g., sidebar collapses, content reflows).
-   [x] **No Regressions:** The "Start Your AI Brief" wizard and all other non-dashboard parts of the site work as they did before.
-   [x] **Clean Console:** The browser console is free of React warnings or errors related to the new structure.
-   [x] **Build Success:** The application builds successfully without any TypeScript or module import errors.