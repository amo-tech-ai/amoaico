> **ARCHIVED:** This document was used for planning the database and backend migration. This migration is now complete. Refer to `docs/progress-tracker.md` for the final and current project status.

# 📊 Sunai: Database & Backend Progress Tracker (Detailed Engineering Plan)

**Document Status:** Live Analysis - 2024-08-19
**Author:** Expert Project Analyst
**Goal:** To provide a detailed, step-by-step tracker for all database, security, and backend API tasks required to transform the Sunai prototype into a secure, data-persistent application using Google Cloud SQL and Supabase.

---

### 📊 **Progress Task Tracker**

| Task Name | Short Description | Status | % Complete | ✅ Confirmed | ⚠️ Missing / Failing | 💡 Next Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Infrastructure: Cloud SQL** | Provision and configure the production PostgreSQL instance on Google Cloud. | 🔴 **Not Started** | 0% | Commands and schema are fully documented in `docs/09-db-schema.md`. | No cloud infrastructure has been provisioned. | 1. `gcloud auth login` & `gcloud config set project`. <br> 2. Run `gcloud sql instances create`. <br> 3. Run `gcloud sql databases create` & `gcloud sql users create`. |
| **2. Schema & Security** | Apply the database schema and Row-Level Security (RLS) policies. | 🔴 **Not Started** | 0% | SQL scripts for schema and RLS are production-ready in `docs/09-db-schema.md`. | The database is empty and insecure. RLS is not enabled. | 1. Start the Cloud SQL Auth Proxy. <br> 2. Use `psql` to execute the schema creation script. <br> 3. Execute the RLS policy script to secure user tables. |
| **3. Install Supabase Extensions** | Install `pg_tle` and Supabase Auth helpers on the Cloud SQL instance to enable functions like `auth.uid()`. | 🔴 **Not Started** | 0% | The base schema from `docs/09-db-schema.md` is applied. | **CRITICAL:** Without this, RLS policies and triggers referencing Supabase's `auth` schema will fail to execute. | 1. In Google Cloud Console, edit the instance flags to add `pg_tle` to `shared_preload_libraries` and restart. <br> 2. Connect via `psql` and run `CREATE EXTENSION IF NOT EXISTS pg_tle;`. <br> 3. Install the Supabase auth helpers using the official script from `supabase/postgres`. |
| **4. User Profile Trigger** | Automate profile creation in `public.profiles` when a new user signs up. | 🔴 **Not Started** | 0% | The `profiles` table correctly references `auth.users`, making a trigger possible. The Supabase extensions must be installed first. | Without this, Supabase Auth signups will fail because no public profile exists for the user. | Create and apply a PostgreSQL trigger on `auth.users` that runs `AFTER INSERT` to create a corresponding record in `public.profiles`. |
| **5. Supabase Project Setup** | Create and configure the Supabase project to act as the backend layer. | 🔴 **Not Started** | 0% | The architecture correctly calls for Supabase to handle Auth and Edge Functions. | The Supabase project does not exist. The critical link to the external DB is not configured. | 1. Create a new Supabase project. <br> 2. **Crucially,** use the "Connect to external database" feature, providing the Google Cloud SQL connection string. <br> 3. Configure Supabase Auth providers. |
| **6. Secure API Keys** | Store the Gemini API key securely within Supabase. | 🔴 **Not Started** | 0% | Storing secrets is a standard feature of Supabase Edge Functions. | The key is currently exposed on the client-side, which is a critical security flaw. | Use the Supabase CLI to create a new secret: <br> `supabase secrets set GEMINI_API_KEY your_actual_api_key` |
| **7. API: Secure Brief Generation** | Create the `/generate-brief` Edge Function to replace the client-side AI call. | 🔴 **Not Started** | 0% | The logic is already prototyped in `AiBriefWizard.tsx`. | The function does not exist. The app remains insecure. | 1. `supabase functions new generate-brief`. <br> 2. Move the Gemini API call logic from the frontend to the new function. <br> 3. Add logic to `INSERT` the result into the `briefs` table. <br> 4. Deploy: `supabase functions deploy`. |
| **8. API: Data Access** | Implement data services for reading and writing briefs from the database. | 🔴 **Not Started** | 0% | The `supabase-js` client library is the correct tool for this. | The frontend still uses mock data (`services/briefService.ts`). The dashboard is not connected to real data. | Refactor `briefService.ts` to use the `supabase-js` client. Implement `getBriefsForUser` to perform a `SELECT` query on the `briefs` table. |
| **9. Frontend Integration** | Connect the React app to the new Supabase backend. | 🔴 **Not Started** | 0% | All necessary UI components and pages are already built. | The entire frontend is still operating as a standalone prototype. | 1. Replace the client-side `generateBrief` call with a call to the new Edge Function. <br> 2. Replace the mock `useAuth` hook with the real Supabase Auth provider. <br> 3. Connect the Dashboard to the live `briefService`. |

---

### 📋 **End of Report Summary**

*   **What’s working:**
    *   The **planning is flawless**. All required SQL schemas, security policies, and setup commands are documented and correct. This provides a clear and accurate blueprint for implementation.

*   **What’s missing or blocked:**
    *   **Implementation is at 0%.** The entire database infrastructure and backend API layer are yet to be built.
    *   **The critical path** is: Provision Cloud SQL -> Create Supabase Project -> **Connect Supabase to Cloud SQL** -> Install Extensions -> Migrate Schema & RLS -> Build & Deploy Edge Function -> Integrate Frontend.

### **Overall Backend & Database Readiness Score: 5%**

The project is **5% ready** solely due to the high quality of the planning and documentation. The blueprint is excellent, but no construction has begun. The next critical phase of work is to execute this plan step-by-step, starting with provisioning the cloud infrastructure and establishing the connection to Supabase.