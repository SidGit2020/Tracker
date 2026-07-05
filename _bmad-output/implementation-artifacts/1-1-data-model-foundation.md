---
baseline_commit: c547f505710515c72071f43924de2baa127d8c4e
---

# Story 1.1: Data Model & Category/Entry Foundation

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer building Tracker v1,
I want the `Category`/`Entry` data model, EF Core Migrations (with a preset-category seed), and the category match-or-create function in place,
so that every later Epic 1/Epic 2 feature (quick-add, edit, delete, monthly breakdown) has one consistent, already-decided data foundation to build on instead of each feature inventing its own.

**Scope note:** This is the first story in the project — no `server/` or `client/` code exists yet (verified: repo has no `server/`/`client/` directories). This story stands up the ASP.NET Core project shell and the data layer only. It deliberately does **not** add any Minimal API endpoints, controllers, or Angular code — those belong to the quick-add/entry-list/edit/delete stories that follow. Do not build FR-1–FR-6 UI or endpoints here.

## Acceptance Criteria

1. `server/` contains an ASP.NET Core Minimal API project targeting **.NET 10**, with folders `Entries/`, `Categories/`, `Data/` already present (may be empty except for what this story adds) per the Structural Seed layout. [Source: ARCHITECTURE-SPINE.md#Structural Seed]
2. `Category` entity exists with exactly: `Id` (int, PK, autoincrement/`INTEGER PRIMARY KEY`), `Name` (string), `IsPreset` (bool). [Source: ARCHITECTURE-SPINE.md#AD-3, #Structural Seed]
3. `Entry` entity exists with exactly: `Id` (int, PK, autoincrement), `Amount` (`decimal` — never `float`/`double`), `CategoryId` (int, FK → `Category.Id`), `CreatedAt` (`DateTimeOffset`, UTC). [Source: ARCHITECTURE-SPINE.md#AD-2, #Structural Seed, #Consistency Conventions]
4. A `DbContext` in `Data/` registers both entities and their relationship (`Category` 1—* `Entry`), using SQLite via `Microsoft.Data.Sqlite` / the EF Core SQLite provider (latest version compatible with .NET 10 EF Core — pin the exact version at build time). [Source: ARCHITECTURE-SPINE.md#Stack]
5. Schema is created via **EF Core Migrations** — not `EnsureCreated()`. An initial migration creates the `Category` and `Entry` tables. [Source: ARCHITECTURE-SPINE.md#Consistency Conventions]
6. A seed migration inserts exactly four `Category` rows: **Food, Transport, Shopping, Other**, each with `IsPreset = true`. [Source: ARCHITECTURE-SPINE.md#AD-3; prd.md#FR-2]
7. A single category **match-or-create** function lives in `Categories/` (owned there, not duplicated): given a candidate name, it does a case-insensitive match against existing `Category.Name` values; returns the existing row on match, otherwise creates a new `Category` with `IsPreset = false` and returns it. This function is the only place this dedup logic is implemented — it is not to be reimplemented inline anywhere else (including later, in `Entries/`). [Source: ARCHITECTURE-SPINE.md#AD-3]
8. No `IRepository`/`IService` abstraction layer exists anywhere in `server/` — the `DbContext` is used directly (this story doesn't add endpoint handlers yet, but the `DbContext` and the match-or-create function must not be wrapped in repository/service interfaces either). [Source: ARCHITECTURE-SPINE.md#AD-1]
9. `appsettings.json` holds the SQLite database file path as config (the only meaningful setting at this stage). [Source: ARCHITECTURE-SPINE.md#Consistency Conventions]
10. `Program.cs` exists as the single-process Minimal API host entrypoint, registers the `DbContext` (reading the connection string/path from `appsettings.json`), and applies pending migrations on startup. It does **not** map any endpoints yet. [Source: ARCHITECTURE-SPINE.md#Structural Seed]
11. Unit tests cover the match-or-create function: exact match, case-insensitive match (e.g. `"food"` matches `"Food"`), no-match-creates-new, and created categories default to `IsPreset = false`. Pick a test framework pragmatically (e.g. xUnit) — none is fixed by the PRD/spine. [Source: project-context.md#Coding Standard Rules; ARCHITECTURE-SPINE.md#Deferred]

## Tasks / Subtasks

- [x] Task 1: Scaffold the `server/` ASP.NET Core project shell (AC: #1, #9, #10)
  - [x] `dotnet new` a Minimal API project under `server/` targeting .NET 10
  - [x] Create `Entries/`, `Categories/`, `Data/` folders (empty besides what later tasks add)
  - [x] Add `appsettings.json` with the SQLite file path setting (e.g. `tracker.db` at repo root per Structural Seed's deployment diagram)
  - [x] Add EF Core + `Microsoft.Data.Sqlite`/EF Core SQLite provider NuGet packages — record exact pinned versions used
- [x] Task 2: Define the `Category` and `Entry` entities (AC: #2, #3)
  - [x] `Category`: `Id` (int PK), `Name` (string), `IsPreset` (bool)
  - [x] `Entry`: `Id` (int PK), `Amount` (decimal), `CategoryId` (int FK), `CreatedAt` (DateTimeOffset)
  - [x] PascalCase naming per project convention; files grouped by feature, not by "Models/" (e.g. entities can live under `Categories/Category.cs` and `Entries/Entry.cs`, or `Data/` if that reads more naturally — either is acceptable, just don't create a generic cross-feature `Models/` folder)
- [x] Task 3: `DbContext` and migrations (AC: #4, #5, #6, #10)
  - [x] Create `TrackerDbContext` in `Data/` with `DbSet<Category>` and `DbSet<Entry>`, configuring the FK relationship
  - [x] Add the initial EF Core migration (Category + Entry tables)
  - [x] Add a seed migration (or seed data in the initial migration) inserting Food/Transport/Shopping/Other with `IsPreset = true`
  - [x] Wire `DbContext` registration (from `appsettings.json` connection string) and `Database.Migrate()`-on-startup into `Program.cs`
- [x] Task 4: Category match-or-create function (AC: #7, #8, #11)
  - [x] Implement the function in `Categories/` — no interface/abstraction wrapper around it
  - [x] Case-insensitive name comparison against all existing categories
  - [x] Create with `IsPreset = false` when no match found
  - [x] Unit tests: exact match, case-insensitive match, no-match-creates-new, `IsPreset` defaults correctly
- [x] Task 5: Structural sanity check (AC: #1, #8)
  - [x] Confirm folder layout matches the Structural Seed tree (`server/Entries/`, `server/Categories/`, `server/Data/`, `Program.cs`)
  - [x] Confirm no `IRepository`/`IService` interfaces were introduced anywhere in this story's code

## Dev Notes

- **This story has no UI and no HTTP endpoints.** Nothing in `client/` is touched. Do not map any Minimal API routes in `Program.cs` — that starts in the next story (quick-add, FR-1–FR-3).
- **AD-1 (no Repository/Service layer):** call `DbContext` directly everywhere, including from the match-or-create function. Do not add `IRepository`/`IService` interfaces "for testability" — explicitly rejected at this project's scale. [[project-context.md#Critical Don't-Miss Rules]]
- **AD-3 (categories are data, not an enum):** `Category` is a real table because v1 allows user-created categories — this is a deliberate override of the PRD's original "fixed list" text, already reconciled (see `prd.md` FR-2's `[OVERRIDE]` note). Don't hardcode Food/Transport/Shopping/Other as an enum anywhere, and don't treat "Other" as a catch-all — it's a fourth named preset row like the rest.
- **Money and dates:** `Amount` is `decimal` end-to-end — never introduce `float`/`double` at any layer, even temporarily. `CreatedAt` is `DateTimeOffset` in UTC and is immutable after creation (later edit-entry stories only ever change `Amount`/`CategoryId`) — get the type right now since a later migration to fix it would be painful.
- **No soft deletes, no GUIDs:** integer autoincrement PKs only; there is no `IsDeleted` column on either entity (hard deletes are used later, at the endpoint layer — not relevant to this story but don't accidentally add the column now).
- **Migrations, not `EnsureCreated()`:** this is a hard requirement, not a suggestion — `EnsureCreated()` doesn't produce a migrations history and would block future schema changes in Epic 2.
- **EF Core SQLite provider caveat (informational only, not used in this story):** it can't translate `Sum`/`GroupBy` over `decimal` or reliable `DateTimeOffset` ordering to SQL. Not relevant to migrations/seeding, but the `Entry.CreatedAt` type chosen here is what later month-summary queries (Epic 2) will filter on in C# after a `WHERE`-bounded fetch — get the UTC/immutability behavior right now.
- **Testing framework is not fixed by the PRD/spine** — pick pragmatically (xUnit is a reasonable default for the API). Whatever is chosen here is what later backend stories should keep using, so make the choice deliberately.

### Project Structure Notes

- Matches Structural Seed exactly for what this story touches:
  ```
  server/
    Entries/          # empty/placeholder this story — Entry entity may live here or in Data/
    Categories/        # match-or-create function lives here
    Data/               # DbContext, Migrations/
    Program.cs         # host entrypoint, DbContext registration + Migrate(), no endpoints yet
  ```
- `client/` is not created or touched in this story.
- No variances expected — this is the first story, so there's no existing structure to conflict with. If the dev agent finds it cleaner to put entity classes in `Data/` instead of their feature folders, that's acceptable — just stay consistent for later stories to follow.

### References

- [Source: _bmad-output/planning-artifacts/architecture/architecture-Tracker-2026-07-03/ARCHITECTURE-SPINE.md#AD-1] — no Repository/Service layer
- [Source: _bmad-output/planning-artifacts/architecture/architecture-Tracker-2026-07-03/ARCHITECTURE-SPINE.md#AD-2] — decimal money, server-computed totals (context only, not built here)
- [Source: _bmad-output/planning-artifacts/architecture/architecture-Tracker-2026-07-03/ARCHITECTURE-SPINE.md#AD-3] — Category as table + match-or-create
- [Source: _bmad-output/planning-artifacts/architecture/architecture-Tracker-2026-07-03/ARCHITECTURE-SPINE.md#Structural Seed] — ERD, folder tree
- [Source: _bmad-output/planning-artifacts/architecture/architecture-Tracker-2026-07-03/ARCHITECTURE-SPINE.md#Consistency Conventions] — ids, dates, money, migrations rules
- [Source: _bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md#FR-2] — category creation supersedes original fixed-list text
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 1: Log an Expense (Home)] — epic-level implementation notes (`server/Entries/`, `server/Categories/`, `server/Data/`)
- [Source: _bmad-output/project-context.md#Architecture Rules, #Critical Don't-Miss Rules] — distilled rule set

## Dev Agent Record

### Agent Model Used

Claude Sonnet 5 (claude-sonnet-5)

### Debug Log References

- `dotnet build server/Tracker.Server.csproj` — succeeded (2 pre-existing NU1903 advisory warnings on `SQLitePCLRaw.lib.e_sqlite3` 2.1.11, the latest available transitive version pulled in by the pinned EF Core Sqlite 10.0.9 provider; no fix currently published)
- `dotnet run` (server) — confirmed `Database.Migrate()` applies `InitialCreate` on startup and seeds the 4 preset categories into `tracker.db` at repo root
- `dotnet test tests/Tracker.Server.Tests` — 4/4 passed (CategoryMatcher: exact match, case-insensitive match, no-match-creates-new, IsPreset defaults false)

### Completion Notes List

- Scaffolded `server/` as a .NET 10 ASP.NET Core Minimal API project; removed the template's sample `WeatherForecast` endpoint and unused `Microsoft.AspNetCore.OpenApi` package so `Program.cs` maps no endpoints, per this story's explicit scope.
- `Category` (`Id`, `Name`, `IsPreset`) and `Entry` (`Id`, `Amount:decimal`, `CategoryId`, `Category` nav, `CreatedAt:DateTimeOffset`) live in `Categories/Category.cs` and `Entries/Entry.cs` respectively — no generic `Models/` folder.
- `TrackerDbContext` (`Data/TrackerDbContext.cs`) registers both `DbSet`s and the FK relationship; connection string read from `appsettings.json` (`ConnectionStrings:TrackerDb` = `Data Source=../tracker.db`, resolving to `tracker.db` at repo root per the deployment diagram).
- Added `Microsoft.EntityFrameworkCore.Sqlite` 10.0.9 and `Microsoft.EntityFrameworkCore.Design` 10.0.9 (both pinned to the .NET 10-compatible version resolved at build time). Installed `dotnet-ef` 10.0.9 as a local tool (`.config/dotnet-tools.json`) to generate migrations.
- Generated the `InitialCreate` migration (`server/Data/Migrations/`) via schema-first EF Core Migrations (not `EnsureCreated()`), with the four preset categories (Food, Transport, Shopping, Other; `IsPreset = true`) seeded through `HasData` in `OnModelCreating` — applied as `InsertData` in the same migration. `Program.cs` calls `Database.Migrate()` on startup and maps no endpoints.
- Implemented `CategoryMatcher.MatchOrCreateAsync` (`Categories/CategoryMatcher.cs`) as a plain static function calling `TrackerDbContext` directly — no `IRepository`/`IService` wrapper. Case-insensitive match via `Name.ToLower()` comparison; creates with `IsPreset = false` on no match.
- Added an xUnit test project at `tests/Tracker.Server.Tests/` (sibling to `server/`, not nested inside it — nesting caused the parent `Tracker.Server.csproj`'s default glob to pick up the test project's files and fail to build). Tests exercise `CategoryMatcher` against a real in-memory SQLite connection (`Data Source=:memory:`) with the EF Core model applied via `EnsureCreated()` (test bootstrap only — production schema creation still goes through migrations in `Program.cs`).
- Verified folder layout matches the Structural Seed tree exactly and confirmed no `IRepository`/`IService` interfaces exist anywhere in `server/`.
- `tracker.db`/`tracker.db-*` and `bin/`/`obj/` added to `.gitignore` (runtime/build artifacts, not committed, per the Structural Seed deployment diagram).

### File List

- `server/Tracker.Server.csproj`
- `server/Program.cs`
- `server/appsettings.json`
- `server/appsettings.Development.json`
- `server/Properties/launchSettings.json`
- `server/Categories/Category.cs`
- `server/Categories/CategoryMatcher.cs`
- `server/Entries/Entry.cs`
- `server/Data/TrackerDbContext.cs`
- `server/Data/Migrations/20260705131445_InitialCreate.cs`
- `server/Data/Migrations/20260705131445_InitialCreate.Designer.cs`
- `server/Data/Migrations/TrackerDbContextModelSnapshot.cs`
- `tests/Tracker.Server.Tests/Tracker.Server.Tests.csproj`
- `tests/Tracker.Server.Tests/CategoryMatcherTests.cs`
- `.config/dotnet-tools.json`
- `.gitignore` (modified)

## Change Log

| Date | Change |
| --- | --- |
| 2026-07-05 | Implemented Story 1.1: scaffolded `server/` ASP.NET Core Minimal API project (.NET 10), `Category`/`Entry` entities, `TrackerDbContext`, initial EF Core migration with preset-category seed, and the `Categories/` match-or-create function with xUnit test coverage. |
