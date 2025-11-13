# ✅ AI Brief Wizard: Troubleshooting & Fix Plan

**Document Status:** Version 1.0 - Published
**Author:** Senior Full-Stack Engineer
**Goal:** To diagnose the "Generation Failed" error in the AI Brief Wizard, identify the root cause, and provide a clear, step-by-step checklist to resolve the issue and make the feature fully functional.

---

### 1. **Diagnosis: "Generation Failed"**

The user-facing "Generation Failed" modal, combined with the console error `Error: API_KEY environment variable not set`, confirms that the issue is not on the frontend. The React application is correctly calling the secure `generate-brief` Supabase Edge Function, but the function itself is failing during its execution on the server.

---

### 2. **Root Cause: Environment Variable Mismatch**

The core problem is a simple but critical mismatch between the code and the project's documentation/setup instructions.

-   **The Code Expects:** The `supabase/functions/_shared/geminiClient.ts` file is hardcoded to look for an environment variable named `API_KEY`.
-   **The Documentation Specifies:** All setup documents (e.g., `docs/16-edge-function-plan.md`) instruct the developer to set a Supabase secret named `GEMINI_API_KEY`.

When the Edge Function runs, it calls `Deno.env.get('API_KEY')`, finds nothing, and immediately throws the error we see in the logs, causing the generation to fail.

---

### 3. **The Fix: A Step-by-Step Checklist**

Follow these steps to align the code with the documentation and resolve the error.

| Step | Task                                          | File / Command                              | Status      |
| :--- | :-------------------------------------------- | :------------------------------------------ | :---------- |
| **1**| **Correct the Environment Variable Name in Code** | `supabase/functions/_shared/geminiClient.ts`| 🔴 **To Do**|
| **2**| **Verify Supabase Secrets are Set Correctly**   | `supabase secrets list`                     | 🔴 **To Do**|
| **3**| **Redeploy the Edge Functions**                 | `supabase functions deploy`                 | 🔴 **To Do**|
| **4**| **Perform a Final Test**                        | Application UI                              | 🔴 **To Do**|

---

### 4. **Detailed Instructions**

#### **Step 1: Correct the Code**

Update `supabase/functions/_shared/geminiClient.ts` to look for the correct secret name. This change is being applied now.

-   **Find this code:**
    ```typescript
    const API_KEY = Deno.env.get('API_KEY');
    if (!API_KEY) {
      throw new Error("API_KEY is not set in Supabase secrets.");
    }
    ```
-   **It has been replaced with this:**
    ```typescript
    const API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in Supabase secrets.");
    }
    ```

#### **Step 2: Verify Your Secrets**

Before redeploying, it's crucial to confirm your secret is set correctly in your Supabase project.

1.  **For Production/Staging (Supabase Dashboard):**
    -   Go to your Supabase Project -> Settings -> Edge Functions.
    -   Under "Secrets," ensure you have a secret named `GEMINI_API_KEY` with your actual Gemini API key as the value.

2.  **For Local Development (Command Line):**
    -   Open your terminal in the project root.
    -   Run the command `supabase secrets list`.
    -   Confirm that `GEMINI_API_KEY` is listed. If it's not, you may need to set it locally by adding `GEMINI_API_KEY="your_key_here"` to a `supabase/.env.local` file and restarting your local Supabase instance (`supabase stop` then `supabase start`).

#### **Step 3: Redeploy Your Functions**

Since `geminiClient.ts` is a shared module, any function that uses it needs to be updated. The simplest way to ensure this is to redeploy all functions.

-   Run the following command in your terminal:
    ```bash
    supabase functions deploy
    ```
    *(This may take a minute or two to update all functions.)*

#### **Step 4: Final Test**
-   Open the application in your browser and run through the AI Brief Wizard again.
-   The "Generation Failed" error should now be resolved, and the wizard should proceed to the "Review Brief" step successfully.

---

By completing this checklist, the critical blocking issue will be resolved, and the AI Brief Wizard will be fully operational.