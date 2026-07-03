# Scenario 01: Siddi Logs an Expense - Prototype Roadmap

**Scenario**: Siddi Logs an Expense
**Pages**: 1.1 through 1.3 (single view, three interaction states)
**Device Compatibility**: Mobile + Desktop responsive (`bp-mobile` up to 639px / `bp-desktop` 640px+)
**Design Fidelity**: Design System Components
**Last Updated**: 2026-07-03

---

## 🎯 Scenario Overview

**User Journey**: Siddi opens the app right after paying for something, enters an amount, taps a category (or types a custom one), taps "Add Expense," reviews the entry in a confirm popup, and gets a toast + updated list once it's saved. No navigation, no login — this scenario IS the entry point.

**Pages in this Scenario** (one HTML file — states layered on the same view, per spec):
1. **1.1 Home (idle/ready)** — Quick Add box + Recent Entries list
2. **1.2 Home (confirm popup)** — Overlay/Centered Dialog reviewing amount + category before save
3. **1.3 Home (toast + updated list)** — save confirmation, reset Quick Add, new entry at top of list

---

## 📱 Device Compatibility

**Type**: Mobile + Desktop responsive (single breakpoint, per `D-Design-System/00-design-system.md`)

**Reasoning**: Specs define one breakpoint (`bp-mobile` / `bp-desktop`) with layout-only diffs (stacked → two-column) — no separate tablet tier needed for this audience-of-one scope.

**Test Viewports**:
- Mobile (375px × 667px) — base spec reference width
- Desktop (900px × 600px) — responsive diff reference width

**Optimization Strategy**:
- ✅ Single HTML file, CSS breakpoint at 640px switches stacked → two-column
- ✅ Touch-friendly tap targets on mobile, unchanged behavior on desktop
- ❌ No tablet-specific layout (not in scope)

---

## 🎨 Design Fidelity

Uses the documented Design System (`D-Design-System/00-design-system.md`):
- Spacing scale (`space-3xs` → `space-3xl`)
- Type scale (`text-xs` → `text-3xl`)
- `Overlay` component, Centered Dialog variant, for the 1.2 confirm popup

---

## 📁 Folder Structure

**HTML Files** (root level - double-click to open):
```
1.1-home.html   ← primary file; 1.2 (popup) and 1.3 (toast) are states within it
```

**Supporting Folders**:
- `shared/` - Shared code (prototype-api.js, init.js, utils.js)
- `components/` - Reusable UI components (modal/overlay, toast)
- `data/` - Demo data (auto-loads on first use)
- `stories/` - Section development documentation (created just-in-time)
- `work/` - Planning files (`1.1-home-Work.yaml`)

---

## 🚀 Quick Start

### For Testing
1. **Open** `1.1-home.html` (double-click)
2. **Demo data prompt** → Click YES (loads Siddi's demo entries)
3. **Log an expense**: enter amount → tap category → "Add Expense" → Confirm
4. **Data persists** across reloads (sessionStorage)

---

## 📊 Demo Data

### `data/demo-data.json`
**Contents**: Siddi's user profile, category list (4 presets + 1 custom "Books"), 9 demo entries spanning June 30 – July 3, 2026 — enough to test the populated list, the count selector (5/10/20), and the month boundary (entry-001 falls in June).

**Edit this file** to change demo data (JSON format).

---

## 📋 Prototype Status

| Page/State | Status | Sections | Last Updated | Notes |
|------|--------|----------|--------------|-------|
| Home (all states — single file) | ✅ Complete | 7/7 | 2026-07-03 | All sections built and verified (code review + headless-Chrome instrumentation, since no interactive automation tool is available in this environment). One real bug found and fixed during Section 7 (demo-data seed timestamps dated "today," causing new entries to sort incorrectly) — see `stories/Home.7-final-integration-polish.md`. **Not yet verified by a human in a real browser** — recommended before final sign-off. |

**Status Legend**: ✅ Complete · 🚧 In Progress · ⏸️ Not Started · 🔴 Blocked

---

## 📝 Change Log

### 2026-07-03
- Prototype environment initialized (folder structure, demo data, roadmap)
- Device compatibility: Mobile + Desktop responsive
- Design fidelity: Design System Components

---

**Last Updated**: 2026-07-03
**Version**: 1.0
**Status**: In Development
