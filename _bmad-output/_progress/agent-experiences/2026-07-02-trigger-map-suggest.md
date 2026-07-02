# Agent Experience: Dream Up - Tracker Trigger Map

**Created:** 2026-07-02
**Mode:** Suggest
**Phase:** 2 (Trigger Mapping)
**Project:** Tracker (personal expense tracker, audience of one)

---

## Layer 1: WDS Form Learned

### Methodology Loaded
- `_bmad/wds/data/agent-guides/saga/trigger-mapping.md` (core Trigger Mapping guide)
- `_bmad/wds/data/agent-guides/saga/dream-up-approach.md` (5-layer generation process)
- Skill data: `business-goals-template.md`, `key-insights-structure.md`, `quality-checklist.md`, `mermaid-formatting-guide.md`

**Note:** `docs/method/phase-wds-2-trigger-mapping-guide.md`, `docs/quick-start/0wds-2-trigger-mapping.md`, `docs/models/impact-effect-mapping.md`, and `docs/method/dream-up-rubric-phase-2.md` referenced in the workflow do not exist in this installation of the WDS module. Proceeding with the agent-guide + skill-data materials above, which contain the full methodology, structure, and quality rubric needed.

### Structure Internalized
- 4 core layers: Business Goals → Product/Solution Hub → Target Groups → Usage Goals (Driving Forces)
- Prioritization required at each level
- Personas need psychological depth, not demographics
- Positive + negative drivers, equal weight
- 3-4 target groups max — **adapted for this project: exactly 1 target group**, since the Product Brief establishes "audience of one" as a deliberate strategic choice, not a gap. Forcing multiple personas would violate the brief and dilute focus (the guide's own anti-pattern: "Too Many Target Groups").

### Quality Standards
- Minimum threshold: 7/9 complete, 5/7 quality, 4/4 mistakes avoided, 2/4 best practices
- Excellence threshold: 9/9 complete, 7/7 quality, 4/4 mistakes, 4/4 practices

### Adaptation Note
The template language in `business-goals-template.md` / `key-insights-structure.md` (flywheel, "champions," community growth, multi-tier objectives) assumes a multi-user growth product. Tracker has no growth, no external users, no monetization. Adapting to **personal-project goal framing**: vision = behavior change (build a lasting logging habit), objectives = the Product Brief's own success criteria (14-day retention, ship-within-days, sub-few-second entry), single persona = the founder himself. Flywheel/champion language is dropped as inapplicable.

---

## Layer 2: Project Context (Initial Load)

### From Product Brief
**Product:** Tracker — manual expense logger, web app (.NET Core + Angular), zero setup friction, audience of one (the founder)
**Core problem:** Vagueness, not blindness — founder senses overspending but has no confirmed number
**Value moment:** Roughly-monthly glance at per-category totals; not a dashboard he lives in
**Real abandonment risk:** Forgetting to log in the moment (not motivation/chore-fatigue)
**Product concept:** Home screen = always-visible quick-add box (amount + single-tap category buttons) + live running current-month total
**Business model:** None — free, personal, non-commercial
**Success criteria:**
- Primary: still actively logging at day 14 post-launch
- Secondary: ship within self-imposed "days" window
- Experience quality: sub-few-second entry
**Tone:** Plain, direct, neutral/non-judgmental about amounts, unobtrusive, precise — explicitly designed to avoid guilt-driven abandonment

### User Archetype (single, from Product Brief)
**The Founder** — sole user, sole stakeholder, first-time solo product builder. Spends digitally, transactions technically reconstructable but chooses manual entry for ownership. No consistent tracking today, just a vague unconfirmed sense of overspending.

### Constraints
- Technical: .NET Core + Angular, responsive web, no offline/PWA requirement for v1
- Business: zero cost, weekend-scale build window, locked v1 scope (no feature creep)
- Brand: no external branding; tone governs UI microcopy only

### Strategic Direction
- No growth, no monetization, no external audience
- Single measurable behavioral bet: does removing setup/logging friction solve the real abandonment risk (forgetting to log)?

### Business Goals (Added to Layer 2 — User Confirmed [C])
**Vision:** Turn a vague sense of overspending into a trustworthy, always-current number — built solo, owned completely, and simple enough that logging never feels like a chore.
**Goals:** 1) Build a lasting personal logging habit (primary), 2) Ship v1 within the self-imposed window (prerequisite), 3) Trust the number (prerequisite)

