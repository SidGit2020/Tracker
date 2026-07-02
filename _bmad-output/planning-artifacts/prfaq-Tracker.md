---
title: "PRFAQ: Tracker"
status: "complete"
created: "2026-07-02"
updated: "2026-07-02"
stage: 5
inputs:
  - "_bmad-output/forge/tracker-v1-scope/forged-idea.md"
  - "_bmad-output/innovation-strategy-2026-07-02.md"
  - "_bmad-output/design-thinking-2026-07-01.md"
  - "_bmad-output/planning-artifacts/research/market-expense-tracking-apps-market-in-india-research-2026-07-02.md"
  - "_bmad-output/planning-artifacts/research/domain-behavioral-finance-and-gamification-in-personal-expense-tracking-apps-research-2026-07-02.md"
  - "_bmad-output/planning-artifacts/research/technical-ai-coach-llm-net-integration-patterns-for-tracker-research-2026-07-02.md"
  - "_bmad-output/brainstorming/brainstorm-personal-tracker-app-2026-06-30/brainstorm-intent.md"
  - "web research: 2026 competitive/privacy landscape for manual expense trackers (session-only, not persisted as a file)"
---

# Tracker: A Straight Answer to Where Your Money Went This Month

## For anyone who's downloaded a budgeting app, hit the permissions screen, and never opened it again.

**India** — Today, Tracker launches — a web app built around one question: *where did my money go this month?* It's for anyone who wants a straight financial picture without linking a bank account, granting SMS-read access, or working through an onboarding flow before logging a single expense.

Every month, it's the same feeling: a bank balance lower than expected, and no memory of where it went. Not one regretted purchase — just an accumulation of small things nobody tracks. The usual fix is a budgeting app, but the price of entry is steep: link your bank, hand over permission to read every text message on your phone, then wade through category setup before logging anything real. Most people quit at the permission screen — that's where trust breaks, before the app has proven anything.

Tracker skips all of that. Log what you spent and pick from a short list of categories — done in seconds. No account linking, no permission requests, no investment pitch waiting on the other side. Just a running, honest total of your own spending, by category, kept by you.

> "I didn't want another dashboard promising to manage my money for me. I wanted to actually see it — without agreeing to a wall of permissions first. This is the smallest version of that idea that still tells you something true."
> — SIDDI, creator of Tracker

### How It Works

1. Open Tracker, log an expense — amount, one category from a short fixed list. A few seconds.
2. Repeat whenever you spend — a coffee, rent, a subscription, cash handed to someone. Recurring bills get logged like anything else; nothing to set up in advance.
3. Your running total for the current month updates with every entry — you're not waiting weeks for a payoff.
4. At month's end, the total per category is locked in: one honest number for each, no dashboard to interpret.

> "I've abandoned three budgeting apps at the permissions screen. This one just let me start typing. Turns out rent and eating out are basically tied for my biggest category — I didn't know that before."
> — early user

### Getting Started

Tracker is a web app — open it in a browser, log in, and log your first expense in under a minute. No download, no setup beyond that.

---

## Customer FAQ

### Q: I've abandoned every tracker I've tried after missing a few days of logging — the data feels useless after that, so what's the point of continuing. What's different here?

A: Honestly — nothing structurally fixes this yet. If you miss days, you can add expenses from memory once you're back; there's no streak to lose, no red overspend banner, no penalty, because v1 deliberately has none of that gamification or judgment machinery. Whether plain neutrality is enough to bring someone back after a lapse is untested. Our own research says this exact moment — the first missed day — is the single biggest reason trackers like this get abandoned. This is the biggest open risk this concept carries, not a solved problem. v1 exists partly to find out whether it's survivable at all.

### Q: Manual-entry trackers like Monefy, Goodbudget, Finny, and Koody already exist — why would I use this instead?

A: Nothing functionally, today. The only argument right now is that it's built and used daily by someone who lives in the friction and can iterate on it fast — that's a trust claim, not a feature claim, and it hasn't been earned yet. If that's not compelling on its own, there's no reason to switch from what you already use.

### Q: If I have to type every expense myself, isn't this just a spreadsheet with extra steps?

A: Largely, yes. The real value-add is a fixed category taxonomy and an always-current monthly total, so you're not writing your own formulas. That's a real but modest convenience — not a transformation.

