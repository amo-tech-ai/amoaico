> **ARCHIVED:** This document outlined the checklist for moving from prototype to production. This process is now complete. Refer to `docs/progress-tracker.md` for the final and current project status.

# ✅ AI Brief Wizard: Production Readiness Checklist

**Document Status:** Published - 2024-08-19
**Author:** Senior Full-Stack Engineer
**Goal:** To provide a definitive checklist that diagnoses the current state of the AI Brief Wizard and outlines the precise, actionable steps required to move it from a high-fidelity prototype to a secure, persistent, and 100% production-ready feature.

---

### 1. **Overall Diagnosis**

The AI Brief Wizard is a **feature-complete and successful prototype**. The user interface and flow are polished and fully functional. However, it is **not production-ready** due to critical security and data persistence gaps that must be addressed.

---

### 2. **Red Flag Analysis & Root Cause**

| ID | Red Flag | Severity | Root Cause & Impact |
| :-- | :--- | :--- | :--- |
| 🚩 **01** | **Client-Side API Key Exposure** | 🟥 **Critical** | The plan to call the Gemini API from the browser is a major security vulnerability. It exposes the secret API key, allowing for theft and unauthorized use. **This is the primary blocker for production.** |
| 🚩 **02** | **No Persistent Database** | 🟧 **High** | Using `localStorage` means briefs are temporary, not saved to a user's account, and invisible to the Sunai team. This prevents the feature from functioning as a lead-generation tool. |
| 🚩 **03** | **Incomplete Website** | 🟨 **Medium** | The Header and Footer link to multiple pages (`/process`, `/projects`, etc.) that have not been implemented, leading to a broken navigational experience for users exploring the site. |

---

### 3. **The Solution: Step-by-Step Production Checklist**

Follow these steps in order to resolve all red flags and launch the feature safely.

#### **Phase 1: Backend Implementation (Security & Persistence)**

*   [ ] **1.1: Set Up Supabase Backend:**
    *   [ ] Create a new project on [supabase.com](https://supabase.com).
    *   [ ] Create the database tables (`profiles`, `briefs`) using the exact SQL schema from `docs/09-db-schema.md`.
    *   [ ] Apply the Row-Level Security (RLS) policies from the same document to ensure users can only access their own data.

*   [ ] **1.2: Implement User Authentication:**
    *   [ ] Configure Supabase Auth in your new project.
    *   [ ] Create a PostgreSQL trigger to automatically create a new record in `public.profiles` when a user signs up in `auth.users`.

*   [ ] **1.3: Secure the API Key:**
    *   [ ] Using the Supabase CLI, store your Gemini API key as a secret: `supabase secrets set GEMINI_API_KEY="your_real_api_key"`.

*   [ ] **1.4: Create the Secure Edge Function:**
    *   [ ] Create a new Supabase Edge Function: `supabase functions new generate-brief`.
    *   [ ] Move the AI generation logic from the (currently simulated) `services/aiService.ts` into this new server-side function.
    *   [ ] The function must:
        *   Authenticate the user's request using their JWT.
        *   Securely access the `GEMINI_API_KEY` from secrets.
        *   Call the Gemini API.
        *   On success, `INSERT` the resulting brief into the `briefs` database table, linking it to the `user_id`.
    *   [ ] Deploy the function: `supabase functions deploy generate-brief`.

#### **Phase 2: Frontend Integration (Connecting to the Backend)**

*   [ ] **2.1: Integrate Real Authentication:**
    *   [ ] Remove the mock `hooks/useAuth.ts`.
    *   [ ] Wrap the application in the Supabase Auth Provider.
    *   [ ] Implement login and signup forms/UI that call Supabase functions.
    *   [ ] Update the `Header` to use the real user state from Supabase.

*   [ ] **2.2: Connect the AI Wizard to the Edge Function:**
    *   [ ] Modify `features/ai-brief-wizard/AiBriefWizard.tsx`.
    *   [ ] Replace the call to `generateBriefFromApi` with a secure call to your new `generate-brief` Supabase Edge Function using `supabase.functions.invoke()`.

*   [ ] **2.3: Connect the Dashboard to the Database:**
    *   [ ] Refactor `services/briefService.ts` to remove all `localStorage` logic.
    *   [ ] Implement `getBriefsForUser` to make a real `SELECT` query to the Supabase `briefs` table.
    *   [ ] Ensure `DashboardPage.tsx` uses this new service to display real, persistent data for the logged-in user.

#### **Phase 3: Content & Polish (Completing the Site)**

*   [ ] **3.1: Implement Missing Pages:**
    *   [ ] Create the component files for all remaining pages listed in `docs/sitemap.md` (`ProcessPage`, `ProjectsPage`, `TechStackPage`, `ResourcesPage`, `AboutPage`, `ContactPage`).
    *   [ ] Add placeholder content to each page to make them feel complete.
    *   [ ] Add the new routes to `App.tsx` to make them accessible.

*   [ ] **3.2: Final Validation:**
    *   [ ] Perform an end-to-end test of the entire user journey: Sign up -> Create a brief -> View it on the dashboard -> Log out -> Log back in and confirm the brief is still there.
    -   [ ] Confirm all navigational links now lead to the correct, implemented pages.

---

Once every box on this checklist is ticked, the AI Brief Wizard will be **100% production-ready, secure, and fully functional.**