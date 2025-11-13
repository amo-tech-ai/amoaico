# 
🔧 Troubleshooting Guide & Error Prevention Playbook: Sun AI

**Version:** 1.0  
**Status:** Published  
**Author:** Senior Systems Architect  
**Goal:** To provide a definitive guide for diagnosing, fixing, and preventing common errors in the Sun AI platform. This document is a living resource based on real-world issues encountered during development.

---

## 1. Root Cause Summary of All Errors We Experienced

This section is a "lessons learned" from our development history. Understanding *why* these errors occurred is the key to preventing them.

| Error | What Caused It | How It Happened | How to Fix It | How to Prevent It |
| :--- | :--- | :--- | :--- | :--- |
| **"API_KEY environment variable not set"** | Mismatch in variable names. | The Edge Function code was looking for `API_KEY`, but the secret was named `GEMINI_API_KEY`. | Update the code in `geminiClient.ts` to look for `GEMINI_API_KEY` first, with `API_KEY` as a fallback for safety. | **Rule:** Use a consistent naming convention (`SERVICE_API_KEY`). Always verify secret names against the code that uses them. |
| **"Failed to resolve module specifier"** | Incorrect relative import paths. | A chaotic dual-directory structure (`/components` and `/src/components`) led to developers writing invalid paths like `../../..` that broke during the build process. | Consolidate all source code into the `/src` directory. Update all imports to use correct relative paths or path aliases (`@/components/...`). | **Rule:** All application code **must** live inside the `/src` directory. Use path aliases in `tsconfig.json` to simplify imports. |
| **Non-functional CTA Buttons** | Passing props instead of using context. | Public pages passed `onStartWizard` as a prop. After the dashboard was refactored, its child pages no longer received this prop and needed to get it from `useOutletContext`. | Refactor all child pages of a layout to use `useOutletContext()` to receive props from the parent layout component. | **Rule:** For layout-based routing, parent layouts **must** pass props to children via `Outlet` context, not direct props. |
| **403 Image Load Errors** | Using an unreliable external placeholder service. | The `pravatar.cc` service used for default avatars can rate-limit or block requests, causing images to fail to load. | Replace the placeholder with a more reliable service (like `ui-avatars.com`) or self-host default avatars within the application. | **Rule:** Avoid unreliable third-party image services for critical UI elements. Use a stable service or self-host assets. |
| **Broken Routing After Refactor** | Routes were not updated to match the new architecture. | When the dashboard was refactored, the old `/brief/:id` route was removed, breaking old links. The `/admin/dashboard` was also incorrectly nested. | Create a `<BriefRedirect />` component to handle old URLs. Move the admin route outside the standard dashboard layout in `AppRoutes.tsx`. | **Rule:** When refactoring routes, always consider backward compatibility and create redirects for old URLs. |
| **Missing Supabase Client** | Environment variables were not available to Vite. | The `.env` file was missing or the variables were not prefixed with `VITE_`. | Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present in a `.env` file at the project root. | **Rule:** All environment variables exposed to the client **must** be prefixed with `VITE_`. |

---

## 2. Checklist of Common Errors for Our Tech Stack

| Stack | Common Mistake | How to Avoid It |
| :--- | :--- | :--- |
| **React + Vite** | `useState` causes infinite re-renders. | Never call a `setState` function in the main body of a component. Only call it inside `useEffect`, event handlers, or callbacks. |
| | `.env` variables are `undefined`. | Ensure your client-side variables are prefixed with `VITE_` (e.g., `VITE_SUPABASE_URL`). |
| **TypeScript** | Overusing `any`. | Take the time to define proper types and interfaces in `src/types/`. It prevents bugs and improves autocompletion. |
| | Runtime null/undefined errors. | Use optional chaining (`?.`) and the nullish coalescing operator (`??`) to handle potentially null data from APIs safely. |
| **Tailwind** | Styles are missing in production. | Ensure your `tailwind.config.js` `content` array correctly includes all paths where you use Tailwind classes. Incorrect paths will cause classes to be purged from the final CSS file. |
| **Supabase** | **Leaking the `service_role` key.** | **NEVER** use the `service_role` key on the client side. It bypasses all RLS policies. It should only ever be used in a secure server environment for admin tasks. |
| | RLS is blocking a valid query. | 1. Check the policy in the Supabase Studio. <br>2. Ensure your user is logged in. <br>3. Ensure you are creating the Supabase client correctly with the user's JWT. |
| | Storage access denied. | File storage access is also controlled by RLS policies. Go to `Storage > Policies` in the Supabase Studio to verify that your policies are correct. |
| **Gemini API** | Inconsistent JSON output. | **NEVER** rely on parsing JSON from a freeform text response. **ALWAYS** use `Function Calling` or `responseSchema` to guarantee a valid JSON structure. |
| | High API costs. | Implement server-side rate limiting. Use smaller, faster models like `gemini-2.5-flash` for simple tasks. Monitor your token usage in the Google Cloud console. |

---

## 3. Permanent Fixes & Preventative Rules

1.  **Single Source of Truth Folder Structure:**
    -   All application source code (React, TS, CSS) **MUST** reside within the `/src` directory.
    -   All backend code **MUST** reside within the `supabase/functions` directory.
    -   No "ghost files" are allowed outside these two areas.

2.  **Environment Variable Naming Convention:**
    -   **Frontend (Public):** All variables must be prefixed with `VITE_` (e.g., `VITE_SUPABASE_URL`).
    -   **Backend (Secret):** All secrets must be consistently named (e.g., `GEMINI_API_KEY`, `STRIPE_SECRET_KEY`).

