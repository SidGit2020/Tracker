# Story Home.6: Home - Responsive Diff Validation

**Page**: 1.1-1.3 Home
**Section**: 6 of 7
**Complexity**: Simple
**Estimated Time**: 10 minutes

---

## 🎯 Goal

Verify the mobile (`bp-mobile`, 375px reference) and desktop (`bp-desktop`, 900px reference) layouts match each page spec's Responsive Diff section exactly, and exercise the toast/popup rendering paths that Sections 4-5 could only verify by static code review.

---

## 📋 What Was Checked

Since no interactive automation tool (Puppeteer) is available, and this environment's headless Chrome has a ~482px viewport floor (see Home.1), verification used two techniques instead of trusting raw screenshots below ~482px:

1. **Fixed-width DOM harnesses** — isolate real markup/classes inside a `width:311px` (mobile content area) or `width:836px` (desktop content area) container, independent of the browser's actual viewport, then read `getBoundingClientRect()` directly.
2. **Direct function calls** — since `pages/home.js` is a classic (non-module) script, its top-level functions are `window` properties. Called `window.showToast()` and `window.openConfirmPopup()`/`window.closeActiveOverlay()` directly against the *real* loaded page (not a harness) to exercise DOM paths that normally only run after a user click.

---

## ✅ Results

| # | Criterion | Expected (from spec) | Result |
|---|-----------|----------------------|--------|
| 1 | Mobile: Quick Add + Recent Entries stacked | Single column | ✓ Pass — confirmed in Home.1/Home.3 screenshots; sections render in document order inside `flex-col` |
| 2 | Mobile: category buttons wrap 2 rows | Food/Transport/Shopping row 1, Other row 2 | ✓ Pass — see Home.2 (`tops=0,0,0,46` in the 311px harness) |
| 3 | Desktop: two-column (Quick Add ~400px left, Recent Entries fills remainder) | `desktop:w-[400px] desktop:shrink-0` / `flex-1` | ✓ Pass — confirmed via headless screenshot at 900px width (Quick Add card ~400px, Recent Entries card fills the rest, category text visible) |
| 4 | Desktop: all 4 category buttons fit one row | `desktop:flex-nowrap` | ✓ Pass — confirmed via `diag.html` breakpoint test: `aWidth=400` (desktop cap engaged) at 642px viewport, and visually in the 900px screenshot (all 4 buttons on one line) |
| 5 | Breakpoint switches exactly at 640px | `bp-desktop: 640px and up` | ✓ Pass — measured `aWidth=570` (full-width, mobile) at 602px viewport vs `aWidth=400` (capped, desktop) at 642px viewport, bracketing the 640px threshold correctly |
| 6 | 1.2 popup centers over either layout, unchanged itself | Same Object IDs/behavior on both breakpoints | ✓ Pass — `openOverlay()` has no breakpoint-conditional code path; scrim + `max-w-[360px]` dialog render identically regardless of viewport, confirmed by calling `window.openConfirmPopup()` directly and reading `#popup-root`'s DOM (dialog present, correct classes, scrim present) |
| 7 | Toast: appears, stacks, positioned top-right | `home-toast`, `#toast-root` fixed top-right | ✓ Pass — called `window.showToast('test')` twice in immediate succession; `#toast-root` contained 2 `.home-toast` children, most-recent-first (prepend order confirmed) |
| 8 | No horizontal scroll at either breakpoint | `docWidth === innerWidth` | ✓ Pass at 602px and 642px test points (`bodyScrollWidth` / `docWidth` matched `innerWidth` in the `diag.html` harness — no overflow) |

**All 8 checks passed.** No layout defects found in either breakpoint.

**Additional finding during visual verification**: a screenshot of the open Confirm Popup showed what looked like a bordered/input-style box around the read-view Amount field. Investigated by comparing against the unfocused Category field (which showed no such box) — confirmed this is the browser's **default focus ring**, correctly applied because `openOverlay()` deliberately focuses the dialog's first focusable element for accessibility (`focus states visible` is an explicit item in this project's testing checklist). Not a defect. While investigating, added defensive `bg-transparent border-0 p-0 appearance-none` classes to both `home-confirm-amount` and `home-confirm-category` read-view buttons anyway, since unstyled `<button>` elements can otherwise pick up native OS chrome in some browsers (harmless, general-practice hardening, not a fix for an actual bug).

---

## 🧪 Known Verification Gap

This is code-level + isolated-harness verification, **not** a live human click-through. It doesn't catch: real visual polish (alignment, spacing that "looks right" vs. "measures right"), font-rendering issues, or interaction feel (tap target comfort, animation smoothness). Recommend the user do a real pass in an actual browser, especially at true mobile width (resize below 640px or use DevTools device toolbar) since that's exactly the range this environment's tooling can't screenshot reliably.

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review

---

## 🔄 Changes from Original Plan

- None — verification method adapted (harness + direct function calls instead of Puppeteer) but coverage matches the original section scope.
