---
title: "PRFAQ Distillate: Tracker"
type: llm-distillate
source: "prfaq-Tracker.md"
created: "2026-07-02"
purpose: "Token-efficient context for downstream PRD creation"
---

## Scope: locked (from forged-idea.md, unmodified by this PRFAQ)

- IN: manual expense entry only; fixed short predefined category list; recurring bills logged as normal entries (no recurrence engine); monthly total per category (plain sums); running current-month total that updates live per entry (added during press-release drafting — UX interpretation, not in forged-idea.md's literal wording, confirm before build); free, no monetization.
- OUT of v1: SMS/UPI/email/voice capture; category management UI; charts/trends; gamification (streaks/badges); friend-voice/tone/personality; investment/retirement advice; shared/multi-user expenses.
- Platform: web app, .NET Core backend + Angular frontend (carried over from 2026-07-01 design thinking, reconfirmed here).

## Scope signals surfaced during this PRFAQ (candidate fast-follows, not yet in locked scope)

- **CSV export** — mitigates both "no continuity plan if solo maintainer stops" and "data locked in app" objections. Low implementation cost, doesn't violate manual-entry-only scope (data portability, not automated capture). Recommend prioritizing early post-launch; no committed timeline yet — flagged in Verdict as needing one.
- **"Other" catch-all category** — assumed already covered by the fixed category list, but not verified against an actual defined list (the list itself doesn't appear to be enumerated anywhere yet). Needs confirmation before build; if real spending doesn't map cleanly, treat as a signal to revise the category list, not to add category management.
- **Offline cash-logging resilience** — not guaranteed at launch (web app assumes connectivity); named as connected to the guilt/abandonment risk since a forgotten offline entry compounds the same churn pattern. Candidate fast-follow, not committed.
- **Real authentication + encrypted storage** — not explicitly stated in forged-idea.md but confirmed as a non-negotiable requirement even at solo/n=1 scale during Internal FAQ. Carry into PRD as an explicit requirement.

## Customer and problem (as validated this session)

- Customer: someone who wants to know where their money goes but has bounced off trackers that demand automation setup (bank linking, SMS/notification access) before delivering value. Deliberately framed as a **generic solo-tracker persona**, decoupled from the innovation strategy's anxious/low-financial-literacy target segment — a deliberate choice made in Stage 1, not an oversight.
- Problem: no month-to-month picture of spending; financial anxiety stays vague instead of specific and fixable.
- v1's actual first (and only, for now) user is the founder — "audience of one" per forged-idea.md.

## Rejected framings and why

- **Headline: "never asks to see your bank or your texts"** — rejected for negative/absence framing and for colliding directly with an existing competitor (Pocket Clear) that already owns this exact claim.
- **Headline: "see exactly where your money goes"** — rejected; "exactly" overclaims precision v1 doesn't deliver (monthly category totals, not itemized/real-time detail).
- **Privacy-first branding as the primary hook** — explicitly rejected by the user. The zero-permission property is real but is a side effect of building bare-bones for one user, not an intentional privacy-first design choice. Claiming it as a mission would overclaim founder intent and violate the "honest framing" quality bar. Zero-permission remains true and can be mentioned as supporting detail, just not as the headline pillar.
- **"Simple/manual entry" as the core differentiator** — rejected as a primary claim; it's an already-occupied, already-proven niche (see competitive intelligence below), not novel.

## Competitive intelligence

- Manual-entry-only trackers already exist and market this as their core value prop, not a fallback: Pocket Clear, Finny, Koody, Monefy, Goodbudget. None have reached mainstream scale against funded incumbents (Walnut/Axio, ETMoney, MoneyView, bank-native apps) — validates the niche exists, does not validate it wins.
- Automation-heavy competitors (Walnut, ETMoney, Money Manager, Spendee, bank apps) require bank linking or broad SMS/notification permissions before delivering value — repeatedly cited (2026 sources) as a trust-breaking ask, not minor friction. Average budgeting app requests ~11 device permissions.
- 2026 privacy audit (Incogni): 12 of 20 popular budgeting apps share user data with third parties; data-sharing apps collect ~2x the data points of non-sharing apps.
- Industry retention benchmark: ~26% day-1 retention, ~4.5% day-30 retention for finance apps generally — the bar any tracker, including bare v1, is implicitly measured against.
- Mainstream market direction (CNBC, NerdWallet, Forbes, 2026) is toward MORE automation/AI (auto-categorization, forecasting, predictive dashboards) — minimal/manual apps are a counter-trend, not the dominant trajectory.
- No competitor across either tier explicitly owns a non-shaming "friend"/no-guilt emotional register — that whitespace remains open, but is explicitly out of scope for v1 and belongs to the innovation strategy's later Horizons.

## Open questions and unresolved risks (from Internal FAQ + Verdict — carry forward, don't silently resolve)

1. **Guilt/abandonment risk — the single biggest named threat to the concept.** Independently confirmed across market and domain research as the dominant retention killer for this category; v1 has no tonal or structural fix for it (deliberately, per locked scope). The honest, user-confirmed position: untested, unresolved, and the primary thing v1's launch is meant to validate. Do not treat as solved by shipping — needs deliberate, honest post-launch observation (does even the founder log past day 14?).
2. Real differentiation beyond "built and used daily by someone who can iterate fast" does not yet exist. Acceptable for a personal tool; will need resolution before any external cohort is seeded (Phase 1 of the innovation strategy).
3. The claimed "days, weekend-scale" build timeline is the load-bearing assumption behind the Stage 4 "genuine discipline, not avoidance" verdict on why bare-v1-first is the right sequencing call. If actual build time slips to weeks/months, that verdict should be revisited, not assumed to still hold.
4. Whether the fixed category list is actually sufficient (has an implicit/explicit catch-all, covers real spending patterns) is unverified — the list itself doesn't appear enumerated in any existing document.

## Resource and timeline estimates

- Solo builder, .NET Core + Angular, stack already settled.
- No hard technical unknowns identified under direct internal-FAQ questioning.
- User-confirmed estimate: **days** (weekend-scale build) to a usable v1.
- Trade-off named explicitly: all other work (Horizon 1 voice/tone/gamification, automated capture, monetization) waits until v1 ships and the retention hypothesis is tested, even at n=1.

## Strategic context (from innovation-strategy-2026-07-02.md, for downstream reference — not re-litigated in this PRFAQ)

- v1's purpose is to pass **Gate 1** of the innovation strategy's Phase 1: validate retention/segment-fit before any Horizon 2/3 investment (Account Aggregator integration, vernacular voice, trust-milestone monetization).
- The confirmed strategic thesis: expense tracking is the wedge; the trust/relationship layer (friend-voice, no-guilt tone, compounding behavioral data) is the intended moat — but that moat is explicitly NOT part of this v1 PRFAQ's scope.
- Top named structural risk in the broader strategy: a solo, untimed project dying of infinite polish rather than running out of runway. This PRFAQ's Stage 4 exchange directly tested whether "bare v1 first" is an instance of that risk (self-defended as genuine discipline; unverified until actually shipped in the claimed days-scale window).

## Verdict summary

- **Forged in steel:** customer/problem framing, scope discipline (no silent creep), feasibility (no technical risk), minimal legal exposure, defended sequencing logic, correctly-framed Gate 1 failure mode.
- **Needs more heat:** differentiation is a placeholder not a plan; catch-all category confirmed procedurally not substantively; export/offline fast-follows lack committed timelines.
- **Cracks in the foundation:** guilt/abandonment risk unresolved and self-acknowledged as the top threat; the "genuine discipline not avoidance" verdict is self-reported and contingent on actually shipping in days, not weeks/months.
- **Bottom line:** Ready for a PRD as a validation gate, not as a claim of present-day product differentiation.
