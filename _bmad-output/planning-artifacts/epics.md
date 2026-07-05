---
stepsCompleted: [1, 2]
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md
  - _bmad-output/planning-artifacts/architecture/architecture-Tracker-2026-07-03/ARCHITECTURE-SPINE.md
  - _bmad-output/D-Design-System/00-design-system.md
  - _bmad-output/C-UX-Scenarios/00-ux-scenarios.md
  - _bmad-output/C-UX-Scenarios/01-siddi-logs-an-expense/01-siddi-logs-an-expense.md
  - _bmad-output/C-UX-Scenarios/01-siddi-logs-an-expense/1.1-home/1.1-home.md
  - _bmad-output/C-UX-Scenarios/01-siddi-logs-an-expense/1.2-home/1.2-home.md
  - _bmad-output/C-UX-Scenarios/01-siddi-logs-an-expense/1.3-home/1.3-home.md
  - _bmad-output/C-UX-Scenarios/02-siddi-reviews-the-month/02-siddi-reviews-the-month.md
  - _bmad-output/C-UX-Scenarios/02-siddi-reviews-the-month/2.1-monthly-breakdown/2.1-monthly-breakdown.md
  - _bmad-output/C-UX-Scenarios/02-siddi-reviews-the-month/2.2-monthly-breakdown/2.2-monthly-breakdown.md
---

# Tracker - Epic Breakdown

## Overview

This document provides the complete epic breakdown for Tracker, decomposing the requirements from the PRD, WDS-pipeline UX artifacts (Design System + UX Scenario page specs), and Architecture Spine into implementable epics. Per project decision, this pass stops at epics — individual stories are created separately via the `bmad-create-story` skill.

## Requirements Inventory

### Functional Requirements

FR-1: Quick-add entry — Home screen shows an always-visible quick-add box (amount field + category buttons); no navigation, modal, or multi-step form required to log.
FR-2: Category selection, with the ability to add a new one — single-tap buttons for seeded presets (Food, Transport, Shopping, Other) plus the option to create a new category by name; new names are matched case-insensitively against existing categories before creating a new one.
FR-3: Save and confirm — saving an entry is immediate (no save-and-wait/confirmation screen beyond the review popup); the entry appears at the top of the list and a toast confirms the save (e.g., "₹150 added to Food"); the running total lives on Monthly Breakdown (FR-7), not Home.
FR-4: Entry list — logged expenses for the current period are visible on the Home screen, each showing amount, category, and time logged.
FR-5: Edit an entry — any logged entry can be corrected in place (amount and/or category) directly from the Home screen.
FR-6: Delete an entry — any logged entry can be removed in place from the Home screen.
FR-7: Live running total (on Monthly Breakdown) — a current-month running total is visible on the Monthly Category Breakdown view and updates whenever that view is opened or the viewed month changes.
FR-8: Monthly Category Breakdown — a separate view shows the current-month running total and per-category totals as a bar chart (largest to smallest), a month selector (prev/next) bounded by the earliest month with any recorded entry through the current month, and a read-only drill-down panel per category listing individual transactions (date + amount, most recent first).
FR-9: Direct, wall-free entry — opening the app lands straight on the Home/Log screen; no login wall, no dashboard, no menu funnel; bookmarkable/pinnable straight to Home.
FR-10: Responsive web — works as a responsive web app across desktop and mobile browsers, touch and mouse/keyboard both supported, mobile and desktop equal priority.

### NonFunctional Requirements

NFR-1: Security & data handling — no login wall (trust boundary is the host device + local network); entries are still personal data, so storage must be encrypted at rest via the host's OS-level full-disk encryption (no application-level DB encryption).
NFR-2: Speed — logging an expense (FR-1–FR-3) should complete well under 5 seconds tap-to-update; this is the mechanism the retention hypothesis depends on, not a nice-to-have.
NFR-3: Accuracy — totals (FR-7, FR-8) must be exact, no estimation or rounding; a number that looks even slightly wrong breaks the trust the whole loop depends on.
NFR-4: Voice & tone — all UI copy (errors, empty states, totals) is plain, direct, neutral, unobtrusive; no judgment, encouragement, or streak language.

### Additional Requirements

