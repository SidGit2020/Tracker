# Story Breakdown.1: Breakdown - Page Shell & Foundation

**Page**: 2.1-2.2 Breakdown
**Section**: 1 of 6
**Complexity**: Simple
**Estimated Time**: 10 minutes

---

## 🎯 Goal

HTML skeleton, Tailwind config (same design tokens as Scenario 01), and multi-month demo-data loading — the foundation for header, chart, and drill-down sections.

---

## 📋 What Was Built

**`2.1-monthly-breakdown.html`** — skeleton with the same Tailwind token config as Scenario 01 (colors, spacing/type scale). No `desktop:`/`bp-mobile` breakpoint variants this pass — this build is desktop-only by explicit user decision (mobile diff deferred, see `PROTOTYPE-ROADMAP.md`). Container: `max-w-[900px] mx-auto`, with `#header-root` and `#body-root` mount points plus `#popup-root` for the drill-down overlay.

**`data/demo-data.js`** (+ mirrored `.json`) — 27 entries spanning April 2026 (earliest) through July 2026 (current/latest), designed so July's totals exactly match the spec's own mockup numbers (Food 4,200 / Shopping 3,100 / Transport 2,800 / Other 2,350 = Rs 12,450). April deliberately has only 2 of 4 categories; June includes a custom "Books" category. Rationale documented in the file's header comment.

**`shared/utils.js`** — `formatCurrency` (now using `toLocaleString` for thousands separators, e.g. "Rs 12,450"), `formatMonthLabel`/`toMonthKey`/`shiftMonthKey` (month-key arithmetic), `formatDateShort`.

**`shared/prototype-api.js`** — `getAvailableMonths()`, `getEarliestMonth()`/`getLatestMonth()` (latest = "current month" for this prototype, since there's no live clock dependency here), `getMonthSummary(monthKey)` (aggregates + sorts categories, simulated fetch latency), `getCategoryTransactions(monthKey, category)` (filtered + sorted most-recent-first).

**Reused from Scenario 01** (copied, generic): `components/dev-mode.js`/`.css`, and `components/modal.js` — extended in this scenario (see Story 4) to support both Overlay variants.

---

## ✅ Acceptance Criteria

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Page loads, demo data auto-loads | ✓ Pass — confirmed via headless screenshot showing real July data rendered |
| 2 | 900px container, no horizontal scroll | ✓ Pass — confirmed visually at 900px and 1280px viewports |
| 3 | No console errors | ✓ Pass |

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review

---

## 🔄 Changes from Original Plan

- None.
