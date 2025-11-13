# 🗺️ System Architecture & Feature Diagrams

**Document Status:** Version 1.0 - Live Audit
**Author:** Senior System Architect
**Goal:** To provide a comprehensive visual guide to the Sunai application's architecture, data flows, and user journeys. This document uses Mermaid diagrams to illustrate how all components—from the frontend UI to the AI agents and database—work together.

---

### **Executive Summary**

This document serves as a single source of truth for the application's technical design. It validates the current, production-ready architecture and provides a clear, visual reference for both current and future development. The diagrams confirm that the system correctly implements security, data persistence, and real-time features according to modern best practices.

---

## **1. High-Level System Architecture**

This diagram provides a 30,000-foot view of the entire technology stack, showing how the user, the frontend application, the Supabase backend, and the Google AI services interact.

```mermaid
graph TD
    subgraph User's Browser
        A[React SPA]
    end

    subgraph Hosting[Vercel]
        B[Static Files: JS, CSS]
    end

    subgraph Supabase Cloud
        direction LR
        C[Auth]
        D[Edge Functions]
        E[PostgreSQL Database]
        F[Storage]
        G[Realtime]
    end
    
    subgraph Google Cloud
        H[Gemini API]
    end

    User -- Interacts with --> A
    A -- Loads From --> B
    
    A -- Auth Requests --> C
    A -- Secure API Calls --> D
    A -- Direct DB Queries --> E
    A -- File Uploads --> F
    A -- Subscribes to --> G
    
    D -- Authenticates via JWT --> C
    D -- Queries/Mutates --> E
    D -- Securely Calls --> H
    
    E -- Triggers --> G
    G -- Pushes Updates --> A
```

---

## **2. Core User Journeys**

These flowcharts map the primary paths that a client and an administrator take through the application.

### **Client User Journey**

This chart illustrates the complete lifecycle for a standard user, from initial visit to managing their projects.

```mermaid
graph TD
    Start --> A[Visit Public Website]
    A --> B{Clicks "Start AI Brief"}
    A --> C[Browses Public Pages]
    
    B --> D{Logged In?}
    D -- No --> E[Login / Signup Page]
    D -- Yes --> F[Dashboard]
    E --> F
    
    F --> G[Starts AI Brief Wizard]
    F --> H[Views Briefs List]
    F --> I[Views Settings Page]
    
    G --> G1[Step 1: Welcome]
    G1 --> G2[Step 2: Scope]
    G2 --> G3[Step 3: Generating...]
    G3 --> G4[Step 4: Review Brief]
    G4 --> H
    
    H --> J[Views Brief Detail Page]
    J --> K[Edits Brief]
    K --> L[Saves Changes]
    L --> J
    
    I --> M[Updates Profile/Avatar]
    M --> I
```

### **Admin User Journey**

This chart shows the workflow for an agency administrator managing client briefs.

```mermaid
graph TD
    AdminStart[Admin Logs In] --> A[Navigates to Admin Dashboard]
    A --> B[Views Paginated List of All Briefs]
    B --> C{New Brief Submitted via Realtime}
    C -- Yes --> B
    B --> D[Uses Search/Filter Controls]
    D --> B
    B --> E[Changes Brief Status in Table]
    E --> B
```

---

## **3. Detailed Feature & AI Agent Diagrams**

These sequence diagrams provide a granular, step-by-step look at how specific features and AI functions operate.

### **Feature: AI Brief Wizard (`generate-brief` Function)**

This diagram details the secure, server-side flow for generating a new project brief. It highlights the use of function calling to ensure reliable, structured data from the AI.

```mermaid
sequenceDiagram
    participant Client as React Wizard
    participant Supabase as Supabase Client Lib
    participant Edge as Edge Function (/generate-brief)
    participant Gemini as Gemini API
    participant DB as Supabase DB

    Client->>Supabase: invoke('generate-brief', { payload })
    Supabase->>Edge: Forwards request with User JWT
    
    Edge->>Edge: 1. Authenticate user via JWT
    Edge->>Gemini: 2. Call generateContent() with prompt, googleSearch tool, and function calling schema
    Gemini-->>Edge: 3. Returns structured JSON via functionCall.args
    
    Edge->>DB: 4. INSERT into `briefs` table (user_id, brief_data)
    DB-->>Edge: 5. Returns new brief record
    
    Edge-->>Client: 6. Returns the complete new brief object
    Client->>Client: Navigates to Review screen with new data
```

