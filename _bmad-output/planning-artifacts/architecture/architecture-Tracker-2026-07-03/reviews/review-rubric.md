---
title: Review — Tracker v1 Architecture Spine
reviewed: ARCHITECTURE-SPINE.md + .memlog.md
against: rubric (6-point checklist, initiative altitude)
date: 2026-07-03
---

# Review: Tracker v1 Architecture Spine

## Verdict

Solid, appropriately-scoped spine with one significant unflagged gap: AD-5 (month
navigation + category drill-down) directly reverses explicit PRD commitments
(FR-8's "no drill-down required," the Out-of-Scope "no charts/visualizations
beyond plain sums," and a named Open Risk) without the `[OVERRIDE]` marker and
Deferred-section reconciliation note the spine correctly applied to its other
three PRD divergences (AD-2, AD-3, AD-4). Everything else — stack currency,
AD enforceability, ERD/capability-map/source-tree consistency, dimension
coverage — checks out.

## Checklist walk-through

### 1. Does it fix the real divergence points a level below (epics/stories) and miss none?

Mostly yes. AD-1 (no repo/service layer), AD-2 (server-computed totals, scoped
correctly to the finalized UX rather than the stale PRD text), AD-3 (categories
as a table, dedup rule), AD-4 (deployment topology, trust boundary), and AD-5
(month-summary + drill-down query shapes) each pre-empt a real fork where two
story-writers/builders would otherwise invent incompatible shapes. These are
the right five divergence points for this scale.

**Gap found:** the DB schema-creation/seeding mechanism is never decided. The
source tree names `Data/ # DbContext, migrations`, implying EF Core Migrations,
but no AD or convention states migrations-vs-`EnsureCreated()`, nor how the
four preset categories (`IsPreset = true`) get seeded (migration seed data vs.
a startup check-and-insert). This is exactly the kind of thing AD-1/AD-3 were
written to pre-empt for endpoints/categories, but the seeding mechanism itself
is left to whoever writes the first Categories story to improvise. Low-to-moderate
risk given this is a solo weekend build, but worth a one-line Rule (or an
explicit Deferred entry acknowledging it's left to build-time judgment, matching
how "Automated test framework" is handled).

### 2. Is every AD's Rule enforceable and does it actually prevent its stated divergence?

- **AD-1:** enforceable by folder inspection / code review (no `IRepository`,
  no `Service` interface, feature-grouped files). Prevents its stated divergence.
- **AD-2:** enforceable (response shape check: mutation endpoints return only
  the entry; a dedicated month-summary query exists). Prevents its divergence.
- **AD-3:** enforceable (schema shape + dedup rule are checkable). Prevents
  its divergence.
- **AD-4:** enforceable for the "one process, one port, no auth middleware"
  part. Weaker on the "reachable only on local machine/network" half — the
  Rule states the *intent* (no public ingress) but gives no mechanical Rule
  for achieving it (e.g., which interface Kestrel binds to, whether the
  Angular dev-proxy config could accidentally expose a second port during
  dev). This is minor at this scale (single dev, LAN, no adversarial threat
  model) but it's the one AD in the set whose Rule is a statement of desired
  outcome rather than a checkable build-time constraint.
- **AD-5:** enforceable (two named endpoints, sort order, MIN(CreatedAt)
  bound, read-only drill-down). Prevents its stated divergence — *but see the
  finding below: it is itself an unflagged divergence from the PRD.*

### 3. Does anything under Deferred risk letting two units diverge (wrongly deferred)?

The seven items in Deferred are all genuinely fine to leave open at this
altitude (test framework, backup mechanics, timestamp copy, Candidate
Fast-Follows, and the three flagged PRD reconciliation items). Nothing there
is a hidden divergence risk.

The risk is the opposite shape: a **missing** Deferred entry. See the main
finding below — AD-5's scope expansion should either carry an `[OVERRIDE]`
marker + Deferred reconciliation note (matching AD-2/AD-3/AD-4's treatment)
or be walked back to match the PRD's explicit "sums-only" position pending
user sign-off.

### 4. Is named tech verified-current for mid-2026?

- **.NET 10 (LTS)** — plausible; .NET 10 shipped Nov 2025 as the current LTS,
  supported to Nov 2028. Consistent with a mid-2026 project.
- **Angular 22** — plausible; Angular's twice-yearly cadence (v20 ~May 2025,
  v21 ~Nov 2025, v22 ~Jun 2026) lines up with a "current stable" claim in
  July 2026.
- **EF Core / SQLite provider** — correctly left as "latest compatible,
  pin at build time" rather than naming a version that could already be
  stale by the time building starts. Appropriate hedge, not a gap.

No implausible or clearly-outdated tech named.

### 5. Does every dimension this altitude owns get decided/deferred/flagged?

Covered: backend paradigm, data model, frontend state, deployment topology,
security/trust boundary, responsive breakpoint, shared-component convention,
async state contract, error envelope, id/date/money formats, stack versions.

Silent (beyond the migrations/seeding gap above): logging/observability is
never mentioned. This is likely fine to leave silent — the PRD explicitly
puts "analytics/telemetry infrastructure" Out of Scope, and a weekend-scale
single-user local app has no real operational-monitoring need — but it's
worth noting it's silent-by-omission rather than silent-by-explicit-deferral
(no Deferred bullet says so). Not a material risk at this scale.

### 6. Internal consistency: AD numbers, Capability Map, source tree, ERD

These agree with each other almost everywhere:
- Capability Map's AD references match the AD section exactly.
- Source-tree folder names (`server/Entries/`, `server/Categories/`,
  `client/src/app/home/`, `client/src/app/monthly-breakdown/`) match the
  Capability Map's "Lives in" column exactly.
- ERD (`Category{Id, Name, IsPreset}`, `Entry{Id, Amount, CategoryId,
  CreatedAt}`) matches AD-3's and AD-5's schema claims, and matches what
  PRD's FR-1/FR-4 actually need (no entry note/description field is needed,
  none is promised, none is modeled — consistent all the way through).
