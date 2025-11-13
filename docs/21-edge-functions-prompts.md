# 🚀 AI-Assisted Implementation Plan: Supabase Edge Functions

**Document Status:** Version 2.0 - Updated with Best Practices
**Author:** Expert AI & Backend Architect
**Goal:** To provide a clear, beginner-friendly, multi-step prompt sequence to guide an AI assistant through scaffolding, implementing, testing, and deploying all 16 Supabase Edge Functions, adhering to the highest standards for Deno and Supabase development.

---

### 📊 **Edge Functions: Progress Tracker**

| ID | Task | Function(s) | Status | % Complete | Priority |
| :-- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Project Scaffolding** | `_shared/`, `_template/`, `deno.json` | 🟢 **Completed** | 100% | 🟥 Critical |
| **2** | **Shared Utilities** | `supabaseClient`, `geminiClient`, `types`, etc. | 🟢 **Completed** | 100% | 🟥 Critical |
| **3** | **Implement P0: Deck Generation** | `generate-deck` | 🟡 In Progress | 10% | 🟥 Critical |
| **4** | **Implement P0: Image Generation** | `generate-slide-image`, `edit-slide-image` | 🟡 In Progress | 10% | 🟥 Critical |
| **5** | **Implement P0: Content Analysis** | `modify-slide-content`, `analyze-slide` | 🟡 In Progress | 10% | 🟧 High |
| **6** | **Implement P0: Suggestions** | `fetch-all-suggestions` | 🟡 In Progress | 10% | 🟧 High |
| **7** | **Implement P0: Research** | `research-topic` | 🟢 **Completed** | 100% | 🟧 High |
| **8** | **Implement P1: Content Generation** | `generate-event-description`, `generate-roadmap-slide`, `generate-headline-variations` | 🟡 In Progress | 10% | 🟨 Medium |
| **9** | **Implement P1: Data Visualization**| `suggest-chart`, `suggest-pie-chart` | 🟡 In Progress | 10% | 🟨 Medium |
| **10**| **Implement P1: Structured Content** | `generate-pricing-table`, `extract-metrics` | 🟡 In Progress | 10% | 🟨 Medium |
| **11**| **Implement P1: Design & Bio** | `suggest-layout`, `summarize-bio` | 🟡 In Progress | 10% | 🟨 Medium |
| **12**| **Local Testing Scripts** | Test runners for all P0/P1 functions | 🔴 Not Started | 0% | 🟥 Critical |
| **13**| **Deployment & Verification** | Production deployment checklist | 🔴 Not Started | 0% | 🟥 Critical |
| **14**| **Security & Performance Audit** | Full architecture review | 🔴 Not Started | 0% | 🟥 Critical |

---

## ✅ **Multistep Prompts for Google AI Studio**

These prompts are structured from **Phase 1 → Phase 6**. Paste them one by one into your AI assistant. Each prompt has been updated to reflect the latest best practices for Supabase Edge Functions.

---

### **📌 Phase 1 — Create Project Structure**

#### **Prompt 1 — Create Edge Functions Directory Structure**

```
You are a senior TypeScript engineer specializing in the Deno runtime and Supabase.

Task:
Generate the complete directory structure for 16 Supabase Edge Functions.

Requirements:
- Root directory: `supabase/functions/`
- One subfolder for each of the 16 functions (e.g., `generate-deck/`, `generate-slide-image/`, etc.).
- Each function folder must contain an empty `index.ts` file.
- Add a `supabase/functions/_shared/` folder for reusable utility modules.
- Add a `supabase/functions/_template/` folder for a base function template.
- Create a `supabase/functions/deno.json` file with a basic `imports` map and `compilerOptions`.

Output:
- Render a complete file-tree of the generated structure.
```

---

#### **Prompt 2 — Generate Base Edge Function Template**

```
Generate a production-grade Supabase Edge Function template located at:
`supabase/functions/_template/index.ts`

Requirements:
1. All external dependencies MUST be imported using the `npm:` specifier with a pinned version (e.g., `npm:@supabase/supabase-js@2`).
2. Use the built-in `Deno.serve()` for request handling.
3. Include standard CORS headers for OPTIONS pre-flight requests from a shared utility.
4. Validate the `Authorization` header to ensure it exists.
5. Initialize a Supabase client using the pre-populated `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment variables. The client must be created with the user's forwarded Authorization header for RLS to work.
6. Retrieve the authenticated user via `supabase.auth.getUser()`. Return a 401 error if the user is not authenticated.
7. Initialize the Gemini client using a `GEMINI_API_KEY` from `Deno.env.get()`.
8. Use a structured `try/catch` block for robust error handling, returning appropriate 4xx or 5xx status codes with JSON error messages.
9. Add detailed comments explaining each major step (CORS, Auth, AI Init, DB Write, etc.).

