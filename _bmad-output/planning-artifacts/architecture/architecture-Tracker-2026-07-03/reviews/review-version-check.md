---
name: 'Version/Reality-Check Review — Tracker v1 Architecture Spine'
type: review
target: 'ARCHITECTURE-SPINE.md'
lens: 'Every committed technical decision was reality-checked, not asserted from training data'
date: '2026-07-03'
---

# Review: Version & Technology Reality-Check — Tracker v1 Architecture Spine

Reviewed: `ARCHITECTURE-SPINE.md` + `.memlog.md`
Method: independent web search (July 2026) re-deriving each stack/technology claim from scratch, then diffed against what the spine and memlog assert. No existing scaffolded project (`.csproj`/`package.json`) exists yet in the repo, so nothing could be cross-checked against a real starter — every claim below is validated against public docs/search only.

## Summary verdict

Most named technologies check out and the two headline version claims (.NET 10, Angular 22) were genuinely reality-checked, not guessed — but the spine asserts a decimal-everywhere + server-computed-aggregates data contract (AD-2, AD-5) that collides with a well-documented, load-bearing EF Core Sqlite provider limitation the spine never surfaces: **SQLite/EF Core cannot perform `Sum`/`GroupBy` aggregation or `ORDER BY` on `decimal` or `DateTimeOffset` columns server-side.** This directly undermines AD-2's "computed server-side by a dedicated month-summary query" and AD-5's "sorted CreatedAt descending" as literally specified. This is the one finding that should block story-writing until resolved; everything else is minor or confirms the spine is correct.

## Findings

### 1. [HIGH] AD-2 + AD-5's server-side decimal aggregation contradicts a documented EF Core Sqlite provider limitation

**Claim in spine:** AD-2 — "Money is `decimal` end-to-end... never `float`/`double`" and "computed server-side by a dedicated month-summary query." AD-5 — a month-summary endpoint returning "total + per-category sums for that month" (i.e., `SUM`/`GroupBy(Sum)` over `Amount`), plus entries "sorted `CreatedAt` descending" where `CreatedAt` is `DateTimeOffset` (per the Structural Seed ERD and the Consistency Conventions table).