- Deployment diagram matches AD-4's rule text exactly (single process,
  OS-encrypted disk, LAN/same-machine only).

**One real inconsistency:** AD-2 is careful to (a) state in its own heading
that it "supersedes FR-7's PRD text," (b) carry an explicit Deferred entry
telling the user to amend the PRD, and (c) have the Capability Map row for
FR-7 point at that Deferred entry ("see Deferred: PRD text stale"). AD-5 does
the same *kind* of thing to the PRD — reverses an explicit exclusion — but
gets none of the three treatments: no supersession note in its own heading,
no `[OVERRIDE]` tag, no Deferred entry, and the Capability Map row for FR-8
lists AD-2/AD-5 with no "PRD text stale" pointer. The spine applies its own
"flag every PRD reversal" convention inconsistently between AD-2/AD-3/AD-4
and AD-5.

## Main finding (detail)

**AD-5 silently reverses PRD FR-8 and an explicit Out-of-Scope line; unlike
AD-2/AD-3/AD-4, this reversal is not flagged for reconciliation.**

Evidence, cross-checked against `prd.md`:

- PRD FR-8 text: *"per-category totals for the current month as plain, exact
  sums — glanceable, **no drill-down required** to see the top-level numbers."*
- PRD Out-of-Scope: *"Charts, trends, or visualizations beyond the plain
  per-category sums in FR-8."*
- PRD Open Risks: *"FR-8 is intentionally sums-only, no drill-down... If a
  total ever looks off, Siddi's only recourse is manually re-adding his own
  entries."* — this line exists specifically because the PRD chose not to
  build a way to investigate a suspicious total.
