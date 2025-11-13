# 🤖 AI Fix Prompts & Troubleshooting Guide (Architect-Reviewed)

**Purpose:** This document provides a set of structured, architect-reviewed prompts for an AI assistant to systematically fix frontend errors and implement new features.

**How to Use:** Each section contains an improved, production-ready prompt followed by a detailed **AI Engineer's Assessment**. This assessment validates the prompt, identifies potential issues, and provides a visual **Architectural Diagram** to clarify the implementation goal. By following the improved prompts, the AI assistant can perform tasks safely and effectively.

**Last Updated:** Generated from FRONTEND-AUDIT-REPORT.md  
**Status:** 🔴 **0 Critical Issues** | 🟡 **5 High Priority** | 🟢 **2 Low Priority**

---
## 📊 **Progress Task Tracker**

This table provides a high-level overview of the implementation status based on this guide.

| ID | Task | Short Description | Status | Priority |
| :-- | :--- | :--- | :--- | :--- |
| **1** | **Fix Build Errors** | Resolve all critical import path errors in layout components. | 🟢 **Fixed** | 🟥 Critical |
| **2** | **Add Null Safety** | Prevent runtime crashes from null reference errors on array methods. | 🟢 **Fixed** | 🟧 High |
| **3** | **Implement Overview Page** | Build the main dashboard overview page with stats and activity. | 🟡 **In Progress** | 🟧 High |
| **4** | **Implement Projects Page** | Build the page to list and manage user projects. | 🔴 **To Do** | 🟧 High |
| **5** | **Implement Clients Page** | Build the page for client relationship management. | 🔴 **To Do** | 🟨 Medium |
| **6** | **Implement Financials Page** | Build the page for tracking invoices and revenue. | 🔴 **To Do** | 🟨 Medium |
| **7** | **Implement Integrations Page** | Build the page for managing third-party service connections. | 🔴 **To Do** | 🟦 Low |
| **8** | **Consolidate Directories** | Merge the dual `/components` and `/src/components` directories. | 🟢 **Fixed** | 🟨 Medium |
| **9** | **Add Support Route** | Create the missing Support page linked from the dashboard sidebar. | 🟡 **In Progress** | 🟨 Medium |
| **10**| **Implement Global Search** | Make the main dashboard search bar functional. | 🔴 **To Do** | 🟨 Medium |

---

## 📋 Table of Contents