---

## Layer 3: Domain Research

### Step: Business Goals / Driving Forces (combined research pass)

**Research conducted:**
1. WebSearch: "why people abandon expense tracking apps habit formation research"
   - Finding: People quit not because numbers are scary, but because the process creates friction, guilt, or confusion, and there's no simple routine to sustain it. ~92% of habit-tracking attempts fail within 60 days. One missed entry → missed week → avoidance. "This number seems wrong" is a common abandonment trigger.
   - Relevance: Directly validates the Product Brief's abandonment risk (forgetting to log) and its neutral, non-judgmental tone decision. Confirms guilt/inaccuracy-driven abandonment as a real negative driving force to map.

2. WebSearch: "manual expense logging friction quick entry habit stickiness personal finance"
   - Finding: The biggest barrier is consistency, not accuracy. Speed of entry (single tap vs. multi-step form) compounds across dozens of transactions and directly extends habit duration. Manual tracking (vs. full automation) still adds "just enough friction to trigger awareness without becoming burdensome" — supporting deliberate manual-entry as a feature, not a limitation.
   - Relevance: Validates the quick-add box design decision and reframes "manual entry" as intentional friction that aids awareness, feeding directly into positive driving forces (ownership, trustworthy numbers) and the product's differentiation stance already stated in the Product Brief.

**Key insights informing generation:**
- The single biggest psychological threat to this product is silent abandonment via forgetting — not lack of motivation. Design/content must optimize for re-entry speed and zero guilt on return.
- Distrust of a number ("this seems wrong") is a distinct negative driver from forgetting — both must be represented separately.
- Manual entry is reframed from "extra work" to "ownership + awareness," matching the Product Brief's differentiation stance.

