# Reconciliation: PRD vs. Product Brief

**PRD:** `_bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md`
**Source:** `_bmad-output/A-Product-Brief/project-brief.md`
**Date:** 2026-07-03

Overall the PRD is a faithful, well-scoped derivative of the Product Brief — nearly every stated constraint, platform decision, and out-of-scope item in the brief is carried through explicitly (zero-cost budget, .NET Core + Angular stack, responsive web with equal desktop/mobile priority, no offline/PWA, no native features, no monetization, day-14 retention as the primary signal, weekend-scale timeline as secondary signal). The items below are the exceptions.

## Gaps

Things the brief discusses (or treats as important context/scope) that the PRD dropped or omitted.

1. **Founder's personal motivation for the build is dropped.**
   Brief, Vision → Key Insights (line 20): *"Underneath the product goal, there's a personal drive to ship something real, solo, start to finish, in a self-imposed short window."*
   PRD carries the weekend-scale timeline as a build constraint (Goals & Success Signals, Constraints) but omits this framing entirely. Arguably out of scope for a PRD, but it's the stated *reason* the timeline constraint exists and the source treats it as a "key insight," not incidental color.

2. **Deferred future differentiation (trust/tone/relationship layer) isn't carried into Candidate Fast-Follows.**
   Brief, Competitive Landscape → Our Unfair Advantage (lines 81–82): *"Richer differentiation (trust/tone/relationship layer, per the innovation strategy) is intentionally deferred to future iterations, not a gap papered over now."*
   The PRD has a "Candidate Fast-Follows" section (CSV export, reminder mechanism, category customization, offline cash-logging resilience) but does not list this trust/tone/relationship-layer differentiation, even as a non-committed candidate. Since the brief explicitly flags it as deliberately deferred rather than solved, a PRD reader has no trace of it.

3. **Persona detail — "first-time solo product builder" / "sole stakeholder" — dropped from Who This Is For.**
   Brief, Target Users (line 41): *"The founder himself — sole user, sole stakeholder, first-time solo product builder."*
   PRD's "Who This Is For" (Siddi the Self-Tracker) covers spending habits, distrust of automation apps, and fear of forgetting to log, but omits that this is his first solo product build — a detail the brief treats as part of who he is, and which is arguably relevant context for why scope discipline (locked v1 scope, no creep) matters so much.

4. **Rationale for manual entry being an ownership choice, not a technical limitation, is thinned out.**
   Brief, Target Users → Their context (line 43): *"transactions are technically reconstructable after the fact, but manual logging is a deliberate ownership choice, not a technical necessity."*
   PRD's "Who This Is For" states he spends digitally and has ruled out automated trackers, but doesn't carry forward the explicit point that automation was technically *available* and rejected on principle — a nuance that matters if someone later questions why FR-2/Out-of-Scope forecloses automated capture.

5. **"Secondary Users: None" is not explicitly asserted in the PRD.**
   Brief, Target Users (line 51): *"Secondary Users: None."*
   The PRD never states this directly — it's strongly implied throughout (single-user framing, FR-9's "even though the app has exactly one user"), so this is a low-severity gap, but a reader auditing for scope creep (e.g., future household/family use) won't find an explicit PRD statement ruling it out the way the brief does.

## Contradictions

Things the PRD states differently than the source.

1. **Speed bar is softened from "sub-few-second" to "a few seconds."**
   Brief, Success Criteria → Experience Quality (line 70): *"Implicitly covered by the Product Concept — sub-few-second entry via the quick-add box."*
   PRD, Goals & Success Signals (line 22): *"an entry takes a few seconds, start to running-total-updated."* and NFR Speed (line 67): *"should complete in a few seconds."*
   "Sub-few-second" (i.e., under ~1–2 seconds) is a materially tighter bar than "a few seconds" (commonly read as 3–5 seconds). The PRD's experience bar is a real loosening of the brief's stated target, not just a rewording.

2. **Primary success metric is tightened beyond what the brief specifies.**
   Brief, Success Criteria → Primary Metric (line 66): *"Still actively logging expenses at day 14 post-launch — the exact threshold named as the make-or-break signal."*
   PRD, Goals & Success Signals (line 20): *"still logging expenses at day 14 post-launch, **with no missed-week gap in month 1**."*
   The PRD adds a "no missed-week gap in month 1" clause that isn't in the brief's definition of the primary signal. This isn't necessarily wrong, but it changes the bar for what counts as success beyond what the source document defined — worth confirming this tightening was an intentional decision made during PRD drafting rather than an unreviewed addition.

3. **Brief's specific "genuine discipline, not avoidance" framing for a timeline slip is generalized away.**
   Brief, Success Criteria → Secondary Metric (line 68): *"If this slips into weeks/months, the 'genuine discipline, not avoidance' verdict on bare-v1-first sequencing should be revisited, not assumed to still hold."*
   PRD, Goals & Success Signals (line 21): *"A slip into weeks/months is itself a signal worth reflecting on, separate from the product's merits."*
   Low-severity rewording, but the PRD drops the specific evaluative claim being tested (whether locking v1 scope was genuine discipline vs. avoidance) in favor of a vaguer "signal worth reflecting on." The substance is preserved loosely but the precise claim from the brief is lost.