1. [Critical Build Errors](#critical-build-errors)
2. [Runtime Errors & Null Safety](#runtime-errors--null-safety)
3. [Missing Functionality](#missing-functionality)
4. [Import Path Issues](#import-path-issues)
5. [UI/UX Issues](#uiux-issues)

---

## 🔴 CRITICAL BUILD ERRORS

### Issue #1: Build Fails - Import Path Errors in Layout Components

**Priority:** 🔴 **P0 - CRITICAL**  
**Status:** 🟢 **FIXED**
**Estimated Time:** 15-30 minutes

#### **✅ Improved Multistep Prompt:**

```
You are fixing import path errors in a React + Vite application. The app has a mixed directory structure with components in both root `/components` and `/src/components`. Your goal is to fix the broken imports using correct relative paths.

STEP 1: Fix Footer.tsx imports
- File: `src/components/layout/Footer.tsx`
- Analyze the existing incorrect imports (e.g., `../../../components/animations/AnimatedElement`) and replace them with the correct relative paths based on the file's location at `src/components/layout/Footer.tsx`.
- Verify file locations:
  - `AnimatedElement` is at `src/components/animations/AnimatedElement.tsx`
  - Icons are at `src/assets/icons.tsx`
  - Data constants are at `src/data/index.ts`
  - `useAuth` hook is at `src/hooks/useAuth.ts`

STEP 2: Fix Header.tsx imports
- File: `src/components/layout/Header.tsx`
- Apply the same analysis and correction of relative import paths.

STEP 3: Verify build succeeds
- Run: `npm run build`
- Expected: Build completes without import errors.

STEP 4: Test dev server
- Run: `npm run dev`
- Expected: Server starts and the application renders without console errors related to module resolution.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ✅ **Correct and Safe.** This prompt is well-structured for fixing a common build error. It clearly identifies the problem, specifies the files to modify, and includes robust verification steps.

*   **Potential Issues & Red Flags:** None. The prompt correctly treats this as a tactical fix. A long-term solution (consolidating component directories) is correctly handled as a separate issue (#8).

*   **Improvement Plan:** The original prompt was already very good. The improved version clarifies that the fix should use relative paths and makes the verification file paths more explicit relative to the `src` directory, reducing ambiguity for the AI.

*   **Architectural Diagram (Process Flow):**
    ```mermaid
    graph TD
        A[Start] --> B(Analyze `Footer.tsx` imports);
        B --> C(Correct to relative paths);
        C --> D(Analyze `Header.tsx` imports);
        D --> E(Correct to relative paths);
        E --> F{Run `npm run build`};
        F -- Success --> G[Run `npm run dev`];
        F -- Fails --> B(Re-analyze imports);
        G -- No Errors --> H[End: Fixed];
    ```

---

## ⚠️ RUNTIME ERRORS & NULL SAFETY

### Issue #2: Potential Null Reference Errors in BriefDetailPage

**Priority:** 🟡 **P1 - HIGH**  
**Status:** ✅ **FIXED** (null checks added)  
**Estimated Time:** 5 minutes

#### **✅ Improved Multistep Prompt:**

```
You are adding null safety checks to prevent runtime crashes in `BriefDetailPage.tsx`.

STEP 1: Add Runtime Null Checks
- File: `pages/dashboard/BriefDetailPage.tsx`
- Find all instances where `.map()` is called on an array from the `brief` object (e.g., `brief.website_summary_points`).
- Ensure each `.map()` call is preceded by a nullish coalescing operator `|| []` to provide a fallback empty array, like this: `(brief.website_summary_points || []).map(...)`.

STEP 2: Update TypeScript Types
- File: `src/types/index.ts`
- Locate the `BriefData` interface.
- Update all properties that are arrays (e.g., `key_goals: string[]`) to explicitly allow for null or undefined values (e.g., `key_goals: string[] | null | undefined;`).

STEP 3: Verify with Test Case
- Mentally verify that if a `brief` object were passed with `website_summary_points: null`, the component would now render an empty list instead of crashing.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ✅ **Correct and Robust.** This prompt correctly addresses both runtime safety (the `|| []` check) and static type safety (updating the TypeScript interface). This two-pronged approach is a best practice.

*   **Potential Issues & Red Flags:** None. The original prompt was slightly vague on "type guards," so the improved version makes the action explicit: modify the `BriefData` interface.

*   **Improvement Plan:** The prompt has been updated to be more specific about which file and interface to modify in Step 2, removing any ambiguity.

*   **Architectural Diagram (Process Flow):**
    ```mermaid
    graph TD
        A[Start] --> B(Scan `BriefDetailPage.tsx` for `.map()` calls);
        B --> C{Is it guarded with `|| []`?};
        C -- No --> D(Add nullish coalescing guard);
        C -- Yes --> E(Update `BriefData` type in `types/index.ts`);
        D --> E;
        E --> F[Verify with null data test case];
        F --> G[End: Null Safe];
    ```

---

## 🟡 MISSING FUNCTIONALITY

### Issue #3: Dashboard Overview Page - Empty Placeholder

**Priority:** 🟡 **P1 - HIGH**  
**Status:** 🟡 **In Progress**
**Estimated Time:** 2-4 hours

#### **✅ Improved Multistep Prompt:**

```
You are implementing the Dashboard Overview page with real functionality.

STEP 1: Design the overview layout
- File: `pages/dashboard/OverviewPage.tsx`
- Replace the placeholder content with a responsive grid layout containing sections for:
  - Stats cards: Total briefs, Active projects, etc.
  - Recent activity feed.
  - Quick actions.
  - A placeholder for future charts.

STEP 2: Fetch and Calculate Data
- In a `useEffect` hook, fetch data using `getBriefsForUser()` from `services/briefService.ts`.
- Use the `useAuth` hook to get the current user.
- **Admin-Specific Data:** Check if `user.role === 'admin'`. If true, also fetch data using `getAllBriefs()`.
- Calculate stats from the fetched data (e.g., `totalBriefs = briefs.length`, `pendingReviews = briefs.filter(b => b.status === 'in-review').length`).

STEP 3: Create Reusable Components
- Create a `StatCard.tsx` component that accepts a `title`, `value`, and `icon`.
- Create an `ActivityFeedItem.tsx` component for the recent activity list.

STEP 4: Add Loading and Error States
- Use a state variable (e.g., `const [loading, setLoading] = useState(true)`) to track the data fetching process.
- While `loading` is true, display a skeleton loader that mimics the page layout.
- If the fetch call fails, display a user-friendly error message.
- If the data returns but the `briefs` array is empty, display an "empty state" message.

STEP 5: Style with Tailwind
- Use the existing design system from `tailwind.config.js` (colors: `sunai-orange`, `sunai-blue`, `sunai-slate`).
- For charts, you can use a library like `recharts`.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ✅ **Correct and Well-Scoped.** This is a good prompt for implementing a new feature. It correctly breaks the task down into logical steps.

*   **Potential Issues & Red Flags:** The original prompt assumed the AI would know how to get admin-specific data. It also didn't recommend a charting library.

*   **Improvement Plan:** The prompt has been improved to explicitly mention checking `user.role` from the `useAuth` hook before fetching admin data. It also now suggests `recharts` as a potential charting library.

*   **Architectural Diagram (Data Flow):**
    ```mermaid
    sequenceDiagram
        participant User
        participant OverviewPage as OverviewPage.tsx
        participant Service as briefService.ts
        participant DB as Supabase DB

        User->>OverviewPage: Navigates to page
        OverviewPage->>OverviewPage: Render Skeleton Loader
        OverviewPage->>Service: getBriefsForUser()
        Service->>DB: SELECT * FROM briefs WHERE user_id =...
        DB-->>Service: Returns briefs
        Service-->>OverviewPage: Returns briefs
        OverviewPage->>OverviewPage: Calculate stats & render UI
    ```

---

*The assessments for Issues #4, #5, #6, and #7 follow a similar pattern and are included below.*

---

### Issue #4: Projects List Page - Empty Placeholder

**Priority:** 🟡 **P1 - HIGH**  
**Status:** 🔴 **Not Started**  
**Estimated Time:** 3-5 hours

#### **✅ Improved Multistep Prompt:**

```
You are implementing the Projects List page.

STEP 1: Define the Service Layer
- File: `services/projectService.ts`
- Define the function signatures for:
  - `getProjectsForUser(userId: string): Promise<Project[]>`
  - `createProject(data: ProjectInput): Promise<Project>`

STEP 2: Implement the UI
- File: `pages/dashboard/ProjectsListPage.tsx`
- Replace the placeholder with a responsive layout featuring:
  - A grid of `ProjectCard` components.
  - UI for filtering, searching, and sorting.
  - A "Create Project" button.

STEP 3: Create the ProjectCard Component
- Create `components/dashboard/ProjectCard.tsx`.
- Display: Project name, status, client, start date.
- Include action buttons (e.g., "View Details").

STEP 4: Connect to Data
- **ASSUMPTION:** Assume a `projects` table exists in the database with RLS policies enabled.
- Your task is to implement the `projectService.ts` functions to perform the necessary Supabase queries (SELECT, INSERT) and connect them to the UI.
- Implement loading, error, and empty states.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ✅ **Correct and Safe.**
*   **Improvement Plan:** The prompt is corrected to frame the backend requirements as **assumptions**, which is the correct way to instruct a frontend-focused AI. It prevents the AI from attempting to write migration files or RLS policies.

*   **Architectural Diagram (Data Flow):**
    ```mermaid
    graph TD
        A[Page Load] --> B{Fetch Projects};
        B -- Success --> C[Render Project Cards];
        B -- Error --> D[Show Error Message];
        C --> E{User Clicks Filter};
        E --> B;
    ```

---

### Issue #5: Clients List Page - Empty Placeholder

**Priority:** 🟡 **P2 - MEDIUM**  
**Status:** 🔴 **Not Started**  
**Estimated Time:** 2-3 hours

#### **✅ Improved Multistep Prompt:**

```
You are implementing the Clients List page.

STEP 1: Define the Service Layer
- File: `services/clientService.ts`
- Define functions: `getClientsForUser`, `createClient`.

STEP 2: Implement the UI
- File: `pages/dashboard/ClientsListPage.tsx`
- Replace placeholder with a searchable list/grid of `ClientCard` components.

STEP 3: Create ClientCard Component
- Create `components/dashboard/ClientCard.tsx`.
- Display: Company name, contact info, project count.

STEP 4: Connect to Data
- **ASSUMPTION:** Assume a `clients` table exists with RLS policies.
- Implement the `clientService.ts` functions and connect them to the UI, including loading, error, and empty states.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ✅ **Correct and Safe.**
*   **Improvement Plan:** The prompt is corrected to frame the backend requirements as **assumptions**.

*   **Architectural Diagram (Data Flow):**
    ```mermaid
    graph TD
        A[Page Load] --> B{Fetch Clients};
        B -- Success --> C[Render Client Cards];
        B -- Error --> D[Show Error Message];
        C --> E{User Searches};
        E --> B;
    ```

---

### Issue #6: Financials Page - Empty Placeholder

**Priority:** 🟡 **P2 - MEDIUM**  
**Status:** 🔴 **Not Started**  
**Estimated Time:** 4-6 hours

#### **✅ Improved Multistep Prompt:**

```
You are implementing the Financials page.

STEP 1: Define the Service Layer
- File: `services/financialService.ts`
- Define functions: `getInvoicesForUser`, `getFinancialSummary`.

STEP 2: Implement the UI
- File: `pages/dashboard/FinancialsPage.tsx`
- Replace placeholder with:
  - `FinancialSummaryCard` components.
  - An `InvoiceList` component.
  - A `RevenueChart` component (using `recharts`).

STEP 3: Connect to Data
- **ASSUMPTION:** Assume `invoices` and `expenses` tables exist with RLS policies.
- Implement the service functions and connect them to the UI, including all necessary loading, error, and empty states.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ✅ **Correct and Safe.**
*   **Improvement Plan:** The prompt is corrected to frame the backend requirements as **assumptions** and recommends a charting library.

*   **Architectural Diagram (Data Flow):**
    ```mermaid
    graph TD
        A[Page Load] --> B(Fetch Financial Summary & Invoices);
        B -- Success --> C(Render Cards, List, and Chart);
        B -- Error --> D(Show Error Message);
    ```
---

### Issue #7: Integrations Page - Empty Placeholder

**Priority:** 🟢 **P3 - LOW**  
**Status:** 🔴 **Not Started**  
**Estimated Time:** 2-3 hours

#### **✅ Improved Multistep Prompt:**

```
You are implementing the Integrations page.

STEP 1: Design the UI
- File: `pages/dashboard/IntegrationsPage.tsx`
- Create a grid of `IntegrationCard` components for services like Stripe, WhatsApp, etc.

STEP 2: Create IntegrationCard Component
- Create `components/dashboard/IntegrationCard.tsx`.
- Display: Service logo, name, description, and a "Connect" / "Disconnect" button based on its status.

STEP 3: Connect to Data
- **ASSUMPTION:** Assume an API endpoint exists to fetch integration statuses.
- Implement a service in `services/integrationService.ts` to fetch the statuses and connect it to the UI.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ✅ **Correct and Safe.**
*   **Improvement Plan:** The prompt is corrected to frame the backend requirements as **assumptions**.

*   **Architectural Diagram (Component Flow):**
    ```mermaid
    graph TD
        A[IntegrationsPage] --> B{Fetch Statuses};
        B --> C[Renders N x IntegrationCard];
        C --> D(Displays Logo, Name, Status);
        C --> E(Renders Connect/Disconnect Button);
    ```

---

## 🔧 IMPORT PATH ISSUES

### Issue #8: Dual Directory Structure Causing Confusion

**Priority:** 🟡 **P2 - MEDIUM**  
**Status:** 🟢 **FIXED**
**Estimated Time:** 1-2 hours

#### **✅ Improved Multistep Prompt:**

```
You are consolidating the dual directory structure to prevent import path confusion. This is a delicate refactoring task that requires careful, step-by-step execution.

**WARNING: Do NOT use global find-and-replace. This can break the application.**

STEP 1: Create the target directory structure.
- Ensure the following directories exist: `src/components`, `src/features`, `src/pages`, `src/hooks`, `src/data`, `src/types`, `src/assets`.

STEP 2: Move files incrementally.
- One by one, move each component file from the root `/components` directory to its correct location inside `/src/components`.
- **After moving each file, immediately fix the import paths** in that file and any other files that import it. Your IDE's "update imports on move" feature is ideal for this.

STEP 3: Verify after each move.
- After moving a component and updating its imports, run `npm run dev` to ensure the application still works. This incremental checking prevents large-scale errors.

STEP 4: Final Cleanup
- Once the root `/components` directory is empty, delete it.
- Run `npm run build` one last time to confirm the entire project builds successfully without any module resolution errors.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ⚠️ **Original Prompt was Risky.** The improved prompt is now ✅ **Safe and Correct.**

*   **Potential Issues & Red Flags:** The original prompt's suggestion to use global find-and-replace is extremely dangerous for a refactoring task. It could easily corrupt valid import paths and is not context-aware.

*   **Improvement Plan:** The prompt has been completely rewritten to enforce a safe, incremental refactoring process. It explicitly warns against using find-and-replace and recommends a file-by-file move-and-fix approach with constant verification.

*   **Architectural Diagram (Process Flow):**
    ```mermaid
    graph TD
        A[Start] --> B(Pick one file from `/components`);
        B --> C(Move to `src/components`);
        C --> D(Update imports for moved file);
        D --> E{Run `npm run dev`};
        E -- Works --> F{Is `/components` empty?};
        E -- Fails --> C;
        F -- No --> B;
        F -- Yes --> G(Delete `/components`);
        G --> H(Final `npm run build`);
        H --> I[End: Refactored];
    ```

---

## 🎨 UI/UX ISSUES

### Issue #9: Missing Support Route

**Priority:** 🟡 **P2 - MEDIUM**  
**Status:** 🟡 **In Progress**
**Estimated Time:** 30 minutes

#### **✅ Improved Multistep Prompt:**

```
You are adding the missing Support page that's linked in the Sidebar.

STEP 1: Create the SupportPage Component
- Create a new file: `pages/dashboard/SupportPage.tsx`.
- The component should render a placeholder with a heading like "Support & FAQ".
- Content to include:
  - FAQ section (placeholder).
  - Contact support form (placeholder).

STEP 2: Add the Route
- File: `src/AppRoutes.tsx`
- Inside the `/dashboard` route group, add a new route:
  `<Route path="support" element={<SupportPage />} />`

STEP 3: Verify Navigation
- Check that the `Sidebar.tsx` component has a `NavLink` pointing to `/dashboard/support`.
- Run the app and verify that clicking the "Support" link in the sidebar correctly navigates to the new page without a 404 error.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ✅ **Correct and Perfect.** This is a model prompt. It is specific, actionable, includes file paths and code snippets, and has a clear verification step.

*   **Potential Issues & Red Flags:** None.

*   **Improvement Plan:** No improvements are needed.

*   **Architectural Diagram (Process Flow):**
    ```mermaid
    graph TD
        A[Start] --> B(Create `SupportPage.tsx`);
        B --> C(Add route to `AppRoutes.tsx`);
        C --> D(Verify `Sidebar.tsx` link);
        D --> E(Run app and click link);
        E --> F[End: Route works];
    ```

---

### Issue #10: Non-Functional Search Bar

**Priority:** 🟡 **P2 - MEDIUM**  
**Status:** 🔴 **Not Started**  
**Estimated Time:** 2-3 hours

#### **✅ Improved Multistep Prompt:**

```
You are implementing the global search functionality for the DashboardHeader search bar.

STEP 1: Create a Debounce Hook
- Create `hooks/useDebounce.ts`.
- This hook will take a `value` and `delay` and return a new value that only updates after the specified delay.

STEP 2: Create a Search Hook
- Create `hooks/useSearch.ts`. This hook will manage the entire search logic.
- It should:
  - Accept a search query.
  - Use the `useDebounce` hook to avoid excessive API calls.
  - Manage loading, error, and results states.
  - Define a `SearchResults` type: `type SearchResults = { briefs: Brief[], projects: Project[] }`.
  - Call a new function in `services/searchService.ts` to fetch data.

STEP 3: Implement the Search Service
- Create `services/searchService.ts`.
- Create a function `searchDashboard(query: string): Promise<SearchResults>`.
- This function will make parallel calls to Supabase to search across `briefs` and `projects` tables where relevant fields match the query.

STEP 4: Update the UI
- File: `components/layout/DashboardHeader.tsx`
- Use the `useSearch` hook.
- Create a `SearchResultsDropdown.tsx` component to display the results from the hook.
- The dropdown should appear below the search bar and handle empty/loading states.
```

---

### 🧠 **AI Engineer's Assessment**

*   **Evaluation:** ✅ **Correct and Well-Architected.** This prompt prescribes a robust, standard architecture for implementing search functionality.

*   **Potential Issues & Red Flags:** The original prompt was slightly vague.

*   **Improvement Plan:** The prompt has been improved to recommend a `useDebounce` hook and a dedicated `useSearch` hook, which is a cleaner pattern than putting all the logic in the header component. It also now defines the expected `SearchResults` type.

*   **Architectural Diagram (Sequence Diagram):**
    ```mermaid
    sequenceDiagram
        participant User
        participant Header as DashboardHeader.tsx
        participant Hook as useSearch.ts
        participant Service as searchService.ts

        User->>Header: Types 'a', 'p', 'p'
        Header->>Hook: setQuery('app')
        Hook->>Hook: Debounces query (300ms)
        Hook->>Service: searchDashboard('app')
        Service-->>Hook: Returns { briefs: [...], projects: [...] }
        Hook->>Header: Provides results
        Header->>User: Renders SearchResultsDropdown
    ```

---

## 📊 SUMMARY TABLE

| Issue # | Priority | Status | Estimated Time | Success Criteria Met |
|---------|----------|--------|----------------|---------------------|
| #1 | 🔴 P0 | 🟢 Fixed | 15-30 min | ✅ |
| #2 | 🟡 P1 | 🟢 Fixed | 5 min | ✅ |
| #3 | 🟡 P1 | 🟡 In Progress | 2-4 hours | ❌ |
| #4 | 🟡 P1 | 🔴 Not Started | 3-5 hours | ❌ |
| #5 | 🟡 P2 | 🔴 Not Started | 2-3 hours | ❌ |
| #6 | 🟡 P2 | 🔴 Not Started | 4-6 hours | ❌ |
| #7 | 🟢 P3 | 🔴 Not Started | 2-3 hours | ❌ |
| #8 | 🟡 P2 | 🟢 Fixed | 1-2 hours | ✅ |
| #9 | 🟡 P2 | 🟡 In Progress | 30 min | ❌ |
| #10 | 🟡 P2 | 🔴 Not Started | 2-3 hours | ❌ |
```