Output only the complete, commented TypeScript code for the template file.
```

---

### **📌 Phase 2 — Setup Shared Utilities**

#### **Prompt 3 — Create Shared TypeScript Utilities**

```
Create the TypeScript code for 5 shared utility files to be placed under `supabase/functions/_shared/`.

Requirements:
- All external dependencies must use the `npm:` specifier with a pinned version.
- The code must be clean, well-commented, and adhere to Deno best practices.

Files to Create:

1. `cors.ts`:
   - Exports `corsHeaders`, an object with `'Access-Control-Allow-Origin': '*'` and the necessary `Access-Control-Allow-Headers`.

2. `supabaseClient.ts`:
   - Imports `createClient` from `npm:@supabase/supabase-js@2`.
   - Exports a function `createSupabaseClient(req: Request)` that creates and returns an authenticated Supabase client using the request's Authorization header.

3. `geminiClient.ts`:
   - Imports `GoogleGenAI` from `npm:@google/genai@0.14.0`.
   - Exports a function `createGeminiClient()` that initializes and returns a `GoogleGenAI` instance using the `GEMINI_API_KEY` from environment secrets.

4. `types.ts`:
   - Export placeholder TypeScript interfaces for common requests/responses: `GenerateDeckRequest`, `GenerateDeckResponse`, `ModifySlideContentRequest`, `AnalyzeSlideResponse`, `SuggestionResponse`.

5. `validation.ts`:
   - Export a helper function `requireFields({ body, fields: ['field1', 'field2'] })` that throws a 400 error if any required fields are missing from the body.
   - Export an async helper `parseJSON(request: Request)` that safely parses a request body and throws a 400 error on failure.

Output the complete code for all 5 files, clearly separated by their filenames.
```

---

### **📌 Phase 3 — Implement P0 Critical Functions**

#### **Prompt 4 — Implement P0 Function: `generate-deck`**

```
Implement the Supabase Edge Function `supabase/functions/generate-deck/index.ts` using the previously defined template and shared utilities.

Requirements:
- All external dependencies must use the `npm:` specifier with a pinned version.
- Accept a POST request with a body: `{ mode: string, content: string }`.
- Authenticate the user and validate the input.
- Call the Gemini model `gemini-2.5-pro`.
- Use a `generateDeckOutlineFunctionDeclaration` function call to get structured JSON output for 10 slides.
- In a single database transaction, create a new `deck` record and multiple `slide` records, linked to the authenticated `user.id`.
- Return a JSON response: `{ success: true, deckId: string, slides: Slide[] }`.

Output only the full, complete `index.ts` file for this function.
```

---

#### **Prompt 5 — Implement P0 Image Functions**

```
Implement two Supabase Edge Functions. Both must follow our production template, including user authentication and versioned npm imports.

1. `supabase/functions/generate-slide-image/index.ts`
2. `supabase/functions/edit-slide-image/index.ts`

Shared requirements:
- Use the `gemini-2.5-flash-image` model.
- Extract the base64 image data from the `inlineData` part of the Gemini response.
- Return a JSON response: `{ success: true, base64Image: string }`.

For `generate-slide-image`:
- Accept input: `{ title: string, content: string, imagePrompt?: string }`.

For `edit-slide-image`:
- Accept input: `{ base64Data: string, mimeType: string, prompt: string }`.

Output both complete `index.ts` files, clearly separated by their file paths.
```

---

#### **Prompt 6 — Implement P0 Research Function**

```
Implement the Supabase Edge Function `supabase/functions/research-topic/index.ts`.

Requirements:
- Follow the production template with user authentication and versioned npm imports.
- Accept input: `{ query: string }`.
- Use the `gemini-2.5-flash` model with Google Search grounding by setting `tools: [{ googleSearch: {} }]`.
- Extract the summary text from the response.
- Parse the `groundingMetadata.groundingChunks` to get the source URLs.
- Deduplicate the source URLs.
- Return a JSON response: `{ success: true, summary: string, sources: string[] }`.

Output only the complete `index.ts` file.
```

---

### **📌 Phase 4 — Implement P1 High-Priority Functions**

#### **Prompt 7 — Implement 3 P1 Structured Output Functions**

```
Implement three Supabase Edge Functions using the standard production template.

1. `modify-slide-content/index.ts`
2. `fetch-all-suggestions/index.ts`
3. `analyze-slide/index.ts`

