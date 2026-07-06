---
baseline_commit: 9099ebeec28d78a876af45a21c39b3d2053d7565
---

# Story 2.1: Monthly Breakdown — Total, Category Bar Chart, Month Navigation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user of Tracker (Siddi),
I want to open a Monthly Category Breakdown page that shows this month's total spend and a per-category bar chart, and browse back through past months,
so that I can replace a vague feeling of overspending with a specific, exact number — the "trust the number" prerequisite behind the whole habit.

**Scope note:** This story builds the `2.1-monthly-breakdown` page only: header + month selector, total summary, and the category bar chart, in all four page states (Default/Loading/Empty/Error), fully responsive. It does **not** build the category drill-down panel (`2.2-monthly-breakdown`) — that is a separate story (`2-2-category-drilldown`). Category bar rows are visually complete per the design spec (hover/pointer affordance aside) but **not wired to open anything on click/tap** in this story; wiring the click to open the drill-down panel is explicitly `2-2`'s job, once the Overlay Drawer/Sheet variant it opens actually exists. Do not build the Overlay Drawer/Sheet variant here.

This is the first story to add a second route/page to the Angular app (`client/src/app/monthly-breakdown/`, alongside the existing `home/`) and the first to add a server-side aggregation endpoint. It builds directly on Story 1.1's `Category`/`Entry` data model and Story 1.2's `Entries` CRUD endpoints, `RequestState<T>` signal shape, and design-token/breakpoint setup — do not recreate any of that.

**Navigation:** One-directional nav link only — Breakdown links back to Home (a muted "+ Log an expense" text link in the header, `breakdown-header-home-link`), so Siddi can jump to logging after reviewing. Home stays link-free; FR-9's wall-free/no-menu-funnel design is not reopened by this. This was an open UX gap resolved via a WDS design pass on 2026-07-06 — see `2.1-monthly-breakdown.md`'s Header section (formal spec, supersedes any earlier "no nav" assumption).

## Acceptance Criteria

**Backend — Month-Summary Endpoint**

