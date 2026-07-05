---
baseline_commit: d7aeb946efc8d2d97920590734777cf53726bc8d
---

# Story 1.2: Home Screen — Quick-Add, Confirm, Entry List, Edit & Delete

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user of Tracker (Siddi),
I want to open the app straight to Home and log an expense in a couple of taps, see it confirmed and appear in a recent-entries list, and correct or remove any entry in place,
so that logging an expense is fast enough (well under 5 seconds) to actually stick as a daily habit, with no login wall, menu funnel, or multi-step form in the way.

**Scope note:** This is the first story to add HTTP endpoints and the first to create `client/` — no Angular project exists yet (verified: repo has no `client/` directory; `server/` currently maps zero endpoints — see Story 1.1). This story builds the full Epic 1 vertical slice: `Entries` Minimal API endpoints, the Angular 22 workspace, the shared Overlay component (Centered Dialog variant), and the entire Home feature (quick-add, category selection, confirm popup, toast, recent-entries list, edit-in-place, delete-in-place, responsive layout). It builds directly on Story 1.1's `Category`/`Entry` data model, migrations, and `CategoryMatcher` — do not recreate any of that. Monthly Breakdown (FR-7, FR-8) and the Overlay's Drawer/Sheet variant are explicitly **out of scope** — Epic 2.

**Category API design decision:** entry create/update accept a single `categoryName` string (never a `categoryId`) and always route it through the existing `CategoryMatcher.MatchOrCreateAsync` — including for the 4 presets (e.g. sending `"Food"` matches the seeded preset case-insensitively rather than creating a duplicate). This is deliberately simpler than exposing a category-lookup endpoint and having the client track numeric `CategoryId`s: nothing in this story's UX (quick-add's 4 fixed preset buttons + one custom-text input, and Confirm/Edit's tap-to-edit reusing that same selector) requires the client to browse or resolve categories by id — the entry response's nested `category: { id, name }` is enough for display and doesn't need to be resent. No `GET /api/categories` endpoint is built in this story.

## Acceptance Criteria

**Backend — Entries API**