3.  **Safe AI Integration Rule:**
    -   All calls to the Gemini API (or any other paid, third-party service) **MUST** be made from a secure Supabase Edge Function.
    -   The API key **MUST** be stored as a Supabase Secret and accessed via `Deno.env.get()`.
    -   For any JSON output, `Function Calling` or `responseSchema` **MUST** be used.

4.  **RLS is Not Optional:**
    -   Row-Level Security **MUST** be enabled on every table containing user-specific or sensitive data.
    -   Every policy **MUST** be tested to ensure it correctly isolates tenant data.

5.  **Deployment Checklist:**
    -   Before any deployment, `npm run build` must succeed without errors.
    -   All environment variables and secrets for the target environment (Staging/Production) must be verified.
    -   Automated tests (if implemented) must pass.

---

## 4. Troubleshooting Playbook

Follow these steps to diagnose issues methodically.

| Symptom | Step 1: Check Environment | Step 2: Check Code | Step 3: Check External Service |
| :--- | :--- | :--- | :--- |
| **AI Generation Fails** | Is the `GEMINI_API_KEY` set correctly in your Supabase project's secrets? | Check the Edge Function logs in the Supabase dashboard. Is there a code error? Is the input validation failing? | Check the Google Cloud console. Are you out of quota or are there API-level errors? |
| **Build Fails** | N/A | Look for "Failed to resolve module specifier." This is an import path error. Check your `import` statements for incorrect relative paths. | N/A |
| **Data Not Appearing (401/403 Error)** | Are you logged in? | Is your RLS policy correct for this query? Check the Supabase SQL Editor. Are you accidentally using the `service_role` key? | Check the Supabase Status page. Is the database operational? |
| **Can't Upload a File**| Are your `VITE_SUPABASE_...` keys correct? | Check the Storage RLS policies in the Supabase dashboard. Does the user have `INSERT` permission for the target folder? | Check the Supabase Status page. Is Storage operational? |
| **Styles Missing**| N/A | Check `tailwind.config.js`. Is the `content` path correct? Is the class you're using spelled correctly? | N/A |

---

## 5. Error Patterns & How to Detect Them Early

-   **Path-Based Errors (`Failed to resolve...`, `Cannot find module...`):**
    -   **Pattern:** These errors almost always appear during the **build step** (`npm run dev` or `npm run build`).
    -   **Detection:** If you move a file, immediately check the application. Your dev server will likely fail to hot-reload. This is your signal to fix the import paths right away.

-   **Secret/Environment Errors (`API Key not set`, `401 Unauthorized` on DB connection):**
    -   **Pattern:** The application builds successfully, but a specific feature fails at **runtime** when it tries to connect to an external service.
    -   **Detection:** Always check your function logs after deploying. A missing secret will be one of the first errors you see.

-   **RLS Errors (`new row violates row-level security policy`):**
    -   **Pattern:** `SELECT` queries return an empty array for a logged-in user, or `INSERT`/`UPDATE` queries fail.
    -   **Detection:** Use the Supabase SQL Editor to test your policies. You can run `set role authenticated; select * from your_table;` to simulate a query as a logged-in user.

---

## 6. Common Fix Templates

#### **Template: "This function cannot access environment variables"**
1.  **Local:** Ensure the variable is in `supabase/.env.local`. Stop (`supabase stop`) and restart (`supabase start`) your local instance.
2.  **Production:** Go to your Supabase Project Dashboard -> Settings -> Edge Functions. Add the secret there.
3.  **Code:** Ensure your code is using the correct name: `Deno.env.get('MY_SECRET_NAME')`.

#### **Template: "The AI request failed to generate output"**
Wrap your Gemini call in a robust `try/catch` block within your Edge Function.

```typescript
try {
  // ... Gemini API call logic ...
} catch (error) {
  console.error("Gemini API call failed:", error);
  // Log the full error for debugging
  return new Response(
    JSON.stringify({ error: "Failed to generate AI content. Please try again." }),
    { status: 502 } // 502 Bad Gateway is appropriate here
  );
}
```

#### **Template: "Supabase returned a 401/403"**
This is almost always an RLS issue.
1.  Go to the Supabase Studio -> Authentication -> Policies.
2.  Find the table that's failing.
3.  Ensure you have a policy `FOR ALL` or `FOR SELECT` that allows authenticated users.
4.  **Example Policy:**
    ```sql
    -- Allows authenticated users to read their own briefs.
    CREATE POLICY "Allow read access to own briefs"
    ON public.briefs FOR SELECT
    USING (auth.uid() = user_id);
    ```

---

## 7. Quick Reference Summary (1-Page)

| Error Type | Most Likely Cause | Quick Fix |
| :--- | :--- | :--- |
| **Build Failure** | Bad import path. | Consolidate all code in `/src` and fix relative paths. |
| **AI Generation Fails** | Missing/mismatched API key secret. | Check `Deno.env.get()` in code vs. secret name in Supabase dashboard. |
| **Data Query Fails (401/403)** | RLS policy is blocking the request. | Check your policies in the Supabase SQL Editor. Ensure the user is logged in. |
| **File Upload Fails** | Storage RLS policy is blocking the request. | Check your Storage policies in the Supabase dashboard. |
| **Styles Missing in Prod**| `tailwind.config.js` `content` path is wrong. | Ensure the `content` array includes all file types where you use Tailwind classes. |
| **`.env` Vars are `undefined`**| Missing `VITE_` prefix. | Add `VITE_` to all client-side environment variables. |
| **Infinite Re-render**| Calling `setState` in component body. | Move the `setState` call into a `useEffect` or an event handler. |
```