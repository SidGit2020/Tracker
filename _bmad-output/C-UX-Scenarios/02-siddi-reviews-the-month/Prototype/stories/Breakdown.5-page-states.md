# Story Breakdown.5: Breakdown - Page States

**Page**: 2.1-2.2 Breakdown
**Section**: 5 of 6
**Complexity**: Simple
**Estimated Time**: 15 minutes

---

## 🎯 Goal

Loading / Empty / Error for the chart area; Loading / Error for the drill-down panel.

---

## 📋 What Was Built and a Real Bug Found & Fixed

**`renderBody()`** in `pages/breakdown.js` handles all four chart states: `loading` (skeleton bars), `empty` (centered "No entries for {Month} {Year}", no CTA, per spec), `error` (inline message + Retry, month selector stays usable since the header is a separate render function), `default`.

**`renderDrilldown()`** handles `loading` (skeleton rows) and `error` (inline message + Retry) states within the panel.

**Prototype Controls panel** (testing aid, not shipped spec) — force-chart-error and force-drilldown-error checkboxes, plus a "Reload current month" button, since no demo month naturally has zero entries to reach Empty organically and there's no real backend to fail naturally for Error.

**Real bug found and fixed**: testing the Empty state by calling `loadMonth('2026-03')` (a month outside the demo data range) revealed the Empty message showed "No entries for **July** 2026" instead of "No entries for **March** 2026" — `loadMonth()` fetched March's data correctly but never updated `state.monthKey`, which `renderBody()`'s empty-message text reads from. In normal UI usage this was masked because the only real caller, `changeMonth()`, already set `state.monthKey` before calling `loadMonth()` — so this wasn't reachable by clicking through the actual interface, but it was a latent fragility (anything else calling `loadMonth()` directly, like a future feature, would hit the same bug). **Fixed** by making `loadMonth()` itself the single place that sets `state.monthKey`, and simplifying `changeMonth()` to rely on it rather than duplicating the assignment. Re-verified: Empty message now correctly reads "No entries for March 2026", and re-ran the real-navigation April-boundary test afterward to confirm the fix didn't regress normal clicking (`label=April 2026 prevDisabled=true rowCount=2`, unchanged).

---

## ✅ Acceptance Criteria (after fix)

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Empty state message shows the correct month | ✓ Pass, after fix — "No entries for March 2026" |
| 2 | Error state shows inline message + Retry | ✓ Pass — `error=true retryPresent=true` via Prototype Controls forced error |
| 3 | Month selector stays usable during Error | ✓ Pass (code review — header renders independently of body state) |
| 4 | Loading skeleton shown on initial load and month switch | ✓ Pass (code review — `loadMonth()` always sets `chartViewState='loading'` and renders before the async fetch resolves) |

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review

---

## 🔄 Changes from Original Plan

- Fixed the `state.monthKey` synchronization bug described above — `loadMonth()` now owns that assignment instead of relying on callers.