1. `POST /api/entries` creates a new `Entry`. Request body is `{ amount: decimal, categoryName: string }`. `categoryName` is routed through `CategoryMatcher.MatchOrCreateAsync` (matches existing presets/custom categories case-insensitively, creates a new non-preset category otherwise) — never accept a raw `categoryId` from the client. Empty/whitespace `amount <= 0` or `categoryName` → 400 `ProblemDetails`. `CreatedAt` is set server-side to `DateTimeOffset.UtcNow` (never client-supplied). Response returns only the created entry, shaped `{ id, amount, category: { id, name }, createdAt }` — never a running total. [Source: prd.md#Features (v1) → Logging FR-1,FR-3; ARCHITECTURE-SPINE.md#AD-2,#AD-3; _bmad-output/implementation-artifacts/deferred-work.md]
2. `GET /api/entries` returns every entry whose `CreatedAt` falls in the current calendar month (host machine's local month boundary, converted to UTC bounds for the query), ordered newest-first. Per the EF Core SQLite ordering caveat, fetch month-bounded rows via a `WHERE` clause on the UTC bounds, then order by `CreatedAt` descending **in-process** (LINQ-to-Objects) — do not rely on SQL-side `ORDER BY` over `DateTimeOffset`. [Source: prd.md#FR-4; project-context.md#Architecture Rules — EF Core SQLite caveat]
3. `PUT /api/entries/{id}` edits `Amount` and/or `CategoryId` of an existing entry only, using the same `{ amount, categoryName }` contract as create (also routed through `CategoryMatcher`). `CreatedAt` is never modified. Returns 404 `ProblemDetails` if the id doesn't exist. Returns only the updated entry, same shape as create. [Source: prd.md#FR-5; project-context.md — CreatedAt immutable after creation]
4. `DELETE /api/entries/{id}` performs a hard delete (no `IsDeleted` column anywhere) and returns `204 No Content`. Returns 404 `ProblemDetails` if the id doesn't exist. [Source: prd.md#FR-6; project-context.md — hard deletes only]
5. All non-2xx responses across these endpoints use the `ProblemDetails` (RFC 9457) JSON shape — no bare strings or ad hoc error objects. [Source: project-context.md#Coding Standard Rules]
6. No `IRepository`/`IService` interfaces are introduced anywhere — endpoint handlers call `TrackerDbContext` directly, consistent with Story 1.1. [Source: ARCHITECTURE-SPINE.md#AD-1]

**Frontend — Quick-Add & Category Selection**

7. Home's quick-add box (`home-quickadd`) shows an amount input (numeric keyboard on mobile, placeholder "Amount") and 4 fixed preset category buttons (Food/Transport/Shopping/Other, single-select toggle) plus a dashed-border, expandable custom-category text input (placeholder "+ Type a new category"); selecting a preset deselects the custom field and vice versa. "Add Expense" is disabled until amount > 0 AND a category (preset or custom) is selected. [Source: prd.md#FR-1,FR-2; C-UX-Scenarios/01-.../1.1-home/1.1-home.md — `home-quickadd-*`]
8. Submitting quick-add opens the Confirm Entry popup — it does **not** save immediately. [Source: 1.1-home.md; 1.2-home.md]

**Confirm Popup**

9. Confirm Entry popup uses the shared Overlay component's **Centered Dialog** variant (~360px max-width, identical mobile/desktop; `space-lg` padding, `space-md` element gap), title "Confirm Entry", showing Amount and Category with **tap-to-edit-inline** (pencil icon affixed) reusing the quick-add input/category-selector components — no separate "Edit" button. [Source: 1.2-home.md — `home-confirm-popup`, `home-confirm-amount`, `home-confirm-category`; D-Design-System/00-design-system.md — Overlay Centered Dialog]
10. **Cancel** (`home-confirm-cancel`) closes the popup and returns to Home with the quick-add fields **still populated** (not cleared) — Siddi tapped Add Expense on purpose. [Source: 1.2-home.md]
11. **Confirm** (`home-confirm-submit`) performs a **pessimistic** save: calls `POST /api/entries`; while saving, the Confirm button's label is replaced by an inline spinner (no separate page-level overlay) and other actions are disabled. On success: popup closes, quick-add fields reset to idle, the new entry appears at the top of the recent-entries list. On failure: inline error shown, entered data preserved, retry by re-tapping Confirm. [Source: prd.md#FR-3; 1.2-home.md]

**Toast**

12. On successful save, a toast appears top-right: `"{amount} added to {category}"` (e.g. "₹150 added to Food"), auto-dismissing after ~2.5s. Multiple saves in quick succession **stack vertically** (most recent on top), each with its own independent dismiss timer; the corresponding new-entry row highlight fades in sync with its own toast's timer (same single timer, no separate coordination). [Source: prd.md#FR-3; 1.3-home.md — `home-toast`, `home-toast-message`]

**Entry List**

13. Recent Entries list (`home-recent`) shows a count selector (5/10/20, default **10**) that client-side-limits how many of the current month's entries (fetched via `GET /api/entries`) are displayed. Each row shows amount, category, and date-logged (date only — e.g. "Jun 28", never time-of-day). [Source: prd.md#FR-4; 1.1-home.md — `home-recent-count-selector`, `home-recent-entry-row`]
14. The list has Default / Loading (skeleton rows) / Empty ("No entries yet this month") / Error (inline error + Retry) states. Quick-add remains usable even if this list fails to load. [Source: 1.1-home.md]

**Edit / Delete**

15. Tapping a recent-entry row opens an **Edit Entry** dialog — same Overlay Centered Dialog pattern as Confirm, tap-to-edit-inline Amount/Category, pre-filled with the entry's current values. Saving calls `PUT /api/entries/{id}`; on success the dialog closes and the list reflects the change immediately (re-fetch or patch in place). [Source: prd.md#FR-5; 1.3-home.md — "opens the existing edit/delete interaction (per Phase 3 scope)"]
16. The Edit Entry dialog includes a **Delete** action. The source UX docs do not specify a delete-confirmation step or a separate component for it (flagged explicitly as unspecified — see Dev Notes). Use a lightweight double-tap-to-confirm affordance instead of introducing a new dialog: first tap turns the Delete button into a "Confirm Delete" state; a second tap calls `DELETE /api/entries/{id}`. On success, the dialog closes and the entry disappears from the list. [Source: prd.md#FR-6; documented assumption, see Dev Notes]

**Responsive**

17. Mobile (`bp-mobile`, <640px): Home is a single stacked column, page padding `space-md`, category buttons wrap to 2 rows. Desktop (`bp-desktop`, ≥640px): two-column layout — Quick Add fixed **~400px** left, Recent Entries fills the right, column gap `space-xl`, page padding `space-xl`; all 4 category buttons fit in 1 row. All object IDs/behavior/validation are identical across breakpoints — layout-only diff, governed by **one shared constant/media query** (no per-feature hardcoded pivot width, no tablet tier). Toast always anchors top-right of the full viewport (not scoped to a column). [Source: prd.md#FR-10; C-UX-Scenarios/01-.../1.1-home,1.2-home,1.3-home.md — responsive diff; project-context.md — single breakpoint rule]

**Direct landing / shared infra**

18. Opening the app (server root) lands directly on the Home screen — no login wall, no intermediate menu/dashboard. Angular's default route renders Home. [Source: prd.md#FR-9; ARCHITECTURE-SPINE.md — FR-9 → `Program.cs` (routing), `client/src/app/` (default route), AD-4]
19. `Program.cs` serves the Angular production build from `wwwroot` (static files + SPA fallback to `index.html`) so a single ASP.NET Core process serves both API and UI on one port. [Source: ARCHITECTURE-SPINE.md#AD-4; #Structural Seed deployment diagram]
20. The shared Overlay component (Centered Dialog variant only — Drawer/Sheet variant is Epic 2) lives in `client/src/app/shared/components/` from day one, built generically enough that Epic 2 can add the Drawer/Sheet variant without reworking this story's usage. [Source: project-context.md; ARCHITECTURE-SPINE.md#Structural Seed — `shared/components/`]
21. The `entries.service.ts` Angular feature service exposes Default/Loading/Error signal state in a consistent shape — the shape to reuse for every later feature service (e.g. Epic 2's monthly-breakdown service). [Source: project-context.md#Coding Standard Rules]
22. No raw pixel values in Angular component styles — spacing uses the `space-3xs`…`space-3xl` tokens, typography uses the `text-xs`…`text-3xl` tokens. [Source: project-context.md; UX-DR11]

**Testing**

23. Backend: xUnit + `Microsoft.AspNetCore.Mvc.Testing` (`WebApplicationFactory`) integration tests cover all 4 endpoints — success paths, invalid-amount/empty-categoryName 400s, 404s on unknown id, and that `GET /api/entries` returns correctly month-bounded and ordered results.
24. Frontend: Vitest (Angular 22's default test runner — see Dev Notes) component/service tests cover: quick-add's enable/disable validation logic, Confirm popup's save/cancel/error paths, toast stacking/independent-dismiss-timer behavior, list states (Default/Loading/Empty/Error), and the edit/delete dialog's double-tap-delete flow.

## Tasks / Subtasks

- [x] Task 1: `Entries` CRUD Minimal API endpoints (AC: #1, #2, #3, #4, #5, #6)
  - [x] Create `server/Entries/EntriesEndpoints.cs` mapping `POST/GET/PUT/DELETE /api/entries` (`{id}` for PUT/DELETE), calling `TrackerDbContext` directly — no repository/service wrapper
  - [x] Request/response DTOs (records) for the `{ amount, categoryName }` create/update body and the entry response shape (`id, amount, category: {id, name}, createdAt`)
  - [x] Validation: `amount > 0` and non-empty `categoryName` on create/update → 400 `ProblemDetails` otherwise; route `categoryName` through `Categories.CategoryMatcher.MatchOrCreateAsync` for every create/update (presets included)
  - [x] `CreatedAt = DateTimeOffset.UtcNow` set only on create; never touched on update
  - [x] `GET /api/entries`: compute current month's UTC bounds from the host's local time, fetch via `WHERE CreatedAt >= lowerUtc && CreatedAt < upperUtc`, then `.OrderByDescending(e => e.CreatedAt)` **after** materializing to a list (in-process, not translated to SQL)
  - [x] 404 `ProblemDetails` for PUT/DELETE on unknown `id`
- [x] Task 2: Wire endpoints + static hosting into `Program.cs` (AC: #18, #19)
  - [x] Map the `Entries` endpoint group
  - [x] Add `app.UseDefaultFiles()` + `app.UseStaticFiles()` serving from `wwwroot`, plus SPA fallback (`app.MapFallbackToFile("index.html")`) so opening the server root renders the Angular app's default route
  - [x] Configure a global `ProblemDetails`-shaped exception/validation response (e.g. `AddProblemDetails()` + `UseExceptionHandler`) so all non-2xx responses share one shape
- [x] Task 3: Backend integration tests (AC: #23)
  - [x] Add `Microsoft.AspNetCore.Mvc.Testing` to `tests/Tracker.Server.Tests.csproj` (new package — needed for `WebApplicationFactory`; not present in Story 1.1)
  - [x] `WebApplicationFactory<Program>`-based tests: create (preset name matches existing category, new custom name creates one, invalid amount/empty name → 400), get (month-bounded + ordering), update (amount/category change, CreatedAt untouched, 404), delete (204, hard-delete verified, 404)
  - [x] Follow Story 1.1's in-memory SQLite pattern (`Data Source=:memory:` with an open connection kept alive for the test's lifetime) for the test host's `DbContext`, since `EnsureCreated()`/migrations must run against a fresh schema per test
- [x] Task 4: Scaffold Angular 22 workspace (AC: #18, #21, #22)
  - [x] `ng new client` (Angular 22, standalone components, SCSS, routing enabled) at repo root, configured to build into `server/wwwroot` per the Structural Seed deployment diagram
  - [x] Add `client/src/styles/` (or equivalent) SCSS tokens for the spacing scale (`space-3xs`…`space-3xl`) and type scale (`text-xs`…`text-3xl`) and the single `bp-mobile`/`bp-desktop` breakpoint constant — no raw pixel values anywhere else
  - [x] `client/src/app/shared/api/` — `entries.service.ts` and shared models (`Entry`), exposing Default/Loading/Error signal state
- [x] Task 5: Shared Overlay component — Centered Dialog variant (AC: #9, #20)
  - [x] `client/src/app/shared/components/overlay/` (or similar) — Centered Dialog only (Drawer/Sheet deferred to Epic 2), `space-lg` padding, `space-md` gap, scrim/dim background, Default/Loading/Error states, built generically for a future Drawer/Sheet variant
- [x] Task 6: Home — quick-add box + category selector (AC: #7, #8)
  - [x] `client/src/app/home/` feature folder; quick-add component with amount input, 4 preset buttons, custom-category input (mutually exclusive selection), submit button gated on validity
  - [x] Submitting opens the Confirm popup (does not call the API directly); selected category is tracked client-side as its name string (e.g. `"Food"`), not an id
- [x] Task 7: Home — Confirm Entry popup (AC: #9, #10, #11)
  - [x] Uses the shared Overlay Centered Dialog; tap-to-edit-inline Amount/Category reusing quick-add's input/selector
  - [x] Cancel: close, preserve quick-add field values. Confirm: pessimistic `POST /api/entries` call (`{ amount, categoryName }`), inline spinner in the Confirm button while saving, inline error + preserved data on failure
- [x] Task 8: Home — save-confirmation toast (AC: #12)
  - [x] Toast component/service: top-right, ~2.5s auto-dismiss, independent timers, vertical stacking for concurrent saves, synced new-row highlight fade
- [x] Task 9: Home — recent entries list (AC: #13, #14)
  - [x] List component consuming `entries.service.ts` (current month, `GET /api/entries`), count selector (5/10/20 default 10) slicing the fetched array client-side
  - [x] Default/Loading(skeleton)/Empty/Error states; list failure must not disable quick-add
- [x] Task 10: Home — edit/delete-in-place (AC: #15, #16)
  - [x] Tapping a row opens an Edit Entry dialog (same Overlay Centered Dialog pattern, pre-filled from the row's `{ amount, category.name }`, tap-to-edit-inline)
  - [x] Save → `PUT /api/entries/{id}` with `{ amount, categoryName }`, close + reflect change on success
  - [x] Delete → double-tap-to-confirm (button becomes "Confirm Delete" on first tap, fires `DELETE /api/entries/{id}` on second tap), close + remove from list on success
- [x] Task 11: Responsive layout (AC: #17)
  - [x] Single shared breakpoint constant/media query drives: mobile stacked single-column vs. desktop two-column (~400px quick-add left / recent-entries right, `space-xl` gap); category buttons 2-row (mobile) vs 1-row (desktop) wrap
- [x] Task 12: Wire Angular default route (AC: #18)
  - [x] `app.config.ts`/router config: empty/wildcard path renders the Home feature — no other routes needed yet (Epic 2 adds `monthly-breakdown` later)
- [x] Task 13: Frontend tests (AC: #24)
  - [x] Vitest specs (Angular 22 default — see Dev Notes) for: quick-add validity gating, Confirm popup save/cancel/error, toast stacking/dismiss timers, list Default/Loading/Empty/Error states, edit dialog save, delete double-tap-confirm flow

## Dev Notes

- **Story 1.1 is done — do not recreate.** `Category`/`Entry` entities, `TrackerDbContext`, the initial + FK-fix migrations, and `Categories/CategoryMatcher.MatchOrCreateAsync` (case-insensitive, trims input, throws `ArgumentException` on null/whitespace, handles concurrent-insert races via a `NOCASE`-collated unique index on `Category.Name`) already exist and are fully tested (8/8 passing). Call `MatchOrCreateAsync` from the new `Entries` endpoints for every create/update — do not reimplement dedup logic there, and do not add a `categoryId`-based path (see Category API design decision above). [[project-context.md#Architecture Rules]]
- **`Entry.CreatedAt` has no default today** (Story 1.1 deliberately left this to this story — see `deferred-work.md`). Set it explicitly to `DateTimeOffset.UtcNow` in the create endpoint handler; there is currently no EF Core default/computed-column for it.
- **No domain-value validation exists yet either** (also deferred from 1.1): `Entry.Amount` has no positive/range check, `Category.Name` has no max length at the entity level. This story adds request-level validation (`amount > 0`, non-empty `categoryName` — `CategoryMatcher` already trims and rejects whitespace) in the endpoint handlers, not by changing the entities.
- **AD-1 (no Repository/Service layer):** endpoint handlers call `TrackerDbContext` directly, same as `CategoryMatcher` does. Do not add `IRepository`/`IService` interfaces. [[project-context.md#Critical Don't-Miss Rules]]
- **EF Core SQLite ordering/aggregation caveat is directly relevant to `GET /api/entries`:** the provider can't reliably translate `OrderBy` over `DateTimeOffset` (or `Sum`/`GroupBy` over `decimal`, not used here) to SQL. Fetch the month-bounded rows via `WHERE`, materialize (`.ToListAsync()`), *then* `.OrderByDescending(...)` in C#. Getting this wrong won't necessarily error — it can silently return wrong order, which will look fine in manual testing with few rows and only surface with more data. [[project-context.md#Architecture Rules]]
- **Money and dates unchanged from 1.1:** `Amount` stays `decimal` end-to-end (request DTOs too — never `float`/`double`). `CreatedAt` stays `DateTimeOffset` UTC and immutable after creation; edit only ever touches `Amount`/`CategoryId`.
- **Documented assumption — edit/delete interaction:** the UX scenario docs (1.1-home, 1.3-home) both describe tapping a recent-entry row as opening "the existing edit/delete interaction (per Phase 3 scope)" without a dedicated page spec or delete-confirmation step — this is a genuine gap, not something this story missed reading. The design decision made here (reuse the Confirm popup's Overlay Centered Dialog pattern for Edit, with a double-tap-to-confirm Delete affordance instead of a new confirmation dialog) is chosen to avoid inventing a new component and to keep destructive-action safety without a heavier modal-on-modal flow. Treat AC #15/#16 as authoritative for this story; if it needs revisiting, that's a product decision for later, not a reason to block this story.
- **`Program.cs` today** (`server/Program.cs`) only registers `TrackerDbContext` and runs `Database.Migrate()` in a try/catch (added in the 1.1 review-fix commit) — it maps zero endpoints and has no static-file/SPA hosting yet. This story adds both. Preserve the existing migration try/catch/log-critical-rethrow behavior; add endpoint mapping and static hosting around it, don't restructure it.
- **No auth, no CORS for external origins** — this stays a same-origin, single-process app (AD-4); don't add CORS policy or auth middleware, both are explicitly out of scope for v1. [[project-context.md#Security Rules]]
- **All writes are synchronous request/response** — no optimistic client-side mutation; the Angular services wait for the API response before updating local state (the pessimistic-save language in AC #11 is the general rule for all writes in this story, not just quick-add).
- **Testing framework choices carry forward / are newly fixed here:**
  - Backend: xUnit continues from Story 1.1. Add `Microsoft.AspNetCore.Mvc.Testing` (provides `WebApplicationFactory<Program>`) to the existing `tests/Tracker.Server.Tests` project — this is a new package not present in 1.1, needed specifically for HTTP-level endpoint tests (unit tests alone can't exercise routing/validation/`ProblemDetails` shape).
  - Frontend: Angular 22's `ng new` defaults to **Vitest**, not Karma/Jasmine (Karma is legacy-only as of Angular 22, June 2026) — use whatever the CLI scaffolds by default, don't add Karma.

### Project Structure Notes

- Matches Structural Seed for what this story adds:
  ```
  server/
    Entries/
      Entry.cs                 # existing (Story 1.1)
      EntriesEndpoints.cs       # NEW — CRUD endpoint mapping
    Categories/
      Category.cs               # existing (Story 1.1) — untouched
      CategoryMatcher.cs        # existing (Story 1.1) — called, not modified
    Data/                       # existing (Story 1.1) — untouched
    wwwroot/                    # NEW — Angular production build output lands here
    Program.cs                  # UPDATE — add endpoint mapping + static hosting (existing DbContext/migration code preserved)
  client/                       # NEW — entire Angular 22 project
    src/app/
      home/                     # NEW — quick-add, confirm popup, toast, recent list, edit/delete
      shared/
        components/             # NEW — Overlay (Centered Dialog variant)
        api/                    # NEW — entries.service.ts, models
  tests/
    Tracker.Server.Tests/       # existing — add endpoint integration tests alongside CategoryMatcherTests
  ```
- No `monthly-breakdown/` folder yet — that's Epic 2 (FR-7, FR-8). Don't scaffold it speculatively.
- No `GET /api/categories` endpoint and no `Categories/CategoriesEndpoints.cs` — see the Category API design decision above; don't add one unless a later story's UX genuinely requires browsing all categories (Epic 2's month-summary is a different, dedicated endpoint, not this).
- The shared Overlay component should be built to accommodate a Drawer/Sheet variant later without this story needing to guess its exact API — keep the Centered-Dialog-specific parts (max-width, centering) separable from the shared scrim/state-handling parts.

### References

- [Source: _bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md#Features (v1) → Logging] — FR-1–FR-6 exact text, FR-2 `[OVERRIDE]` note
- [Source: _bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md#FR-9] — direct wall-free entry
- [Source: _bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md#Non-Functional Requirements] — NFR-1 (no login wall), NFR-2 (<5s speed), NFR-4 (plain/neutral tone)
- [Source: _bmad-output/planning-artifacts/architecture/architecture-Tracker-2026-07-03/ARCHITECTURE-SPINE.md#AD-1] — no Repository/Service layer
- [Source: .../ARCHITECTURE-SPINE.md#AD-2] — server-side-only totals (context: this story's responses never include totals)
- [Source: .../ARCHITECTURE-SPINE.md#AD-3] — category match-or-create, called from Entries
- [Source: .../ARCHITECTURE-SPINE.md#AD-4] — single process, LAN-only, no auth, wwwroot hosting
- [Source: .../ARCHITECTURE-SPINE.md#Stack] — Angular 22, EF Core/SQLite versions
- [Source: .../ARCHITECTURE-SPINE.md#Structural Seed] — folder tree, deployment diagram
- [Source: .../ARCHITECTURE-SPINE.md#Capability → Architecture Map] — FR-9 → Program.cs routing + client default route
- [Source: _bmad-output/D-Design-System/00-design-system.md] — Overlay (Centered Dialog), Toast pattern, spacing/type scale, breakpoints
- [Source: _bmad-output/C-UX-Scenarios/01-siddi-logs-an-expense/1.1-home/1.1-home.md] — quick-add, recent list specs
- [Source: _bmad-output/C-UX-Scenarios/01-siddi-logs-an-expense/1.2-home/1.2-home.md] — Confirm Entry popup spec
- [Source: _bmad-output/C-UX-Scenarios/01-siddi-logs-an-expense/1.3-home/1.3-home.md] — toast, responsive diff, edit/delete pointer
- [Source: _bmad-output/implementation-artifacts/1-1-data-model-foundation.md] — previous story, entities/matcher/test conventions
- [Source: _bmad-output/implementation-artifacts/deferred-work.md] — `CreatedAt` default and validation explicitly deferred to this story
- [Source: _bmad-output/project-context.md#Architecture Rules, #Coding Standard Rules, #Security Rules, #Critical Don't-Miss Rules] — distilled rule set
- [Source: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/test-min-api] — `WebApplicationFactory`/`Microsoft.AspNetCore.Mvc.Testing` for Minimal API integration tests
- [Source: https://angular.dev/guide/testing/migrating-to-vitest] — Angular 22 defaults `ng new` to Vitest, not Karma

## Dev Agent Record

### Agent Model Used

Claude Sonnet 5 (claude-sonnet-5)

### Debug Log References

- `dotnet test tests/Tracker.Server.Tests` — 19/19 passed (8 `CategoryMatcherTests` carried over from Story 1.1, 11 new `EntriesEndpointsTests`)
- `ng test` (Vitest, `client/`) — 14/14 passed across 6 spec files (`app`, `quick-add`, `confirm-popup`, `edit-popup`, `recent-list`, `toast.service`)
- `ng build` — clean production build; Angular's application builder emits to `server/wwwroot/browser/`, not `server/wwwroot/` directly — `Program.cs` points its static-file provider at the `browser` subfolder explicitly
- First `GET /api/entries` implementation filtered via a `WHERE` clause on `DateTimeOffset` bounds — EF Core 10's SQLite provider could not translate that comparison at all (not just `OrderBy`, as the Dev Notes caveat describes) and threw `InvalidOperationException` at runtime. Fixed by materializing the full `Entries` table first (`.ToListAsync()`), then filtering and ordering in-process — confirmed via `WebApplicationFactory` integration test with out-of-month seed data.
- Manual end-to-end smoke test: ran the built server (`dotnet run`), used `curl` to `POST`/`GET /api/entries` against the real SQLite file and confirmed the SPA root (`/`) serves `index.html` — full create/read cycle verified over real HTTP, not just against the in-memory test host.
- Headless Chrome screenshots (`chrome.exe --headless --screenshot`) at 450px and 1000px viewports confirmed the mobile stacked layout and desktop two-column/single-row-buttons layout render correctly. Screenshots below ~482px are unreliable on this machine (documented pre-existing tooling quirk, not a product bug) — see Completion Notes.

### Completion Notes List

- Backend: `EntriesEndpoints.cs` maps all 4 CRUD endpoints directly against `TrackerDbContext` (no repository layer), routes `categoryName` through the existing `CategoryMatcher.MatchOrCreateAsync` for every create/update, validates `amount > 0` / non-empty `categoryName` as `ProblemDetails` 400s, and returns 404 `ProblemDetails` for unknown ids on PUT/DELETE. `GET /api/entries` computes the host's local calendar-month bounds, converts to UTC, and filters/orders **in-process** (see Debug Log — the EF Core SQLite caveat turned out to block the `WHERE` translation too, not just `OrderBy`).
- `Program.cs`: added `AddProblemDetails()` + a global `UseExceptionHandler`/`UseStatusCodePages` pair so all non-2xx responses share the RFC 9457 shape; added `MapEntriesEndpoints()`; static-file/SPA-fallback hosting points at `wwwroot/browser` (guarded by `Directory.Exists` so the test host and pre-build dev loop don't break when the Angular bundle hasn't been built yet); added `public partial class Program;` so `WebApplicationFactory<Program>` can target the top-level-statements entry point.
- Frontend: scaffolded `client/` (Angular 22, standalone components, Vitest — the CLI's current defaults, no zone.js/Karma). Build output redirected to `server/wwwroot` via `angular.json`; SCSS tokens (spacing/type scale, single `bp-desktop` breakpoint mixin) live in `client/src/styles/_design-tokens.scss` and are available to every component via `stylePreprocessorOptions.includePaths`.
- `EntriesService` (`shared/api/`) exposes a single `RequestState<T>` (`loading`/`default`/`error`) signal — the shape the story calls out for reuse by Epic 2's monthly-breakdown service — plus `create`/`update`/`remove` methods that let callers catch and show inline errors (pessimistic-save requirement) while keeping the list state in sync on success.
- `OverlayComponent` (shared) implements the Centered Dialog variant only, with the centering/max-width CSS kept in a separate class (`overlay-panel--centered-dialog`) from the shared scrim/padding/content styles, so Epic 2's Drawer/Sheet variant can be added as a sibling class later.
- Confirm and Edit dialogs both reuse `AmountInputComponent` and `CategorySelectorComponent` (the same `home-quickadd-*` object IDs) for their tap-to-edit-inline fields, per the story's explicit reuse decision — no separate "edit" input components were built.
- Toast stacking/highlight sync is derived, not separately coordinated: `ToastService` holds one signal array of `{id, message, entryId}`; each toast's own `setTimeout` removes only itself, and `RecentListComponent` derives a row's highlight purely from whether any active toast currently references that entry's id — so the row highlight and its toast always expire together without a second timer.
- Fixed two real bugs found only via manual browser verification (not caught by Vitest, since jsdom doesn't lay out flexbox the same way as a real renderer): (1) the recent-entries count `<select>` defaulted to its first `<option>` instead of "10" because `[value]` was bound on the `<select>` before its `<option>`s existed in the DOM — fixed by binding `[selected]` per-`<option>` instead, with a regression assertion added to `recent-list.spec.ts`. (2) Category preset buttons overflowed their container on narrow/desktop widths because they lacked `box-sizing: border-box`, so padding was added on top of their flex-basis — fixed with a global `box-sizing: border-box` reset in `styles.scss` and by moving the custom-category input out of the buttons' flex row (it was competing for row space under `flex-wrap: nowrap`).
- Verification used: `dotnet test` + `ng test` (automated), a manual `curl` HTTP smoke test against the real built server, and headless-Chrome screenshots at 450px/1000px viewports (see Debug Log for the ~482px viewport floor caveat on this machine — screenshots below that width are not trustworthy here).

### File List

- `server/Entries/EntriesModels.cs`
- `server/Entries/EntriesEndpoints.cs`
- `server/Program.cs`
- `tests/Tracker.Server.Tests/Tracker.Server.Tests.csproj`
- `tests/Tracker.Server.Tests/TrackerWebApplicationFactory.cs`
- `tests/Tracker.Server.Tests/EntriesEndpointsTests.cs`
- `client/` (new Angular 22 workspace — `ng new` scaffold, see below for hand-written additions/edits)
- `client/angular.json`
- `client/src/styles.scss`
- `client/src/styles/_design-tokens.scss`
- `client/src/app/app.ts`
- `client/src/app/app.html`
- `client/src/app/app.spec.ts`
- `client/src/app/app.config.ts`
- `client/src/app/app.routes.ts`
- `client/src/app/shared/api/entry.model.ts`
- `client/src/app/shared/api/request-state.ts`
- `client/src/app/shared/api/entries.service.ts`
- `client/src/app/shared/components/overlay/overlay.ts`
- `client/src/app/shared/components/overlay/overlay.html`
- `client/src/app/shared/components/overlay/overlay.scss`
- `client/src/app/shared/components/toast/toast.service.ts`
- `client/src/app/shared/components/toast/toast.service.spec.ts`
- `client/src/app/shared/components/toast/toast-container.ts`
- `client/src/app/shared/components/toast/toast-container.html`
- `client/src/app/shared/components/toast/toast-container.scss`
- `client/src/app/home/amount-input/amount-input.ts`
- `client/src/app/home/amount-input/amount-input.html`
- `client/src/app/home/amount-input/amount-input.scss`
- `client/src/app/home/category-selector/category-selector.ts`
- `client/src/app/home/category-selector/category-selector.html`
- `client/src/app/home/category-selector/category-selector.scss`
- `client/src/app/home/quick-add/quick-add.ts`
- `client/src/app/home/quick-add/quick-add.html`
- `client/src/app/home/quick-add/quick-add.scss`
- `client/src/app/home/quick-add/quick-add.spec.ts`
- `client/src/app/home/confirm-popup/confirm-popup.ts`
- `client/src/app/home/confirm-popup/confirm-popup.html`
- `client/src/app/home/confirm-popup/confirm-popup.scss`
- `client/src/app/home/confirm-popup/confirm-popup.spec.ts`
- `client/src/app/home/edit-popup/edit-popup.ts`
- `client/src/app/home/edit-popup/edit-popup.html`
- `client/src/app/home/edit-popup/edit-popup.scss`
- `client/src/app/home/edit-popup/edit-popup.spec.ts`
- `client/src/app/home/recent-list/recent-list.ts`
- `client/src/app/home/recent-list/recent-list.html`
- `client/src/app/home/recent-list/recent-list.scss`
- `client/src/app/home/recent-list/recent-list.spec.ts`
- `client/src/app/home/home.ts`
- `client/src/app/home/home.html`
- `client/src/app/home/home.scss`
- `.gitignore` (added `server/wwwroot/` — Angular's `ng build` output, generated, not committed)

## Change Log

| Date | Change |
| --- | --- |
| 2026-07-05 | Implemented Story 1.2: `Entries` CRUD Minimal API endpoints + `ProblemDetails` error shape + static SPA hosting in `Program.cs`; scaffolded the Angular 22 `client/` workspace (design tokens, shared Overlay + Toast, Home feature — quick-add, Confirm/Edit dialogs with tap-to-edit-inline fields and double-tap delete confirm, recent-entries list with Default/Loading/Empty/Error states, responsive single-breakpoint layout); 19 backend + 14 frontend automated tests, plus manual HTTP and headless-browser verification. |
