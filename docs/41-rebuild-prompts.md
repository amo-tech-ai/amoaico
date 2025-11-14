# 🚀 Sun AI: Full-Stack Rebuild Prompts & Engineering Playbook

**Version:** 1.1 - Enriched with AI Best Practices  
**Status:** Published  
**Author:** Senior Full-Stack Architect  
**Goal:** To provide a complete, step-by-step guide with actionable prompts for rebuilding the Sun AI platform from an empty project to a fully functional, production-ready core application.

---

## **Introduction**

This document is your engineering playbook. It is designed to be used sequentially by a developer or an AI assistant to construct the Sun AI platform. Each prompt is a self-contained set of instructions for a specific piece of the architecture. Follow the steps carefully, and by the end, you will have a stable, scalable, and secure application foundation.

---

## **Section A — Initial Setup Prompts**

This phase creates the skeleton of our application, setting up the project, tooling, and foundational connections.

---

### **Prompt 5: Setting up Environment Variables**

#### **Multistep Instruction Flow**
1.  **Frontend Variables:** Create a file named `.env` in the project root for client-side variables.
    ```env
    # .env
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
2.  **Backend Secrets:** Create a file named `supabase/.env.local` for server-side secrets. **This file is git-ignored and must not be committed.**
    ```env
    # supabase/.env.local
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

#### **Success Criteria**
-   The frontend app can connect to Supabase using the `VITE_` variables.
-   The local Supabase environment is aware of the `GEMINI_API_KEY`.

#### **Production-Ready Checklist**
-   [ ] The `GEMINI_API_KEY` is set as a secret in the production Supabase project settings.
-   [ ] The `VITE_` variables are set in the production frontend hosting environment (e.g., Vercel).

#### **Warnings**
-   **CRITICAL:** The `GEMINI_API_KEY` is a secret. It must **never** be prefixed with `VITE_` or exposed to the client-side code in any way.

---
*... (other prompts remain the same) ...*
---

## **Section B — Core Implementation Prompts**

This phase builds the functional core of the application on top of the established foundation.

---

### **Prompt 5: API/Edge Function Setup for AI Calls**

#### **Multistep Workflow**
1.  **Create Shared Gemini Client:**
    -   File: `supabase/functions/_shared/geminiClient.ts`
    -   Create a function that initializes the Google GenAI client, securely reading the `GEMINI_API_KEY` from `Deno.env.get()`.
2.  **Create a Base Edge Function Template:**
    -   File: `supabase/functions/_template/index.ts`
    -   Create a reusable template that includes CORS handling, user authentication, and a structured `try/catch` block.
3.  **Scaffold First AI Function:**
    -   Run `supabase functions new generate-pitch-deck`.
    -   Use the template to build the basic structure.

#### **Acceptance Criteria**
-   A shared Gemini client exists and can be imported by other functions.
-   A new, empty Edge Function is created and can be served locally.

#### **Production-Ready Checklist**
-   [ ] All AI-related functions correctly import and use the shared `geminiClient`.
-   [ ] All functions that perform sensitive operations require user authentication.

#### **Gemini Best Practices**
-   **API Boundary:** All communication with the Gemini API **MUST** happen within Supabase Edge Functions. The frontend should never hold the API key or call the API directly.
-   **Reliable JSON:** For any AI task that needs to return structured data (like a list of slides), you **MUST** use the **Function Calling** feature. Do not rely on parsing JSON from a raw string response, as it is unreliable.
-   **Prompt Management:** Store your prompt templates in a dedicated shared folder (e.g., `supabase/functions/_shared/prompts/`) to keep them separate from your business logic, making them easier to test and update.

---

### **Prompt 8 & 9: Building the Event Wizard & Pitch Deck Wizard Core**

#### **Core AI Logic (New Best Practice)**
To ensure reliability and high-quality output, we will use a two-step **"AI Chain"** pattern for complex generation tasks like the Pitch Deck Wizard.

1.  **Research Agent (Fact Gathering):**
    -   **Model:** `gemini-2.5-flash`
    -   **Tool:** **Grounding with Google Search**.
    -   **Process:** The Edge Function first makes a call to the AI, providing the user's website URL and asking it to perform a search to gather factual context (mission, products, tone).
    -   **Output:** A plain text summary of facts.

2.  **Generation Agent (Formatting & Creation):**
    -   **Model:** `gemini-2.5-pro` (for higher-quality reasoning).
    -   **Tool:** **Function Calling**.
    -   **Process:** The Edge Function makes a second AI call. It provides the factual summary from the Research Agent, along with the user's direct inputs (e.g., startup details). The prompt instructs the AI to use this combined context to call a `generatePitchDeck` function with a strict JSON schema.
    -   **Output:** A perfectly structured, reliable JSON object.

#### **Acceptance Criteria**
-   The wizard successfully orchestrates the two-step AI chain on the backend.
-   The final output is a structured JSON object that is saved to the database.
-   The process is resilient to variations in website content and user input.

#### **Production-Ready Checklist**
-   [ ] The Edge Function includes robust error handling for each step of the AI chain.
-   [ ] Consider adding `thinkingConfig` to the Pro model call for more complex analyses, especially if the user provides large amounts of text.

---
*... (other prompts remain the same) ...*
---
