# 🧭 Summary

Make each wizard step interactive and useful by connecting Gemini’s core features — `urlContext`, structured generation, enrichment, and review. Each step should feel like progress toward a real, editable AI brief.

---

## 🔁 Improved 5-Step Flow

### **Step 1 – Project Intro (Working)**

✅ Keep: user inputs, URL, or short pitch.
🧠 Add: **Gemini URL Context** to auto-extract company details (mission, services, tone).
💡 *Example:*

> User pastes `https://myfashionstartup.com` → Gemini summarizes “AI fashion design platform helping indie brands.”

---

### **Step 2 – Scope Builder**

🎯 Goal: define what the project is *about*.
💡 Use Gemini structured generation (`function calling`) to build scope cards:

* Objectives
* Deliverables
* Deadlines
* Budget ranges
  🧩 *AI Feature:* prompt Gemini Pro with `generate JSON schema for project_scope`.
  🌍 *Example Use Case:*

> Startup founder selects “Brand Design” → Gemini suggests deliverables: *Logo Design*, *Color Palette*, *Pitch Deck Template*.

---

### **Step 3 – AI Enrichment**

🎯 Goal: enhance user input with context and ideas.
💡 Use **Gemini 2.5 Pro + Flash** to:

* Suggest keywords, competitors, or tone
* Rewrite goals into concise investor-friendly language
* Auto-generate 3 visual themes or brand tones
  🌍 *Example:*

> Gemini turns “We need a logo” → “Minimal AI-style identity inspired by geometric forms.”

---

### **Step 4 – Review Brief**

🎯 Goal: show a complete, editable brief.
💡 Use **Gemini JSON → Text summary** to generate:

* Project summary
* Key tasks (editable)
* Estimated effort
* AI insights or risks
  🌍 *Example:*

> “Logo Design (1 week) | Mood: Geometric Minimalism | Deliverables: Logo, Brand Guide, Social Kit.”

---

### **Step 5 – Dashboard (Next Actions)**

🎯 Goal: save, compare, and share results.
💡 Actions:

* Save to **Supabase** project record
* Export to PDF or Pitch Deck Wizard
* Re-run “Improve Brief with Gemini”
  🌍 *Example:*

> User clicks “Enhance Brief” → Gemini enriches scope with timeline, budget estimates, and market context.

---

## ⚙️ Gemini AI Feature Mapping

| Wizard Step | Gemini Feature             | Use Case                            |
| ----------- | -------------------------- | ----------------------------------- |
| Step 1      | `urlContext`               | Fetch company insights from website |
| Step 2      | Structured Generation      | Create scope schema (JSON)          |
| Step 3      | Text Rewrite + Suggestions | Enrich user input with tone/style   |
| Step 4      | Summary + Compare          | Generate editable brief summary     |
| Step 5      | Multi-turn Prompt Memory   | Re-run brief improvements           |

---

## 🚀 Real-World Examples

| User Type       | Goal                       | Wizard Outcome                          |
| --------------- | -------------------------- | --------------------------------------- |
| Startup Founder | Create investor deck brief | AI summarizes market + generates slides |
| Agency          | Client branding proposal   | Auto-built scope + timeline             |
| Designer        | Project overview           | AI brief with style references + assets |
| Event Planner   | Event outline              | AI generates sponsors + ticket tiers    |

---

## ✅ Next Steps

1. Replace placeholder text with AI-driven cards + inputs.
2. Add `Gemini 2.5 Pro` endpoint integration for Step 2–4.
3. Store JSON brief in Supabase (`briefs` table).
4. Enable “Export → Pitch Deck Wizard” or “Generate Images with Flash”.

---
