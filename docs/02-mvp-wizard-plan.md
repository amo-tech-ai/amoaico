# MVP + Advanced Feature Plan: Full-Stack Pitch Deck Wizard

**Document Status:** Published - 2024-08-18
**Author:** Senior Full-Stack Architect
**System:** Supabase + React + Tailwind + shadcn/ui + Gemini Pro

### Summary

This document outlines a two-phase development roadmap for the Pitch Deck Wizard. The goal is to first deliver a secure, reliable Minimum Viable Product (MVP) that allows users to generate, save, and edit a pitch deck from a text prompt. The Advanced Phase will then build upon this foundation, introducing multiple input sources, AI-driven enrichment, and collaborative features to create a best-in-class tool.

---

### Phase 1: MVP — Secure Core Deck Generation

The MVP focuses on delivering the complete, secure user journey: from input to a saved, editable deck in the user's account. Security and reliability are the top priorities.

**Frontend:**
*   **User Authentication:** Integrate Supabase Auth for sign-up and login.
*   **Wizard UI (`WizardSteps.tsx`):** Build a single-step wizard with a textarea for business context input.
*   **Generating Screen (`GeneratingScreen.tsx`):** A simple loading screen that polls the backend for deck readiness.
*   **Deck Editor (`DeckEditor.tsx`):** A basic editor to view and modify the generated slide content.
*   **Dashboard (`Dashboard.tsx`):** A page to list the user's saved decks.

**Backend (Supabase):**
*   **Database Schema:** Create `decks` and `slides` tables with RLS policies ensuring users can only access their own data.
*   **Edge Function (`/generate-deck`):**
    *   Secure endpoint requiring user authentication (JWT).
    *   Accepts text input.
    *   Calls the Gemini API securely.
    *   Saves the generated deck and slides to the database transactionally.
    *   Returns the new `deckId` to the client.

**AI (Gemini API):**
*   **Secure API Call:** The Gemini API key is stored as a secret and only accessed from the Edge Function.
*   **Structured Output (Function Calling):** Use a `generateDeckOutline` function call to ensure a reliable JSON structure for the slides.
*   **Core Logic:** A simple prompt that takes the user's business context and generates a 10-slide pitch deck outline.

---

### Phase 2: Advanced — Collaboration & Enrichment

This phase enhances the wizard with multiple data sources, richer AI capabilities, and features for teams.

**Frontend:**
*   **Multi-Input UI:** Add tabs for URL and File Upload inputs in `WizardSteps.tsx`.
*   **Live Preview:** Implement a real-time preview of the slide structure as the AI generates it.
*   **Image Generation UI:** Add a feature in the editor to generate images for slides based on AI-suggested prompts.
*   **Collaboration:** Introduce deck sharing (view/edit permissions) and real-time co-editing features.

**Backend (Supabase):**
*   **Edge Function (`/generate-deck`):** Upgrade to handle URL and file inputs.
*   **New Edge Functions:**
    *   `/generate-image`: For slide image generation.
    *   `/share-deck`: To manage sharing permissions.
*   **Realtime:** Use Supabase Realtime for collaborative editing features.
*   **Storage:** Use Supabase Storage to handle user-uploaded documents.

**AI (Gemini API):**
*   **URL Context:** Use `urlContext` to allow Gemini to crawl websites for information.
*   **Document Understanding (File Search):** Integrate File Search to analyze uploaded PDFs/DOCX files.
*   **Google Search Enrichment:** Use the Google Search tool to find market data or competitor information.
*   **Image Prompt Generation:** The main generation call will also produce descriptive image prompts for each slide.
*   **Gemini Thinking:** Use `thinkingConfig` for deeper analysis of complex source documents.

---

### Deliverables Table

| Feature | Purpose | Phase | Priority |
| :--- | :--- | :--- | :--- |
| **User Auth & RLS** | Secure user data and access. | MVP | High |
| **Text-to-Deck Generation** | Core user flow for creating a deck. | MVP | High |
| **Secure Edge Function** | Protect the Gemini API key and centralize logic. | MVP | High |
| **Database Persistence** | Save and retrieve user-generated decks. | MVP | High |
| **URL-to-Deck Generation** | Allow users to generate decks from websites. | Advanced | High |
| **File-to-Deck Generation** | Use business plans or docs as a source. | Advanced | Medium |
| **AI Image Generation** | Automatically create relevant slide visuals. | Advanced | Medium |
| **Google Search Enrichment** | Augment decks with real-time web data. | Advanced | Low |
| **Collaboration & Sharing** | Enable team-based deck creation. | Advanced | Medium |

---

### Example Use Cases

1.  **Early-Stage Founder (URL Input):**
    *   *Scenario:* A founder has a live landing page for their SaaS startup but no formal pitch deck.
    *   *Action:* They paste their website URL into the Pitch Deck Wizard.
    *   *Result:* The AI crawls the site, understands the product, target audience, and value proposition, and generates a complete 10-slide deck covering the problem, solution, market, and team.

2.  **Established Business (File Input):**
    *   *Scenario:* A business manager needs to create an internal presentation for a new project initiative. They have a detailed 20-page project proposal in PDF format.
    *   *Action:* They upload the PDF to the wizard.
    *   *Result:* The wizard's AI, using File Search and `thinkingConfig`, digests the document and extracts the key objectives, timeline, budget, and stakeholder information to produce a concise, professional slide deck, saving hours of manual work.

---

### Success Metrics & Rollout Plan

*   **Generation Success Rate:** > 95% of deck generation requests complete without error.
*   **Generation Speed:** Average deck generation time (from click to viewable slides) is under 15 seconds.
*   **Security:** 0 API key leaks or cross-user data access incidents.
*   **User Engagement:** 50% of new users successfully generate at least one deck in their first session.
*   **Adoption:** Achieve 1,000 generated decks within the first month post-launch.

---

### Next Steps

1.  **[Dev]** Set up Supabase project: enable Auth, create `decks` and `slides` tables, and implement RLS policies.
2.  **[Dev]** Develop the `/generate-deck` Edge Function with a placeholder for the Gemini call.
3.  **[Dev]** Build the MVP frontend UI: Login, Wizard (text input only), and a basic Deck Editor.
4.  **[AI/Dev]** Integrate the Gemini API call into the Edge Function using the `generateDeckOutline` function call.
5.  **[QA]** Conduct end-to-end testing of the complete MVP flow.
6.  **[Product]** Gather user feedback on the MVP to prioritize advanced features.
