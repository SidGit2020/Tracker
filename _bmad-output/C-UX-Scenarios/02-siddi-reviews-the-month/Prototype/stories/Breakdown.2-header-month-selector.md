# Story Breakdown.2: Breakdown - Header & Month Selector

**Page**: 2.1-2.2 Breakdown
**Section**: 2 of 6
**Complexity**: Medium
**Estimated Time**: 20 minutes

---

## 🎯 Goal

Page title, prev/next month navigation with data-driven bounds, defaulting to the current (latest) month on load.

---

## 📋 What Was Built

`renderHeader()` / `changeMonth()` in `pages/breakdown.js`:

- `breakdown-header-title` — "Monthly Category Breakdown"
- `breakdown-header-month-selector` — `‹ {Month} {Year} ›`; prev/next buttons disable via `disabled:opacity-30` when `state.monthKey` is at `PrototypeAPI.getEarliestMonth()` / `getLatestMonth()` respectively
- `changeMonth(delta)` computes the candidate month via `shiftMonthKey`, bounds-checks it, and — after Story 5's fix — delegates to `loadMonth()` as the single place that updates `state.monthKey`

---

## ✅ Acceptance Criteria

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Defaults to July 2026 on load | ✓ Pass — screenshot confirmed |
| 2 | Prev disables at April 2026 | ✓ Pass — verified via 3 real button clicks (Jul→Jun→May→Apr), `prevDisabled=true` at April |
| 3 | Next disables at July 2026 (current) | ✓ Pass — visually confirmed in the 1280px screenshot (next arrow visibly dimmed on initial July load) |
| 4 | Switching months re-renders Total + Chart | ✓ Pass — April correctly showed 2 category bars (Food, Other) matching that month's demo data |

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review

---

## 🔄 Changes from Original Plan

- See Story 5 for a `state.monthKey` synchronization fix that touched this section's `changeMonth()` function.
