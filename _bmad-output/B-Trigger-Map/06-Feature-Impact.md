# Feature Impact Analysis

> Prioritizing Siddi's driving forces to guide what Tracker's design must get right first

**Document:** Trigger Map - Feature Impact Analysis
**Created:** 2026-07-02
**Status:** COMPLETE

---

## Scoring Method

Each driving force is scored 1-5 on three dimensions, summed to a max of 15:

- **Frequency:** How often this force matters (5 = every interaction, 1 = rare edge case)
- **Intensity:** How strongly Siddi feels it (5 = critical/blocks the habit, 1 = minimal emotion)
- **Fit:** How well Tracker's design can address it (5 = perfect fit, 1 = hard to address)

With only one persona, there's no cross-persona weighting — every force is scored on its own merits against the same product.

---

## Full Scoring Table

| Driving Force | Frequency | Intensity | Fit | Total | Priority |
|---|---|---|---|---|---|
| ✅ Log an expense in seconds without breaking flow | 5 | 5 | 5 | 15 | HIGH |
| ❌ Avoid logging that feels like filling out a form | 5 | 5 | 5 | 15 | HIGH |
| ❌ Fear forgetting to log in the moment | 5 | 5 | 4 | 14 | HIGH |
| ✅ See the running total update immediately | 5 | 4 | 5 | 14 | HIGH |
| ✅ Get a trustworthy number replacing the vague feeling | 3 | 5 | 5 | 13 | MEDIUM |
| ❌ Distrust a number that looks wrong | 3 | 5 | 5 | 13 | MEDIUM |
| ❌ Avoid a UI that scolds about spending | 4 | 4 | 5 | 13 | MEDIUM |
| ✅ Own a tool built on his own terms | 2 | 3 | 4 | 9 | LOW |
| ✅ Feel the satisfaction of shipping solo | 1 | 4 | 3 | 8 | LOW |
| ❌ Fear the self-imposed build window slipping | 1 | 4 | 2 | 7 | DEPRIORITIZE |

---

## Must Have / Consider / Defer

**Must Have (14-15, HIGH):**
- Quick-add box with no mandatory fields beyond amount + category
- Always-visible placement so logging never requires navigation
- Live running total that updates the instant an entry saves

**Consider (11-13, MEDIUM):**
- Exact, non-estimated totals with no rounding
- UI copy audited against the Tone of Voice guidelines to guarantee zero judgmental language
- Category totals that hold up to a manual spot-check

**Defer (8-10, LOW):**
- Any future flexibility to customize categories or evolve the tool (ownership already exists structurally — Siddi built it — so no dedicated feature is needed to "deliver" this force)
- Marking the shipped milestone itself is not a product feature — it happens by definition when v1 launches

**Deprioritized (<8):**
- Build-window slippage (7/15) is a process risk, not a product-design risk. No UI or feature can address it — only Siddi's own build discipline can.

---

## Strategic Rationale

The two highest-scoring forces — speed of logging and absence of form-like friction — are tied at 15/15 and point at the same design imperative. This is not a coincidence: they are two framings (positive want / negative fear) of the identical underlying requirement, which is exactly what the Product Brief's quick-add box concept already targets.

Fear of forgetting (14/15) is the named core abandonment risk in the Product Brief. v1's always-visible quick-add reduces this by removing navigation, but doesn't eliminate it outright — there is no reminder/notification mechanism in v1 scope. This is worth watching after launch, since it's the one HIGH-priority force without a complete design answer yet.

Immediate feedback (14/15) matters almost as much as speed itself — research into the "feedback effect" shows that seeing the total update right away is part of what reinforces the logging habit, not just a nice-to-have display detail.

## Connection to Business Goals

Every HIGH and MEDIUM force ties directly to one of the three ranked Business Goals:

- **Build a Lasting Logging Habit** ← speed of logging, absence of friction, fear of forgetting
- **Trust the Number** ← immediate feedback, trustworthy number, distrust of wrong numbers, no scolding UI
- **Ship Within the Window** ← indirectly protected by keeping v1 scope to exactly these forces, and nothing more

---

## Related Documents

- **[00-trigger-map.md](00-trigger-map.md)** — Visual overview and navigation
- **[01-Business-Goals.md](01-Business-Goals.md)** — Objectives and metrics
- **[02-Siddi-the-Self-Tracker.md](02-Siddi-the-Self-Tracker.md)** — Full persona and driving forces
- **[05-Key-Insights.md](05-Key-Insights.md)** — Strategic implications

---

_Back to [Trigger Map](00-trigger-map.md)_
