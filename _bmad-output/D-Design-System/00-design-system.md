# Design System: Tracker

**Method:** Whiteport Design Studio (WDS)
**Created:** 2026-07-02

---

## Spacing Scale

> All page specs reference these token names — never raw pixel values.

| Token | Value |
|-------|-------|
| `space-3xs` | 2px |
| `space-2xs` | 4px |
| `space-xs` | 8px |
| `space-sm` | 12px |
| `space-md` | 16px |
| `space-lg` | 24px |
| `space-xl` | 32px |
| `space-2xl` | 48px |
| `space-3xl` | 64px |

---

## Type Scale

| Token | Size | Line Height | Typical Use |
|-------|------|-------------|-------------|
| `text-xs` | 12px | 1.4 | Captions, helper text |
| `text-sm` | 14px | 1.4 | Secondary text, labels |
| `text-md` | 16px | 1.5 | Body text (default) |
| `text-lg` | 18px | 1.4 | Emphasized body |
| `text-xl` | 20px | 1.3 | Section headings (H2) |
| `text-2xl` | 24px | 1.25 | Page headings (H1, mobile) |
| `text-3xl` | 30px | 1.2 | Page headings (H1, desktop) / headline numbers |

**Typeface:** default (system font stack) — no custom typeface specified yet.

---

## Breakpoints

> Defined 2026-07-03 when responsive diffs were added for Scenario 01 (desktop) and Scenario 02 (mobile). Matches the viewport widths already used in the approved base wireframes.

| Token | Range | Reference width used in specs |
|-------|-------|-------------------------------|
| `bp-mobile` | up to 639px | 375px (1.1–1.3 base) |
| `bp-desktop` | 640px and up | 900px (2.1–2.2 base) |

Single breakpoint for this project — audience-of-one scope doesn't need a tablet-specific tier. Below `bp-desktop`, all pages use the mobile layout; at or above it, the desktop layout.

---

## Patterns

> Recurring spacing/interaction patterns tracked from page specs. A pattern moves to Components once it's reused a second time (see Overlay below); single-use patterns stay here as candidates.

### Toast Notification

**Seen once:** 1.3-home (entry-saved confirmation)

Top-right notification, auto-dismisses on a timer (~2.5s), stacks vertically when multiple fire in quick succession. Candidate for extraction — revisit if a second use appears elsewhere (e.g. a future save-confirmation on another page).

### Horizontal Bar Chart

**Seen once:** 2.1-monthly-breakdown (per-category totals)

Bars sorted largest-to-smallest, width relative to the largest value in the current data set, amount labeled at the bar end (desktop) or above the bar (mobile). Each bar row is a semantic `<button>` (not a `<div>` with a click handler) — natively keyboard-reachable and Enter/Space-activatable, per DD-001 acceptance testing (ISS-003). Candidate for extraction — revisit if a second chart use appears elsewhere.

---

## Components

> Populated as pages are specified and components are defined. A component is extracted here once a pattern has been reused (not on first use) — see `Patterns` above for single-use candidates.

### Overlay

**Extracted:** 2026-07-03 — after its 2nd use (1.2 confirm popup, 2.2 drill-down panel)

A layer that dims the background page content and presents focused content on top of it. Two variants share the dimming/scrim behavior but differ in placement and purpose:

| Variant | Used by | Placement | Purpose |
|---------|---------|-----------|---------|
| **Centered Dialog** | 1.2 (`home-confirm-popup`) | Centered, fixed max-width (~360px), same on mobile and desktop | Write — confirm/edit an in-progress action before committing |
| **Drawer / Sheet** | 2.2 (`breakdown-drilldown-panel`) | Desktop: right-side drawer, fixed width. Mobile: full-screen sheet, slides up | Read-only — supporting detail for something already committed |

**Shared properties:**
- Dims background content (scrim) while open
- Padding: `space-lg`
- Element gap: `space-md`
- States: Default (open), Loading (skeleton content), Error (inline error + retry)

**Variant-specific:**
- Centered Dialog: has a footer action row (e.g. Cancel/Confirm); fields within it can be independently editable
- Drawer/Sheet: has a single close (×) control, no footer actions; content is read-only

**Not yet unified further:** the two variants remain distinct entries under one component rather than a single configurable component, since their content models differ (form fields vs. read-only list). Revisit if a third instance suggests a more general shape.

---

_Created using Whiteport Design Studio (WDS) methodology_
