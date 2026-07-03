# Issue: Toast lacks an aria-live region

**ID:** ISS-005
**Severity:** Low
**Status:** Open
**Delivery:** DD-001
**Test:** Found during TS-001 screen_reader testing (not a strict TS-001 failure — content is present in the DOM and would be found on next traversal, but isn't proactively announced)

## Description

`home-toast-message` is inserted into the DOM dynamically (on save success) without an `aria-live` region wrapping it, so screen readers won't proactively announce the confirmation — a screen-reader user would need to manually navigate to discover it, and by the time they do, it may have already auto-dismissed (~2.5s).

## Expected

Dynamic status messages that convey important state changes are typically wrapped in `aria-live="polite"` (or `role="status"`) so assistive tech announces them without requiring the user to hunt for them.

## Actual

No `aria-live` attribute on `#toast-root` or individual toast elements.

## Impact

Screen-reader users get no proactive confirmation that their entry saved — for a product whose whole second driving force is "trust that it registered," this is a real (if not currently spec-tested) gap for that user group.

## Design Reference

- `C-UX-Scenarios/01-siddi-logs-an-expense/1.3-home/1.3-home.md` → Toast Message

## Recommendation

Add `role="status" aria-live="polite"` to `#toast-root` in `1.1-home.html`. Low effort, meaningfully improves the experience for screen-reader users without any visual change.
