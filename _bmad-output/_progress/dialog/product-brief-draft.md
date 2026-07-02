# Product Brief Draft: Tracker

> Working draft, accumulated across Phase 1 steps. Finalized into `design-artifacts/A-Product-Brief/01-product-brief.md` at Step 12.

---

## Vision

A dead-simple expense tracker that turns "I probably spend too much on X" into an actual monthly number per category — manual entry only, zero setup friction, built for an audience of one: me.

**Key Insights from Discussion:**
- The primary user is the founder himself — v1 is genuinely "audience of one," not a proxy for a future external user.
- The core problem is vagueness, not blindness — he already senses overspending; the product's job is to convert that feeling into a specific, trustworthy number.
- The value moment is a periodic (roughly monthly) glance at category totals — a check-in habit, not a dashboard he'll live in.
- Zero setup friction (manual entry, no bank-linking/SMS permissions) is a deliberate choice, not a limitation to apologize for.
- Underneath the product goal, there's a personal drive to ship something real, solo, start to finish, in a self-imposed short window.

---

## Positioning

**Positioning Statement:**
For someone who wants a trustworthy monthly picture of where their money goes but is unwilling to trade bank-linking or broad permissions for it, Tracker is a manual expense logger that fits exactly how you actually want to log spending. Unlike existing manual-entry apps (Monefy, Goodbudget, Pocket Clear) or a spreadsheet, it's built and owned by you — free to evolve on your own terms rather than someone else's roadmap.

**Components:**

- **Target Customer:** Himself, exclusively (audience of one)
- **Their Need:** A trustworthy monthly per-category number, replacing a vague sense of overspending, with zero setup friction
- **Product Category:** Manual personal expense tracker (web app)
- **Key Benefit:** Exact fit to his own habits, plus full ownership to evolve it freely
- **Alternatives:** Monefy, Goodbudget, Pocket Clear, spreadsheets, automation-heavy apps (Walnut, ETMoney — rejected for permission/trust reasons)
- **Differentiator:** Self-built and self-owned, not a technical edge — fits exactly and evolves on his own terms

**Strategic Rationale:**
Manual-entry tracking is a validated, if crowded, niche (per PRFAQ competitive research), and automation-heavy alternatives are independently confirmed to break user trust via excessive permissions. Since v1 has no external users, ownership and exact personal fit are the only differentiators that matter at n=1 — and they are genuine.

---

## Business Model

**Type:** None — free, personal, non-commercial (audience of one)

**Rationale:** There is no paying customer; v1 has exactly one user (the founder). Monetization is explicitly out of scope and not currently being planned toward — it would only become relevant if the product ever grew beyond solo use, which is outside v1's scope.

**Implications:** No pricing, billing, or monetization work anywhere downstream.

---

## Ideal Customer Profile (ICP)

**Primary User:** The founder himself — sole user, sole stakeholder, first-time solo product builder.

**Their context:** Spends mostly digitally (card/UPI); transactions are technically reconstructable after the fact, but manual logging is a deliberate ownership choice, not a technical necessity.

**Their frustrations:** No consistent tracking today, just a vague, unconfirmed sense of overspending. The realistic abandonment risk is forgetting to log in the moment — not motivation or chore-fatigue.

**What they're trying to achieve:** A trustworthy, roughly-monthly glance at per-category spending.

**How they currently solve this:** Mental estimation only; has ruled out automation-heavy trackers (trust/permissions) and existing manual apps/spreadsheets (in favor of ownership).

**Secondary Users:** None.

---

## Product Concept

**Core Structural Idea:** The home screen is a single always-visible quick-add box — amount field plus single-tap category buttons for the fixed, short category list — paired with a live running current-month total that updates immediately per entry.

**Implementation Principle:** Every downstream decision should protect the speed of the add-flow first. Nothing goes between "user has spending to log" and "it's logged" — no required navigation, no multi-step forms, no mandatory fields beyond amount + category.

**Rationale:** Directly counters the abandonment risk identified in the ICP (forgetting to log in the moment). The live total also resolves an open question flagged in the PRFAQ — it's confirmed scope, not an over-interpretation — and gives each entry an immediate payoff, preventing the "log with no reward" failure mode named in the original scoping.

**Concrete Example:** ₹450 grocery purchase → tap "Food" → type 450 → add → running total updates instantly (e.g. ₹12,300 → ₹12,750).

**Features That Stem From This Concept:**
1. Quick-add entry (amount + single-tap category selection) as the default/home view
2. Live, always-visible running total for the current month
3. Fixed, short category list rendered as tappable buttons (no category management UI)

---

