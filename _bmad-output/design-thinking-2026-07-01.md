# Design Thinking Session: Tracker

**Date:** 2026-07-01
**Facilitator:** SIDDI
**Design Challenge:** Help working professionals and families in India get a clear, honest picture of where their money goes — daily spending, recurring bills, and long-term financial goals — through a personal finance web app that feels like a supportive friend, not a spreadsheet or a bank.

---

## 🎯 Design Challenge

**Context:** This builds on the 2026-06-30 brainstorm ("Personal Expense Tracker App v1"), expanded and re-sequenced during this session:

- **Platform:** Original brainstorm assumed mobile-first (SMS/UPI push notification capture). This session confirms **web application only for v1** (.NET Core backend, Angular frontend). Mobile was floated as a parallel first-iteration target but explicitly deferred after pre-mortem analysis — splitting effort across two platforms before either reaches daily-use maturity was identified as a likely failure cause.
- **Scope expansion beyond expense capture:**
  - Monthly recurring bill tracking — rent, groceries, children's tuition fees, EMI/loan payments, insurance/policy payments
  - Market-aware **investment plan suggestions** (accounting for current market conditions and inflation)
  - **Retirement planning** — how much to save, and by when
- **Advice posture:** The app will give genuine financial **advice** (not just illustrative scenario modeling) on investments and retirement savings. This is a meaningfully different trust relationship than "celebrate your coffee spend" — worth carrying into empathy and prototype work, and worth a compliance/disclaimer conversation later (India: SEBI investment-adviser regulation touches this territory) even though it's out of scope for design thinking itself.
- **User base for this iteration:** Solo — SIDDI is the only user for now. This reframes the later Empathize and Test phases: this is a **self-directed, autoethnographic** design pass (designing from your own lived financial behavior and needs) rather than multi-user field research. Empathy methods and testing plans should be selected accordingly.

**Primary user (draft persona):** A household financial manager with recurring obligations (rent, EMIs, tuition, insurance) who wants an honest, non-judgmental view of spending *and* wants to start taking retirement/investment planning seriously, but finds that territory intimidating, easy to postpone, and poorly served by cold, corporate finance tools.

**Success for this session:** Come out with a validated problem framing and a testable low-fidelity prototype direction for the web app's core experience — spanning recurring bill visibility, spending warmth/personality, and the investment/retirement advice surface — that SIDDI can honestly self-test and believe in.

### Pre-Mortem Risks & Sequencing

*Applied via Advanced Elicitation — Pre-mortem Analysis:*

Imagining this project quietly failed a year out, the most likely causes were: scope too wide before any single slice reached daily-use maturity, no forcing function to prevent solo-project drift, untrusted advice output (no cross-check against a known calculator/rule of thumb) causing silent abandonment, and manual-entry friction on web starving the investment/retirement suggestions of real data.

**Mitigations carried forward into this design challenge:**
1. **One thin slice first** — expense + recurring bill visibility to daily-use maturity before investment/retirement advice gets design attention.
2. **Build a trust check into advice** — cross-validate any investment/retirement suggestion against a known public calculator or simple rule (e.g., 50/30/20, EPF/PPF returns).
3. **Mobile deferred**, not parallel — web only for this iteration (confirmed by SIDDI).
4. **Self-imposed forcing function** — anchor to a real recurring cycle (e.g., "by next month's rent + EMI cycle, I log everything here") to prevent silent drift.

---

## 👥 EMPATHIZE: Understanding Users

*Method used: Diary Study, adapted to a retrospective reconstruction (solo/autoethnographic — SIDDI as sole subject) covering the recurring rent (1st) / EMI (mid-month) / tuition (quarterly) cycle.*

### User Insights

- The month is structured around three fixed, externally-timed obligations: rent (1st), EMI (mid-month), tuition (quarterly, lump-sum).
- After these obligations clear, **there is rarely anything left over to invest** — stated plainly, but underneath it is a real, named frustration.
- The frustration is not "I don't want to invest" or shame/avoidance — it's explicitly: *"I know I should be investing but the math just doesn't work out most months."* This is a **capacity gap, not a motivation gap.**
- Retirement/investment intent clearly exists — it's aspirational and present in the user's mind — but gets crowded out by fixed obligations before it can become actionable most months.
- There's no described moment of proactively checking "how much is left" before it's absorbed by spending — awareness of the shortfall seems to arrive after the fact.