- No Repository/Service abstraction layer (AD-1) — Minimal API endpoint handlers call the EF Core `DbContext` directly; files grouped by feature (`Entries/`, `Categories/`), never by technical layer. No starter/greenfield template specified — build from scratch per the Structural Seed folder layout.
- Server-side-only computation for totals (AD-2) — Entry add/edit/delete responses return only the affected entry, never a total; the Monthly Breakdown total and per-category sums are computed server-side by a dedicated month-summary query. Money is `decimal` end-to-end, never `float`/`double`.
- Categories are a DB table, not an enum, with match-or-create dedup (AD-3) — `Category` (`Id`, `Name`, `IsPreset`) seeded with the four presets; case-insensitive match-or-create logic is a single function owned by `Categories/`, called by `Entries/` on entry creation.
- Single process, LAN-only, no auth gate (AD-4) — one ASP.NET Core process serves the API and the Angular production build (published into `wwwroot`) on a single port, reachable only on the local machine/network; no CORS config for external origins, no TLS-for-internet story.
- Month-scoped summary and drill-down queries (AD-5) — a month-summary endpoint (total + per-category sums, earliest-navigable month derived from `MIN(Entry.CreatedAt)`) and an entries-by-month-and-category endpoint (sorted `CreatedAt` descending) backing the read-only drill-down panel. `CreatedAt` is immutable after creation — editing an entry changes `Amount`/`CategoryId` only. EF Core's SQLite provider can't translate `Sum`/`GroupBy` over `decimal` (or reliable `DateTimeOffset` ordering) to SQL — both queries fetch month-bounded rows via `WHERE`, then aggregate/sort in-process (LINQ-to-Objects).
- Schema via EF Core Migrations (not `EnsureCreated()`), including a seed migration for the four preset categories.
- Consistency conventions: integer autoincrement PK (no GUIDs); hard deletes only (no `IsDeleted` column); UTC `DateTimeOffset` dates serialized ISO-8601; every Entry API response nests `category: { id, name }` (never a flat `categoryName`/bare `categoryId`); errors as `ProblemDetails`-shaped JSON (RFC 9457) for all non-2xx responses; all writes are synchronous request/response (no optimistic client-side mutation); config via `appsettings.json` (SQLite file path is the only meaningful setting).
- Every feature service exposes Default/Loading/Error signal state — a consistent shape, not invented per feature.
- Single responsive breakpoint (`bp-mobile` <640px / `bp-desktop` 640px+) governed by one shared constant/media query — no tablet tier, no per-feature hardcoded pivot width.
- Shared Overlay component (Centered Dialog + Drawer/Sheet variants) lives in `client/src/app/shared/components/` from day one, used by both Home's confirm popup and Breakdown's drill-down panel.
- Automated test framework not fixed by the PRD/spine — pick pragmatically during build (e.g. xUnit for the API).

### UX Design Requirements

