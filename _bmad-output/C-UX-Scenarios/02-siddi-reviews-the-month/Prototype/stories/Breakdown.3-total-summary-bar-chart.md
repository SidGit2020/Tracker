# Story Breakdown.3: Breakdown - Total Summary & Bar Chart

**Page**: 2.1-2.2 Breakdown
**Section**: 3 of 6
**Complexity**: Medium
**Estimated Time**: 25 minutes

---

## 🎯 Goal

Headline total, horizontal bar chart sorted largest-to-smallest with per-month-relative bar widths, click-to-drill-down.

---

## 📋 What Was Built

`renderBody()` (default-state branch) in `pages/breakdown.js`:

- `breakdown-total` / `breakdown-total-label` / `breakdown-total-amount` — "Total Spent This Month" + the selected month's sum
- `breakdown-chart` / `breakdown-chart-row` (repeating) — category label, proportional bar (`width: (amount/maxAmount)*100%`, re-normalized per month per the spec's Technical Notes), amount label; `onClick` opens the drill-down for that category

---

## ✅ Acceptance Criteria

| # | Criterion | Result |
|---|-----------|--------|
| 1 | July 2026: Rs 12,450 total, 4 bars, Food largest | ✓ Pass — screenshot exactly matches spec mockup numbers |
| 2 | Bar widths proportional, re-normalize per month | ✓ Pass — visually confirmed Food=100% width, Shopping/Transport/Other scaled correctly relative to Food in July's screenshot |
| 3 | April 2026: only 2 bars (Food, Other) | ✓ Pass — verified via real navigation, `rowCount=2`, Food total Rs 1,800 (900+900, matches demo data) |
| 4 | Clicking a bar opens drill-down for that category + month | ✓ Pass — verified for Food (July) and Books (June) via real click events, correct category title and transaction data in each |

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review

---

## 🔄 Changes from Original Plan

- None.