- A prior reconciliation pass (`prd-Tracker-2026-07-03/reconcile-ux-scenarios.md`,
  §"Contradictions": *"No direct contradictions found"*) already confirms the
  PRD, as written, deliberately excludes drill-down — this isn't stale PRD
  text nobody looked at, it was checked and reaffirmed sums-only at the PRD
  stage.
- AD-5 nonetheless commits the architecture to: (a) a month-navigation
  capability (browse past months, bounded by `MIN(Entry.CreatedAt)`) that
  PRD FR-8 never mentions (FR-8 only covers "the current month"), and (b) a
  read-only entries-by-month-and-category drill-down endpoint/panel — exactly
  the capability the PRD's Open Risk says doesn't exist in v1. The Structural
  Seed source tree compounds this: `monthly-breakdown/` is annotated "total +
  **category bar chart**" — a chart, which the PRD's Out-of-Scope line
  excludes by name.
- The memlog does record these as deliberate decisions sourced from Phase 4 UX
  (`02-siddi-reviews-the-month`'s `Breakdown.2` month-selector and `Breakdown.4`
  drill-down-panel stories), so this isn't an accidental invention — the UX
  work is real and already validated/built as a prototype. The gap is
  process, not content: the spine (and the UX phase before it) never generated
  the `[OVERRIDE]` + Deferred-reconciliation pair that the *other three*
  PRD-diverging decisions in this same document received.

**Why it matters at the next altitude down:** a story-writer opening the PRD
and the spine side by side has no signal that this particular contradiction
needs resolving — unlike the categories, running-total, and no-auth
divergences, which are explicitly called out with "needs a PRD amendment...
before story-writing." Someone relying on the PRD's Open Risks section (e.g.
to scope a fast-follow) would still believe drill-down is unbuilt in v1. This
is precisely the two-units-diverge failure mode the checklist asks about,
just one level up (PRD vs. architecture) rather than between two story
implementations.

**Recommendation:** add a fourth Deferred bullet, parallel to the existing
three, e.g.: *"PRD/spine divergence on Monthly Breakdown drill-down and month
navigation (AD-5). PRD FR-8 says 'no drill-down required' and Out-of-Scope
excludes charts/visualizations beyond plain sums; this spine (following
Phase 4 UX) commits to a category drill-down panel, a category bar chart, and
month-to-month navigation beyond the current month. Needs a PRD amendment to
FR-8/Out-of-Scope, or a decision to strip these from v1 architecture, before
story-writing."* Optionally also add `[OVERRIDE]` to AD-5's heading for
symmetry with AD-2/AD-3/AD-4.

## Minor findings

1. **[Low]** DB schema-creation/seeding strategy (migrations vs.
   `EnsureCreated()`, and how preset categories are seeded) is implied by the
   source tree but never decided by an AD or Deferred entry.
2. **[Low]** AD-4's LAN-only reachability is a stated intent without a
   corresponding mechanical Rule (e.g., bind address) — weaker than the other
   ADs' checkable Rules, though low-risk at this scale/threat model.
3. **[Informational]** Logging/observability is silent by omission rather
   than by explicit Deferred entry; likely fine given the PRD's explicit
   no-telemetry Out-of-Scope line, but noted for completeness.

## What's solid (no changes needed)

- AD-1 through AD-4's Rules are each specific, checkable, and correctly scoped
  to a real two-builder fork.
- Stack table entries are plausible for mid-2026 and appropriately hedge
  versions that shouldn't be pinned yet (EF Core / SQLite provider).
- ERD, Capability Map, and source tree agree with each other and with PRD's
  actual field-level needs (no unnecessary or missing columns).
- The three PRD divergences that *are* flagged (AD-2 running total, AD-3
  categories, AD-4 trust boundary) are each flagged with the right severity
  and the right recommended resolution (amend PRD vs. narrow architecture).
- Deferred section's other six items (test framework, backup, timestamp
  format, encryption-at-rest verification, Fast-Follows) are all
  appropriately left open for this scale.