### Q: What happens to my data — could it ever be sold or shared?

A: No. There's no monetization in v1, so there's no revenue model creating pressure to monetize your data.

### Q: This is a solo-built project. What happens to my expense history if you stop maintaining it?

A: No guarantee today. A CSV export is planned as a near-term fast-follow specifically so your data isn't trapped if that happens — but it isn't available at launch.

### Q: What does it cost, and will it start charging me later?

A: Free. No monetization has been decided for v1, and none is planned before a much later stage.

### Q: The category list is fixed — what if my spending doesn't fit any of the categories?

A: The fixed list is meant to already cover what matters for most spending, without a generic catch-all bucket to fall back on. If in practice a lot of spending doesn't fit, that's a signal the category list itself is wrong — worth revisiting the list, not adding category management to work around it.

### Q: Can I export my data, or is it locked into the app?

A: Not at launch. Export is a near-term fast-follow — it's the same fix as the continuity question above, and it's prioritized because it answers both.

### Q: What about shared expenses — splitting a bill with a roommate or partner?

A: Not supported. v1 is single-user, single-perspective — log only your own share manually.

### Q: It's a web app — what if I want to log a cash expense somewhere with no signal?

A: Not guaranteed at launch. Log it from memory once you're back online. A more resilient offline mode is a candidate for later, but it isn't solved now — and it's connected to the same abandonment risk as the guilt question above, since a delayed entry is one more thing that can get forgotten.

---

## Internal FAQ

### Q: Your own innovation strategy names "infinite polish over running out of runway" as the top structural risk for a solo, untimed project. Is "ship the bare version first" genuine validation discipline — or a comfortable way to defer the harder, scarier work (voice, tone) indefinitely?

A: Genuine validation discipline, not avoidance — and I'll defend that under scrutiny. The sequencing logic holds on its own terms: the trust/tone layer has no audience to build trust *with* yet, since v1 is solo-use. A builder who can't sustain the basic logging habit for two weeks has no business investing in a persona layer for users who don't exist yet. This is a deliberate, defensible bet, not a comfortable stall.

### Q: What's the hardest technical problem in this bare v1?

A: There isn't one. This is a CRUD web app — auth, an entry form, categorized sums — on a stack already confirmed (.NET Core + Angular). If this hasn't shipped yet, that's not a skills gap, it's a time/priority question. The thing gating the entire Phase 1 retention hypothesis is not technically hard.

### Q: The actual moat, per your own innovation strategy, is trust/tone — and bare v1 has none of it. Why build this occupied-niche version at all instead of skipping straight to the version that carries the moat?

A: Because the trust/tone layer has no one to build trust *with* yet — v1 is solo-use, per `forged-idea.md`'s own locked rationale. Testing the moat meaningfully requires other users, which requires first proving the habit is sustainable at all. It's a sequencing bet, not a feature gap.

### Q: What's the realistic timeline for you, solo, to ship this — and what does it cost you in the meantime?

A: Days — a weekend-scale build. No hard technical unknowns, stack already settled. The cost: everything else waits — Horizon 1 (voice, tone, gamification), automated capture, and any monetization work — until this ships and the retention hypothesis gets tested on real (even if n=1) use.

### Q: What kills this concept?

A: Two failure modes, not one: (a) even the founder can't sustain logging past two weeks — the guilt/abandonment risk applies at n=1 just as much as at scale; (b) it never gets called "done" and shipped, because no external deadline exists to force it — already named as the top structural risk in the innovation strategy.

### Q: Worst case if you ship this and even you don't keep using it past week 2?

A: Cheap failure, correctly caught early. The Phase 1 retention hypothesis fails at n=1 before any cohort is ever seeded — exactly what a Gate 1 decision point is designed to catch before further effort goes into Horizon 2/3.

### Q: Does sequencing bare-v1-first risk a funded competitor noticing the tone-differentiation opening first?

A: Real but currently small. Nobody outside this project knows the trust/tone thesis exists yet. The risk grows the longer bare v1 sits unshipped, not from the decision to build it first — which argues for shipping fast (days, not weeks), not for skipping the step.

### Q: Any legal or regulatory exposure at this scope?

