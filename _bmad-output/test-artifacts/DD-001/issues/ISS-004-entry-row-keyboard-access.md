# Issue: Recent Entries rows not keyboard-accessible

**ID:** ISS-004
**Severity:** Low
**Status:** Open
**Delivery:** DD-001
**Test:** Found during TS-001 keyboard_navigation testing (not explicitly listed in TS-001's required keyboard targets)

## Description

`home-recent-entry-row` elements are `<div>`s with a `click` listener (currently just a console log placeholder, since edit/delete is explicitly out of scope for this prototype per spec) and no `tabindex`/`role`.

## Expected

N/A for this prototype's current scope — TS-001's `keyboard_navigation` list does not include Recent Entries rows among required keyboard targets, and the spec (`1.1-home.md`) defers the edit/delete interaction to "Phase 3 scope."

## Actual

Not keyboard-focusable.

## Impact

None today, since there's no real functionality behind the click yet. Will become a real accessibility gap once edit/delete is implemented (Phase 3), if not addressed then.

## Design Reference

- `C-UX-Scenarios/01-siddi-logs-an-expense/1.1-home/1.1-home.md` → Page Sections → Entry Row (repeating)

## Recommendation

Not blocking for this delivery. Flag for whoever implements the edit/delete interaction later — same `<button>`-instead-of-`<div>` fix as ISS-003 applies.