## Success Criteria

**Primary Metric (User Behavior):** Still actively logging expenses at day 14 post-launch — the exact threshold the PRFAQ named as the make-or-break signal for the guilt/abandonment risk. This is what v1's launch is actually meant to test.

**Secondary Metric (Timeline):** Ship v1 within the self-imposed weekend-scale ("days") build window. If this slips into weeks/months, the PRFAQ's "genuine discipline, not avoidance" verdict on bare-v1-first sequencing should be revisited, not assumed to still hold.

**Experience Quality:** Implicitly covered by the Product Concept — sub-few-second entry via the quick-add box.

**Measurement:** Manual, honest self-check — no analytics/telemetry infrastructure implied (audience of one).

---

## Competitive Landscape

**Alternatives:**
- **Manual-entry peers:** Pocket Clear, Finny, Koody, Monefy, Goodbudget — same niche, none dominant against funded incumbents
- **Automation-heavy:** Walnut/Axio, ETMoney, MoneyView, bank-native apps — require bank-linking/broad permissions, ruled out on trust grounds
- **Do-nothing (actual prior status quo):** Mental estimation — broke down as spending grew and diversified across categories/methods, no longer reliable

**Our Unfair Advantage:**
None claimed beyond ownership and exact personal fit — and that's accepted as sufficient for v1. There is no external competition to win at audience-of-one scale. Richer differentiation (trust/tone/relationship layer, per the innovation strategy) is intentionally deferred to future iterations, not a gap papered over now.

---

## Constraints

- **Timeline:** Weekend-scale build target — flexible if it slips, but a slip is a signal worth reflecting on (per the PRFAQ's "genuine discipline vs. avoidance" question), not a hard failure.
- **Budget:** Zero-cost — free-tier hosting/local only, nothing spent.
- **Technical:** Fixed — .NET Core backend + Angular frontend, already settled, no hard unknowns identified.
- **Scope:** Fixed — locked v1 scope from forged-idea.md must not creep mid-build; feature requests during build defer to future iterations.
- **Brand:** Not applicable — no external branding/marketing; tone of voice covers UI microcopy only.

---

## Platform & Device Strategy

**Primary Platform:** Responsive web application (.NET Core backend + Angular frontend)
**Supported Devices:** Desktop and mobile browsers, equal priority — no dedicated native app
**Device Priority:** Equal (desktop + mobile)
**Interaction Models:** Touch (mobile) and mouse/keyboard (desktop)
**Technical Requirements:**
- Offline Functionality: Not required for v1 — assumes connectivity at logging time; deferred as a future fast-follow
- Native Features: None needed — no camera, push notifications, or bank/SMS integrations

**Platform Rationale:** Consistent with the locked manual-entry-only scope and the already-confirmed tech stack; no hard technical unknowns identified.
**Future Platform Plans:** Offline resilience is a candidate fast-follow, not committed.
**Design Implications:** Responsive design must genuinely serve desktop and mobile equally, not mobile-only.
**Development Implications:** No PWA/offline-caching work required for v1.

---

## Tone of Voice

**For UI Microcopy & System Messages**

### Tone Attributes

1. **Plain & Direct**: No fluff or cleverness; the UI shouldn't perform for a one-person audience who already knows what they're doing.
2. **Neutral, non-judgmental**: Never scolds or nudges about spending amounts — a large category total is just a number, not a verdict. Directly protects against the guilt/abandonment risk without needing a "friend" personality (explicitly cut from v1 scope).
3. **Unobtrusive**: Gets out of the way fast, consistent with the quick-add speed principle — no celebratory animations or copy that slows down logging.
4. **Precise**: Exact amounts and category names stated plainly, since the whole point is trustworthy numbers.

### Examples

**Error Messages:**
- ✅ "Enter an amount"
- ❌ "Oops! Something's not quite right 😅"

**Empty States:**
- ✅ "No entries yet this month"
- ❌ "Your journey starts here!"

**Success Messages:**
- ✅ *(no message — the running total just updates)*
- ❌ "Great job logging that expense!"

**Button Text:**
- ✅ "Add"
- ❌ "Let's log it!"

### Guidelines

**Do:**
- State amounts and categories exactly as entered
- Let the live total be the only feedback after adding an entry
- Keep error messages short and instructional

**Don't:**
- Use judgmental language tied to spending amounts
- Add celebratory/congratulatory copy or animations
- Perform warmth or personality that isn't there — this is a solo tool, not a companion app

*Note: Tone of Voice applies to UI microcopy only. Strategic content (headlines, marketing copy) doesn't apply — v1 has no external audience.*