**Reality:** Microsoft's own EF Core Sqlite provider docs (learn.microsoft.com/ef/core/providers/sqlite/limitations, verified live) state plainly: SQLite doesn't natively support `decimal`, `DateTimeOffset`, `TimeSpan`, or `ulong`. Equality filters work, but **"comparison and ordering will require evaluation on the client."** A dedicated dotnet/efcore GitHub issue (#29314) is titled exactly *"SQLite cannot apply aggregate operator 'Sum' on expressions of type 'decimal'"* — this throws at runtime, it isn't a style nitpick. The documented remediations are: (a) convert `decimal` to `double` via `HasConversion<double>()` (violates the spine's own "never float/double" rule), or (b) pull rows into memory and aggregate/sort with LINQ-to-Objects (i.e., **not** "computed server-side" as AD-2 requires — it's server-process-side-but-client-evaluated-in-.NET-memory, a materially different and less scalable query shape than a SQL `SUM`/`GROUP BY`/`ORDER BY`). Same applies to sorting entries by `CreatedAt` if it stays `DateTimeOffset` — ordering also requires client evaluation per the same doc.

**Why this matters:** This is exactly the kind of two-builder-divergence risk the spine exists to prevent (per its own AD-1/AD-2/AD-5 "Prevents" framing) — without a stated resolution, one builder could write `SUM()` LINQ and hit a runtime `NotSupportedException`-class failure discovered mid-build, or silently switch to `double` and violate the money-precision NFR, while another pulls everything into memory and writes an O(n) scan per month-summary call. Neither is currently ruled in or out by the spine.

**Suggested resolution (not applied — flag for the user/spine-owner):** Either (a) explicitly adopt the documented workaround — e.g., store `Amount` as `decimal` in the C# model via a value converter but materialize the query with `.ToListAsync()` before summing/grouping in-memory (small dataset, single user, weekend-scale — this is almost certainly fine performance-wise, but it should be a *stated* rule, not a gap), and switch `CreatedAt` sorting to also happen client-side-in-.NET or store it as `DateTime` (UTC) instead of `DateTimeOffset` per Microsoft's own recommendation on that same page ("we recommend using `DateTime` values... converting to UTC before saving"); or (b) accept `double` for stored money and reconcile that against the "never float/double" NFR. Either way, this needs an explicit AD, not silence.

### 2. [LOW] ProblemDetails "RFC 9457" label is slightly ahead of ASP.NET Core's own tracked implementation status

**Claim in spine:** "Errors: `ProblemDetails` (RFC 9457) JSON envelope for all non-2xx responses."

**Reality:** RFC 9457 (July 2023) obsoletes RFC 7807 and is JSON-shape-compatible (same core fields: `type`, `title`, `status`, `detail`, `instance`), and ASP.NET Core's built-in `ProblemDetails`/`IProblemDetailsService` support already produces that shape out of the box — so functionally this claim is fine for this app's needs. However, the tracking issue for explicit RFC 9457 support in aspnetcore (dotnet/aspnetcore#52414, opened Nov 2023) is still **open, unmilestoned, unassigned** as of this check — meaning ASP.NET Core's own docs/team still frame current behavior as RFC 7807-shaped rather than a completed RFC 9457 upgrade. Not a functional problem for Tracker v1 (no exotic 9457-only fields like `problem-details-extension` typed collections are needed here), but the spine's parenthetical "(RFC 9457)" reads as more settled than it is. Cosmetic — no action needed beyond awareness.

### 3. [INFORMATIONAL] Version claims that were confirmed accurate and appear genuinely reality-checked

- **.NET 10**: Confirmed released Nov 11, 2025, LTS supported to Nov 2028. Matches memlog's claim exactly (memlog: "released Nov 2025, supported to Nov 2028"). Given Angular 22 (June 2026) and this level of date precision falls after the model's Jan 2026 training cutoff, this could only have come from an actual search, not recall — the memlog's "confirmed via web search" annotation is credible.
- **Angular 22**: Confirmed released June 3, 2026, "signal-first" release (Signal Forms stable, OnPush default, selectorless components), active support to Dec 2026, LTS to May 2028. Matches memlog exactly. Same reasoning — post-cutoff fact, had to be searched, not recalled.
- **EF Core Sqlite provider**: `Microsoft.EntityFrameworkCore.Sqlite` — confirmed on NuGet at version 10.0.9, tracking .NET 10. The spine's "latest compatible... pin exact version at build time" hedge is reasonable; nothing wrong here, though 10.0.9 could arguably have been pinned already rather than left as "latest" since .NET 10 has been out ~8 months.
- **Minimal APIs (.NET 10)**: Confirmed mature/production-ready — built-in DataAnnotations validation, `IProblemDetailsService` integration, OpenAPI 3.1, record-type binding. Fits the stated "no Repository/Service layer, direct-to-DbContext" use.
- **Angular signals, no NgRx**: Confirmed signals are stable/built into Angular core and are a legitimate no-NgRx path for an app this size (one entries list + derived aggregates). Search results note signals "reduce the need for NgRx but do not completely replace it" for larger apps — irrelevant at Tracker's scale, so the spine's choice is sound, not stale.
- **BitLocker/FileVault caveat (AD-4)**: Confirmed BitLocker is unavailable on Windows Home in the traditional sense; Windows 11 24H2 introduced automatic **Device Encryption** (a lighter-weight relative, not full BitLocker) on qualifying Home-edition hardware during clean installs when signing in with a Microsoft Account — but this doesn't apply retroactively to in-place upgrades. The spine's Deferred item ("BitLocker isn't on by default on non-Pro Windows editions... nothing confirms the host actually has it enabled") is directionally correct and already correctly flagged as an unverified operational risk requiring the user to check the real host — no change needed, though the Deferred note could be sharpened to distinguish "BitLocker" (Pro+) from "Device Encryption" (Home, conditional) for precision if this is ever revisited.

## Non-findings (checked, no issue)

- **Category-as-table, `IsPreset` flag, case-insensitive name dedup** — internal design decision, not an externally-verifiable technology claim; no reality-check applicable.
- **Single-process/single-port deployment (`wwwroot` publish)** — standard, well-documented ASP.NET Core pattern (`dotnet publish` + SPA static files), no version risk.
- **Integer autoincrement PK vs GUID** — plain SQLite `INTEGER PRIMARY KEY`, no compatibility risk.

## Bottom line

One load-bearing gap (Finding 1) should be resolved with an explicit rule before story-writing, since it directly contradicts how AD-2/AD-5's server-computed totals and sorted queries are described. Everything else the spine asserts about current tooling (.NET 10, Angular 22, EF Core Sqlite, Minimal APIs, ProblemDetails, signals, BitLocker) was either already reality-checked correctly or is a minor/cosmetic nuance, not a stale/hallucinated claim.
