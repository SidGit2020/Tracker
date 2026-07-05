---
project_name: 'Tracker'
user_name: 'SIDDI'
date: '2026-07-05'
sections_completed: ['technology_stack', 'architecture_rules', 'coding_standards', 'security_rules', 'anti_patterns']
status: 'complete'
rule_count: 28
optimized_for_llm: true
sources:
  - '_bmad-output/planning-artifacts/architecture/architecture-Tracker-2026-07-03/ARCHITECTURE-SPINE.md'
  - '_bmad-output/planning-artifacts/prds/prd-Tracker-2026-07-03/prd.md'
  - '_bmad-output/D-Design-System/00-design-system.md'
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss. Each rule below is a distilled pointer back to its source doc — read the source for full rationale, not this file._

_Status: Tracker v1 is pre-implementation — no `server/`/`client/` code exists yet. These rules come from the finalized architecture spine, PRD, and design system, not from discovered code patterns._

---

## Efficient Source-Doc Reading (Story Creation & Dev-Story)

The rules below are usually sufficient on their own. Only open a source doc when a rule needs its full rationale — and even then, read the one section that covers the story's area, not the whole file. This keeps story-creation and dev-story token cost down.

| Story area (FR/AD) | PRD section to read | Architecture spine section to read | Design system section to read |
| --- | --- | --- | --- |
| Quick-add, entry list, edit, delete (FR-1, FR-3–FR-6) | `Features (v1) → Logging` | AD-1; Structural Seed (ERD) | Patterns → Toast Notification (save-confirm only) |
| Category selection + creation (FR-2) | `Features (v1) → Logging`, FR-2 bullet only | AD-3 | — |
| Monthly total + category breakdown + drill-down (FR-7, FR-8) | `Features (v1) → Review` | AD-2, AD-5 | Patterns → Horizontal Bar Chart; Components → Overlay (Drawer/Sheet variant) |
| Any confirm/edit popup | — | AD-1 (feature grouping only) | Components → Overlay (Centered Dialog variant) |
| Deployment, hosting, no-auth (FR-9, NFR security) | `Non-Functional Requirements` | AD-4; deployment diagram in Structural Seed | — |
| Any responsive layout work | — | Consistency Conventions → "Responsive breakpoint" row | Spacing Scale, Type Scale, Breakpoints |
| Stack/version questions | `Constraints` | `Stack` table | — |

Don't read `Deferred`, `Open Risks`, or `Candidate Fast-Follows` (PRD/spine) — those conflicts are already resolved into the rules in this file. Only open them if a story appears to contradict a rule above and you need the original reconciliation reasoning.

---

## Technology Stack & Versions

- .NET 10 (LTS), ASP.NET Core Minimal APIs
- Entity Framework Core — latest compatible with .NET 10 (pin exact version at build time) + SQLite via `Microsoft.Data.Sqlite`
- Angular 22, built-in signals — **no NgRx**
- Single deployable: Angular production build published into ASP.NET Core's `wwwroot`, one process, one port

## Architecture Rules

- No Repository/Service abstraction layer — Minimal API handlers call `DbContext` directly; files grouped by feature (`Entries/`, `Categories/`), never by technical layer
- Money is `decimal` end-to-end, never `float`/`double`. Totals are computed **server-side only** by a dedicated month-summary query — entry add/edit/delete responses return only the affected entry, never a total
- `Category` is a DB table (`Id`, `Name`, `IsPreset`), not an enum. Match-or-create dedup (case-insensitive) is a single function owned by `Categories/`, called by `Entries/` — never reimplemented inline
- `CreatedAt` (`DateTimeOffset`, UTC) is immutable after creation — editing an entry changes `Amount`/`CategoryId` only
- EF Core's SQLite provider can't translate `Sum`/`GroupBy` over `decimal` (or reliable `DateTimeOffset` ordering) to SQL — fetch month-bounded rows via `WHERE`, then aggregate/sort in-process (LINQ-to-Objects)
- IDs: integer autoincrement PK — no GUIDs. Deletes are hard deletes — no `IsDeleted` column
- Every Entry API response nests `category: { id, name }` — never a flat `categoryName` or bare `categoryId`
- Schema via EF Core Migrations (not `EnsureCreated()`), including a seed migration for the 4 preset categories

## Coding Standard Rules

- Naming: PascalCase C# types; endpoint files named for the resource (`Entries/EntriesEndpoints.cs`). Angular: one feature folder per screen, `kebab-case` filenames, services named `*.service.ts`
- No raw pixel values in Angular styles — use design tokens (`space-*`, `text-*`). Single breakpoint: `bp-mobile` (<640px) / `bp-desktop` (640px+) via one shared constant/media query
- Shared UI (Overlay: Centered Dialog + Drawer/Sheet variants) lives in `client/src/app/shared/components/` from day one
- Every feature service exposes Default/Loading/Error signal state — consistent shape, not invented per feature
- All writes are synchronous request/response — no optimistic client-side mutation
- Errors: `ProblemDetails`-shaped JSON (RFC 9457) for all non-2xx responses
- Config via `appsettings.json` — SQLite file path is the only meaningful setting
- Testing framework not yet fixed — pick pragmatically (e.g. xUnit for the API); don't assume a framework is already decided

## Security Rules

- No auth middleware, no login wall — deliberate. Do not add authentication/authorization scaffolding; it's explicitly out of scope for v1
- Trust boundary is the host device + its local network only — no public ingress, no CORS config for external origins, no TLS-for-internet story
- Do not implement application-level DB encryption (no SQLCipher) — encryption-at-rest is discharged via OS-level full-disk encryption, deliberately outside the app's responsibility
- Treat entries as sensitive personal financial data even though there's no auth gate

## Critical Don't-Miss Rules

- Don't add `IRepository`/`IService` interfaces "for testability" — explicitly rejected at this scale
- Don't hardcode categories as an enum, and don't make "Other" a catch-all — it's a fourth named preset; anything else goes through match-or-create
- Don't build category edit/delete/reorder, CSV export, past-dated entry, or reminders — explicit v1 out-of-scope
- Don't add gamification (streaks/badges) or encouraging/celebratory copy — plain, neutral tone is a named product-risk mitigation

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- For story creation and dev-story, use the "Efficient Source-Doc Reading" table above to pull only the relevant section of a source doc — never load an entire source doc into context by default
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-07-05