A: Minimal. No SMS/notification access, no investment advice, no third-party data sharing — the DPDP consent-granularity and Play Store SMS-policy risks flagged in the domain research apply to automated capture, not manual entry, and are out of scope here. The one real obligation: personal financial data, even self-entered, still deserves real authentication and encrypted storage.

---

## The Verdict

**Concept strength:** This PRFAQ is not testing whether Tracker v1 is a great product — it's testing whether it's a great *gate*. Read that way, it's strong. Read as a standalone product pitch to a stranger, it's honest but thin. The distinction matters: the press release openly admits "nothing functionally differentiates this yet" (Customer FAQ, Q1), and that's the correct answer for what this actually is — a disciplined, cheap, days-scale validation step for the Phase 1 retention hypothesis in the innovation strategy, not a market-ready launch. Judged against that real purpose, the thinking held up under real pressure across five stages without collapsing or needing to be walked back.

### Forged in steel

- **Customer/problem framing** — specific, felt, and grounded in independently-corroborated research (permission-screen abandonment, guilt-driven churn), not assumption.
- **Scope discipline** — the locked v1 scope from `forged-idea.md` survived this entire session without erosion. Only two additions surfaced (CSV export, category-list confirmation), both explicitly labeled fast-follow, neither smuggled in as a silent scope change.
- **No feasibility risk** — confirmed under direct questioning: no hard technical problem, stack already settled, days-scale timeline. The bottleneck is shipping discipline, not capability.
- **Minimal legal/regulatory exposure** — correctly scoped out; DPDP and Play Store SMS-policy risks apply only to automated capture, which v1 doesn't touch.
- **Sequencing logic defended, not dodged** — the "why bare v1 before the real moat" question was asked directly and answered under scrutiny, not deflected.
- **Gate 1 correctly framed** — "worst case: even the founder stops using it" was reframed as a cheap, fast, useful failure signal rather than treated as catastrophe. That's mature strategic hygiene, not spin.

### Needs more heat

- **Differentiation is currently a placeholder, not a plan.** "Built and used daily by someone who can iterate fast" is honest but is a trust claim, not yet a real one — it needs to actually be earned through iteration speed, not just asserted. Fine for a personal tool; not yet sufficient if this framing ever gets reused for an external cohort.
- **The "Other" catch-all category was confirmed procedurally, not substantively** — "already assumed to be there" is not the same as a verified, real category list. This needs to be checked against the actual fixed list before build, not carried forward as settled.
- **Export and offline logging are named fast-follows with no committed timeline.** "Soon" is not a plan — these mitigate real, named risks (continuity, forgotten offline entries feeding the guilt spiral) and deserve a concrete target, even a rough one, before they quietly become permanent gaps.

### Cracks in the foundation

- **The guilt/abandonment risk is real, unresolved, and self-acknowledged as the single biggest threat to this concept** — not a minor rough edge. v1's entire justification rests on testing this hypothesis, which means it can't just be shipped and hoped past; it needs deliberate, honest observation (does even the founder keep logging past day 14?) rather than assumed success. This is the one finding that should get direct attention before calling Phase 1 "validated."
- **The self-defended answer to "is this avoidance?" (Q7) is self-reported, not independently verified.** The only real test is execution speed matching the claimed days-scale timeline. If "days" quietly becomes weeks or months, the "genuine discipline" verdict reached in this session should be revisited — the claim was earned in conversation, not yet in practice.

**Bottom line:** Ship it, watch retention honestly at n=1, and don't let the timeline slip past days without noticing. The concept is ready for a PRD as a validation gate — not as a claim that this is a differentiated product yet.

<!-- coaching-notes-stage-1 -->
## Coaching Notes — Stage 1 (Ignition)

**Concept type:** Commercial product (not internal-only) — SIDDI explicitly chose to frame the customer as a generic solo-tracker persona, detached from the innovation strategy's anxious/low-literacy target segment, even though v1's actual first user is the founder alone ("audience of one" per forged-idea.md).

**PRFAQ target clarified:** This PRFAQ stress-tests the *bare v1 logger* from `forged-idea.md` — manual entry only, fixed short category list, monthly per-category totals, no tone/gamification/automation. Explicitly NOT the innovation strategy's Horizon 1 (voice, no-guilt tone, gamification) and NOT the v-final AI-assistant vision. Those remain valid background/future context but are out of scope for this document.

