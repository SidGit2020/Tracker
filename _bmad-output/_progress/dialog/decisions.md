# Decision Log — Product Brief Dialog

**Project:** Tracker

---

### 2026-07-02 — Step 1a: Client Profile

- **Organisation:** Solo/individual project, no organisation, no external stakeholders.
- **Key person:** SIDDI — Product Owner, sole developer, and v1's only user ("audience of one" per forged-idea.md).
- **Decision culture:** Fast-individual, full autonomy, no approval chain.
- **Internal driver:** Wanting to build something end-to-end solo is the primary trigger; the expense-tracking problem is the vehicle. Success is measured personally — shipping in the self-imposed "days, weekend-scale" window, and testing whether "bare v1 first" is genuine discipline rather than avoidance.
- **Deadline:** Self-imposed, weekend-scale — no external pressure.
- Full profile: [client-profile.md](client-profile.md)

---

### 2026-07-02 — Step 5: Business Model

**Agent asked:** Whether the forged-idea's "free, no monetization" stance still holds, or if there's monetization thinking even for later versions.

**User response:** Confirmed — no business model for v1.

**Key discussion:** No paying customer exists or is planned. Tracker is personal, non-commercial. The innovation strategy's later-horizon "trust-milestone monetization" idea is explicitly out of scope for v1 and not currently being planned toward.

**Final decision:** No business model — free, personal, non-commercial product.

**Rationale:** Audience of one; there is no customer to monetize. Revisiting this only becomes relevant if the product ever grows beyond solo use, which is explicitly out of scope for v1.

**Implications:** No pricing, billing, or monetization work needed anywhere downstream (Trigger Map, PRD, UX). Routes past Business Customers (B2B) step directly to Target Users.

---

### 2026-07-02 — Step 8: Success Criteria

**Agent asked:** What would count as success, given the PRFAQ named "does even the founder log past day 14?" as the core unresolved question v1's launch is meant to answer; and whether the "days, weekend-scale" build timeline target still holds.