### Key Observations

- **This directly challenges an assumption carried over from the original brainstorm and this session's scope expansion:** "investment plan suggestions" implicitly assumes disposable income exists to direct. For SIDDI's actual lived pattern, that's frequently false. Advice-giving on *where* to invest may be premature if there's nothing to invest most months.
- Quarterly tuition is a lump-sum shock unless money is proactively set aside in advance — unconfirmed whether any sinking-fund/advance-saving behavior currently exists. Worth probing directly in Define.
- The emotional register is **frustration at a math problem**, not shame — this actually *supports* the brainstorm's "cheerleader, never-shaming" personality choice, but suggests the celebration should be aimed at closing the capacity gap (finding/creating margin), not just at logging transactions.
- This reframes the possible real "job to be done": the app's core value might not be *"tell me where to invest"* but *"help me find or create the margin to invest in the first place"* — a meaningfully different (and arguably more valuable, more differentiated) product than a generic investment-advice tool.

### Empathy Map Summary

| | |
|---|---|
| **Says** | "There's rarely anything left over to invest." / "I know I should be investing." |
| **Thinks** | "The math just doesn't work out most months." — private, ongoing awareness of the intention–capacity gap. |
| **Does** | Pays rent (1st), EMI (mid-month), tuition (quarterly) on their fixed schedule; no described proactive reserving ahead of the quarterly tuition lump sum; no described active tracking of "what's left" before it's spent. |
| **Feels** | Frustration — not shame, not indifference. A felt tension between a genuine financial-responsibility mindset and a lived reality that doesn't currently support it. |

---

## 🎨 DEFINE: Frame the Problem

### Point of View Statement

*SIDDI, a household financial manager juggling fixed rent/EMI/quarterly-tuition obligations, needs a way to see and create real spending margin before deciding where to invest it — because right now, "invest more" advice is meaningless most months when there's nothing left over, and the honest problem isn't ignorance about investing, it's a capacity gap between intention and available money.*

### How Might We Questions

1. How might we help SIDDI see, *before* the month is spent, whether any margin will exist — instead of discovering the shortfall after the fact?
2. How might we help SIDDI actively create margin (trim, defer, resequence spending) without it feeling like restriction or failure?
3. How might we make the quarterly tuition lump sum feel planned-for in advance rather than a recurring shock?
4. How might we make investment/retirement guidance honest and still useful in a month where the real answer is "nothing to invest right now"?
5. How might we celebrate the moments margin *does* appear, reinforcing the cheerleader tone at the exact point it matters most?

### Key Insights

- **The real opportunity is margin-finding and margin-creation, not investment selection.** This should probably be the app's actual core loop — investment/retirement advice is downstream of it, not parallel to it.
- **Quarterly tuition is an open risk.** No advance-saving behavior for it has been confirmed — worth resolving before ideation locks in a "sinking fund" feature as assumed-necessary.
- **The frustration-not-shame emotional tone needs to extend to margin shortfalls, too** — a month with zero investable margin should be reported honestly, without turning into a guilt trip.

*(Confirmed accurate by SIDDI — 2026-07-01)*

---

## 💡 IDEATE: Generate Solutions

### Selected Methods

