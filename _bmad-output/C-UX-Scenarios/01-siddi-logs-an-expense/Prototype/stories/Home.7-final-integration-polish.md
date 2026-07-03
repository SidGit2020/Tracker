# Story Home.7: Home - Final Integration Polish

**Page**: 1.1-1.3 Home
**Section**: 7 of 7
**Complexity**: Simple
**Estimated Time**: 10 minutes

---

## 🎯 Goal

Cross-state consistency pass (repeated log → confirm → save loops) and edge cases (duplicate custom category, month-boundary demo data) — the last gate before calling the prototype done.

---

## 📋 What Was Checked — and a Real Bug Found & Fixed

Built an instrumented copy of the real `1.1-home.html` that drives the actual DOM (native `input`/`click` events dispatched at real elements — not a harness, not mocked functions) through two full log→confirm→save loops back to back:

1. Log Rs 77 / Food → Confirm
2. Log Rs 33 / typed "food" (lowercase, testing the case-insensitive dedup) → Confirm

**Bug found**: the first run showed the newly-saved entry sorting *below* the seed demo data instead of at the top. Root cause: `data/demo-data.js`'s most recent seed entry was timestamped `2026-07-03T08:12:00Z` ("today," same calendar day as the session), but the actual system clock at test time was `06:31 UTC` — *before* 08:12. Since `PrototypeAPI.addEntry()` stamps new entries with the real current time, a same-day save made before 08:12 UTC would sort below that seed entry. This wasn't a logic bug in the sort/render code — it was demo data dated into the future relative to real test time, which would have confused a human tester too if they opened the file before ~1:41pm IST today.

**Fix**: shifted every seed entry in `data/demo-data.js` (and the mirrored `data/demo-data.json`) back by one calendar day, so nothing is dated "today." A newly-saved entry — always stamped with whatever "now" actually is — is therefore guaranteed to sort first regardless of what time of day it's tested. Re-ran the same instrumented test after the fix: new entry correctly appeared at position 0.

---

## ✅ Results (after fix)

| # | Criterion | Expected | Result |
|---|-----------|----------|--------|
| 1 | New entry sorts to top | `home-recent-entry-row` position 0 | ✓ Pass — `R0=Rs 77 Food` on first save |
| 2 | Loop repeats cleanly | Second save doesn't corrupt or duplicate state | ✓ Pass — `R0=Rs 33 Food`, `R1=Rs 77 Food` after second save (correct order, both entries present) |
| 3 | Case-insensitive custom category merge | Typed "food" reuses "Food," doesn't create a duplicate category | ✓ Pass — row displays "Food" (preset spelling), not "food" |
| 4 | Quick Add resets after every save | Amount input empty | ✓ Pass — `reset=true` confirmed after both loops |
| 5 | Toast stacking survives repeated use | Independent toasts, no interference between loops | ✓ Pass — `toasts=2` visible at the check point (~1.6s after the second save, both toasts' 2.5s timers still running) |

**All 5 checks passed after the demo-data fix.** No other issues found during this pass.

---

## 🧪 Verification Method

Real DOM event simulation (`element.click()`, native `<input>` value setter + `dispatchEvent(new Event('input'))`) against a temporary instrumented copy of the actual file, run through headless Chrome with `--dump-dom`, reading results back via `document.title`. Temporary files were deleted after each run — nothing left behind in the prototype folder. This is the closest approximation to a real click-through available without an interactive automation tool, but it is still not the same as a human actually using the interface — recommend a real pass before treating this as fully signed off.

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review

---

## 🔄 Changes from Original Plan

- Fixed a real bug found during this section: `data/demo-data.js` / `data/demo-data.json` seed timestamps shifted back one day each to eliminate a same-day sort-order race between seed data and newly-saved entries. See file header comments in both data files for the rationale.