UX-DR1: Home quick-add box (`home-quickadd`) — amount text input (numeric keyboard on mobile) + 4 fixed single-select category buttons (Food/Transport/Shopping/Other) + custom-category text input (dashed border, expandable, case-insensitive match-or-reuse on submit, no cap on custom categories) + "Add Expense" primary button, disabled until amount > 0 AND a category is set.
UX-DR2: Home recent entries list (`home-recent`) — heading + entry-count dropdown selector (5/10/20, default 10) + repeating tappable entry rows (amount · category); Default/Loading (skeleton rows)/Empty ("No entries yet this month")/Error (inline error + Retry) states; Quick Add must stay usable even if this list fails to load.
UX-DR3: Confirm Entry popup (`home-confirm-popup`, Overlay — Centered Dialog variant, ~360px max-width, same on mobile/desktop) — shows Amount and Category fields with tap-to-edit-inline (pencil icon affixed) reusing the quick-add input/category-selector components; Cancel returns to Home with fields still filled (not cleared); Confirm performs a pessimistic save (inline spinner replaces the Confirm label while saving, no separate overlay) before transitioning; inline error + preserved entry data on save failure.
UX-DR4: Save-confirmation toast (`home-toast`) — top-right, "{amount} added to {category}" (e.g. "₹150 added to Food"), auto-dismisses after ~2.5s; stacks vertically (most recent on top, each with its own independent dismiss timer) when multiple saves happen in quick succession; new-entry row highlight fades in sync with its own toast's timer; quick-add fields reset to idle after a successful save.
UX-DR5: Monthly Breakdown header (`breakdown-header`) — page title + month selector (‹ prev / {month} {year} / next ›); defaults to current month on load; prev arrow disables at the earliest month with any recorded data (data-driven, not a fixed lookback limit); next arrow disables at the current month.
UX-DR6: Monthly Breakdown total (`breakdown-total`) — headline "Total Spent This Month" stat block above the chart, re-fetched on month switch.
UX-DR7: Monthly Breakdown category bar chart (`breakdown-chart`) — horizontal bars, one row per category, sorted largest to smallest, width relative to the largest category within the *selected* month (re-normalizes per month), amount labeled at bar end; each row opens the category drill-down panel on click/tap; Default/Loading (skeleton)/Empty ("No entries for {Month} {Year}", no CTA)/Error (inline error + Retry) states.
UX-DR8: Category drill-down panel (`breakdown-drilldown-panel`, Overlay — Drawer/Sheet variant) — desktop: right-side fixed-width drawer over a dimmed chart; mobile: full-screen sheet (drawer doesn't fit a 375px viewport); shows category name + close (×) + read-only repeating transaction rows (date · amount, most recent first, `CreatedAt` descending); no edit/delete actions in this panel by explicit decision; Default/Loading (skeleton)/Error (inline error + Retry) states.
UX-DR9: Responsive breakpoint behavior — single tier, `bp-mobile` (<640px) / `bp-desktop` (640px+): Home switches from stacked single-column (mobile) to two-column (Quick Add left ~400px / Recent Entries right, mobile) layout; category buttons wrap to 2 rows on mobile vs. 1 row on desktop; Breakdown header goes from stacked (mobile) to inline title+selector (desktop); bar chart labels move above each bar on mobile vs. beside the bar on desktop.
UX-DR10: Shared Overlay component — two variants (Centered Dialog for write/confirm flows; Drawer/Sheet for read-only detail) sharing scrim/dim behavior, `space-lg` padding, `space-md` element gap, and Default/Loading (skeleton)/Error (inline error + retry) states; built once in shared components and reused by both the Home confirm popup and the Breakdown drill-down panel from day one.
UX-DR11: Design tokens — all spacing uses the `space-3xs`…`space-3xl` scale and all typography uses the `text-xs`…`text-3xl` scale; no raw pixel values in any Angular component styles.

### FR Coverage Map

FR1: Epic 1 - Quick-add box
FR2: Epic 1 - Category selection + creation
FR3: Epic 1 - Save and confirm (toast)
FR4: Epic 1 - Entry list
FR5: Epic 1 - Edit entry
FR6: Epic 1 - Delete entry
FR7: Epic 2 - Live running total
FR8: Epic 2 - Monthly breakdown + category drill-down
FR9: Epic 1 - Direct, wall-free entry
FR10: Epic 1 & 2 - Responsive web (both screens carry their own responsive diff)

## Epic List

### Epic 1: Log an Expense (Home)

Siddi can open the app straight to Home and capture an expense in a couple of taps — enter an amount, pick or create a category, confirm, see it saved with a toast, and correct or delete it in place if needed. This epic also lays the foundation both epics build on: the `Category`/`Entry` data model, EF Core migrations + preset seed, and the shared Overlay component (Centered Dialog variant built here; Drawer/Sheet variant stubbed for reuse by Epic 2).

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR9, FR10 (Home's responsive diff)

**Implementation notes:** `server/Entries/`, `server/Categories/`, `server/Data/` (DbContext + migrations), `client/src/app/home/`, `client/src/app/shared/components/` (Overlay).

### Epic 2: Review the Month (Monthly Breakdown)

Siddi can open the Monthly Category Breakdown, see the exact month total and a per-category bar chart, browse past months, and drill into any category's line items to spot-check the number against memory. Builds on Epic 1's `Entry`/`Category` data but is a fully standalone screen and user outcome.

**FRs covered:** FR7, FR8, FR10 (Breakdown's responsive diff)

**Implementation notes:** month-summary + drill-down endpoints in `server/Entries/` (AD-5), `client/src/app/monthly-breakdown/`, reuses the shared Overlay's Drawer/Sheet variant from Epic 1.

**Cross-cutting (applied within stories of both epics, not a separate epic):** NFR1 (security/deployment — single-process, LAN-only, no-auth hosting), NFR2 (speed), NFR3 (accuracy — `decimal` money, server-computed totals), NFR4 (tone/copy).
