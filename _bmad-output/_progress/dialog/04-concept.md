# Step 4: Product Concept

**Completed:** 2026-07-02
**Session:** 1

---

## Purpose

Capture the designer's STRUCTURAL vision - the founding principle or key feature that defines the product concept.

**Not just requirements - the IDEA.**

---

## Concept Exploration

**Agent asked:**
"When you're standing at checkout or just made a digital purchase, what's the fastest path from 'I spent money' to 'it's logged'? Is there a specific mental model — 'a single always-visible quick-add box' vs. 'a proper form you fill in'?"

**User described:**
"single always-visible quick-add box"

---

## Deep Dive

### Core Structural Idea

**The founding principle:**
The home screen IS a single always-visible quick-add box: an amount field plus single-tap category buttons for the fixed, short category list. No forms, no navigation, no digging to log an entry. A live running total for the current month sits alongside it, updating immediately with each entry.

**Concrete example:**
User buys groceries for ₹450. Opens Tracker — quick-add box is front and center. Taps "Food," types 450, hits add. The month's running total updates instantly (e.g. ₹12,300 → ₹12,750). Takes a few seconds, no navigation required.

### Why This Matters

**User's rationale:**
Follow-up questions confirmed: (1) the live running total is genuinely wanted, resolving the PRFAQ's open question about whether it was an over-interpretation — it is not, it's confirmed scope. (2) Category selection should be single-tap buttons, not a dropdown, to keep the add-flow as fast as possible.

**Problem it solves:**
Directly counters the abandonment risk identified in Step 7 (Target Users) — forgetting to log in the moment. Minimizing the path from purchase to logged entry removes the main reason logging would lapse. The live total also solves the "payoff" problem named in the forged-idea doc: a log with no visible reward doesn't survive; seeing the number move is what makes logging worth doing.

---

## Reflection Checkpoint

**Agent's synthesis:**
"Tracker's home screen is a single always-visible quick-add box — amount + single-tap category buttons — with a live running month-to-date total that updates immediately per entry. This directly counters the forgetting-in-the-moment risk and gives an immediate payoff for each log."

**User response:**
- [x] Confirmed
- [ ] Corrected

**Corrections (if any):**
None.

---

## Concept Documentation

**Core concept:**
A single always-visible quick-add box (amount + single-tap fixed category buttons) as the home screen, paired with a live running current-month total that updates per entry.

**Implementation principle:**
Every design and technical decision downstream should protect the speed of the add-flow first. Nothing should be added between "user has spending to log" and "it's logged" — no required navigation, no multi-step forms, no mandatory fields beyond amount + category.

**Example:** ₹450 grocery purchase → tap "Food" → type 450 → add → running total updates instantly.

---

## Related Features

Features that stem from this concept:
1. Quick-add entry (amount + single-tap category selection) as the default/home view
2. Live, always-visible running total for the current month
3. Fixed, short category list rendered as tappable buttons (no category management UI, per locked scope)

---

**Documented in:** `_bmad-output/_progress/wds-project-outline.yaml` → `product_concept`
**Impacts:** Navigation structure, information architecture, feature priorities