Sources:
- [Why So Many Expense-Tracking Apps Don't Actually Work - Lemon](https://lemonapp.app/education/why-so-many-expense-tracking-apps-dont-actually-work/)
- [Why Do 90% of People Quit Habit Trackers Within 30 Days? - Moore Momentum](https://mooremomentum.com/blog/why-do-90-of-people-quit-habit-trackers-within-30-days/)
- [Why Manual Expense Tracking Beats Automated Apps - Tefteri](https://tefteri.me/blog/manual-vs-automated-expense-tracking/)
- [Why Manual Expense Tracking Works Better Than Automatic Syncing - Pocket Clear](https://pocketclear.app/blog/manual-expense-tracking-benefits.html)
- [AI Expense Tracker vs Manual: Which Approach Works Better? - Finny](https://getfinny.app/blog/ai-expense-tracking-vs-manual)

---

## Generation & Self-Review Log

### Business Goals — Iteration 1

**Generation Plan:**
- WDS Form: 3 goals x 3 objectives (Vision + SMART), hierarchical (Primary Outcome + 2 Prerequisites), per `trigger-mapping.md`
- Project Context: Product Brief success criteria (14-day retention, ship-within-days, sub-few-second entry) reused directly as objectives rather than invented metrics
- Domain Research: Abandonment-via-forgetting and distrust-of-numbers findings inform Goal 3 ("Trust the number") as a distinct goal, not folded into Goal 1

**Output:**

## Vision
Turn a vague sense of overspending into a trustworthy, always-current number — built solo, owned completely, and simple enough that logging never feels like a chore.

## Business Goals & Objectives

**Goal 1 (Primary Outcome): Build a lasting personal logging habit**
- Objective 1.1: Still actively logging expenses at day 14 post-launch
- Objective 1.2: No missed-week gaps in the first month of use
- Objective 1.3: Entry takes only a few seconds, start to finish

**Goal 2 (Prerequisite): Ship v1 within the self-imposed window**
- Objective 2.1: Ship within the weekend-scale "days" build target
- Objective 2.2: Locked v1 scope held — zero scope creep during build
- Objective 2.3: Quick-add box + live running total both working at launch

**Goal 3 (Prerequisite): Trust the number**
- Objective 3.1: Every logged amount reflects in the running total immediately and exactly
- Objective 3.2: No judgmental or guilt-inducing copy anywhere in the UI
- Objective 3.3: Category totals match a manual spot-check at each monthly review

## Product Connection
The quick-add box and live running total directly serve Goal 1 (removes the friction that causes forgetting) and Goal 3 (immediate, exact feedback builds trust in the number). The locked scope and weekend build window protect Goal 2 from the single biggest threat to a solo side project: scope creep turning "days" into "months."

**Self-Review:**
- Strategic Depth: ✅ — goals trace to the Product Brief's actual stated risk (forgetting) and stated non-goal (growth/profit), not generic business language
- Actionable Specificity: ✅ — every objective is a concrete, checkable fact, not a vague aspiration
- Business Goal Connection: N/A at this step (no personas yet — will verify in Target Groups step)
- Common Mistakes Avoided: ✅ no solutions-as-goals, ✅ no generic goals, ✅ metrics support goals rather than replacing them
- Gaps: None identified for this step. Vision deliberately omits growth/market language since Product Brief rules it out explicitly.

**Quality Score (this step): 9/10** — full marks on fit-to-brief and specificity; not 10 only because "day 14" and "days" timeline reuse Product Brief metrics verbatim rather than adding new strategic framing (appropriate here, since inventing new metrics would contradict the brief).

**Status:** Meets excellence threshold. Proceeding to Suggest Mode checkpoint.

### Target Groups (Added to Layer 2 — User Confirmed [C])
**Only group:** Siddi the Self-Tracker (Priority 1) — deliberately singular per Product Brief
**Core psychology:** Autonomy/ownership-driven, impatient with friction, no need for gamification, quiet personal stake in solo completion
**Internal state:** Background unease about spending; wants zero friction + zero judgment when logging

---

### Target Groups — Iteration 1

**Research conducted:**
- WebSearch: "solo developer building personal tool for own use motivation ownership psychology"
  - Finding: Solo builders are driven by autonomy, mastery, and purpose rather than profit; ownership (conception through deployment) is absolute when creator and end-user are the same person; freedom of solo work is both motivating and a risk (nothing external forces follow-through).
  - Relevance: Directly shapes the persona's psychological profile — internal pride/discipline substitutes for external accountability, and this is itself a risk factor for Goal 2 (shipping on time) and Goal 1 (habit persistence).

**Generation Plan:**
- WDS Form: Deep psychological persona (not demographic), Usage Context template (5 questions), explicit Business Goal connections
- Project Context: Product Brief's single archetype ("The Founder") deepened using `user_name: SIDDI` from project config
- Domain Research: Autonomy/ownership/mastery framing + solo-dev follow-through risk

**Output:**

## Target Groups

**Deliberately one target group.** The Product Brief states audience-of-one as a strategic choice, not a gap — mapping additional personas would invent users that don't exist and dilute focus (a named anti-pattern in the WDS methodology).

### Siddi the Self-Tracker — Priority 1 (only target group)

**Who Siddi Is:**
Solo founder and first-time solo product builder. Spends mostly digitally (card/UPI) — transactions are technically reconstructable after the fact, but he chooses manual entry deliberately, for ownership, not because he has no alternative. No consistent tracking exists today, just a vague, unconfirmed sense of overspending.

**Psychological Profile:**
Siddi is driven by **autonomy and ownership** — he's building this specifically because he wants a tool that's his, not someone else's roadmap. He's **pragmatic and impatient with friction**: anything that costs him more than a couple of seconds to log an expense is a tax he won't keep paying. He doesn't need gamification, streaks, or encouragement copy — he finds that kind of performed enthusiasm hollow for a tool only he will ever see. There's also a **quiet personal stake**: shipping this, solo, start to finish, in a self-imposed short window is itself part of the point — separate from whether the app is ever "impressive," it has to actually exist and actually get used.

**Internal State:**
When Siddi thinks about his spending today, he feels a **low-grade, background unease** — not panic, just an itch of "I probably spend too much on X" that he can't currently confirm or dismiss. When he thinks about logging an expense, he wants **zero friction and zero judgment** — a number he doesn't trust, or a UI that scolds him, are both equally likely to make him quietly stop opening the app.

**Usage Context:**

1. **Access/Discovery:** Opens the app directly (bookmarked/pinned) — no discovery step, no search, no marketing funnel.
2. **Emotional State:** Two distinct modes — (a) rushed/mid-task when logging an expense in passing, (b) reflective/checking-in during the roughly-monthly total review.
3. **Behavior Pattern:** Logging is tap-amount, tap-category, done — no reading, no deciding. Monthly review is a quick scan of category totals, not a deep-dive session.
4. **Decision Criteria:** Does logging cost him basically zero attention? Does the running total feel exact and trustworthy the moment he glances at it?
5. **Success Outcome:** An expense is logged in a few seconds without breaking whatever he was doing before opening the app; at month-end, the category totals give him a specific number to replace the vague feeling.

**Relationship to Business Goals:**
- ✅ **Build a lasting personal logging habit:** Siddi's own day-14 continued use *is* this goal — there is no other user whose behavior could satisfy it.
- ✅ **Ship v1 within the self-imposed window:** His own discipline and scope adherence are the only mechanism that could hit or miss this goal — no team, no external deadline pressure.
- ✅ **Trust the number:** His own monthly spot-check against the running total is the sole validation loop for this goal.

**Self-Review:**
- Persona Depth: ✅ — psychological (autonomy, impatience-with-friction, quiet personal stake), not demographic
- Usage Context Clarity: ✅ — usage goals (fast logging, trustworthy glance) kept distinct from life goals (general financial health)
- Focused Scope: ✅ — exactly 1 group, explicitly justified against the brief rather than defaulted to
- Business Goal Connection: ✅ — every goal traces to this one persona's own behavior, made explicit
- Common Mistakes Avoided: ✅ no demographic shorthand, ✅ no solutions embedded in the persona, ✅ negative and positive internal states both represented

**Quality Score (this step): 9/10** — strong psychological depth and direct goal tracing; not 10 because with only one persona there's no cross-persona prioritization tension to demonstrate (inherent to the audience-of-one scope, not a gap in execution).

**Status:** Meets excellence threshold. Proceeding to Suggest Mode checkpoint.

### Driving Forces — Iteration 1

**Research conducted:**
- WebSearch: "psychological benefits of tracking personal spending sense of control awareness insight"
  - Finding: Tracking spending restores a sense of control and reduces financial anxiety; the "feedback effect" (recording a purchase and immediately seeing its impact) is itself motivating and reinforces the habit; awareness/calm replaces initial discomfort.
  - Relevance: Directly informs positive drivers — the running-total feedback loop isn't just a UI feature, it's the psychological mechanism that sustains the habit.
- Reused findings from Business Goals research pass (abandonment via forgetting, distrust of numbers, friction vs. consistency) for negative drivers.

**Generation Plan:**
- WDS Form: 3-5 positive + 3-5 negative drivers, WHAT+WHY+WHEN pattern, equal weight to both
- Project Context: Siddi persona's internal state (background unease, want zero friction/judgment) and Business Goals (habit, ship-on-time, trust-the-number)
- Domain Research: Feedback-effect (positive) + forgetting/distrust/friction (negative) findings from both research passes

**Output:**

## Driving Forces: Siddi the Self-Tracker

**Positive Drivers (✅):**
1. Get a specific, trustworthy number that replaces the vague "I probably spend too much" feeling — turns background unease into calm confidence (checked roughly monthly)
2. Log an expense in a couple of seconds without breaking the flow of whatever he's doing (mid-task, in passing, throughout daily life)
3. See the running total update immediately after each entry — the instant feedback itself reinforces trust and keeps the habit going (right after every log)
4. Own a tool built entirely on his own terms, free to change however he wants, whenever he wants (ongoing, whenever a need arises)
5. Feel the quiet satisfaction of having shipped something real, solo, start to finish, on his own timeline (at launch and when looking back)

**Negative Drivers (❌):**
1. Fear forgetting to log in the moment and quietly sliding into abandonment — the named real risk to this entire product (mid-task, distracted, easy to skip)
2. Distrust a total that "looks wrong" and stop trusting the tool altogether (during the monthly review, the moment a number looks off)
3. Avoid a UI that scolds or moralizes about spending amounts — a large number should be a fact, not a verdict (any time viewing totals or errors)
4. Avoid logging that feels like filling out a form — multi-step entry is friction that kills consistency before accuracy ever matters (every logging attempt)
5. Fear the self-imposed build window slipping into weeks or months with nothing shipped — no external deadline or teammate will catch this but him (during the build itself, not usage)

**Self-Review:**
- Actionable Specificity: ✅ — every force follows WHAT+WHY+WHEN, no generic "wants convenience" language
- Negative Drivers Present: ✅ — 5 negative matching 5 positive, equal depth and specificity
- Strategic Depth: ✅ — forces trace to named research findings (feedback effect, forgetting-driven abandonment, distrust-of-numbers), not assumed
- Common Mistakes Avoided: ✅ no solutions embedded (e.g., doesn't say "add a reminder notification" — that's a feature decision for later), ✅ no vague forces
- Business Goal Connection: ✅ — Drivers 1-3 (positive) and 1-4 (negative) map to Goals 1/3 (habit, trust); Driver 5 (negative) maps to Goal 2 (ship on time)

**Quality Score (this step): 9/10** — strong specificity and research grounding; not 10 because Driver 5 (build-window slippage) is a build-phase force rather than a usage-phase force, slightly mixing timeframes — flagged for user review rather than silently dropped, since it's a real and named risk in the Product Brief.

**Status:** Meets minimum threshold with one flagged judgment call. Proceeding to Suggest Mode checkpoint.

### Driving Forces (Added to Layer 2 — User Confirmed [C], driver #5 kept as-is)
5 positive + 5 negative drivers for Siddi, WHAT+WHY+WHEN pattern, feedback-effect and forgetting/distrust/friction research applied.

---

### Prioritization — Iteration 1

**Generation Plan:**
- WDS Form: Rank goals, rank groups, score + rank driving forces via Feature Impact Analysis (Frequency x Intensity x Fit, 1-5 each, max 15)
- Project Context: All 3 goals, 1 persona, 10 driving forces (5 positive + 5 negative) from prior steps
- Domain Research: N/A for this step (scoring is a judgment method, not a research question)

**Output:**

## Prioritization

### Business Goals Ranked
1. **Build a lasting personal logging habit** (Primary — the actual behavioral bet being tested)
2. **Trust the number** (Prerequisite — habit only survives if the data is believed)
3. **Ship v1 within the self-imposed window** (Prerequisite — gates whether the other two goals get tested at all)

### Target Groups Ranked
Single group, Priority 1: **Siddi the Self-Tracker** — no ranking needed; deliberately the only user.

### Driving Forces — Feature Impact Scoring

| Driving Force | Freq | Intensity | Fit | Total | Priority |
|---|---|---|---|---|---|
| ✅ P2: Log an expense in seconds without breaking flow | 5 | 5 | 5 | 15 | HIGH |
| ❌ N4: Avoid logging that feels like a form | 5 | 5 | 5 | 15 | HIGH |
| ❌ N1: Fear forgetting to log in the moment | 5 | 5 | 4 | 14 | HIGH |
| ✅ P3: See running total update immediately | 5 | 4 | 5 | 14 | HIGH |
| ✅ P1: Get a trustworthy number replacing vague feeling | 3 | 5 | 5 | 13 | MEDIUM |
| ❌ N2: Distrust a number that looks wrong | 3 | 5 | 5 | 13 | MEDIUM |
| ❌ N3: Avoid a UI that scolds about spending | 4 | 4 | 5 | 13 | MEDIUM |
| ✅ P4: Own a tool built on his own terms | 2 | 3 | 4 | 9 | LOW |
| ✅ P5: Quiet satisfaction of shipping solo | 1 | 4 | 3 | 8 | LOW |
| ❌ N5: Fear the build window slipping | 1 | 4 | 2 | 7 | DEPRIORITIZE |

### Strategic Focus

**Priority 1 Goal:** Build a lasting personal logging habit
**Priority 1 User:** Siddi the Self-Tracker (by definition, the only user)
**Priority 1 Drivers (top 4, two tied at 15):**
1. Speed of logging (P2) and absence of form-like friction (N4) — tied highest, both point to the same design imperative: the quick-add box must work in seconds, zero required navigation
2. Fear of forgetting (N1) — the named core abandonment risk; v1's design (always-visible quick-add) mitigates but doesn't fully solve this, worth watching post-launch
3. Immediate running-total feedback (P3) — the mechanism that reinforces the habit loop after each entry

**This combination confirms the Product Brief's own design decisions** (quick-add box, live running total, no mandatory fields) are already pointed at the highest-scoring forces — prioritization here validates rather than redirects the existing product concept.

**Deprioritized:** N5 (build-window slippage) scores lowest (7/15) and is process-risk, not product-design-risk — it can't be addressed by a UI decision, only by Siddi's own discipline during the build. Included for completeness per the earlier flag, but excluded from design-driving priorities.

**Self-Review:**
- Completeness: ✅ goals ranked, groups ranked (trivially), all 10 forces scored
- Actionable Specificity: ✅ scores are defensible individually (see table), not just assigned
- Business Connection: ✅ Strategic Focus explicitly ties back to Goal 1 and validates existing Product Brief decisions rather than inventing new ones
- Common Mistakes Avoided: ✅ clear, defensible priority order — no false ties left unresolved (the P2/N4 tie is explicitly named and both kept since they reinforce the same design imperative)

**Quality Score (this step): 9/10** — full traceability from goals through scored forces to a single clear strategic focus statement.

**Status:** Meets excellence threshold. All 4 steps complete — proceeding to document assembly.

---

## Final Output

**Artifacts:**
- `B-Trigger-Map/00-trigger-map.md` — Hub with Mermaid diagram
- `B-Trigger-Map/01-Business-Goals.md` — Vision + 3 goals / 9 objectives
- `B-Trigger-Map/02-Siddi-the-Self-Tracker.md` — Full persona (only target group)
- `B-Trigger-Map/05-Key-Insights.md` — Strategic implications, design requirements, development phases
- `B-Trigger-Map/06-Feature-Impact.md` — Full 10-force scoring table

**Quality Score (overall): 9/10** — consistent across all 4 steps; every business goal, force, and design implication traces back to Product Brief facts or cited research, nothing invented.

**User Approved:** Confirmed [C] at every checkpoint (Business Goals, Target Groups, Driving Forces — kept flagged item as-is, Prioritization)

**Key Decisions Made:**
- Structural: exactly 1 target group, justified explicitly against the anti-pattern of inventing personas to fill a template
- Structural: dropped flywheel/champion/community language from templates (built for growth products) in favor of personal-project framing matching the actual Product Brief
- Content: kept "fear of build-window slippage" as a driving force despite being a build-phase (not usage-phase) force, since it's a named real risk — deprioritized it in scoring (7/15) rather than silently dropping it
- File structure: followed the numbered hub/goals/persona/insights/impact structure from `dream-up-approach.md` + `quality-checklist.md` rather than the flatter `trigger-map.md` + `personas/` structure named in `workflow.md`'s output table, since the numbered structure is the one with a documented completeness gate and cross-reference rules