**Customer/problem locked (user confirmed, no changes requested):**
- Customer: someone who wants to know where their money goes but has bounced off trackers that demand automation setup (bank linking, SMS access) before delivering value.
- Problem: no month-to-month picture of spending; financial anxiety stays vague instead of specific and fixable.
- Solution: bare manual logger, .NET Core + Angular web app.

**Key subagent findings that reshape the press release direction:**
1. Manual-entry trackers are an already-validated, already-occupied niche (Pocket Clear, Finny, Koody, Monefy, Goodbudget) — "simple/manual" alone is not a differentiator. None of these competitors have reached mainstream scale against funded incumbents (Walnut, ETMoney) — proves the niche exists, not that it wins.
2. Sharper available hook: zero-permission / zero-data-sharing positioning. A 2026 Incogni audit found 12/20 popular budgeting apps share user data with third parties; SMS-read permissions are repeatedly cited as disproportionate ("every SMS, not just bank alerts"). "We never ask for your bank or your texts" is a cleaner, more ownable claim than "simple."
3. Real self-tension: project's own research (market + domain docs) independently confirms guilt-driven abandonment on the first missed logging day as the single dominant retention risk, explicitly framed as an emotional-design problem — yet locked v1 scope cuts all tone/copy work. This has not yet been resolved; it must be addressed head-on in Internal FAQ if not solvable in the press release itself.
4. Minor risk flagged: a fixed, non-editable category list could itself become a friction point if a user's real spending doesn't map cleanly onto it.

**Not yet resolved, carry into Stage 2+:** how (or whether) v1's press release addresses the guilt/abandonment risk without violating the "no tone" scope lock; whether the zero-permission angle is strong enough to anchor the headline given the product is manual-entry by necessity rather than by privacy-first design intent (the locked scope's rationale was audience-of-one, not privacy positioning) — this may need to be surfaced as a reframe question, not assumed.

<!-- coaching-notes-stage-2 -->
## Coaching Notes — Stage 2 (Press Release)

**Rejected headline framings:**
1. *"An Expense Log That Never Asks to See Your Bank or Your Texts"* — rejected for leading with a negative/absence claim instead of the customer's actual outcome; also collides directly with Pocket Clear's existing positioning.
2. *"See Exactly Where Your Money Goes — Without Linking a Single Account"* — rejected because "exactly" overclaims precision v1 doesn't deliver (monthly category totals, not itemized/real-time detail); would not survive customer FAQ scrutiny.
3. *"Know Where Your Money Went This Month — No Bank Login, No Setup, No Catch"* — closer, but still a feature-stack headline built around the unresolved zero-permission-as-intentional-differentiator question.

**Explicit decision (user confirmed):** the zero-permission angle is real but was a side effect of building bare-bones for a solo user, not an intentional privacy-first design choice. Decision: don't lead the press release with it — center the headline/subheadline on the actual outcome (knowing where money went, avoiding setup/permission friction as lived experience) rather than claiming a privacy mission the founder didn't actually set out to build. This avoids the honesty violation of the Quality Bars.

**Differentiators explored but not used as the primary hook:** "simple/manual entry" (already occupied by Pocket Clear, Finny, Koody, Monefy, Goodbudget — not novel); explicit "privacy-first" branding (would overclaim founder intent).

**Known, deliberately unresolved gap carried forward:** the press release does NOT address the guilt/abandonment-on-first-missed-day retention risk that the project's own market and domain research independently flagged as the single dominant churn driver for this category. User explicitly decided (this stage) not to solve it structurally or tonally within the press release — it will be owned directly and honestly in the Internal FAQ (Stage 4) rather than papered over in customer-facing copy. This is a live risk to the concept's viability, not a cosmetic gap — the Verdict stage should weigh it accordingly.

**Getting Started note:** the running-current-month-total mechanic (item 3 in How It Works) was added during drafting specifically to avoid re-introducing the "zero payoff for weeks" problem forged-idea.md already flagged and rejected — v1 shows value continuously, not just at month-end. This is a small addition beyond forged-idea.md's exact wording ("monthly total per category") and should be confirmed against actual locked scope before implementation — it's a UX interpretation, not a scope change, but worth flagging explicitly.

