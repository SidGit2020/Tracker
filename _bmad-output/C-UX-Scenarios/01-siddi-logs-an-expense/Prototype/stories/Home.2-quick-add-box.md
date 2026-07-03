# Story Home.2: Home - Quick Add Box

**Page**: 1.1-1.3 Home
**Section**: 2 of 7
**Complexity**: Medium
**Estimated Time**: 25 minutes

---

## 🎯 Goal

Amount input, 4 preset category buttons, custom category input (case-insensitive dedup on save), and the "Add Expense" submit button — enabled/disabled per validation, opening the Confirm Popup on submit.

---

## 📋 What Was Built

`renderQuickAdd()` in `pages/home.js`, mounted into `#quick-add-root`:

- `home-quickadd-amount-input` — numeric input, live-bound to `state.amount` via an `input` listener that updates only the submit button's disabled state (not a full re-render, to avoid stealing keyboard focus mid-type).
- `home-quickadd-category-{food|transport|shopping|other}` — single-select toggle buttons; selecting one does a full re-render (clears any custom-input text, updates selected styling).
- `home-quickadd-category-custom-input` — dashed text input; typing sets `state.category` directly and live-toggles its own border/text color classes (no full re-render, same focus-preservation reasoning), and clears preset button selection styling via `updateSelectedPresetStyling()`.
- `home-quickadd-submit` ("Add Expense") — disabled unless `Number(state.amount) > 0 && state.category` is truthy; opens the Confirm Popup on click.

Category dedup (case-insensitive merge against presets + all previously used custom categories) happens at **save time** in `PrototypeAPI.addEntry()`, not at input time — matches spec ("matched case-insensitively against existing categories... at submit time").

---

## ✅ Acceptance Criteria

### Agent-Verifiable

| # | Criterion | Expected | Result |
|---|-----------|----------|--------|
| 1 | Submit disabled state | Disabled until amount>0 AND category set | ✓ Pass (code review of `isQuickAddValid()`) |
| 2 | Category buttons single-select | Selecting one deselects others/custom | ✓ Pass |
| 3 | Custom category case-insensitive merge | "food" (typed) reuses existing "Food" spelling | ✓ Pass — verified logic path in `findExistingCategory()` / `PrototypeAPI.addEntry()` |
| 4 | Mobile: buttons wrap to 2 rows | Food/Transport/Shopping row 1, Other row 2, at 311px available width (375px viewport minus container padding) | ✓ Pass — confirmed via isolated `getBoundingClientRect()` measurement in a fixed-311px-width test harness (`tops=0,0,0,46`, i.e. 3 buttons on row 1, Other on row 2). See Home.1's testing note on why a direct 375px screenshot isn't reliable in this environment. |
| 5 | Desktop: single row, all 4 fit | No wrap at `bp-desktop` | ✓ Pass — confirmed via headless measurement at 642px viewport (`desktop:flex-nowrap` correctly scoped to `min-width:640px`) |

### User-Evaluable (Qualitative)

- [ ] Typing feels responsive, no lag or focus loss while entering amount or custom category
- [ ] Selected category is visually obvious

---

## 🧪 How This Was Tested

Code review against acceptance criteria + isolated headless-Chrome DOM measurements (see Home.1 testing note re: the ~482px viewport floor limiting direct screenshot verification below that width). Full interactive click-through (typing, tapping categories, opening the popup) has **not** been exercised in a live browser by the agent — recommend the user run through this section's flow directly.

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review
**Notes**: Retroactively documented.

---

## 🔄 Changes from Original Plan

- None — matches the work file's Section 2 scope.
