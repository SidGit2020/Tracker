# Story Breakdown.4: Breakdown - Drill-down Panel / Overlay

**Page**: 2.1-2.2 Breakdown
**Section**: 4 of 6
**Complexity**: Medium
**Estimated Time**: 20 minutes

---

## 🎯 Goal

The `breakdown-drilldown-panel` — this scenario's first real use of the Overlay component's **Drawer/Sheet variant** (Scenario 01 only used the Centered Dialog variant), read-only transaction list, sorted most-recent-first.

---

## 📋 What Was Built and Fixed

**`components/modal.js` extended** from Scenario 01's copy to support both Overlay variants via a `variant` parameter: `'dialog'` (unchanged, centered/max-width) and `'drawer'` (new — full-height, `ml-auto` right-aligned, `w-[380px]`, own scrim layout since a drawer's scrim spans the full viewport rather than centering content).

**`openDrilldown()` / `renderDrilldown()`** in `pages/breakdown.js` — `breakdown-drilldown-title` (category name), `breakdown-drilldown-close` (× button), `breakdown-drilldown-row` (repeating, date + amount, read-only, sorted by `getCategoryTransactions()` which returns most-recent-first).

**Real bug found and fixed during visual verification**: the drawer is intentionally flush to the viewport's right edge (`ml-auto`) — the exact same corner where the fixed Dev Mode toggle button sits. A screenshot of the open panel showed the Dev Mode button visually covering the drawer's close (×) button entirely, in every viewport width tested (not a narrow-viewport artifact — both elements target the same fixed corner regardless of window size). **Fixed** by adding a `body.overlay-open` class (set/cleared in `openOverlay()`/`close()`) with a CSS rule hiding `#dev-mode-toggle` while any overlay is open. Re-verified with a fresh screenshot: close button now fully visible and clickable. **Applied the same fix retroactively to Scenario 01's `components/modal.js`** for consistency, since its centered dialog could plausibly have the same issue at narrow widths even though it wasn't observed there.

---

## ✅ Acceptance Criteria

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Panel shows correct category + only that category's transactions for the selected month | ✓ Pass — Food (July) showed 4 rows summing to Rs 4,200; Books (June) showed exactly 1 row (Rs 1,800), matching demo data |
| 2 | Transactions sorted most-recent-first | ✓ Pass — Food panel showed Jul 2, Jul 2, Jul 1, Jul 1 in that order |
| 3 | Close returns focus to the chart, dims background while open | ✓ Pass — `panelClosedAfter=true` confirmed via DOM check after clicking close |
| 4 | Panel is read-only — no edit/delete affordances | ✓ Pass (code review — no interactive elements beyond Close exist in the row template) |
| 5 | Close button visible and clickable (not obscured) | ✓ Pass, **after fix** — see bug note above |

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review

---

## 🔄 Changes from Original Plan

- Fixed a real Dev-Mode/drawer visual collision bug (see above) — not anticipated in the original work-file scope, found during verification, fixed in both this scenario's and Scenario 01's `components/modal.js`.