**User response:**
- Success bar: still logging at day 14 (the PRFAQ's own named threshold)
- Build timeline: still targeting weekend-scale, unchanged

**Final decision:**
- **Primary metric (user behavior):** Still actively logging at day 14 post-launch — directly tests the guilt/abandonment risk.
- **Secondary metric (timeline):** Ship v1 within the self-imposed weekend-scale ("days") window.

**Rationale:** Day-14 retention is the exact threshold already named in the PRFAQ as the make-or-break signal, so re-using it (rather than inventing a new number) keeps this measurement consistent with prior strategic work. The build-timeline gate matters because the PRFAQ explicitly said its own "genuine discipline, not avoidance" verdict on bare-v1-first sequencing depends on actually shipping in days, not weeks/months — if that slips, the verdict should be revisited.

**Implications:** Post-launch, the founder should honestly track whether he's still logging at day 14 — no other retention/analytics infrastructure is implied (audience of one, no telemetry needed). Experience-quality success is implicitly satisfied by the Product Concept (sub-few-second entry).

---

### 2026-07-02 — Step 9: Competitive Landscape

**Agent asked:** Do-nothing reality check (why mental estimation stopped being enough) and unfair-advantage reality check (is "I built and own it" actually enough vs. just using Monefy/Goodbudget), carrying forward alternatives already mapped in the PRFAQ (Pocket Clear, Finny, Koody, Monefy, Goodbudget; Walnut/Axio, ETMoney, MoneyView, bank-native apps).

**User response:**
1. Do-nothing broke down because "financial spending increased in different ways" — spending grew and diversified across categories/methods, making mental estimation unreliable.
2. Unfair advantage: "in v1 I want to start small... in the next iterations more features will be added" — accepts the PRFAQ's own honest assessment that differentiation is thin for v1 and that's acceptable; richer differentiation is intentionally deferred to future iterations.

**Final decision:**
- **Do-nothing alternative:** Rejected because mental estimation stopped scaling as spending diversified — this is the actual trigger for building, not vague dissatisfaction.
- **Unfair advantage (v1):** None claimed beyond ownership/exact-fit. Explicitly accepted as sufficient for audience-of-one v1, with richer differentiation deferred to future iterations (per innovation strategy's later horizons).

**Rationale:** Matches the PRFAQ's own verdict ("differentiation is a placeholder not a plan... acceptable for a personal tool; will need resolution before any external cohort is seeded"). No new claim invented here — carried forward and confirmed honestly rather than papering over the gap.

**Implications:** No competitive feature-parity work needed for v1. Future iterations (post-v1) should revisit differentiation before any external users are introduced.

---

### 2026-07-02 — Step 10: Constraints

**Agent asked:** Budget constraints (zero-cost vs small budget acceptable) and which locked decisions (timeline, stack, scope) are genuinely flexible vs fixed.

**User response:**
- Budget: zero-cost
- Flexibility: timeline can flex; scope and stack are fixed

**Final decision:**
- **Timeline:** Weekend-scale build is the target, but flexible — a slip is a signal worth reflecting on (per the PRFAQ's discipline-vs-avoidance question), not a hard failure.
- **Budget:** Zero-cost — free-tier hosting/local only.
- **Technical:** Fixed — .NET Core + Angular, already settled.
- **Scope:** Fixed — locked v1 scope from forged-idea.md must not creep mid-build.
- **Brand:** Not applicable — no external branding; tone of voice covers UI microcopy only.

**Implications:** Any hosting choice for deployment must stay within free tiers. Scope discipline is a hard constraint, not a soft preference — feature requests during build should be deferred to future iterations, not folded in.

---

### 2026-07-02 — Step 10a: Platform & Device Strategy

**Agent asked:** Device priority (mobile-first vs equal vs desktop-first) given logging happens on the go; and whether offline resilience (flagged as a candidate fast-follow in the PRFAQ) stays out of v1 scope.

**User response:**
- Device priority: equal priority (desktop + mobile)
- Offline: stays out of v1 — assumes connectivity at logging time

**Final decision:**
- **Primary Platform:** Responsive web application (.NET Core backend + Angular frontend)
- **Supported Devices:** Desktop and mobile browsers, equal priority, no native app
- **Interaction Models:** Touch + mouse/keyboard, standard responsive interactions
- **Offline:** Not required for v1 — future fast-follow only
- **Native Features:** None — no camera, push notifications, or bank/SMS integrations

**Rationale:** Consistent with the locked manual-entry-only scope and the confirmed tech stack. Offline resilience was explicitly named in the PRFAQ as a candidate fast-follow with no committed timeline — this confirms it stays deferred.

**Implications:** No PWA/offline-caching work required for v1. Responsive design must genuinely serve both desktop and mobile equally (not mobile-only), since device priority was confirmed as equal, not mobile-first.

---

### 2026-07-02 — Step 11: Tone of Voice

**Agent suggested (not asked user to define):** Plain & Direct, Neutral/non-judgmental, Unobtrusive, Precise — reasoning: the "friend/coach personality" layer was explicitly cut from v1 scope, and the core risk is guilt/abandonment, not lack of motivation, so tone should avoid both performative warmth and judgmental framing.

**User response:** Confirmed as-is, no adjustment toward warmer/more casual.

**Final decision:** Four attributes — Plain & Direct, Neutral & non-judgmental, Unobtrusive, Precise. Applies to UI microcopy only (buttons, labels, errors, empty states) — not strategic content (n/a here, no marketing copy for v1).

**Rationale:** Directly protects against the guilt/abandonment risk without requiring a "friend" personality layer that was deliberately deferred. Also reinforces the quick-add speed principle — no celebratory animations or copy that slows down logging.

**Implications:** No success-message copy after adding an entry (the live total updating is the feedback). No judgmental language tied to spending amounts anywhere in the UI.