Requirements:
- All functions must authenticate the user and validate inputs.
- All external imports must use versioned `npm:` specifiers.
- Use `gemini-2.5-pro` or `gemini-2.5-flash` as appropriate.
- All functions must use `responseSchema` to enforce a strict JSON output.
- `modify-slide-content` should return: `{ newTitle: string, newContent: string }`.
- `fetch-all-suggestions` should return arrays of 3 suggestions each for titles, content, and visuals.
- `analyze-slide` should return objects for clarity, impact, and tone, each with a rating (e.g., 'Good', 'Needs Improvement') and a suggestion.

Output all three complete `index.ts` files, clearly separated.
```

---

#### **Prompt 8 — Implement All Remaining 9 P1 Functions**

```
Generate the complete `index.ts` file for the remaining 9 Supabase Edge Functions, following our established production template.

Functions to implement:
- `generate-event-description`
- `generate-roadmap-slide`
- `generate-headline-variations`
- `suggest-chart`
- `suggest-pie-chart`
- `generate-pricing-table`
- `extract-metrics`
- `suggest-layout`
- `summarize-bio`

For each function:
- Authenticate the user.
- Validate necessary inputs from the request body.
- Use an appropriate Gemini model (`gemini-2.5-flash` for simple tasks, `gemini-2.5-pro` for complex ones).
- Use `responseSchema` to ensure a structured JSON output relevant to the function's purpose.
- Use versioned `npm:` specifiers for all external imports.
- Include robust error handling.

Output all 9 complete `index.ts` files, clearly separated by their file paths.
```

---

### **📌 Phase 5 — Local Testing & Deployment**

#### **Prompt 9 — Generate Local Testing Scripts**

```
Generate two local test runners for all P0 functions (`generate-deck`, `generate-slide-image`, `edit-slide-image`, `research-topic`).

1. Create `tests/edgeFunctions/p0TestRunner.http` for use with the VS Code REST Client extension.
2. Create `tests/edgeFunctions/p0TestRunner.ts` as a Node.js script using `node-fetch`.

Requirements:
- The scripts must call the local Supabase functions URL (`http://localhost:54321/functions/v1/...`).
- Include a placeholder for a valid Supabase JWT in the `Authorization` header.
- Use sample POST payloads for each function.
- The TypeScript script should import `node-fetch` using a versioned npm specifier (e.g., `import fetch from 'node-fetch@3'`) and log the status, response time, and the shape of the JSON output.

Output the complete code for both the `.http` file and the `.ts` script.
```

---

#### **Prompt 10 — Generate Deployment Checklist**

```
Generate a comprehensive production deployment checklist for our Supabase Edge Functions in Markdown format.

The checklist must include steps for:
1. Setting production secrets using `supabase secrets set --env-file path/to/.env`.
2. Deploying a single function (`supabase functions deploy <name>`).
3. Verifying the deployment (`supabase functions list`).
4. Tailing production logs (`supabase functions logs <name>`).
5. A manual test plan to verify that authentication is working correctly and that unauthenticated requests are rejected.
6. A final check to ensure no API keys or secrets are present in any of the committed code and that all imports are correctly versioned.

Output the checklist in a clean, easy-to-follow Markdown format.
```

---

### **📌 Phase 6 — Audit & Optimization**

#### **Prompt 11 — Perform Full Security Audit**

```
Perform a full security review of our Supabase Edge Function architecture as described in the previous prompts.

Analyze the following areas:
- Authentication and Authorization handling.
- API key and secret management.
- Correct use of versioned `npm:` specifiers for dependencies.
- Row-Level Security (RLS) integration.
- Prevention of service role key misuse.
- Input validation on all request bodies.
- Potential for Denial-of-Service (DoS) or cost-escalation attacks on the Gemini API.

Output your findings as a formal audit report in Markdown. Include a summary, a table of identified risks with severity levels, and concrete suggestions for mitigation.
```

---

#### **Prompt 12 — Propose Performance & Cost Optimizations**

```
Analyze the 16-function architecture and propose 10 concrete improvements for performance and cost-efficiency.

For each improvement, provide a brief explanation and a code example if applicable.

Topics to cover:
- Reducing cold start times (e.g., keeping functions warm).
- Caching strategies for Gemini responses where appropriate.
- When to use streaming vs. unary responses for better UX.
- How to tune Gemini API parameters (`temperature`, `topK`, etc.) to reduce token usage.
- Choosing the right model (`Flash` vs. `Pro`) for each task to balance cost and quality.

Output the list of 10 improvements in a numbered Markdown list.
```