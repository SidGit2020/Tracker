---
design_intent: L
design_status: not-started
---

# 01: Siddi Logs an Expense

**Project:** Tracker
**Created:** 2026-07-02
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
Capture an expense the instant it happens, without breaking flow, trusting it's easy to fix if something gets mis-tapped.

---

## Business Goal (Q2)

**Goal:** Build a Lasting Personal Logging Habit (Primary)
**Objective:** Active logging at day 14 post-launch, no missed-week gaps, entries taking only a few seconds

---

## User & Situation (Q3)

**Persona:** Siddi the Self-Tracker (Primary — only persona)
**Situation:** He's just paid for something — a coffee, a cab, groceries — and has a few seconds before moving on to whatever he was doing.

---

## Driving Forces (Q4)

**Hope:** The expense is logged before he forgets, gone in a couple of taps.

**Worry:** He gets distracted before finishing and it silently never gets logged.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile (natural context for in-passing logging right after a purchase) — desktop equally supported for the same flow.
**Entry:** Opens the bookmarked/pinned app directly on his phone right after paying for something — no search, no menu, no funnel.

---

## Best Outcome (Q7)

**User Success:**
The expense is captured in a couple of seconds and the running total updates immediately, so he trusts it registered correctly.

**Business Success:**
One more day added to the continuous logging streak — the exact signal the day-14 metric measures.

---

## Shortest Path (Q8)

Home is a single page; storyboard steps document states within it — no branches.

1. **Home / Log Screen** — Opens the app to the always-visible quick-add box (amount field + category buttons)
2. **Home / Log Screen** — Enters the amount and taps a category button
3. **Home / Log Screen** — Sees the new entry appear in the list and the current-month total update immediately ✓

*Correcting or deleting a mis-logged entry stays in scope but is documented as an on-page interaction within the Home page spec, not as a branch in this linear path.*

---

## Trigger Map Connections

**Persona:** Siddi the Self-Tracker (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** Log an expense in seconds without breaking flow
- ❌ **Fear:** Forgetting to log in the moment

**Business Goal:** Build a Lasting Personal Logging Habit — day-14 active logging

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|--------------|
| 1.1 | `1.1-home/` | See the always-visible quick-add box, ready to log | Enters amount, taps category |
| 1.2 | `1.2-home/` | Submit the entry | Taps to confirm/save the entry |
| 1.3 | `1.3-home/` | See the entry and updated total | Final — scenario success ✓ |

**First step** (1.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** (editing/deleting an existing entry) are documented as storyboard items within the Home page spec.
