---
title: PRD Reconciliation — Trigger Map (B-Trigger-Map)
created: 2026-07-03
status: draft
---

# Reconciliation: prd.md vs B-Trigger-Map sources

Comparing `prd-Tracker-2026-07-03/prd.md` against:
- `00-trigger-map.md`
- `01-Business-Goals.md`
- `02-Siddi-the-Self-Tracker.md`
- `05-Key-Insights.md`
- `06-Feature-Impact.md`

Overall: the PRD is a tight, faithful downstream artifact of the Trigger Map. The three ranked business goals, the single persona, the "Must Address" forces, and the locked/deferred scope split all carry through cleanly. Findings below are the exceptions.

---

## Contradictions

### C-1: "No login wall" vs. PRD's mandatory authentication (FR-9)

**Source:** `05-Key-Insights.md`, "Design Implications" section:
> **Home Screen / Quick-Add Must:**
> - Be the first thing visible on open — **no login wall**, no dashboard to click through first

This sits alongside the "Critical Success Factors" bullet:
> **Zero-step access**: the quick-add box is the home screen, not a feature reached by navigating

**PRD says (FR-9, FR-10):**
> **FR-9 — Single-user auth.** Real authentication is required to use the app — login-gated, not open access. This holds even though the app has exactly one user; it's a non-negotiable given it stores personal financial data.
> **FR-10 — Direct entry point.** The app is bookmarkable/pinnable straight to the Home/Log screen — no landing page or menu funnel between opening the app and logging an expense.

The Trigger Map explicitly names a login wall as something the home screen/quick-add experience must *not* have. The PRD makes real, login-gated authentication a non-negotiable v1 requirement, justified by a security rationale (personal financial data) that appears nowhere in any of the five source documents — this requirement isn't sourced from the Trigger Map at all, and it directly overrides the "no login wall" design implication.

The PRD doesn't reconcile the two: it never clarifies whether FR-9's auth is a one-time/persistent-session gate (which could still satisfy "no login wall" in practice, e.g. after first sign-in the bookmark goes straight to Home) or a login screen encountered on every open (which would flatly contradict "zero-step access" and the explicit "no login wall" instruction, adding exactly the kind of friction the whole Trigger Map is built to eliminate). As written, FR-9 reads as a hard requirement with no such carve-out, and FR-10's "no landing page or menu funnel" claim is only true if auth is excluded from that count — which the PRD doesn't say.

**Recommendation:** Either add an explicit persistent-session/remember-me carve-out to FR-9 so the direct-open promise in FR-10 and the "no login wall" Trigger Map guidance both hold, or acknowledge in the PRD that this is a deliberate, source-diverging decision (security bar added post-Trigger-Map) rather than leaving it as a silent conflict.

---

## Gaps

### G-1: Ongoing monthly spot-check accuracy isn't carried into the PRD's measured success signals

**Source:** `01-Business-Goals.md`, "Trust the Number" Objective 3:
> **Objective 3: Spot-Check Accuracy**
> - **Statement:** Category totals match a manual spot-check
> - **Metric:** Manual verification against logged entries
> - **Target:** Confirmed accurate at each monthly review
> - **Timeline:** Ongoing, checked monthly

`06-Feature-Impact.md` also lists "Category totals that hold up to a manual spot-check" under "Consider (11-13, MEDIUM)" as a scored, load-bearing driving force (13/15).

**PRD says:** The PRD's "Goals & Success Signals" section defines only a Primary signal (day-14 logging continuity) and a Secondary signal (weekend-build ship), plus an Experience bar and a Counter-metric. It does not list an ongoing, monthly, repeated spot-check as a tracked success signal — the only place spot-checking appears is inside the UJ-2 narrative ("he spot-checks one or two against his own memory... zero discrepancy"), which is a journey description, not a signal the founder is committed to checking monthly the way the source document frames it ("Ongoing, checked monthly").

This is a softening rather than a drop: the underlying accuracy requirement is well covered by NFR "Accuracy" (FR-7/FR-8 must be exact), but the source's explicit cadence — checked at *every* monthly review, on an ongoing basis, as one of the three formal objectives under "Trust the Number" — doesn't appear as a recurring success signal in the PRD the way day-14 logging continuity does.

### G-2: "Ownership" and "solo-shipping pride" driving forces are structurally noted but their scoring/rationale isn't carried over

**Source:** `06-Feature-Impact.md` scores two additional forces:
> ✅ Own a tool built on his own terms — 9 (LOW)
> ✅ Feel the satisfaction of shipping solo — 8 (LOW)

with explicit rationale: ownership needs no dedicated feature because it's structural (Siddi built it), and shipping satisfaction is met by launch itself, not a design decision.

**PRD says:** The Overview does capture the ownership point almost verbatim ("he's building this one himself, which is what makes it his — v1 doesn't need a feature for that, it's structural"), but the "shipping solo" satisfaction force and its explicit LOW-priority scoring/rationale don't appear anywhere in the PRD. This is a minor omission — the source itself says these are low-priority and non-feature-driving — but since the PRD otherwise tends to explain *why* things are out of scope, the absence of any nod to "pride in shipping" is a small traceability gap versus `05-Key-Insights.md`'s "Should Address" list, which names it explicitly.

### G-3: The deprioritized build-window-slippage fear isn't labeled as a process (not product) risk

**Source:** `06-Feature-Impact.md`:
> **Deprioritized (<8):**
> - Build-window slippage (7/15) is a process risk, not a product-design risk. No UI or feature can address it — only Siddi's own build discipline can.

**PRD says:** The Secondary signal ("shipped within the weekend-scale build window... a slip is itself a signal worth reflecting on") captures the *spirit* of this correctly, but doesn't carry forward the source's explicit framing that this is a deprioritized, non-design-addressable process risk. A reader of the PRD alone could mistake the weekend-scale timeline for a feature/design constraint to be engineered around, rather than what the source explicitly frames as pure founder discipline. Low-stakes, but worth a one-line clarification if the PRD is ever read independently of the Trigger Map.

---

## Summary

- **1 contradiction (C-1)**, moderate severity: PRD's mandatory login-gated auth (FR-9) directly conflicts with the Trigger Map's explicit "no login wall" home-screen requirement, and the PRD never reconciles the two or explains the added security rationale, which has no source-document basis.
- **3 gaps (G-1–G-3)**, all minor/softening rather than dropped scope: ongoing monthly spot-check cadence isn't a tracked PRD success signal (only narrative), the "pride in shipping solo" LOW-priority force isn't mentioned, and the build-window risk isn't explicitly labeled process-risk-not-design-risk.
- No core v1 feature, persona detail, or business goal from the Trigger Map was found dropped from the PRD. FR-1 through FR-11, the Out-of-Scope list, and the Open Risks section all trace cleanly back to the "Must Address" forces and locked-scope discipline in the source documents.
