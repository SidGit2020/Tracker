# Scenario 02: Siddi Reviews the Month - Prototype Roadmap

**Scenario**: Siddi Reviews the Month
**Pages**: 2.1 through 2.2 (single view, two interaction states)
**Device Compatibility**: Desktop-only for this pass (900px reference). Mobile responsive diff (`bp-mobile`, already specced in both page files) deferred to a later pass per user decision — see Change Log.
**Design Fidelity**: Design System Components
**Last Updated**: 2026-07-03

---

## 🎯 Scenario Overview

**User Journey**: Siddi opens the app during an unhurried moment near month-end (not to log anything — to check spending). He sees the month's total and a per-category bar chart, browses to other months via the selector, and taps a category bar to drill into that category's individual transactions and spot-check the total against memory.

**Pages in this Scenario** (one HTML file — a drill-down overlay state on a single base view, per spec):
1. **2.1 Monthly Category Breakdown** — header + month selector, total, horizontal bar chart
2. **2.2 Drill-down panel** — Overlay (Drawer/Sheet variant) triggered by tapping a chart bar; read-only transaction list for that category

---

## 📱 Device Compatibility

**Type**: Desktop-only for this build pass (900px reference width, matching the spec's base viewport — this scenario is desktop-first, unlike Scenario 01's mobile-first).

**Deferred**: The mobile responsive diff (`bp-mobile`, 375px — single column, bars restack with labels above, drill-down becomes a full-screen sheet) is already fully specified in both page files but intentionally not built in this pass. Add as a follow-up section when ready.

---

## 🎨 Design Fidelity

Uses the same Design System as Scenario 01 (`D-Design-System/00-design-system.md`): spacing/type scale, and the `Overlay` component's **Drawer/Sheet variant** (2.2's first real desktop use — Scenario 01 used the Centered Dialog variant).

---

## 📁 Folder Structure

**HTML Files**:
```
2.1-monthly-breakdown.html   ← primary file; 2.2 (drill-down) is a state within it
```

**Supporting Folders**: `shared/`, `components/`, `data/`, `stories/`, `work/` — same structure as Scenario 01's Prototype folder.

---

## 🚀 Quick Start

1. **Open** `2.1-monthly-breakdown.html` (double-click)
2. Demo data auto-loads (Siddi's entries spanning April–July 2026)
3. Browse months via the `‹ ›` selector; current month (July 2026) is the default
4. Click a category bar to open the drill-down panel

---

## 📊 Demo Data

### `data/demo-data.js` (and mirrored `data/demo-data.json`)

Spans **April 2026** (earliest month with data — tests the month-selector's lower bound) through **July 2026** (current month, defaults on load). July's category totals intentionally match the spec's own mockup numbers (Food 4,200 / Shopping 3,100 / Transport 2,800 / Other 2,350 = **Rs 12,450**). June includes a custom category ("Books") to test non-preset bar rendering. April has only 2 of the 4 categories, to test month-to-month category-set changes in the chart.

---

## 📋 Prototype Status

| Page/State | Status | Sections | Last Updated | Notes |
|------|--------|----------|--------------|-------|
| Breakdown (2.1 + 2.2 drill-down) | ✅ Complete (desktop-only) | 6/6 | 2026-07-03 | Desktop pass complete and verified. Two real bugs found and fixed during verification: a Dev-Mode/drawer visual collision, and a `state.monthKey` sync fragility (see `stories/Breakdown.4` and `Breakdown.5`). Mobile responsive diff intentionally deferred — see Change Log. **Not yet verified by a human in a real browser.** |

**Status Legend**: ✅ Complete · 🚧 In Progress · ⏸️ Not Started · 🔴 Blocked

---

## 📝 Change Log

### 2026-07-03
- Prototype environment initialized (folder structure, multi-month demo data, roadmap)
- Device compatibility: **Desktop-only for this pass** (900px) — user explicitly deferred the mobile responsive diff to a later pass, unlike Scenario 01 where both breakpoints were built together
- Design fidelity: Design System Components (Overlay — Drawer/Sheet variant)

---

**Last Updated**: 2026-07-03
**Version**: 1.0
**Status**: In Development