1. `GET /api/entries/monthly-summary` (no query params) returns the **current month's** summary, using the same host-local-calendar-month-converted-to-UTC-bounds convention as the existing `GET /api/entries`. Response shape: `{ year, month, totalAmount, categories: [{ category: { id, name }, amount }], earliestYear, earliestMonth }` — `categories` sorted largest-to-smallest by `amount`, **only including categories with at least one entry in that month** (no zero-amount rows). [Source: prd.md#FR-7,FR-8; ARCHITECTURE-SPINE.md#AD-2,#AD-5; 2.1-monthly-breakdown.md]
2. `GET /api/entries/monthly-summary?year={year}&month={month}` returns the summary for that specific month, same response shape. `month` outside 1–12, or a `year`/`month` combination later than the server's current host-local month, → 400 `ProblemDetails` (no browsing into the future — enforced server-side, not just via a disabled client button). [Source: 2.1-monthly-breakdown.md — "Next arrow disables at the current month"; ARCHITECTURE-SPINE.md#AD-5]
3. `earliestYear`/`earliestMonth` are derived from `MIN(Entry.CreatedAt)` across **all** entries (not month-scoped) — not a configured/hardcoded lookback limit. If no entries exist at all, `earliestYear`/`earliestMonth` equal the current year/month (nothing to browse, both selector arrows effectively disabled). [Source: ARCHITECTURE-SPINE.md#AD-5]
4. `totalAmount` and each category `amount` are `decimal`, computed **server-side only** by summing/grouping the month's entries — never a client-derived sum, never `float`/`double`. [Source: prd.md#Non-Functional Requirements — Accuracy; ARCHITECTURE-SPINE.md#AD-2]
5. No `IRepository`/`IService` layer — the new endpoint handler calls `TrackerDbContext` directly, same as the existing `Entries` endpoints. Lives in `server/Entries/` (same feature folder/file as the CRUD endpoints), not a new top-level feature. [Source: ARCHITECTURE-SPINE.md#AD-1; #Structural Seed]
6. All non-2xx responses (invalid month, future month) use the `ProblemDetails` (RFC 9457) shape, consistent with the existing `Entries` endpoints. [Source: project-context.md#Coding Standard Rules]

**Frontend — Header & Month Navigation**

7. New route `/monthly-breakdown` renders a new `MonthlyBreakdownComponent` (`client/src/app/monthly-breakdown/`), added to `app.routes.ts` alongside the existing `''` (Home) route. [Source: ARCHITECTURE-SPINE.md#Structural Seed; Scope note above]
8. Header (`breakdown-header`) shows page title "Monthly Category Breakdown" (`breakdown-header-title`) and a month selector (`breakdown-header-month-selector`, "‹ {month} {year} ›", e.g. "June 2026"). Defaults to the current month on initial page load (i.e. the first request omits `year`/`month`, then use the `year`/`month` echoed back in the response as the active month going forward — never compute "current month" independently on the client). [Source: 2.1-monthly-breakdown.md — Header section]
9. Prev arrow steps one month back and disables once `earliestYear`/`earliestMonth` (from the summary response) is reached. Next arrow steps one month forward and disables at the current month (no fixed lookback limit, no future browsing). Switching months re-fetches the summary and re-normalizes the chart. [Source: 2.1-monthly-breakdown.md — Month Selector behavior]
10. Header includes a `breakdown-header-home-link` — a plain text link, "+ Log an expense", muted `text-sm` (no button chrome, no CTA styling — plain/neutral tone), navigating to Home (`/`). This is the only nav link in either direction: Home itself gets no reciprocal link back to Breakdown. [Source: 2.1-monthly-breakdown.md — Home Link section; project-context.md — plain/neutral tone]

**Frontend — Total & Bar Chart**

11. Total Summary section (`breakdown-total`) shows label "Total Spent This Month" (`breakdown-total-label`) and the month's `totalAmount` (`breakdown-total-amount`), e.g. "Rs 12,450". [Source: 2.1-monthly-breakdown.md — Total Summary section]
12. Category Bar Chart (`breakdown-chart`, repeating `breakdown-chart-row`) renders one row per category returned by the summary response, in the **server-given order** (already sorted largest-to-smallest — do not re-sort client-side), bar width proportional to that category's `amount` relative to the **largest category in the currently selected month** (re-normalizes every month switch, not a fixed absolute scale), with the category name and amount labeled. Each row is a semantic `<button>` element (native Tab-reachability and Enter/Space-activation, per the design spec's keyboard-accessibility requirement — DD-001/ISS-003), but has **no click handler wired up** in this story — activating it does nothing yet (see Scope note; wiring it to open the drill-down panel is `2-2`'s job). [Source: 2.1-monthly-breakdown.md — Category Bar Chart section, Technical Notes]
13. Desktop (`bp-desktop`): bar row shows label left of the bar, amount at the bar's end, in a single row; header title, home link, and month selector inline in one row. Mobile (`bp-mobile`): bar row shows label + amount stacked above the bar (two rows per category, since narrow width squeezes long category names); header stacked (title, then home link, then month selector). Both breakpoints use the **same shared `bp-mobile`/`bp-desktop` constant/media query already established in `client/src/styles/_design-tokens.scss`** — do not define a new breakpoint. [Source: 2.1-monthly-breakdown.md — Responsive Diff table; project-context.md — single breakpoint rule]
14. Spacing/typography use only design tokens (no raw pixel values): page padding `space-xl` desktop / `space-md` mobile; bar row gap `space-lg` desktop / `space-md` mobile; total amount `text-3xl` bold; category name/amount labels `text-sm`; home link `text-sm`. [Source: 2.1-monthly-breakdown.md — Spacing/Typography tables; project-context.md — no raw pixel values]

**Page States**

15. Default: selected month has ≥1 entry — total + chart populated. Loading: month data fetching (initial load or after month switch) — total + chart area show skeleton placeholders. Empty: selected month has zero entries — chart area replaced with centered text "No entries for {month} {year}" (e.g. "No entries for May 2026"), no CTA (logging happens on Home, not here). Error: summary fails to load — inline error + Retry, month selector remains usable. [Source: 2.1-monthly-breakdown.md — Page States table]

**Testing**

16. Backend: xUnit + `WebApplicationFactory` integration tests for the month-summary endpoint — current-month default (no params), explicit past month, a month with zero entries (empty `categories` array), invalid `month` (e.g. 0 or 13) → 400, a future month → 400, and `earliestYear`/`earliestMonth` correctness against seeded out-of-range entries (including the no-entries-at-all case).
17. Frontend: Vitest tests for month-selector prev/next enable/disable logic at both boundaries (earliest month, current month), bar-width relative-scaling math (re-normalizes per month), category sort order is rendered as received (not re-sorted), chart rows render as `<button>` elements (not `<div>`), the home link navigates to `/`, and the four page states (Default/Loading/Empty/Error).

## Tasks / Subtasks

- [x] Task 1: `GET /api/entries/monthly-summary` endpoint (AC: #1, #2, #3, #4, #5, #6)
  - [x] Add `MonthlySummaryResponse`/`CategoryTotalDto` records to `server/Entries/EntriesModels.cs`
  - [x] Add the handler to `server/Entries/EntriesEndpoints.cs`, mapped as `group.MapGet("/monthly-summary", GetMonthlySummary)` on the existing `/api/entries` group
  - [x] Compute the target month: if `year`/`month` query params are absent, use the host's current local month (same `DateTimeOffset.Now`-based bounds logic as `GetEntries`); otherwise use the given `year`/`month`, converted to UTC bounds the same way
  - [x] Validate `month` is 1–12 and the requested year/month is not later than the server's current local month → 400 `ProblemDetails` otherwise
  - [x] Materialize **all** entries via `.Include(e => e.Category).ToListAsync()` first (do not attempt a `WHERE` on `DateTimeOffset` — see Dev Notes), then filter to the target month's bounds, group by category, sum `Amount` per group, sort descending, exclude zero-entry categories, all in-process (LINQ-to-Objects)
  - [x] Compute `earliestYear`/`earliestMonth` from `MIN(CreatedAt)` over the same materialized full entry list (in-process, not a SQL aggregate); if no entries exist at all, use the current year/month
- [x] Task 2: Backend integration tests (AC: #16)
  - [x] Extend `tests/Tracker.Server.Tests/EntriesEndpointsTests.cs` (or a new `MonthlySummaryEndpointTests.cs` alongside it) using the existing `WebApplicationFactory`/in-memory-SQLite pattern from Story 1.2
  - [x] Cover: default current-month call, explicit past-month call, empty month, invalid month (0/13), future month rejection, earliest-month boundary (including zero-entries-ever case)
- [x] Task 3: Shared API model + service (AC: #7, #8, #9)
  - [x] `client/src/app/shared/api/monthly-summary.model.ts` — `MonthlySummary` interface (`year`, `month`, `totalAmount`, `categories: { category: Category; amount: number }[]`, `earliestYear`, `earliestMonth`), reusing the existing `Category` interface from `entry.model.ts`
  - [x] `client/src/app/shared/api/monthly-summary.service.ts` — signal-based service exposing `RequestState<MonthlySummary>` (reuse the existing `RequestState<T>` type, don't invent a new shape), with a `load(year?: number, month?: number)` method calling `GET /api/entries/monthly-summary`
- [x] Task 4: Add `/monthly-breakdown` route (AC: #7)
  - [x] Add `MonthlyBreakdownComponent` to `app.routes.ts` at path `monthly-breakdown`, alongside the existing `''` (Home) route
- [x] Task 5: Header, home link, and month selector (AC: #8, #9, #10)
  - [x] `client/src/app/monthly-breakdown/` feature folder; header component with title, home link, and prev/next month-selector button group
  - [x] On init, call `load()` with no args (current month); track the active `year`/`month` from the response, not computed locally
  - [x] Prev/next handlers call `load(year, month)` for the adjacent month; disable prev at `earliestYear`/`earliestMonth`, disable next at the response's own `year`/`month` (i.e. can't go past "current")
  - [x] `breakdown-header-home-link`: plain `text-sm` muted link, "+ Log an expense", routes to `/` — no reciprocal link added to Home
- [x] Task 6: Total summary + bar chart (AC: #11, #12, #13, #14)
  - [x] Total summary component/section rendering `totalAmount`
  - [x] Bar chart component rendering `categories` in given order as `<button>` rows (no click handler yet), bar width computed relative to the first (largest) item each render, no sort logic in the component
  - [x] Responsive layout using the existing `bp-mobile`/`bp-desktop` mixin from `client/src/styles/_design-tokens.scss`; only spacing/type tokens, no raw pixel values
- [x] Task 7: Page states (AC: #15)
  - [x] Default/Loading(skeleton)/Empty("No entries for {month} {year}")/Error(inline + Retry) driven off the `MonthlySummaryService`'s `RequestState`
- [x] Task 8: Frontend tests (AC: #17)
  - [x] Vitest specs for month-selector boundary disabling, home-link navigation, bar-width scaling/re-normalization on month switch, render-order-matches-response (no re-sort), chart rows are `<button>` elements, and all four page states

## Dev Notes

- **EF Core SQLite cannot translate a `WHERE` on `DateTimeOffset` at all — this is worse than the architecture spine assumed.** AD-5's caveat only calls out `Sum`/`GroupBy`/`OrderBy`, but Story 1.2's actual implementation found the SQLite provider throws `InvalidOperationException` on a `WHERE` filter over `DateTimeOffset` bounds too, not just aggregate/sort operations. The fix already established in `GetEntries` (`server/Entries/EntriesEndpoints.cs`) is to `.ToListAsync()` the **entire** `Entries` table first, then filter/group/sum/sort/min entirely in-process (LINQ-to-Objects). Apply the identical pattern here — don't attempt a `WHERE` clause and rediscover the same failure. [[1-2-home-screen.md#Debug Log References]]
- **Reuse `RequestState<T>`** (`client/src/app/shared/api/request-state.ts`) for the new service's signal — this is the shape Story 1.2 explicitly established for every later feature service to reuse, this being that "later feature." Don't invent a `MonthlySummaryState` union type. [[project-context.md#Coding Standard Rules]]
- **No `CategoryMatcher` call anywhere in this story.** Month-summary is read-only aggregation over existing entries/categories — there's no category creation or name-matching involved. Don't route anything through `CategoryMatcher.MatchOrCreateAsync`.
- **No Overlay usage.** The Overlay Drawer/Sheet variant belongs to `2-2-category-drilldown`, triggered by clicking a bar row. This story explicitly ships bar rows with no click handler — see Scope note. Do not pre-build click wiring or a placeholder panel "for later."
- **Bar rows must still be real `<button>` elements despite having no handler.** The design spec (`2.1-monthly-breakdown.md`, formalized from DD-001's closed accessibility issue ISS-003) requires `breakdown-chart-row` to be a semantic `<button>`, not a `<div>` — this is a keyboard-accessibility requirement independent of what happens on activation. Build it as a `<button>` now (inert until `2-2` wires a handler) to avoid swapping element types later.
- **Reuse the existing breakpoint mixin/tokens** from `client/src/styles/_design-tokens.scss` (established in Story 1.2) — the single `bp-mobile`/`bp-desktop` constant, spacing scale (`space-3xs`…`space-3xl`), and type scale (`text-xs`…`text-3xl`). Do not define a second breakpoint constant for this page.
- **Money stays `number` on the client, `decimal` on the server** — same as `Entry.amount` in `entry.model.ts` already does. Don't introduce a decimal library client-side; this precedent is already set and untouched by Story 1.2's review.
- **Nav link is one-directional only: Breakdown → Home.** Resolved via a WDS design pass on 2026-07-06 (see Scope note and AC #10) — don't add a reciprocal link from Home to Breakdown; Home's wall-free, zero-friction entry point (FR-9) is deliberately not touched by this.
- **Testing frameworks carry forward unchanged from Story 1.2:** xUnit + `Microsoft.AspNetCore.Mvc.Testing`/`WebApplicationFactory<Program>` (backend, already referenced by `Program` via `public partial class Program;`), Vitest (frontend, Angular 22 default). Don't introduce a new framework.
- **Bar chart is currently a single-use "Pattern," not an extracted Design System "Component"** (per `00-design-system.md` convention: patterns extract to components on their 2nd use). Build it as a normal component in `monthly-breakdown/`; no need to over-generalize it for reuse it doesn't have yet.

### Project Structure Notes

- Matches Structural Seed for what this story adds:
  ```
  server/
    Entries/
      EntriesModels.cs          # UPDATE — add MonthlySummaryResponse/CategoryTotalDto records
      EntriesEndpoints.cs       # UPDATE — add GET /api/entries/monthly-summary handler
  client/
    src/app/
      app.routes.ts             # UPDATE — add 'monthly-breakdown' route
      monthly-breakdown/        # NEW — header/month-selector, total summary, bar chart components
      shared/
        api/
          monthly-summary.model.ts    # NEW
          monthly-summary.service.ts  # NEW
  tests/
    Tracker.Server.Tests/       # existing — add monthly-summary endpoint tests
  ```
- No `client/src/app/shared/components/overlay/` changes — Overlay's Drawer/Sheet variant is out of scope for this story (see Scope note), only its existing Centered Dialog variant exists today (Story 1.2).
- `monthly-summary.model.ts`/`monthly-summary.service.ts` live in `shared/api/` (not nested inside `monthly-breakdown/`) to match where `entry.model.ts`/`entries.service.ts` already live — `shared/api/` is this project's established location for all feature API services/models, not just ones used by multiple features.

### References

- [Source: _bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md#FR-7] — running total, relocated to Monthly Breakdown
- [Source: _bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md#FR-8] — bar chart, month nav, drill-down (drill-down itself is `2-2`, not this story)
- [Source: _bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md#Non-Functional Requirements] — Accuracy (exact totals, no estimation/rounding)
- [Source: _bmad-output/planning-artifacts/architecture/architecture-Tracker-2026-07-03/ARCHITECTURE-SPINE.md#AD-1] — no Repository/Service layer
- [Source: .../ARCHITECTURE-SPINE.md#AD-2] — server-computes-totals, scoped to Monthly Breakdown
- [Source: .../ARCHITECTURE-SPINE.md#AD-5] — month-summary + drill-down endpoint design, EF Core SQLite caveat, earliest-month derivation
- [Source: .../ARCHITECTURE-SPINE.md#Structural Seed] — folder tree (`monthly-breakdown/`, `Entries/` houses month-summary)
- [Source: .../ARCHITECTURE-SPINE.md#Capability → Architecture Map] — FR-7/FR-8 → `server/Entries/`, `client/src/app/monthly-breakdown/`
- [Source: _bmad-output/D-Design-System/00-design-system.md#Horizontal Bar Chart] — bar sizing/labeling pattern
- [Source: _bmad-output/D-Design-System/00-design-system.md#Spacing Scale, #Type Scale, #Breakpoints] — tokens
- [Source: _bmad-output/C-UX-Scenarios/02-siddi-reviews-the-month/02-siddi-reviews-the-month.md] — scenario entry context (bookmarked, standalone)
- [Source: _bmad-output/C-UX-Scenarios/02-siddi-reviews-the-month/2.1-monthly-breakdown/2.1-monthly-breakdown.md] — full page spec (header, total, chart, states, responsive diff)
- [Source: _bmad-output/implementation-artifacts/1-2-home-screen.md] — previous story: `RequestState<T>` precedent, design-token/breakpoint setup, EF Core SQLite `WHERE`-on-`DateTimeOffset` finding
- [Source: _bmad-output/project-context.md#Architecture Rules, #Coding Standard Rules] — distilled rule set
- [Source: _bmad-output/test-artifacts/DD-001/issues/ISS-003-chart-row-keyboard-access.md] — closed accessibility issue behind the `breakdown-chart-row` `<button>` requirement
- [Source: _bmad-output/_progress/00-design-log.md, 2026-07-06 entries] — WDS design pass resolving the home-link nav decision and the ISS-003 spec backfill, both surfaced while writing this story

## Dev Agent Record

### Agent Model Used

Claude Sonnet 5 (sub-agent, general-purpose)

### Debug Log References

None — no blocking issues hit. EF Core SQLite `WHERE`-on-`DateTimeOffset` gotcha from Story 1.2 was proactively avoided by replicating `GetEntries`'s materialize-then-filter-in-process pattern.

### Completion Notes List

- Backend: 31/31 `dotnet test` passed (20 pre-existing + 11 new `MonthlySummaryEndpointTests`, including 4 added during code review). Frontend: 29/29 `ng test` passed across 9 spec files (14 pre-existing + 15 new, including 2 added during code review). Production build (`npm run build`) verified after review patches too.
- Deviation: total/category amounts render as `₹{{ amount }}` (raw number, no thousand-separator), matching the existing `recent-list` precedent in Home rather than the design mock's comma-formatted example — no number-formatting library exists in the codebase yet and introducing one was out of scope for this story.
- All scope exclusions honored: no click handler wired on `breakdown-chart-row`, no drill-down panel, no Overlay Drawer/Sheet variant, no reciprocal Home→Breakdown link.
- **Code review (3 parallel subagents — blind adversarial, edge-case hunter, acceptance auditor):** acceptance auditor found zero AC/Dev-Note violations across all 17 ACs. Six real bugs were found and auto-patched (all `patch`-classified, no spec ambiguity): (1) missing `year` query-param validation could 500 instead of 400 on out-of-range input; (2) supplying only one of `year`/`month` silently defaulted the other instead of rejecting; (3) DST/offset bug — historical-month bounds reused the *current* instant's UTC offset instead of the target month's own offset; (4) Retry after a failed Prev/Next click re-fetched the last *successful* month instead of the month that actually failed; (5) Prev/Next stayed enabled during an in-flight request, allowing rapid clicks to produce out-of-order response races; (6) a new backend test mixed `UtcNow` (seed) with a separately-called `Now` (assert), a latent flakiness source near month boundaries. Two pre-existing architectural trade-offs (full-table-scan pattern, `GroupBy`-by-entity-reference fragility if `AsNoTracking` is later added) were logged to `deferred-work.md` rather than fixed here, consistent with the same trade-off already accepted for `GetEntries` in Story 1.2. All other adversarial findings (button-with-no-handler, currency formatting, no deep-linking, etc.) were rejected as either explicit spec requirements or unreachable given existing validation/schema constraints.

### File List

**Backend**
- `server/Entries/EntriesModels.cs` — added `CategoryTotalDto`, `MonthlySummaryResponse`
- `server/Entries/EntriesEndpoints.cs` — added `GetMonthlySummary` handler + route mapping
- `tests/Tracker.Server.Tests/MonthlySummaryEndpointTests.cs` (new)

**Frontend**
- `client/src/app/shared/api/monthly-summary.model.ts` (new)
- `client/src/app/shared/api/monthly-summary.service.ts` (new)
- `client/src/app/app.routes.ts` — added `monthly-breakdown` route
- `client/src/app/monthly-breakdown/monthly-breakdown.ts` / `.html` / `.scss` / `.spec.ts` (new)
- `client/src/app/monthly-breakdown/header/header.ts` / `.html` / `.scss` / `.spec.ts` (new)
- `client/src/app/monthly-breakdown/total-summary/total-summary.ts` / `.html` / `.scss` (new)
- `client/src/app/monthly-breakdown/bar-chart/bar-chart.ts` / `.html` / `.scss` / `.spec.ts` (new)

## Suggested Review Order

**Backend — month-summary endpoint**

- Entry point: the new handler — validation order (year/month presence, ranges, future-month), then the materialize-then-filter-in-process pattern reused from `GetEntries`.
  [`EntriesEndpoints.cs:87`](../../server/Entries/EntriesEndpoints.cs#L87)

- Target-month UTC-offset computed per requested month (not the current instant) — fixes a DST edge case caught in code review.
  [`EntriesEndpoints.cs:125`](../../server/Entries/EntriesEndpoints.cs#L125)

- Category grouping/sum/sort and earliest-month derivation, both in-process per the EF Core SQLite caveat (Dev Notes).
  [`EntriesEndpoints.cs:133`](../../server/Entries/EntriesEndpoints.cs#L133)

- New response DTOs matching the spec's nested `category: { id, name }` shape.
  [`EntriesModels.cs:9`](../../server/Entries/EntriesModels.cs#L9)

**Frontend — month navigation & retry correctness (code-review fixes)**

- `pendingYear`/`pendingMonth` track the last *requested* month (vs. last successful) so Retry targets the month that actually failed.
  [`monthly-breakdown.ts:45`](../../client/src/app/monthly-breakdown/monthly-breakdown.ts#L45)

- `onRetry` now reads from `pendingYear`/`pendingMonth` instead of `activeYear`/`activeMonth`.
  [`monthly-breakdown.ts:138`](../../client/src/app/monthly-breakdown/monthly-breakdown.ts#L138)

- `prevDisabled`/`nextDisabled` also gate on `loading()`, closing the rapid-click race window.
  [`monthly-breakdown.ts:67`](../../client/src/app/monthly-breakdown/monthly-breakdown.ts#L67)

**Frontend — page composition & states**

- Container wiring header/total/chart to `RequestState` and driving the four page states.
  [`monthly-breakdown.html:1`](../../client/src/app/monthly-breakdown/monthly-breakdown.html#L1)

- Month selector and home-link markup/behavior.
  [`header.ts:1`](../../client/src/app/monthly-breakdown/header/header.ts#L1)

- Bar-width scaling relative to the largest category, re-normalizing per month switch.
  [`bar-chart.ts:1`](../../client/src/app/monthly-breakdown/bar-chart/bar-chart.ts#L1)

- Signal-based `RequestState<MonthlySummary>` service, reusing the established shape.
  [`monthly-summary.service.ts:1`](../../client/src/app/shared/api/monthly-summary.service.ts#L1)

**Peripherals — tests, types, routing**

- Route registration for the new page.
  [`app.routes.ts:1`](../../client/src/app/app.routes.ts#L1)

- Shared model types for the summary response.
  [`monthly-summary.model.ts:1`](../../client/src/app/shared/api/monthly-summary.model.ts#L1)

- Backend integration tests, including the 4 added during review (invalid year, year/month-must-be-paired).
  [`MonthlySummaryEndpointTests.cs:1`](../../tests/Tracker.Server.Tests/MonthlySummaryEndpointTests.cs#L1)

- Frontend specs, including the 2 added during review (retry-targets-failed-month, nav-disabled-while-loading).
  [`monthly-breakdown.spec.ts:1`](../../client/src/app/monthly-breakdown/monthly-breakdown.spec.ts#L1)
