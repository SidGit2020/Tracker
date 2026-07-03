---
name: 'Adversarial Review — Tracker v1 Architecture Spine'
type: review
reviews: 'ARCHITECTURE-SPINE.md'
created: '2026-07-03'
---

# Adversarial Review — Tracker v1 Architecture Spine

## Method

Two units, one level down from this spine, each obeying AD-1 through AD-5 and every
Consistency Convention to the letter:

- **Unit A — Entries.** Owns `server/Entries/` (CRUD, FR-1/3/4/5/6/9) and
  `client/src/app/home/`.
- **Unit B — Monthly Breakdown / Categories.** Owns `server/Categories/`,
  the FR-8 month-summary/drill-down endpoints (AD-5), and
  `client/src/app/monthly-breakdown/`.

This split is the one the Capability → Architecture Map itself implies (FR-8's backend
lives in `server/Entries/` even though the *capability* — Monthly Breakdown — belongs to
Unit B), which is already a seam worth pressure-testing. Each finding below assumes both
units work from the spine only, without cross-talk, and shows two individually
spine-compliant implementations that don't fit together.

Severity: **Critical** (breaks correctness/data integrity), **High** (breaks integration,
caught only at integration time), **Medium** (drift/rework risk, not immediately fatal).

---

## Finding 1 — Entry schema is not exhaustive, so a hard-delete/soft-delete split is invisible until integration

**Severity: Critical**

**What diverges.** Unit A implements FR-6 (delete). Nothing in AD-1 or the Structural
Seed says deletion must be a hard SQL `DELETE`. A reasonable, defensible implementation
choice for Unit A — undo-friendliness, cheap audit trail, "don't destroy data" — is to add
an `IsDeleted bool` column to `Entry` and turn delete into an `UPDATE ... SET IsDeleted =
1`. This is a one-line addition to their own migration; nothing in the spine forbids it.