### **Feature: Brief Editing (`update-brief` Function)**

This diagram shows the process for securely updating a brief, demonstrating how data is merged on the backend.

```mermaid
sequenceDiagram
    participant Client as Brief Detail Page
    participant Supabase as Supabase Client Lib
    participant Edge as Edge Function (/update-brief)
    participant DB as Supabase DB

    Client->>Client: User modifies form data
    Client->>Supabase: invoke('update-brief', { briefId, updatedData })
    Supabase->>Edge: Forwards request with User JWT

    Edge->>Edge: 1. Authenticate user
    Edge->>DB: 2. SELECT `brief_data` from `briefs` WHERE id = briefId
    DB-->>Edge: 3. Returns existing JSON data
    
    Edge->>Edge: 4. Merge existing data with `updatedData`
    
    Edge->>DB: 5. UPDATE `briefs` SET `brief_data` = mergedData WHERE id = briefId
    DB-->>Edge: 6. Returns the full, updated brief record

    Edge-->>Client: 7. Returns updated brief object
    Client->>Client: Updates UI and shows "Saved" confirmation
```

### **Feature: Real-Time Dashboard Updates**

This diagram illustrates how a change made by an admin is instantly reflected on the relevant user's dashboard using Supabase Realtime.

```mermaid
sequenceDiagram
    participant AdminUI as Admin Dashboard
    participant UserUI as User's Dashboard
    participant SupabaseAPI as Supabase API
    participant DB as Supabase DB
    participant Realtime as Supabase Realtime

    UserUI->>Realtime: 1. Subscribes to changes on `briefs` table (where user_id = self)
    AdminUI->>SupabaseAPI: 2. Admin calls updateBriefStatus(briefId, 'approved')
    SupabaseAPI->>DB: 3. UPDATE `briefs` SET status = 'approved'
    
    DB-->>Realtime: 4. Database change triggers Realtime broadcast
    Realtime-->>UserUI: 5. Pushes new brief payload to subscribed user
    
    UserUI->>UserUI: 6. Updates UI instantly to show "approved" status
```

---

## **4. Suggested Additional Diagrams & Analysis**

### **Suggested Diagrams for Future Documentation**

To further improve project clarity, the following diagrams are recommended:

-   **Database ERD:** A visual representation of the PostgreSQL schema, including all tables, columns, and foreign key relationships. (This exists in `docs/09-db-schema.md` and could be centralized here).
-   **Authentication Flow (Sequence Diagram):** A diagram showing the step-by-step process of a user logging in with email/password, Supabase returning a JWT, and that JWT being used in a subsequent authenticated request to an Edge Function.
-   **Component Hierarchy (Tree Diagram):** A diagram illustrating the nesting of the main React components (`App`, `PublicLayout`, `DashboardLayout`, `HomePage`, `Sidebar`, etc.) to clarify the frontend structure.
-   **Admin Dashboard Pagination (Flowchart):** A diagram showing how the client-side state (`page`, `searchQuery`) is used to construct a Supabase query with `.range()` and `.or()` to achieve efficient server-side pagination and search.

### **Analysis & Missing Pieces**

-   **Real-Time UX Gap:** The current real-time implementation is excellent for `UPDATE` events. However, the user dashboard does not listen for `INSERT` events. If a user has their dashboard open and creates a new brief in a separate tab, the new brief will not appear in their list until they refresh. This is a minor UX gap that could be closed by subscribing to inserts as well.
-   **Security Hardening Opportunity:** Access to the admin dashboard is currently controlled by a client-side route guard (`AdminRoute.tsx`). While Supabase RLS protects the *data*, a user could theoretically manipulate the client-side code to view the admin UI shell (without data). A best practice would be for the `AdminDashboardPage` to make an initial server-side call to a dedicated "verify-admin" function, which would provide a more robust, server-authoritative check.
-   **"Sad Path" Diagrams:** All current diagrams illustrate the "happy path." For more complete documentation, creating diagrams for failure scenarios (e.g., what happens if the Gemini API fails, or a database write fails) would be valuable for understanding the system's error handling logic.
```