# Test Report: TS-001 Expense Tracking v1 — Validation

**Date:** 2026-07-03
**Tester:** Claude (Acceptance Testing activity, steps-t/)
**Environment:** Headless Chrome (`chrome.exe --headless=new`) + real DOM-event simulation against temporary instrumented copies of both prototype files. No physical devices or interactive automation tool (Puppeteer) available in this environment — see Methodology note below.
**Build:** Prototype (`1.1-home.html`, `2.1-monthly-breakdown.html`) — not a staged production build; this is Phase 5 [T] testing against the interactive prototypes built in [P] Prototyping.

---

## Summary

**Overall Result:** **APPROVED** *(updated 2026-07-03 after same-day fix + retest — see Retest section at the end of this report)*

**Total Issues:** 5 found (3 High — all fixed and retested same session; 2 Low — open, not blocking)

**Blocking:** No remaining blockers. All 3 High-severity issues (all accessibility failures, all `must_fix` under TS-001's sign-off criteria) were fixed and reverified with live DOM measurement before this report was finalized.

**Scope Note:** Scenario 02's mobile responsive diff was intentionally deferred (user decision during Prototyping) and is not built — all TS-001 test cases specific to that mobile viewport are marked **N/A**, not tested and not counted as failures.

---

## Test Coverage

| Category | Tested | Passed | Failed | N/A | Pass Rate (of tested) |
|----------|--------|--------|--------|-----|------------------------|
| Happy Path | 5/5 | 5 | 0 | 0 | 100% |
| Error States | 2/2 | 2 | 0 | 0 | 100% |
| Edge Cases | 6/6 | 5 | 0 | 1* | 100% (of applicable) |
| Design System Validation | 3/3 | 3 | 0 | 0 | 100% |
| Accessibility | 4/4 checks | 1 | 3 | 0 | 25% |

*Edge case "Viewport at/near bp-mobile/bp-desktop boundary" — Scenario 01 tested and passed; Scenario 02 marked N/A (mobile diff not built).

### Happy Path Detail

| ID | Name | Result | Evidence |
|----|------|--------|----------|
| HP-1 | Log a new expense end to end | ✅ PASS | Popup showed "Rs 250 \| Food" before confirm; toast read exactly "Rs 250 added to Food"; new entry "Rs 250 Food" at top of list; Quick Add reset to empty |
| HP-2 | Log an expense with a custom category | ✅ PASS | Typed "Gifts" → saved as "Rs 500 Gifts"; typed "gifts" (different case) on a later entry → correctly reused "Gifts" spelling, not a duplicate |
| HP-3 | Edit inline before confirming | ✅ PASS | Changed amount from 100 → 999 inline in the popup; saved entry read "Rs 999 Shopping" (edited value, not original) |
| HP-4 | Review the month and spot-check a category | ✅ PASS | Food bar showed "Rs 4,200"; drill-down panel's 4 transactions summed to exactly Rs 4,200 — verified programmatically, not just visually |
| HP-5 | Browse to a previous month | ✅ PASS | Real button clicks: Jul→Jun→May→Apr; landed on "April 2026" with prev arrow correctly disabled and exactly 2 category bars (matching April's demo data) |

### Error State Detail

| ID | Trigger | Result | Evidence |
|----|---------|--------|----------|
| ES-1 | Confirm save fails on 1.2 | ✅ PASS | Forced failure via test hook: inline error shown, amount (321) still visible in popup after failure (not lost), unchecking the force-fail flag and retrying via the same Confirm button succeeded and saved correctly |
| ES-2 | Chart data fails to load (2.1) | ✅ PASS | Forced failure: inline error message shown, month-selector prev/next buttons remained enabled and usable during the error state |

### Edge Case Detail

| ID | Case | Result | Evidence |
|----|------|--------|----------|
| EC-1 | Empty state — Home | ✅ PASS | Triggered via Prototype Controls: "No entries yet this month" shown, Quick Add amount input remained enabled |
| EC-2 | Empty state — Breakdown | ✅ PASS | Triggered by loading a month outside demo data range (March 2026): "No entries for March 2026" shown correctly (this required a bug fix mid-testing — see Fixed During Testing below) |
| EC-3 | Duplicate custom category (case-insensitive) | ✅ PASS | Same evidence as HP-2 |
| EC-4 | Rapid multiple entries (toast stacking) | ✅ PASS | Verified during Prototyping phase (Scenario 01 Section 5/7): 2 toasts stacked, most-recent on top, independent ~2.5s timers |
| EC-5 | Month selector at data boundaries | ✅ PASS | Same evidence as HP-5, plus confirmed next-arrow disables at July 2026 (current/latest month) |
| EC-6 | Viewport at/near 640px boundary | ✅ PASS (Scenario 01) / ⬜ N/A (Scenario 02) | Scenario 01: measured `aWidth=570` (mobile, full-width) at 602px viewport vs `aWidth=400` (desktop, capped) at 642px viewport — clean switch exactly at the 640px token. Scenario 02: mobile diff not built this pass. |

### Design System Validation Detail

| Check | Result | Evidence |
|-------|--------|----------|
| Overlay — Centered Dialog variant (1.2) | ✅ PASS | Code + screenshot confirm: centered, `max-w-[360px]`, scrim, `space-lg` padding, `space-md` gap |
| Overlay — Drawer/Sheet variant (2.2) | ✅ PASS (desktop only) | Screenshot confirms right-side drawer, correct padding/gap; mobile full-screen sheet variant not built (N/A) |
| Token compliance (spacing/typography, no raw px outside scale) | ✅ PASS | Grepped both prototypes for arbitrary `[Npx]` Tailwind values — only found intentional container-width values (page max-width, drawer fixed width, dialog max-width) that the specs themselves call out as fixed dimensions, not spacing/typography scale violations |
| No undocumented 3rd Overlay instance | ✅ PASS | Confirmed exactly 2 Overlay usages exist (1.2 dialog, 2.2 drawer), matching `D-Design-System/00-design-system.md`'s documented extraction history |

### Accessibility Detail

| Check | Result | Evidence |
|-------|--------|----------|
| Screen reader — content readable, labels present | ⚠️ Partial | Text content and labels are present and correctly ordered; toast lacks proactive announcement (see ISS-005, Low) |
| Color contrast (4.5:1 body text) | ❌ FAIL | Toast text (white on `success-500`) measures 2.54:1 — see **ISS-001** (High). All other text/button combinations checked (gray-500 labels, tracker-600 buttons) pass comfortably (4.83:1 and 6.71:1 respectively) |
| Touch targets (44×44px minimum) | ❌ FAIL | Category buttons (Home) measure 66×39px — 5px short of the 44px minimum height — see **ISS-002** (High). "Add Expense" submit button (48px) and drill-down close button pass |
| Keyboard navigation (all listed interactive elements reachable) | ❌ FAIL | Category bars on Breakdown (`breakdown-chart-row`) are unfocusable `<div>`s — see **ISS-003** (High), which blocks Scenario 02 entirely for keyboard-only users. All Scenario 01 elements explicitly listed in TS-001 (category buttons, Add Expense, popup fields/actions, Confirm/Cancel) are real `<button>`/`<input>` elements and pass |

---

## Issues Found

See `issues/00-issues-summary.md` for the full breakdown. Highlights:

### ISS-001: Toast text fails WCAG AA contrast (HIGH)
White text on `success-500` (#10B981) = 2.54:1, needs 4.5:1. [Full ticket](issues/ISS-001-toast-contrast.md)

### ISS-002: Category buttons below minimum touch target (HIGH)
66×39px, needs 44×44px minimum. [Full ticket](issues/ISS-002-category-button-touch-target.md)

### ISS-003: Category bars not keyboard-accessible (HIGH)
Blocks Scenario 02 entirely for keyboard-only users — this is the primary interaction on that page. [Full ticket](issues/ISS-003-chart-row-keyboard-access.md)

### ISS-004: Recent Entries rows not keyboard-accessible (LOW)
Currently a no-op click (edit/delete deferred to Phase 3). [Full ticket](issues/ISS-004-entry-row-keyboard-access.md)

### ISS-005: Toast missing aria-live region (LOW)
Screen readers won't proactively announce save confirmation. [Full ticket](issues/ISS-005-toast-missing-aria-live.md)

---

## Bug Found and Fixed During Testing (not a delivery issue — noted for the record)

While testing EC-2 (Breakdown empty state), a genuine bug was found and fixed in `pages/breakdown.js`: `loadMonth()` fetched data for a requested month but didn't update the canonical `state.monthKey`, causing the Empty-state message to show the wrong month name in one specific (non-UI-reachable) code path. Fixed by making `loadMonth()` the single source of truth for `state.monthKey`. Re-verified: passes correctly now, and normal navigation (already-passing tests) re-confirmed unaffected. This was fixed inline rather than filed as a ticket since it was caught and resolved within this same testing session.

---

## Recommendation

**What worked well:**
- All 5 happy-path flows work correctly and precisely match spec behavior, including exact toast copy, inline-edit-before-save, custom-category case-insensitive merging, and the drill-down total matching its source transactions
- Both error-state paths (save failure, data-fetch failure) degrade gracefully exactly as specified — data preservation, scoped errors, unblocked sibling UI
- Design system token compliance is clean — no raw spacing/typography values found outside the documented scale
- The Overlay component's two variants both render correctly per their documented specs

**What needs improvement:**
- Accessibility is the one weak area — all 3 High-severity issues are accessibility failures, not functional bugs. None of them are hard to fix (a padding change, a background-color change, and a `<div>`→`<button>` swap), but all 3 are explicitly named as must-fix by TS-001's own criteria.

### Next Steps

1. Fix ISS-001 (toast contrast) — HIGH
2. Fix ISS-002 (category button touch target) — HIGH
3. Fix ISS-003 (chart row keyboard access) — HIGH
4. Retest the 3 fixes (fast — each is isolated and low-risk)
5. Optionally address ISS-004/005 (LOW) at the same time since they're the same pattern of fix
6. Re-run this test report after fixes; if all High issues clear, recommend APPROVED

---

## Methodology Note

No interactive browser-automation tool (Puppeteer) or physical test devices are available in this environment. All tests above were executed via headless Chrome driving real DOM events (`click()`, native input `value` setter + `dispatchEvent`) against temporary instrumented copies of the actual prototype files — not mocked functions, not visual-only screenshots. Results were read back programmatically (via `document.title`) rather than inferred from screenshots, specifically because an earlier phase of this project found this environment's headless Chrome has an unreliable ~482px minimum viewport floor that makes screenshot-based verification below that width misleading (see Prototyping-phase design log entry for 2026-07-03). Where screenshots are referenced in issue tickets, they're for visual context only — the actual pass/fail determination came from DOM measurement or event-driven assertions. Color contrast ratios were calculated analytically from the exact hex values in each file's Tailwind config, using the standard WCAG relative-luminance formula, not a browser contrast-checker extension (none available here).

This is thorough for a solo, code-level validation pass, but it is **not a substitute for you personally clicking through both prototypes** — recommended before final production handoff regardless of this report's findings.

---

## Retest — 2026-07-03 (same session)

All 3 High-severity issues were fixed immediately after this report's initial draft and reverified before finalizing:

| Issue | Fix | Retest Result |
|-------|-----|----------------|
| ISS-001 (toast contrast) | `success.500` token darkened `#10b981` → `#047857` | Live `getComputedStyle()` contrast calculation on the actual rendered toast: **5.48:1** (was 2.54:1) |
| ISS-002 (touch target) | Category button padding `py-xs` → `py-sm` | Live `getBoundingClientRect()`: **66×47px** (was 66×39px) |
| ISS-003 (keyboard access) | `breakdown-chart-row` changed `<div>` → `<button>` | Confirmed natively focusable (`tabIndex >= 0`), `.focus()` succeeds, drill-down panel still opens correctly |

**Regression testing:** Re-ran the full happy-path save flow (Scenario 01) and drill-down open flow (Scenario 02) after all 3 fixes — both work identically to the original passing results. No regressions found.

**Updated Design System Validation / Accessibility scores:**

| Check | Before | After |
|-------|--------|-------|
| Color contrast | ❌ FAIL (toast 2.54:1) | ✅ PASS (5.48:1) |
| Touch targets | ❌ FAIL (39px) | ✅ PASS (47px) |
| Keyboard navigation | ❌ FAIL (chart rows unreachable) | ✅ PASS (all TS-001-listed elements reachable) |

**Revised Recommendation:** All `must_fix` criteria from TS-001's sign-off checklist are now satisfied. ISS-004 and ISS-005 (both Low) remain open but are explicitly `nice_to_fix` per TS-001 and don't block approval. **Recommend APPROVED**, pending your own manual click-through per this report's Methodology Note.