Unit B, independently, writes its month-summary and drill-down queries (AD-5) directly
against the `Entry` DbSet exactly as the Structural Seed's ERD describes it: `Id, Amount,
CategoryId, CreatedAt`. They have no reason to `WHERE IsDeleted = 0` because that column
doesn't exist in the contract they were handed. Result: "deleted" entries keep counting
in the monthly total, the per-category sums, the drill-down list, and the
`MIN(Entry.CreatedAt)` earliest-navigable-month floor.

**Which AD/convention failed.** AD-1 mandates direct-to-DbContext access from every
feature folder with *no* shared data-access layer — which is exactly the mechanism that
would normally centralize a filter like this. The Structural Seed's ERD is presented as
the schema, but nothing states it is *exhaustive* or that additions require a spine
update. No AD or convention closes this gap.

**Tightened line.** Add to AD-1 (or as a new sentence in the Structural Seed header):

> The Structural Seed ERD is exhaustive. No feature may add columns or tables not
> reflected here without a spine update. Entry deletion (FR-6) is a hard `DELETE` — no
> `IsDeleted`/soft-delete flag exists or may be introduced unilaterally. Any feature
> querying `Entry` directly may assume the schema is exactly this ERD, nothing more.

---

## Finding 2 — Category creation: embedded write vs. dedicated endpoint (ownership of the `Category` table is unresolved)

**Severity: High**

**What diverges.** AD-3's *rule text* describes an entry-creation-time behavior: "Entry
creation accepts either an existing `CategoryId` or a new category `Name`; a new name is
matched case-insensitively... before a new row is created." Read literally, this is logic
inside the Entries POST handler — Unit A's territory, one HTTP round trip, `Entries/
EntriesEndpoints.cs` writing to the `Category` DbSet as a side effect.

But the Capability → Architecture Map assigns FR-2 ("category selection + creation") to
`server/Categories/`, i.e. Unit B's folder. Unit B, reading *that* row, reasonably builds
a dedicated `POST /categories` (match-or-create) endpoint, expecting Home's client to call
it first and then POST to `/entries` with only a resolved `CategoryId` — two round trips,
two owners, one for lookup/create and one for the entry write.

Unit A's Home component (also Unit A's to build, per the Capability Map) is coded against
its own reading — a single `POST /entries { amount, categoryId?, categoryName? }` call —
because that's what AD-3's rule literally describes. When integrated: Unit A's client
never calls Unit B's `/categories` endpoint at all, and Unit B's endpoint is dead code: OR
Unit A's `/entries` endpoint doesn't contain the match-or-create logic it needs, because
Unit A assumed (from the Capability Map) that categories are Unit B's problem entirely.
Either way, category creation silently doesn't work at integration.

**Which AD/convention failed.** AD-3 describes *behavior* but not *which endpoint/feature
owns the write*, and it directly contradicts the Capability Map's folder assignment for
the same FR. AD-1's "no repository layer, direct EF Core" removes the one mechanism
(a shared service) that would otherwise force a single code path regardless of which
folder calls it.

**Tightened line.** Add to AD-3:

> The match-or-create step happens inside the Entries POST endpoint's handler — a single
> request/response round trip from the client, `Entries/EntriesEndpoints.cs` writing to
> the `Category` DbSet directly when a new name is supplied. `server/Categories/` exposes
> only a read endpoint (`GET /categories`, all rows, for populating the selector) — it
> never exposes a create or resolve endpoint. The Capability Map's "FR-2 lives in
> server/Categories/" refers only to this read endpoint, not to category creation.

---

## Finding 3 — No canonical Entry response shape: nested vs. flat category representation

**Severity: High**

**What diverges.** Three different endpoints return "an entry" or "entries": Unit A's
CRUD responses (FR-1/3/5/6 — "responses return only the affected entry" per AD-2), Unit
A's entry-list for Home (FR-4), and Unit B's drill-down list (AD-5b). Nothing pins one
JSON shape for "Entry as seen by the API." Unit A, building CRUD first, has an EF Core
navigation property `Entry.Category` loaded and serializes it as-is:
`{ id, amount, category: { id, name }, createdAt }`. Unit B, building the drill-down
independently and reasoning "the UI just needs to show the category name next to each
line," writes its own DTO: `{ entryId, amount, categoryName, createdAt }` — flat, differently
named id field, no nested object. Both satisfy every literal Consistency Convention
(money as `decimal`, dates as UTC `DateTimeOffset`/ISO-8601, PascalCase C# types). Neither
violates AD-1 or AD-2. But a shared Angular `Entry` model in `client/src/app/shared/api/`
cannot represent both shapes, and whichever unit writes that shared model second either
breaks the other's already-built component or forks the type per feature — which the
"Shared UI components" convention explicitly tries to prevent for markup, but nothing
parallel exists for data shapes.

**Which AD/convention failed.** The Consistency Conventions table has a "Naming" row for
types/files and a "Data & formats" row for id/date/money/error *primitives*, but no row
constrains the *shape* of an entity as it crosses the API boundary. This is a real gap,
not a misreading of an existing rule.

**Tightened line.** Add a row to the Consistency Conventions table:

> **API response shapes** — Every endpoint that returns an Entry (create/edit response,
> Home list, drill-down list) uses one canonical, flat shape:
> `{ id, amount, categoryId, categoryName, createdAt }`. Never a nested `category: {}`
> object, never a renamed id field. Defined once in `server/Entries/Models.cs` (or
> equivalent) and reused by every endpoint in that folder; the Angular
> `shared/api/entry.model.ts` mirrors it exactly — no per-feature reshaping on either
> side.

---

## Finding 4 — Does editing an entry (FR-6) mutate `CreatedAt`?

**Severity: High**

**What diverges.** The ERD's only timestamp on `Entry` is `CreatedAt`; there is no
`UpdatedAt`. AD-5 both sorts the drill-down by `CreatedAt` descending and derives the
earliest-navigable month from `MIN(Entry.CreatedAt)`. FR-6 is edit (amount/category
correction) — nothing states whether an edit refreshes `CreatedAt` or leaves it untouched.

Unit A, implementing edit, has two equally defensible readings of a schema with a single
timestamp column: (a) `CreatedAt` is immutable — set once, never touched by an edit; or
(b) since there's no second timestamp field to record "when this row was last touched,"
and the field is literally the only clock the row has, an edit legitimately updates it
(some devs treat a single timestamp column as "last-modified" by convention when no
`CreatedAt`/`UpdatedAt` pair exists). If Unit A picks (b), an edited entry can silently
jump to a different month bucket in Unit B's month-summary query (built independently,
assuming (a)), change its position in the drill-down sort order, and — worse — move the
`MIN(Entry.CreatedAt)` floor if the edited row happened to be the oldest one, retroactively
shrinking the navigable month range Unit B already computed and cached/rendered.

**Which AD/convention failed.** No AD addresses edit semantics for `CreatedAt`; AD-5
depends on `CreatedAt` being a stable, creation-time-only value without ever stating that
invariant. Ambiguous Rule, no AD covers it.

**Tightened line.** Add to AD-5 (or the Structural Seed):

> `CreatedAt` is immutable: set once at INSERT, never modified by FR-6 edits. It is both
> the audit timestamp and the sole field used to bucket an entry into its month for
> Monthly Breakdown and to compute the `MIN(Entry.CreatedAt)` navigable-month floor. No
> `UpdatedAt` field exists or is needed in v1 since edits carry no audit requirement.

---

## Finding 5 — Empty database: `MIN(Entry.CreatedAt)` is `NULL`, and AD-5 doesn't say what happens then

**Severity: Medium**

**What diverges.** FR-9 ("direct wall-free entry") means a user can land on Home, and by
extension on Monthly Breakdown, before ever saving an entry. `MIN()` over an empty table
is `NULL` in SQL. AD-5 says the earliest-navigable month is "derived from
`MIN(Entry.CreatedAt)` — not a configured limit" but never says what to do when that
value is `NULL`. Unit A, owning the empty-state UX for Home (FR-9), has already solved
"zero entries" for their own screen and has no reason to think further about it. Unit B,
building the month-summary endpoint standalone, might reasonably: (a) return a 404/error
if there's no data, (b) default to the current calendar month with all-zero sums, or (c)
throw an unhandled exception on the `NULL` MIN. Each is a plausible, spine-compliant
reading of "derive the floor from MIN(CreatedAt)" when nobody has said what "derive"
means for a null input. If Unit B picks (a) or (c) while the UX (built by whichever unit
wires up routing) assumes the page always renders something, first-run Monthly Breakdown
breaks for every new install.

**Which AD/convention failed.** No AD covers the empty-database edge case; AD-5 states the
happy-path derivation only.

**Tightened line.** Add to AD-5:

> When `Entry` is empty, the month-summary endpoint returns the current calendar month
> with all-zero sums (`total = 0`, no category rows) rather than erroring, and month
> navigation is disabled until `MIN(Entry.CreatedAt)` is non-null.

---

## Finding 6 — "Promoted on 2nd use" assumes serial discovery; two parallel builders both see themselves as first

**Severity: Medium**

**What diverges.** The Overlay component is explicitly already known, at spine-writing
time, to be needed by *both* Home's confirm popup and Breakdown's drill-down panel (the
spine names both consumers in the same sentence). The Shared UI convention nonetheless
phrases the rule as "promoted on 2nd use... not duplicated per feature" — a rule that
presumes builder #2 discovers builder #1's component and refactors it into `shared/`.
Under this adversarial setup, Unit A and Unit B work independently and don't see each
other's WIP. Each, from its own vantage point, is building the *first* use of Overlay for
its own screen — there is no second use *yet* to trigger a promotion, so each
legitimately builds a local, feature-scoped Overlay (different input/output signal API,
different close-on-backdrop-click behavior, different focus-trap or animation
approach), fully satisfying the letter of "not duplicated" (each has exactly one, local,
un-duplicated copy) until integration reveals two incompatible components claiming the
same shared responsibility.

**Which AD/convention failed.** The Shared UI Components convention encodes a sequencing
assumption ("2nd use" implies visibility into the 1st) that this task's own two-units-in-
parallel framing violates. Not a misreading — the rule is simply silent on the
already-known-needed-by-both case.

**Tightened line.** Add to the Shared UI Components convention:

> Any component the spine itself already names as needed by two or more features (Overlay
> is the only current instance) is scaffolded once, upfront, in `shared/components/`
> before either consuming feature's implementation begins — this is not a "wait for 2nd
> use" case, since the second use is already known. "Promoted on 2nd use" applies only to
> components discovered as reusable *after* the fact, not ones named in this spine.

---

## Finding 7 — Async state contract names a goal ("a consistent shape"), not an interface

**Severity: Medium**

**What diverges.** The convention requires every feature service to expose
"Default/Loading/Error signal state... a consistent shape, not one invented per feature,"
but gives no actual TypeScript interface. Unit A might implement three independent
signals: `loading = signal(false)`, `error = signal<string|null>(null)`, `data =
signal<T|null>(null)`. Unit B, aiming for the same stated goal, might implement one
discriminated-union signal: `state = signal<{status:'default'|'loading'|'error', data?:T,
message?:string}>(...)`. Both are individually "a consistent [internal] shape" and both
plausibly satisfy the four named states (Default/Loading/Empty/Error) — but they are not
the *same* shape, so a shared presentational wrapper (e.g. a generic loading/error
container, a natural shared-component candidate once two features need one) cannot be
built against both, and any code review checking "does this match the convention" has no
concrete answer key to check against.

**Which AD/convention failed.** The Async State Contract convention states an intent
without pinning the interface — the one row in the table most in need of a concrete
signature is the one left abstract.

**Tightened line.** Replace the convention with a concrete contract, e.g.:

> Every feature service exposes exactly one signal:
> `readonly state = signal<AsyncState<T>>({ status: 'default' })` where
> `type AsyncState<T> = { status: 'default' | 'loading' | 'error'; data?: T; message?: string }`
> (defined once in `client/src/app/shared/api/async-state.ts`). No feature defines its own
> loading/error/data signals independently of this type.

---

## Finding 8 — `server/Entries/` is a shared folder with no file-split or DTO-collision convention

**Severity: Low–Medium**

**What diverges.** Per the Capability Map, FR-8's backend (AD-5's month-summary and
drill-down endpoints — Unit B's capability) lives in the same `server/Entries/` folder as
Unit A's CRUD endpoints, because the naming convention groups files "per feature folder,
named for the resource" and the resource is `Entry` either way. Two units now add files to
one folder with no rule on how to split it. Plausible outcome: Unit A creates
`Entries/EntriesEndpoints.cs` containing CRUD *and* a summary route they assume is
"obviously" theirs since it's about entries; Unit B, working from AD-5 alone and not
knowing Unit A already added one, creates `Entries/MonthSummaryEndpoints.cs` with its own
route registration for the same path, and/or its own DTO class reusing a name Unit A
already declared in the same namespace (e.g. both declare `CategorySummary` with
different fields) — a compile-time collision or a silently-shadowed duplicate route,
depending on registration order in `Program.cs`.

**Which AD/convention failed.** AD-1 says files are grouped by feature, never by
technical layer — but says nothing about how a *folder* shared by two capability owners
splits into files, or where shared DTOs for that folder are declared once.

**Tightened line.** Add to the Naming convention row:

> Within a feature folder shared by more than one capability owner (e.g. `Entries/` holds
> both CRUD and AD-5's month-summary/drill-down), endpoints are split one file per
> FR-cluster (`EntriesEndpoints.cs` for FR-1/3/5/6, `EntriesSummaryEndpoints.cs` for AD-5),
> and any DTO shared across those files is declared exactly once in `Entries/Models.cs` —
> never redeclared per file.

---

## Summary Table

| # | Diverging pair | AD/convention gap | Severity |
| - | --- | --- | --- |
| 1 | Hard-delete (Unit B's assumption) vs. silent `IsDeleted` soft-delete (Unit A's choice) | AD-1 direct-EF-Core with no exhaustive-schema guarantee | Critical |
| 2 | Category match-or-create embedded in `/entries` POST vs. a separate `/categories` create endpoint | AD-3 rule text vs. Capability Map folder assignment contradict each other | High |
| 3 | Nested `category: {}` vs. flat `categoryName` in Entry API responses | No convention pins entity response shape across endpoints | High |
| 4 | `CreatedAt` immutable vs. `CreatedAt` bumped on edit | No AD states edit semantics for the only timestamp column | High |
| 5 | 404/error vs. current-month-all-zero on empty-DB month query | AD-5 states happy path only, not the `NULL` MIN case | Medium |
| 6 | Two independently-built, incompatible local Overlay components | "Promoted on 2nd use" assumes serial, not parallel, discovery | Medium |
| 7 | Three-signals-loading/error/data vs. one discriminated-union signal | Async state convention states intent, not an interface | Medium |
| 8 | Colliding file/DTO names inside shared `server/Entries/` folder | No split convention for a folder with two capability owners | Low–Medium |
