---
title: Reconcile PRD vs UX Scenarios
created: 2026-07-03
---

# Reconcile: PRD vs UX Scenarios

Comparing `prd.md` against:
- `00-ux-scenarios.md` (scenario index / page coverage matrix)
- `01-siddi-logs-an-expense/01-siddi-logs-an-expense.md`
- `02-siddi-reviews-the-month/02-siddi-reviews-the-month.md`

## Gaps

Things the source scenarios discuss (especially as a stated fear/risk or v1-relevant driving force) that the PRD dropped or softened.

### 1. Scenario 02's unaddressed fear ("distrusting a number that looks wrong") is not carried into the PRD's Open Risks — unlike the parallel fear from Scenario 01

- **Source:** `01-siddi-logs-an-expense.md`, Trigger Map Connections: `❌ Fear: Forgetting to log in the moment`
- **Source:** `02-siddi-reviews-the-month.md`, Trigger Map Connections: `❌ Fear: Distrusting a number that looks wrong` (also stated as Q4 Worry: *"A total looks off and he can't tell if it's a bug or he really spent that much."*)

Both scenarios use the same `❌` convention to flag a driving force the scenario/design does **not** resolve. The PRD correctly promotes the Scenario 01 fear into `## Open Risks` ("Fear of forgetting to log has no v1 mitigation"). It does **not** do the same for the Scenario 02 fear — there is no Open Risk entry anywhere in the PRD about the "can't tell if it's a bug or a real number" worry. This is an asymmetric drop: one explicitly-unaddressed fear made it into the PRD's risk register, the other, structurally identical one, didn't.

### 2. No mitigation or acknowledgment of "distrusting a number" fear anywhere in the feature set

- **Source:** `02-siddi-reviews-the-month.md`, Q4 Worry: *"A total looks off and he can't tell if it's a bug or he really spent that much."*
- **PRD:** FR-8 (Monthly Category Breakdown) explicitly states totals are shown with **"no drill-down required to see the top-level numbers,"** and `## Out of Scope (v1)` excludes "Charts, trends, or visualizations beyond the plain per-category sums in FR-8." Between these two constraints, the PRD gives Siddi no way to investigate *why* a category total looks off (e.g., seeing which entries composed it) from the Breakdown view itself. The PRD's NFR "Accuracy" section addresses the underlying cause (totals must be exact) but not the user-facing worry of being unable to verify a suspicious number in the moment.
- This compounds gap #1: the fear is real per the source, has no design answer in the PRD, and isn't even flagged as an open risk to watch.

### 3. Scenario 01's specific worry — silent data loss from mid-entry interruption — is narrower than how the PRD frames the "forgetting to log" risk

- **Source:** `01-siddi-logs-an-expense.md`, Q4 Worry: *"He gets distracted before finishing and it silently never gets logged."* This describes a distinct failure mode: Siddi has already opened the app and started entering data, gets interrupted mid-task, and the entry is silently lost — not simply "never opened the app."
- **PRD:** `## Open Risks` frames the unmitigated fear only as: *"nothing addresses him not opening it [the app] in the first place."* This is narrower than the source — it covers "never opened the app" but not "opened the app, started logging, got interrupted, entry silently disappears." No FR addresses draft persistence, recovery of a partially-entered amount/category, or any signal that an in-progress entry wasn't saved. The PRD's framing of this risk is a softened/incomplete version of the source's stated worry.

### 4. (Minor) FR-8 doesn't carry forward the "Immediate Reflection" objective as explicitly as FR-7 does for the Home total

- **Source:** `02-siddi-reviews-the-month.md`, Q2 Business Goal: Objective 1 — **"Exact, Immediate Reflection."**
- **PRD:** FR-7 explicitly requires the Home running total to update "immediately on every entry, edit, or delete — no refresh or separate 'view report' step." FR-8 (Monthly Category Breakdown), by contrast, only specifies "exact sums" with no equivalent explicit statement that the breakdown reflects the latest data immediately/without a refresh step. Likely implied given no caching/analytics infrastructure exists in v1, but it's not stated the way FR-7 states it — a minor asymmetry in explicitness rather than a hard omission.

## Contradictions

No direct contradictions found — nothing in the PRD states a fact, requirement, or outcome that actively conflicts with what the three source documents say. The device-priority framing (Scenario 01 calls mobile the "natural context" for logging while still saying desktop is "equally supported"; Scenario 02 states "equal priority" outright) is consistent enough in aggregate with PRD FR-11's "equal priority, not mobile-first" — this is a framing nuance, not a contradiction, and is noted here only for completeness.
