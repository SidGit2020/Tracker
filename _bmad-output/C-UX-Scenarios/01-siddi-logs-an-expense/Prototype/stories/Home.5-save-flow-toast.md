# Story Home.5: Home - Save Flow & Toast

**Page**: 1.1-1.3 Home
**Section**: 5 of 7
**Complexity**: Medium
**Estimated Time**: 20 minutes

---

## 🎯 Goal

Wire the successful-save path end to end: toast, stacking, new-entry row highlight, Quick Add reset, and (as a testing aid, not spec scope) the Prototype Controls panel used by Home.3/Home.4 to reach Loading/Empty/Error states without a real backend.

---

## 📋 What Was Built

**`components/toast.js`** — `showToast(message, { onDismiss })`. Prepends into `#toast-root` (most recent on top, matching "stacks vertically, most recent on top"), auto-dismisses after `TOAST_DURATION_MS = 2500`, fires `onDismiss` on its own independent timer — used to fade the corresponding entry-row highlight in sync, per spec ("dismiss together on one ~2.5s timer... no shared/global timer").

**`handleConfirmSave()`** in `pages/home.js`, on successful save:
1. Closes the popup
2. Resets `state.amount = ''`, `state.category = null` → re-renders Quick Add to idle
3. Adds the new entry's id to `state.highlightedEntryIds`, re-renders Recent Entries (outlined row)
4. Calls `showToast()`; its `onDismiss` removes the id from the highlight set and re-renders

Because each `addEntry` → `showToast` call is independent, rapid successive saves naturally stack (each toast + highlight pair has its own closure and timer) — no shared/global timer state exists to accidentally couple them.

**Prototype Controls panel** (`initPrototypeControls()`) — a collapsible bottom-left panel, **not part of the shipped spec**, added as a testing aid: buttons to force Recent Entries into Default/Loading/Empty/Error, a "Force next save to fail" checkbox (backs Home.4's Error/Retry path), and a "Clear demo data & reload" link. Flagged clearly in the UI copy and here so it isn't mistaken for a designed feature.

---

## ✅ Acceptance Criteria

### Agent-Verifiable

| # | Criterion | Expected | Result |
|---|-----------|----------|--------|
| 1 | Toast message format | "{amount} added to {category}" | ✓ Pass (code review) |
| 2 | Toast stacking | Most recent on top, independent timers | ✓ Pass — each `showToast()` call prepends and owns its own `setTimeout` closure |
| 3 | Row highlight synced to toast | Fades on the same ~2.5s timer | ✓ Pass — `onDismiss` callback is the single source of both toast removal and highlight-clear |
| 4 | Quick Add resets after save | Amount/category cleared | ✓ Pass (code review) |
| 5 | New entry appears at top of list | Sorted by `createdAt` desc | ✓ Pass — `PrototypeAPI.getEntries()` always re-sorts |

### User-Evaluable (Qualitative)

- [ ] Toast timing feels right (not too fast to read, not lingering)
- [ ] Stacked toasts from rapid entries feel like "keeping up," not overwhelming

---

## 🧪 How This Was Tested

Code review only. The rapid-multi-entry stacking behavior in particular should be exercised by hand (log 2-3 entries within a couple of seconds) since it depends on real timer interleaving that's hard to verify statically.

---

## 📊 Status Tracking

**Status**: ✅ Complete (code), ⚠️ Untested interactively
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review
**Notes**: Retroactively documented.

---

## 🔄 Changes from Original Plan

- Added the Prototype Controls panel — not in the original work-file scope for this section, but needed to make Loading/Empty/Error states (Home.3) and the save-Error/Retry path (Home.4) reachable without a real backend. Documented here rather than silently added.