Brainstorming (volume), SCAMPER Design (applied to the original brainstorm's expense-tracker concept), Analogous Inspiration (envelope budgeting, fitness-app honest reporting, poker bankroll management).

### Generated Ideas

**Brainstorming:**
1. Real-time "safe-to-spend" margin number, auto-updating as fixed obligations and flexible spend are logged
2. Auto-detect rent/EMI/tuition, subtract from income to project remaining margin
3. Tuition sinking fund — auto-suggest setting aside 1/3 of the tuition amount each month leading into the due quarter
4. "Zero Margin, Zero Shame" monthly report — honest, warm, framed as information not failure
5. Pre-purchase margin check — "this purchase will use up your remaining margin this month" (links to original PVS idea)
6. Weekly margin pulse — midweek check-in on tracking toward month-end margin
7. "Found Money" celebration — any month margin appears, even small, gets a visible win
8. Bill-sequencing assistant — nudges discretionary spend to land after fixed obligations clear
9. Margin trend graph — 6-12 month view of whether the capacity gap is closing or widening
10. "What-if" simulator — model one change (skip a subscription, renegotiate rent) against projected margin
11. EMI payoff countdown — visible "X months left" for motivational relief
12. Investment advice gated by margin — only surfaces when real margin exists; otherwise coach shifts to margin-creation
13. Sinking-fund "envelopes" for known lumpy costs (tuition, insurance renewal)
14. Margin-first onboarding — first question is "let's find out what you actually have to work with," not "where do you want to invest"

**SCAMPER (applied to the original brainstorm concept):**
- *Substitute:* "margin discovery" replaces "investment suggestions" as the first-run feature
- *Combine:* merge the pre-purchase checklist (PVS) with the margin-check into one system
- *Adapt:* adapt bank/EMI data to auto-populate a "fixed obligations calendar" instead of manual bill entry
- *Modify/Magnify:* point the "Financial Freedom Coin" gamification at margin-*creation* milestones, not just logging streaks
- *Put to other use:* repurpose the "Growth Spending whitelist" as a margin-protection guardrail — whitelisted spend never counts against margin
- *Eliminate:* no investment recommendation at all in a zero-margin month — margin-coaching only
- *Reverse:* start from "here's what's locked in," log flexible spend *against* what's left, instead of reconciling after the fact

**Analogous Inspiration:**
- From envelope budgeting: a literal "filling envelope" visual for the tuition sinking fund
- From fitness-app honest bad-week reporting: apply the same non-judgmental framing to a zero-margin month
- From poker bankroll management: a single "how much can I safely commit right now" number, refreshed daily

### Top Concepts

1. **Margin Meter** — an always-visible, real-time safe-to-spend number (bankroll-style), auto-updating as fixed obligations + flexible spend are logged. The core visibility loop the whole problem framing points to.
2. **Tuition Sinking Fund (envelope)** — auto-suggested monthly set-aside toward the next quarterly tuition payment, shown as a visually filling envelope. Kills the lump-sum shock; resolves the open risk flagged in Define.
3. **Zero-Margin Honest Report** — the monthly wrap-up that, when margin is zero, drops investment framing entirely and shifts to warm, judgment-free margin-creation coaching. Protects the "frustration not shame" tone exactly where it's most at risk of breaking.
4. **Online Purchase Capture (support concept)** — auto-detect Zomato/Swiggy/Amazon/Flipkart-style transactions via email or notification parsing, feeding flexible spend into the Margin Meter with near-zero manual entry. Without this, concept 1 can't be real-time — food delivery and e-commerce are exactly the variable-spend categories most likely to quietly erase margin between fixed obligations.

*(Confirmed by SIDDI — 2026-07-01)*

---

## 🛠️ PROTOTYPE: Make Ideas Tangible

### Prototype Approach

Two low-fidelity methods, run in sequence:
1. **Storyboarding** — walked the full monthly cycle as a sequential narrative to validate the experience flow end-to-end, not just individual screens.
2. **Wizard of Oz** — hand-calculated the Margin Meter against SIDDI's real (approximate) monthly numbers, faking all "smart" automation, to test whether the concept's core output is actually trustworthy before any code is written.

### Prototype Description

**Storyboard (5 scenes across a month):**
1. **Day 1, Rent** — auto-logged, Margin Meter updates matter-of-factly, no dread.
2. **Throughout the month, online spend** — Zomato/Amazon orders auto-captured, ticking the meter down in near real time.
3. **Mid-month, EMI** — auto-logged; if margin is trending tight, a calm, non-alarming trend nudge appears.
4. **Approaching the tuition quarter** — Sinking Fund envelope shows fill progress, with a warm "let's get ahead of it" nudge if behind.
5. **Month-end** — either a **Zero-Margin Honest Report** (investment talk paused, margin-creation coaching instead) or a **"Found Money" celebration** followed by a light, margin-gated investment/retirement suggestion.

**Wizard of Oz — hand-calculated against real numbers:**

**Scenario A — actual income (₹50,000):**

| Item | Amount |
|---|---|
| Income | ₹50,000 |
| − Rent | ₹5,000 |
| − EMI | ₹10,000 |
| − Tuition sinking fund (₹8,000 ÷ 3) | ~₹2,667 |
| − Online (Zomato/Amazon) | ₹3,000 |
| − Groceries | ₹8,000 |
| − Utilities | ₹2,000 |
| − Cash spending | ₹5,000 |
| − Insurance/policy payments | ₹8,000 |
| − Medical bills (family/parents) | ₹6,000 |
| **= Margin Meter result** | **~₹333** |

**Key validated finding:** The hand-calculated margin (~₹333) matches SIDDI's stated lived experience ("rarely anything left over") almost exactly — but only once the ~₹14,000 "family/medical" bucket was captured, and further refined into **two distinct categories with different rhythms**: insurance/policy payments (~₹8,000/mo equivalent — predictable, known renewal dates) and family medical bills (~₹6,000/mo — unpredictable, emergency-driven). Together they're the second-largest spend area after EMI, and both had been invisible in every concept discussed until this test. This confirms the gap was a **missing capture category**, not a behavioral mystery — validating the Margin Meter concept's core mechanic, contingent on capturing both.

**Scenario B — "What-if" simulator test (income raised to ₹60,000, all else equal):**

| Item | Amount |
|---|---|
| Income | **₹60,000** |
| − (same fixed + variable categories as Scenario A) | ₹49,667 |
| **= Margin Meter result** | **~₹10,333** |

**Key validated finding:** This doubles as a live test of the Ideate-stage "What-if simulator" concept — modeling one change (an income increase) against projected margin. A ₹10,000 income increase converts a ~₹333 (essentially zero) margin into a real ~₹10,333 margin. This is the first scenario in the session where the **"Found Money" celebration** and a **margin-gated investment/retirement suggestion** would honestly trigger — confirming the gating logic (no investment talk at ~₹333, real investment talk at ~₹10,333) behaves the way Define intended.

**Design implication carried forward:** These two categories need *different* mechanics, not one generic bucket:
- **Insurance/policy payments** — predictable, known due dates → same sinking-fund mechanic as tuition (set aside monthly toward a known renewal amount/date).
- **Family medical bills** — unpredictable, no fixed date → needs a *reserve/buffer* model instead (build up an emergency-style cushion over time, not a countdown to a known date).

Both should be protected from any overspend/shame flag (like the original brainstorm's Growth Spending whitelist, but for duty/obligation reasons rather than growth reasons).

### Key Features to Test

1. **Margin Meter** — real-time safe-to-spend number, now confirmed to require rent, EMI, tuition set-aside, groceries, utilities, cash spend, online purchases, insurance/policy set-aside, *and* family medical buffer as explicit inputs to be trustworthy.
2. **Sinking Fund envelope (tuition + insurance/policy)** — monthly set-aside visualization ahead of known, predictable due dates.
3. **Family Medical Reserve/Buffer (new)** — a protected, non-shamed, emergency-style cushion for unpredictable family medical costs — distinct mechanic from the sinking fund since there's no fixed due date.
4. **Zero-Margin Honest Report / Found Money celebration** — the month-end branch logic, gated investment/retirement suggestions.
5. **Online Purchase Capture** — Zomato/Swiggy/Amazon/Flipkart auto-detection feeding the meter.

---

## ✅ TEST: Validate with Users

### Testing Plan

- **Who:** SIDDI only — consistent with the solo/autoethnographic approach established in Empathize.
- **What:** A rough spreadsheet or paper mock-up of the Margin Meter, covering the 9 validated categories (rent, EMI, tuition sinking fund, insurance sinking fund, groceries, utilities, cash, online orders, family medical reserve), logged **in real time for 2-4 weeks** — not reconstructed afterward like today's session.
- **What's actually being tested:** (1) whether real-time logging is sustainable past week 2, (2) whether the category set holds up against real spending or something new surfaces (as medical/insurance did today), (3) whether the Zero-Margin / Found-Money reports land the way they're supposed to when triggered for real, not hypothetically.

### User Feedback

A lightweight immediate gut-check was run in place of full field testing (deferred to the 2-4 week self-test above):
- The **Zero-Margin Honest Report** tone ("investment talk is paused for now, here's one small idea for creating margin next month") was confirmed to feel right — no discomfort or "off" reaction.
- No friction concerns were raised about logging across 9 separate categories in real time.
- (Not yet tested live: whether the ~₹333 vs ~₹10,333 margin contrast is genuinely motivating in practice, versus just an interesting number in a one-off calculation — this needs the real 2-4 week test to observe rather than self-report.)

### Key Learnings

- **Validated:** The cheerleader, non-shaming tone holds up even at the hardest moment — a zero-margin month — which was the exact risk flagged back in Define ("the frustration-not-shame tone needs to extend to margin shortfalls too").
- **Validated (contingent on real use):** The margin-gating logic for investment/retirement advice (silent at ~₹333, active at ~₹10,333) matches the intended design — full confirmation still needs the 2-4 week live test.
- **Not yet proven, don't assume:** "No friction concerns" was a stated intention, not observed behavior. The real test is whether 9-category real-time logging actually gets sustained past the first couple of weeks.
- **New insight for the next iteration:** This entire session modeled the behavior the app itself needs to produce — SIDDI only surfaced the medical and insurance categories when prompted by a structured "trust check" (the Wizard of Oz walkthrough), not spontaneously. This suggests onboarding shouldn't assume the user will list every category unprompted; it likely needs its own guided "let's find your true numbers together" sequence, mirroring what just happened in this conversation.

---

## 🚀 Next Steps

### Refinements Needed

1. Build the **guided "trust-check" onboarding flow** — mirrors this session itself (categories only surfaced when prompted), not a blank form assuming the user lists everything upfront.
2. Split the **sinking fund** (tuition + insurance/policy — predictable, known dates) from the **reserve/buffer** (family medical — unpredictable) as two distinct UI mechanics, not one bucket.
3. Decide the **capture mechanism per category** for web before architecture work starts: email parsing for online orders (Zomato/Amazon), manual/quick-entry for cash/groceries/utilities, and how EMI/insurance renewal dates get entered or imported.
4. Treat the **9-category list as provisional**, not final — the real 2-4 week test may surface a 10th (e.g., transport/fuel wasn't discussed — worth confirming it isn't silently missing, the same way medical was).

### Action Items

1. Build the paper/spreadsheet Margin Meter mock with all 9 categories; start real-time logging anchored to a natural cycle (e.g., beginning on the next rent due date — a built-in forcing function, per the earlier pre-mortem mitigation).
2. Draft the guided onboarding "trust-check" flow as its own feature spec item.
3. Log real-time for 2-4 weeks; watch specifically for abandonment risk and any new category surfacing.
4. Bring this output into `bmad-product-brief` or `bmad-prd` as grounding input — this design-thinking artifact is a validated input for that next BMad phase.

### Success Metrics

- Real-time logging sustained past week 2 (friction risk indicator)
- No more than one new category surfaces during the test (validates the 9-category set)
- At least one real Zero-Margin or Found-Money report is generated and self-rated honest/non-shaming *in the moment*, not hypothetically
- Sinking fund and reserve are visibly distinct in the mock, not merged

**Next cycle:** Not ready for a broader pilot (solo by design) — the right next move is refine → real 2-4 week self-test → then into `bmad-product-brief`/`bmad-prd` with this validated framing, unless the real test surfaces a surprise big enough to loop back to Empathize.

---

_Generated using BMAD Creative Intelligence Suite - Design Thinking Workflow_
