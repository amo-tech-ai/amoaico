# 🔮 Future Features Specification: AI & Architecture

**Document Status:** Draft - Implementation Guide
**Target:** Sun AI Platform
**Goal:** To provide technical implementation details for Phase 4 features outlined in the Progress Tracker.

---

## 1. AI Competitor Intelligence Agent

**Goal:** Add a "Competitor Analysis" tab to the Brief Detail page that finds real-world rivals.

### **Backend Logic (`supabase/functions/competitor-analysis`)**
*   **Input:** `company_name`, `project_description`, `url`.
*   **Model:** `gemini-2.5-flash` (Speed is priority).
*   **Tooling:** `googleSearch`.
*   **Process:**
    1.  **Search:** "Find top 3 direct competitors for [Company Name] which does [Description]."
    2.  **Analyze:** For each competitor, identify specific Strengths and Weaknesses relative to the user's project.
    3.  **Output:** Return a comparison matrix JSON.

---

## 2. Operational Hardening: Rate Limiting

**Goal:** Prevent wallet-draining attacks on the `generate-brief` endpoint.

### **Implementation (Upstash Redis)**
1.  **Setup:** Create an Upstash Redis database.
2.  **Integration:** In `generate-brief/index.ts`:
    ```typescript
    import { Redis } from 'https://deno.land/x/upstash_redis/mod.ts';
    
    // ... inside the function ...
    const redis = new Redis({
      url: Deno.env.get('UPSTASH_REDIS_REST_URL')!,
      token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!,
    });
    
    // Limit: 5 requests per 24 hours per User ID
    const limit = await redis.incr(`brief_limit:${user.id}`);
    if (limit === 1) await redis.expire(`brief_limit:${user.id}`, 86400);
    
    if (limit > 5) {
      return new Response("Rate limit exceeded", { status: 429 });
    }
    ```