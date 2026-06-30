# Brainstorm Intent: Personal Expense Tracker App (v1)

**Session date:** 2026-06-30
**Scope:** v1 only — expense tracking core. Full AI assistant vision deferred.

---

## Product Vision

A mobile expense tracker that feels like a warm, supportive friend managing money together with the user — not a spreadsheet, not a corporate finance tool. It captures spending automatically wherever possible and coaches the user toward financial discipline through celebration, not shame.

---

## Core Feature Areas

### 1. Expense Capture (5-Channel Financial Radar)
- **SMS parsing** — auto-detect bank/payment alerts from messages
- **UPI push notifications** — track PhonePe, GPay, Paytm transactions automatically
- **Email parsing** — capture online shopping (Amazon, Flipkart) order confirmations
- **Voice notes** — say the expense out loud, it gets logged
- **Cash widget** — frictionless manual entry for offline/cash transactions (the critical gap)

### 2. Money-In Tracking
- Log bill splits, repayments, and cash received — not just outflows

### 3. Spending Dashboard
- Monthly breakdown by category with visual charts
- AI-generated suggestions to reduce unnecessary spend and improve savings

### 4. Pre-Purchase Intervention System (Spending Philosophy Engine)
- **Pre-purchase checklist** — friction prompt before committing to big orders (addresses user's over-purchasing habit)
- **Purchase Value Score (PVS)** — rates a purchase on need, importance, and growth impact (not a fixed rupee threshold)
- **Growth Spending whitelist** — books, courses, gym, growth tools always celebrated, never flagged as overspend

### 5. Gamification & Retention
- Streaks, calendar ticking, and badges to make daily tracking habitual
- Key milestone badge: **First ₹1000 Saved** (the moment the app proves its value)
- **Financial Freedom Coin** — rarest badge, earned after 6 months of consistent tracking
- Progression arc designed as a Day 1 → Month 6 retention journey

### 6. Proactive Coaching
- Monday morning motivational money tip (weekly kickoff from the "friend")
- Proactive intervention: detect when the user is about to overspend before it happens

---

## Key Decisions

| Decision | Choice |
|---|---|
| App personality | Cheerleader — celebratory, encouraging, never shaming |
| App voice | Warm, casual, personal — sounds like a real friend, never robotic or corporate |
| Shame avoidance | Financial discipline and good habits are celebrated; numbers are secondary |
| Growth spend | Permanently exempted from overspend flags |
| Purchase threshold | Dynamic PVS, not a fixed rupee amount |

---

## UX Direction

- **Two governing analogies:** personal finance diary (reflective, private, chronological) + piggy bank (saving-first, tangible, satisfying progress)
- **Emotional target:** recreate childhood money joy — collecting coins, earning sticker stars, reward-driven satisfaction
- **Frictionless capture** is non-negotiable — if logging feels like work, the app fails
- **Tone in all copy and nudges:** warm, direct, personal — as if a trusted friend is speaking

---

## 4 Synthesis Insights

1. **5-channel financial radar** — SMS + UPI push + email + voice + cash widget together enable near-zero-effort capture. No single channel is enough; the set must work as a whole.

2. **Spending philosophy engine** — pre-purchase checklist + PVS + Growth Spending whitelist form one coherent system that answers a single question: *"Is this money doing something for me?"*

3. **Friend voice = early AI prototype** — the warm, casual personality defined in v1 is not just a tone choice; it is the seed of the long-term AI assistant product direction. Getting this right in v1 matters beyond v1.

4. **Progression arc as retention strategy** — First ₹1000 → streaks → Financial Freedom Coin maps directly to Day 1, Week 4, and Month 6 retention checkpoints. Gamification is the retention plan.

---

## Downstream Readiness Notes

- **Next recommended skill:** `bmad-product-brief` or `bmad-prd`
- **Platform:** Mobile (implied by SMS/push notification integration; OS not yet decided)
- **Market context:** Indian user, UPI ecosystem, INR currency — all copy and thresholds should reflect this
- **Open decisions to resolve in PRD:** iOS vs Android vs cross-platform, SMS/notification permission strategy, AI model for PVS and suggestions
