---
title: "Reconciliation: PRD vs PRFAQ (Tracker)"
created: "2026-07-03"
purpose: "Compare prd.md against prfaq-Tracker.md / prfaq-Tracker-distillate.md to surface gaps and contradictions before build."
---

# Reconciliation: Tracker PRD vs Tracker PRFAQ

Source documents compared:
- `c:\Tracker\_bmad-output\planning-artifacts\prfaq-Tracker.md`
- `c:\Tracker\_bmad-output\planning-artifacts\prfaq-Tracker-distillate.md`

Target: `c:\Tracker\_bmad-output\planning-artifacts\prds\prd-Tracker-2026-07-03\prd.md`

Overall: the PRD is a faithful, well-scoped translation of the PRFAQ's locked v1 scope, out-of-scope list, and the guilt/abandonment risk (which is carried forward almost verbatim into the day-14 success signal and Open Risks). The items below are the specific places where the PRD drops, softens, or diverges from something the PRFAQ stated explicitly.

## Gaps

**1. Backdating/late entry vs. month attribution — the PRFAQ's own mitigation for missed days isn't operationalized in the PRD.**
- Source: Customer FAQ, Q1 — "If you miss days, you can add expenses from memory once you're back; there's no streak to lose... " This is the PRFAQ's explicit (if partial) answer to the guilt/abandonment risk: recovery works by logging late, from memory.
- PRD: FR-1–FR-7 describe a quick-add box (amount + category) with no date field; FR-4 says the entry list shows "amount, category, and implicitly when logged" — i.e., entries appear to be timestamped only at the moment of logging, with no way to attribute an expense to the day it actually happened. Combined with FR-7/FR-8's month-based totals and the NFR-2 accuracy bar ("no estimation, no rounding... a number that looks even slightly wrong breaks the trust the whole loop depends on"), a late entry logged just after a month boundary would silently land in the wrong month's total — undermining exactly the trust guarantee the PRD names as load-bearing. The PRD neither confirms nor rules out a date-of-expense field; this is an unaddressed gap, not a stated decision.

**2. Recurring bills / "no recurrence engine" — explicit locked scope, not carried into the PRD.**
- Source: PRFAQ press release, "How It Works" step 2 — "Recurring bills get logged like anything else; nothing to set up in advance." Distillate's locked-scope IN list states this explicitly: "recurring bills logged as normal entries (no recurrence engine)."
- PRD: no mention of recurring bills anywhere, in Features or Out of Scope. It's arguably implied by the absence of any recurrence feature in FR-1–FR-11 and by "Automated capture" being out of scope, but the PRFAQ called this out as its own locked-scope line item (distinct from automated capture), and the PRD doesn't carry it forward even as a one-line clarification for implementers who might otherwise wonder if recurring bills need special handling.

**3. Fast-follow items lack the timeline commitment the PRFAQ's own Verdict asked for.**
- Source: PRFAQ Verdict, "Needs more heat" — "Export and offline logging are named fast-follows with no committed timeline. 'Soon' is not a plan — these... deserve a concrete target, even a rough one, before they quietly become permanent gaps."
- PRD: "Candidate Fast-Follows" section is headed "not committed, no timeline" and doesn't attempt even a rough target, nor does it acknowledge that the source explicitly flagged this absence as a risk. The PRD silently inherits the gap the PRFAQ named rather than resolving or explicitly re-deferring it.

**4. FR-7 (live running total) doesn't carry the same "confirm before build" flag that FR-2 (categories) got, despite equivalent provenance.**
- Source: PRFAQ Coaching Notes — Stage 2 — "the running-current-month-total mechanic... was added during drafting... This is a small addition beyond forged-idea.md's exact wording ('monthly total per category') and should be confirmed against actual locked scope before implementation — it's a UX interpretation, not a scope change, but worth flagging explicitly." Distillate repeats this: "confirm before build."
- PRD: FR-7 states the live running total as a settled requirement with no `[ASSUMPTION]`-style caveat, even though FR-2 (categories) — which has a comparably informal provenance — does get flagged and hedged ("Confirm before build"). The PRD is inconsistent in which unconfirmed-but-adopted PRFAQ interpretations it flags.

**5. Verdict findings about differentiation and the self-reported "genuine discipline" conclusion aren't carried into Open Risks, unlike the other two Verdict risks.**
- Source: PRFAQ Verdict — "Needs more heat" #1 ("Differentiation is currently a placeholder, not a plan") and "Cracks in the foundation" #2 ("The self-defended answer to 'is this avoidance?' (Q7) is self-reported, not independently verified... If 'days' quietly becomes weeks or months, the 'genuine discipline' verdict... should be revisited").
- PRD: Open Risks carries forward the guilt/abandonment risk and the category-list assumption (the other two Verdict "Cracks"/"Needs more heat" items) almost verbatim, but omits these two. Not necessarily wrong for a PRD to leave out (they're more strategic/positioning risks than build risks), but it's a selective, unexplained subset of the source's named risks.

## Contradictions

**1. FR-2's assumed "Other" category directly conflicts with the PRFAQ's stated no-catch-all design intent.**
- Source: Customer FAQ, "The category list is fixed — what if my spending doesn't fit any of the categories?" — "The fixed list is meant to already cover what matters for most spending, **without a generic catch-all bucket to fall back on**. If in practice a lot of spending doesn't fit, that's a signal the category list itself is wrong — worth revisiting the list, not adding category management."
- PRD: FR-2's `[ASSUMPTION]` category set is "Food, Transport, Shopping, **Other**" — sourced from the built UX prototype's demo data. "Other" is, functionally, exactly the generic catch-all bucket the PRFAQ says the design explicitly avoids. The PRD's own caveat ("the PRFAQ flagged the category list as unverified") doesn't mention this specific tension — it treats the list as merely unconfirmed, not as potentially contradicting a stated design principle from the source. Worth flagging explicitly before the prototype's demo-data list is adopted as-is.

**2. Timeline: PRD's "Flexible" framing softens a timeline the PRFAQ treats as load-bearing.**
- Source: Internal FAQ, Q4 and Q7 — the "days, weekend-scale" estimate is the explicit load-bearing assumption behind the Stage-4 verdict that "ship bare v1 first" is genuine discipline and not avoidance of harder tone/voice work: "If actual build time slips to weeks/months, that verdict should be revisited, not assumed to still hold" (Verdict, "Cracks in the foundation" #2; distillate open-question #3 repeats this near-verbatim).
- PRD: Constraints section states "**Timeline:** weekend-scale build window. **Flexible**, but a slip is itself a signal (see Goals & Success Signals)." Calling the timeline "flexible" downgrades what the source frames as a near-non-negotiable, verdict-determining assumption to a soft, retrospective signal. The PRD's Goals & Success Signals section does partially preserve the spirit ("a slip into weeks/months is itself a signal worth reflecting on"), but the Constraints section's "Flexible" label reads as materially softer than the source's framing, which ties a slip directly to revisiting whether the whole sequencing decision was sound.
