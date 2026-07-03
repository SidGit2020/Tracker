# Story Home.3: Home - Recent Entries List

**Page**: 1.1-1.3 Home
**Section**: 3 of 7
**Complexity**: Medium
**Estimated Time**: 20 minutes

---

## 🎯 Goal

Heading, count selector (5/10/20, default 10), entry rows (amount + category), and the Loading / Empty / Error states from the 1.1 spec.

---

## 📋 What Was Built

`renderRecentEntries()` in `pages/home.js`, mounted into `#recent-entries-root`:

- `home-recent-heading` — "Recent Entries"
- `home-recent-count-selector` — `<select>` with 5/10/20 options, default 10; `change` re-renders with the new slice limit
- `home-recent-entry-row` — amount + category, `title` attribute noting edit/delete is out of scope for this prototype (spec defers it to "Phase 3 scope"); click logs to console rather than a dead click
- **Loading**: 3 pulsing skeleton bars, shown for the first 500ms after page load (simulated fetch latency) — Quick Add remains interactive throughout, per spec ("Quick Add stays usable even if the Recent Entries list fails to load")
- **Empty**: centered "No entries yet this month" text, no CTA — shown automatically if `PrototypeAPI.getEntries()` is empty after the load delay
- **Error**: inline message + Retry button — not auto-triggered (no real backend to fail); reachable via the Prototype Controls panel (see Home.5) for manual testing

**Known scope decision** (documented in the work file's edge cases): entries here are **not** month-filtered — the spec's wording ("No entries logged yet this month") describes the expected common case for a freshly-launched app, but no month-scoping interaction exists on this page (that's the Monthly Breakdown page's job, scenario 02). Demo data intentionally includes one June 30 entry to make this visible.

---

## ✅ Acceptance Criteria

### Agent-Verifiable

| # | Criterion | Expected | Result |
|---|-----------|----------|--------|
| 1 | Count selector limits rows | 5/10/20 | ✓ Pass (code review — `entries.slice(0, state.entriesCountLimit)`) |
| 2 | Entries sorted newest-first | `createdAt` descending | ✓ Pass — confirmed via headless screenshot at 900px width (entry-009, 08:12 Jul 3, listed first) |
| 3 | Loading → Default/Empty transition | Skeleton for ~500ms then real content | ✓ Pass (code review — `setTimeout(500)` in `initPage()`) |
| 4 | Quick Add usable during Loading | Not blocked | ✓ Pass — sections render independently, no shared disabled state |

### User-Evaluable (Qualitative)

- [ ] Skeleton loading doesn't feel jarring/too long or too short
- [ ] Empty state message reads naturally

---

## 🧪 How This Was Tested

Code review + one headless-Chrome screenshot at 900px (desktop breakpoint, ≥ the ~482px reliable-viewport floor in this environment — see Home.1) confirming real demo data renders correctly with amount + category both visible, sorted newest-first. Error-state manual trigger (Prototype Controls panel) has not been clicked through live by the agent.

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review
**Notes**: Retroactively documented.

---

## 🔄 Changes from Original Plan

- Added a manual state-simulation hook (Prototype Controls panel, built in Home.5) since there's no real backend to naturally trigger the Error state — not in the original section scope, called out here for traceability.