**Out-of-scope items mentioned but not pursued here:** vernacular/regional language support, Account Aggregator integration, gamification — all correctly deferred per the locked v1 scope and innovation strategy's Horizon 2/3 sequencing.

<!-- coaching-notes-stage-3 -->
## Coaching Notes — Stage 3 (Customer FAQ)

**Gaps revealed and triaged:**
- **Fixed category list has no catch-all** — user confirmed this is *already assumed* covered by the fixed list design (no scope change), not a deliberate no-catch-all-by-design decision. Flagged for confirmation against the actual category list once defined in build — if real-world spending doesn't map cleanly, treat as a signal to revise the list, not to add category management.
- **No data export / no continuity plan** — real gap, triaged as **fast-follow** (not launch blocker, not silently accepted). CSV export directly answers both the "what if you stop maintaining this" and "am I locked in" objections; low implementation cost, doesn't violate "manual entry only" scope since it's data portability, not automated capture.
- **No offline logging guarantee** — triaged as **accepted trade-off for v1**, flagged as connected to the guilt/abandonment risk (a forgotten offline entry is one more thing that erodes the running record) and as a fast-follow candidate alongside export.
- **Guilt/abandonment risk (the hard question)** — triaged as **not a launch blocker**, because testing exactly this hypothesis is the explicit purpose of shipping v1 per the innovation strategy's Phase 1 retention gate. Answer locked as user-confirmed: honest, unresolved, explicitly named as the single biggest risk the concept carries. This must carry into the Verdict stage as a real risk, not be softened.

**Competitive intelligence surfaced:** Q1's honest answer ("nothing functionally differentiates this yet") confirms Stage 1/2's finding that manual-entry-only is an occupied niche — the FAQ makes this explicit to the customer rather than hiding it, consistent with the Quality Bar against overselling.

**Scope/requirements signals for downstream PRD:** CSV export and an "Other" catch-all category (if the fixed list proves insufficient) are both candidate fast-follow items worth carrying into `bmad-spec`/`bmad-prd` alongside the locked v1 scope — neither contradicts forged-idea.md's cuts, both mitigate concrete risks surfaced here.

<!-- coaching-notes-stage-4 -->
## Coaching Notes — Stage 4 (Internal FAQ)

**Feasibility risk identified:** None, technically. The panel's own conclusion (user-confirmed) is that v1 has no hard technical problem — it's a CRUD app on an already-settled stack. This reframes the real bottleneck as prioritization/shipping discipline, not capability, which sharpens Q7's stakes: if it's this cheap to build, there's less excuse for it to stay unshipped.

**Resource/timeline estimate:** User-confirmed — days, weekend-scale build. Trade-off named explicitly: everything else (Horizon 1 voice/tone/gamification, automated capture, monetization) waits until this ships and the retention hypothesis is tested, even at n=1.

**The avoided question, resolved (not dodged):** User was asked directly whether "bare v1 first" is genuine discipline or comfortable avoidance of the harder tone/voice work, given the innovation strategy's own top-named structural risk (infinite polish, no forcing deadline). User's answer: genuine discipline, defended directly — the sequencing logic (no audience to build trust with yet) holds under scrutiny. This is a self-assessed, not externally verified, conclusion — worth the Verdict stage treating it as confirmed-by-founder rather than independently proven, since only shipping (not more analysis) can actually test it.

**Strategic positioning confirmed:** v1's purpose is explicitly to test the Phase 1 retention hypothesis from the innovation strategy at n=1 (the founder) before any external cohort is seeded — this session reframed "worst case: even you stop using it" from a failure into a correctly-functioning Gate 1, not a catastrophe.

**Technical/legal constraints surfaced:** No meaningful regulatory exposure at this scope (DPDP/Play Store SMS-policy risks apply only to automated capture, which is out of v1 scope). One concrete, non-optional requirement carried into build: real authentication and encrypted storage for personal financial data, even at solo/n=1 scale — not previously stated explicitly in forged-idea.md and worth carrying into the PRD/spec.

**Competitive-response risk reframed:** sequencing bare-v1-first doesn't meaningfully increase competitive exposure while the trust/tone thesis remains unpublished — but it strengthens the case for shipping in days rather than weeks, since the risk grows with time-unshipped, not with the sequencing choice itself.
