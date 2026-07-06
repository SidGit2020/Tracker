# Design Log

**Project:** Tracker
**Started:** 2026-07-02
**Method:** Whiteport Design Studio (WDS)

---

## Backlog

> Business-value items. Add links to detail files if needed.

- [x] Complete product brief — Phase 1
- [x] Define trigger map — Phase 2
- [x] Create user scenarios — Phase 3
- [x] Discuss + wireframe all pages — Phase 4
- [x] Write detailed specifications, all 5 pages — Phase 4
- [x] Resolve flagged open items (see 2026-07-02 log entry): 1.2 Edit-button redundancy, 2.1 month-selector range + empty-month state, 2.2 read-only-panel-to-Home link + mobile drawer equivalent, 1.1 duplicate/max custom category
- [x] Responsive diffs — desktop for Scenario 01 (currently mobile-only), mobile for Scenario 02 (currently desktop-only)
- [x] Validate Specs [V] — completeness/quality audit
- [x] Design System extraction [M] — modal pattern extracted as the `Overlay` component (2 uses: 1.2, 2.2)
- [x] Design Delivery [H] — package for dev handoff (before Phase 5)

**Deferred to a future version:**
- [ ] Scenario 02 (Monthly Category Breakdown) mobile responsive diff (`bp-mobile`, 375px) — prototype is desktop-only for v1; the layout is already specified in `2.1-monthly-breakdown.md`/`2.2-monthly-breakdown.md`, just not built as an interactive prototype. User decision 2026-07-03.

---

## Current

| Task | Started | Agent |
|------|---------|-------|

**Rules:** Mark what you start. Complete it when done (move to Log). One task at a time per agent.

---

## Design Loop Status

> Per-page design progress. Updated by agents at every design transition.

| Scenario | Step | Page | Status | Updated |
|----------|------|------|--------|---------|
| 01-siddi-logs-an-expense | 1.1 | Home / Log Screen | discussed | 2026-07-02 |
| 01-siddi-logs-an-expense | 1.1 | Home / Log Screen | wireframed | 2026-07-02 |
| 01-siddi-logs-an-expense | 1.2 | Home / Log Screen (confirm popup) | discussed | 2026-07-02 |
| 01-siddi-logs-an-expense | 1.2 | Home / Log Screen (confirm popup) | wireframed | 2026-07-02 |
| 01-siddi-logs-an-expense | 1.3 | Home / Log Screen (toast + updated list) | discussed | 2026-07-02 |
| 01-siddi-logs-an-expense | 1.3 | Home / Log Screen (toast + updated list) | wireframed | 2026-07-02 |
| 02-siddi-reviews-the-month | 2.1 | Monthly Category Breakdown | discussed | 2026-07-02 |
| 02-siddi-reviews-the-month | 2.1 | Monthly Category Breakdown | wireframed | 2026-07-02 |
| 02-siddi-reviews-the-month | 2.2 | Monthly Category Breakdown (category drill-down panel) | discussed | 2026-07-02 |
| 02-siddi-reviews-the-month | 2.2 | Monthly Category Breakdown (category drill-down panel) | wireframed | 2026-07-02 |
| 01-siddi-logs-an-expense | 1.1 | Home / Log Screen | specified | 2026-07-02 |
| 01-siddi-logs-an-expense | 1.2 | Home / Log Screen (confirm popup) | specified | 2026-07-02 |
| 01-siddi-logs-an-expense | 1.3 | Home / Log Screen (toast + updated list) | specified | 2026-07-02 |
| 02-siddi-reviews-the-month | 2.1 | Monthly Category Breakdown | specified | 2026-07-02 |
| 02-siddi-reviews-the-month | 2.2 | Monthly Category Breakdown (category drill-down panel) | specified | 2026-07-02 |
| 01-siddi-logs-an-expense | 1.1 | Home / Log Screen | building | 2026-07-03 |
| 01-siddi-logs-an-expense | 1.2 | Home / Log Screen (confirm popup) | building | 2026-07-03 |
| 01-siddi-logs-an-expense | 1.3 | Home / Log Screen (toast + updated list) | building | 2026-07-03 |
| 01-siddi-logs-an-expense | 1.1 | Home / Log Screen | built | 2026-07-03 |
| 01-siddi-logs-an-expense | 1.2 | Home / Log Screen (confirm popup) | built | 2026-07-03 |
| 01-siddi-logs-an-expense | 1.3 | Home / Log Screen (toast + updated list) | built | 2026-07-03 |
| 02-siddi-reviews-the-month | 2.1 | Monthly Category Breakdown | building | 2026-07-03 |
| 02-siddi-reviews-the-month | 2.2 | Monthly Category Breakdown (category drill-down panel) | building | 2026-07-03 |
| 02-siddi-reviews-the-month | 2.1 | Monthly Category Breakdown | built | 2026-07-03 |
| 02-siddi-reviews-the-month | 2.2 | Monthly Category Breakdown (category drill-down panel) | built | 2026-07-03 |
| 01-siddi-logs-an-expense | 1.1 | Home / Log Screen | approved | 2026-07-03 |
| 01-siddi-logs-an-expense | 1.2 | Home / Log Screen (confirm popup) | approved | 2026-07-03 |
| 01-siddi-logs-an-expense | 1.3 | Home / Log Screen (toast + updated list) | approved | 2026-07-03 |
| 02-siddi-reviews-the-month | 2.1 | Monthly Category Breakdown | approved | 2026-07-03 |
| 02-siddi-reviews-the-month | 2.2 | Monthly Category Breakdown (category drill-down panel) | approved | 2026-07-03 |

**Status values:** `discussed` → `wireframed` → `specified` → `explored` → `building` → `built` → `approved` | `removed`

**How to use:**
- **Append a row** when a page reaches a new status (do not overwrite — latest row per page is current status)
- **Read on startup** to see where the project stands and what to suggest next

---

## Log

### 2026-07-02 — Project initialized (Phase 0)
- Type: greenfield
- Complexity: complex (web application)
- Tech stack: .NET, Angular
- Existing materials carried forward: brainstorm, forged idea ("tracker-v1-scope"), PRFAQ, market/domain/technical research

### 2026-07-02 — Product Brief dialog steps 1–11 complete (Phase 1)
- Completed: Welcome, Client Profile, Vision, Positioning, Business Model (none), Target Users, Product Concept, Success Criteria, Competitive Landscape, Constraints, Platform Strategy, Tone of Voice
- All checkpoints confirmed first try, no corrections needed
- Working draft: `_progress/dialog/product-brief-draft.md`

### 2026-07-02 — Product Brief document generated (Step 12, Phase 1)
- Strategic narrative presented as coherent story, confirmed first try, no adjustments needed
- Generated: `A-Product-Brief/project-brief.md`
- Dialog files updated: `progress-tracker.md` (status: complete), `decisions.md`

### 2026-07-02 — Phase 1 marked complete, skipping to Phase 2
- Decision: user chose to skip remaining "complete" brief-level sub-steps (13–36: Content & Language, Visual Direction, Platform Requirements documents, Analyze/Summary) and move directly to Phase 2 (Trigger Mapping)
- `wds-workflow-status.yaml` updated: `phase_1_product_brief: complete`
- Content/Visual/Platform detail docs can be produced later if needed — the core Product Brief (`project-brief.md`) is the authoritative strategic foundation going forward
- **Next session: start Phase 2 — Trigger Mapping**

### 2026-07-02 — Trigger Map generated, Suggest mode (Phase 2)
- Mode: Suggest — 4 workshops (Business Goals, Target Groups, Driving Forces, Prioritization) generated and confirmed one at a time, all approved first pass ([C] at every checkpoint)
- Deliberately 1 target group (Siddi the Self-Tracker), not 3-4 — Product Brief's audience-of-one is treated as a strategic fact, not a template gap to fill
- Standard WDS growth-product template language (flywheel, champions, community) dropped in favor of personal-project framing matching the actual brief
- Domain research applied: habit-tracker abandonment causes (forgetting, distrust of numbers, form-like friction), the "feedback effect" of immediate totals, and solo-developer autonomy/ownership motivation — full citations in `_progress/agent-experiences/2026-07-02-trigger-map-suggest.md`
- Generated: `B-Trigger-Map/00-trigger-map.md` (hub + Mermaid diagram), `01-Business-Goals.md`, `02-Siddi-the-Self-Tracker.md`, `05-Key-Insights.md`, `06-Feature-Impact.md`
- Key strategic finding: speed-of-logging and absence-of-friction scored highest (15/15) and validate the Product Brief's existing quick-add box design rather than redirecting it; fear-of-forgetting (14/15) is the one HIGH-priority force without a complete v1 answer — flagged as a post-launch watch item
- **Next session: Phase 3 — UX Scenarios**

### 2026-07-02 — Phase 3: UX Scenarios Complete

**Agent:** Claude (Scenario Outline facilitation)
**Scenarios:** 2 scenarios covering 2 pages
**Quality:** Excellent (7/7 completeness, 7/7 quality, 7/7 mistakes avoided, 4/4 best practices — both scenarios)

**Artifacts Created:**
- `C-UX-Scenarios/00-ux-scenarios.md` — Scenario index with coverage matrix
- `C-UX-Scenarios/01-siddi-logs-an-expense/01-siddi-logs-an-expense.md` — Scenario 01: Siddi Logs an Expense
- `C-UX-Scenarios/01-siddi-logs-an-expense/1.1-home/1.1-home.md` — Step 1.1: quick-add box, idle/ready state
- `C-UX-Scenarios/01-siddi-logs-an-expense/1.2-home/1.2-home.md` — Step 1.2: entry submission
- `C-UX-Scenarios/01-siddi-logs-an-expense/1.3-home/1.3-home.md` — Step 1.3: entry saved, total updated
- `C-UX-Scenarios/02-siddi-reviews-the-month/02-siddi-reviews-the-month.md` — Scenario 02: Siddi Reviews the Month
- `C-UX-Scenarios/02-siddi-reviews-the-month/2.1-monthly-breakdown/2.1-monthly-breakdown.md` — Step 2.1: category totals at a glance
- `C-UX-Scenarios/02-siddi-reviews-the-month/2.2-monthly-breakdown/2.2-monthly-breakdown.md` — Step 2.2: spot-check against memory

**Summary:** Given the audience-of-one scope, only 2 pages were needed (Home / Log Screen, Monthly Category Breakdown), each mapped to exactly one Priority 1 scenario tied to Siddi's only two business-critical transactions — logging in the moment (habit goal) and the reflective monthly review (trust goal). Scenarios were drafted in Suggest mode from the Trigger Map and reviewed/approved by the user at each checkpoint; the "Ship Within the Window" business goal was deliberately not given its own scenario since it's a build-process constraint, not a user transaction. Home's storyboard steps (1.1-1.3) document idle/submit/confirmed states within the single view rather than separate pages.

**Design Intent:** Both scenarios set to `design_intent: L` (Later) — approach to be chosen when Phase 4 starts

**Next:** Phase 4 — UX Design

---

### 2026-07-02 — Scenario 01 (Home / Log Screen) fully designed — Discuss + Wireframe (Phase 4)

**Agent:** Freya (Discuss [C] mode)
**Pages:** 1.1 (idle/ready), 1.2 (confirm popup), 1.3 (toast + updated list) — all discussed, wireframed, and spec-synced

**Key decisions made during discussion:**
- **No running month total on Home** — reserved for the Monthly Category Breakdown page (scenario 02) only. This changed 1.3's original Phase 3 purpose ("total updates immediately"), which no longer applies — replaced with a toast confirmation ("₹150 added to Food", top-right, auto-dismiss).
- **Categories:** fixed preset buttons (Food/Transport/Shopping/Other) + custom category via inline text field.
- **1.2 confirm popup, deliberate speed/accuracy tradeoff:** considered auto-submit on category tap (fastest, matches the 15/15 speed-of-logging trigger map score) but chose an explicit Confirm/Cancel/Edit popup instead, trading a small amount of speed for pre-save accuracy confidence — a considered decision, not a default. Edit adjusts amount/category inline within the popup, no separate screen.
- **Distraction/silent-loss worry** (Q4 fear on 1.1) explicitly deferred — no partial-input persistence for v1, flagged as a v2+ candidate.
- **Recent entries list:** shows amount + category, with a user-selectable count control; infinite scroll deferred to a later version.

**Open item flagged for specification stage:** does Cancel (on the 1.2 popup) discard the entry and return to Home's empty idle state, or return to Home with the amount/category still filled?

**Artifacts updated:**
- `C-UX-Scenarios/01-siddi-logs-an-expense/1.1-home/1.1-home.md` — Design Dialog Findings + Visual Reference
- `C-UX-Scenarios/01-siddi-logs-an-expense/1.2-home/1.2-home.md` — Design Dialog Findings + Visual Reference
- `C-UX-Scenarios/01-siddi-logs-an-expense/1.3-home/1.3-home.md` — Design Dialog Findings + Visual Reference (page purpose revised)
- Wireframes + approved PNGs in each page's `Sketches/` folder

**Next:** Detailed specification for 1.1–1.3 (steps-p/), or move to Scenario 02 (Monthly Category Breakdown)

---

### 2026-07-02 — Scenario 02 (Monthly Category Breakdown) fully designed — Discuss + Wireframe (Phase 4)

**Agent:** Freya (Discuss [C] mode)
**Pages:** 2.1 (chart + total, desktop base), 2.2 (category drill-down panel) — all discussed, wireframed, and spec-synced

**Key decisions made during discussion:**
- **Running month total now lives here** — headline "Total Spent This Month" number at the top of 2.1, completing the move away from Home decided in Scenario 01.
- **Per-category totals shown as a bar chart**, not a plain list — sorted largest to smallest, for genuine "at a glance" comparison.
- **Month selector added to scope** (dropdown/arrows, defaults to current month) — browsing past months was folded into the core page during the D2 challenge, not treated as a v2 addition.
- **Base viewport is desktop** (900×480) — this scenario has equal mobile/desktop priority (unlike Scenario 01's mobile-first), so desktop was chosen as the base and mobile will be explored as a responsive diff.
- **2.2 is a drill-down panel on 2.1, not a separate page** — tapping a category bar opens a right-side drawer with that category's transactions (date + amount, read-only). This is the **second use of the modal/popup pattern** in the project (first was 1.2's confirm popup) — flagged as a design-system candidate if a third instance appears.
- **The "is this a bug?" worry from 2.1 is deliberately resolved here**, not on 2.1 itself — seeing the actual line items is what lets Siddi verify the total against memory.

**Artifacts updated:**
- `C-UX-Scenarios/02-siddi-reviews-the-month/2.1-monthly-breakdown/2.1-monthly-breakdown.md` — Design Dialog Findings + Visual Reference
- `C-UX-Scenarios/02-siddi-reviews-the-month/2.2-monthly-breakdown/2.2-monthly-breakdown.md` — Design Dialog Findings + Visual Reference
- Wireframes + approved PNGs in each page's `Sketches/` folder

**Both scenarios (01 and 02) are now fully discussed and wireframed — all 5 pages/states in the project have an agreed visual reference.**

**Next:** Detailed specification (steps-p/) for any/all pages, responsive diffs (mobile for Scenario 02, desktop for Scenario 01), or Design System extraction now that the modal pattern has appeared twice

---

### 2026-07-02 — All 5 pages fully specified — Suggest mode (Phase 4)

**Agent:** Freya (Suggest mode, per user request to move quickly through specification)
**Pages:** 1.1, 1.2, 1.3, 2.1, 2.2 — all now have full specs (layout structure, spacing/typography tokens, Object IDs, page states, technical notes, open questions)

**Design System established:**
- `D-Design-System/00-design-system.md` created — WDS default spacing scale (space-3xs 2px → space-3xl 64px) and a 7-step type scale (text-xs 12px → text-3xl 30px), confirmed by user as-is
- Patterns section tracks the modal/popup pattern (2 uses so far: 1.2, 2.2) — not yet extracted to a shared component, revisit if a third instance appears

**Wireframe amendment during specification:**
- **1.1 gap found and fixed:** the approved 1.1 wireframe had no explicit submit trigger, but the 1.2 discussion had decided category-tap should NOT auto-submit ("keep it separate to avoid confusion"). Added an **"Add Expense" button** to 1.1 (disabled until amount + category are valid) as the actual trigger into the 1.2 popup. Wireframe regenerated and re-approved by user.

**Decisions made resolving prior open items:**
- **1.2 Cancel behavior (previously open):** resolved as returning to 1.1 with amount/category still filled, not cleared — reasoning: Siddi tapped "Add Expense" on purpose, so Cancel likely means "let me adjust," not "start over."
- **1.2 save behavior:** decided pessimistic save (wait for confirmed save before showing 1.3) over optimistic — trust in the number outweighs a faster perceived transition.

**New open items flagged (not yet resolved, need user input before build):**
- 1.2: Edit button vs. inline tap-to-edit may be redundant — kept both for now, flagged for review
- 1.1/2.1: desktop responsive diff for Scenario 01, mobile responsive diff for Scenario 02 — neither explored yet
- 2.1: month selector range (how far back?), empty-month state design
- 2.2: whether the read-only drill-down panel should link back to Home to fix a spotted error; mobile equivalent of the right-side drawer; transaction sort order
- 1.1: duplicate/max custom category handling

**Artifacts updated:** all 5 page spec files (`1.1-home.md`, `1.2-home.md`, `1.3-home.md`, `2.1-monthly-breakdown.md`, `2.2-monthly-breakdown.md`) — each now has Layout Structure, Spacing, Typography, Page Sections (with Object IDs), Page States, Technical Notes, Open Questions, and Checklist sections in addition to the existing Design Dialog Findings and Visual Reference.

**Next:** Resolve the flagged open items above, do the responsive diffs, or move to Phase 5 (Agentic Development) once open items are cleared

---

### 2026-07-03 — All flagged open items resolved (Phase 4)

**Agent:** Freya (Suggest mode — proposed resolutions batch-confirmed by user)
**Pages touched:** 1.1, 1.2, 1.3, 2.1, 2.2 — all `Open Questions` tables now fully 🟢 Resolved except the 3 mobile/desktop layout items, which map to the Responsive Diffs backlog item instead

**Decisions made:**
- **1.1** — Custom category matching is case-insensitive against presets + prior custom values (merges, no duplicates); no cap on distinct custom categories for v1.
- **1.2** — Cut the standalone Edit button (redundant with tap-to-edit-inline); discoverability now handled by a pencil icon on the Amount/Category fields. Saving state finalized as an inline spinner replacing the Confirm label, no separate overlay.
- **1.3** — Toast and new-entry row highlight dismiss together on one ~2.5s timer (no separate coordination). Rapid multiple entries stack toasts vertically (most recent on top), each with its own independent timer.
- **2.1** — Month selector range is data-driven: bounded by the earliest month with any recorded entry, not a fixed lookback limit. Empty-month state finalized as centered "No entries for {Month} {Year}", no CTA.
- **2.2** — Confirmed the read-only drill-down panel does **not** link back to Home to edit (stays read-only for v1, formalizing the existing Technical Notes stance). Transaction list sort order set to chronological, most recent first (matches Home's Recent Entries convention).

**Artifacts updated:** `1.1-home.md`, `1.2-home.md`, `1.3-home.md`, `2.1-monthly-breakdown.md`, `2.2-monthly-breakdown.md` — Open Questions, Page Sections, Page States, Technical Notes, and (1.2) Layout Structure/Visual Reference updated to match. 1.2's wireframe PNG now trails the spec text (Edit button removed from spec, not yet from the PNG) — flagged inline in that file, spec text is authoritative.

**Next:** Responsive diffs (desktop for Scenario 01, mobile for Scenario 02), then Validate Specs, Design System extraction, Design Delivery

---

### 2026-07-03 — Responsive diffs added for all 5 pages (Phase 4)

**Agent:** Freya
**Approach:** Layout-only diffs — no new Object IDs, behaviors, or content introduced; each diff reuses the base spec's sections and just re-lays them out for the other breakpoint

- **`D-Design-System/00-design-system.md`** — added a **Breakpoints** section: `bp-mobile` (up to 639px, 375px reference) / `bp-desktop` (640px+, 900px reference), matching the widths already used in the approved base wireframes. Single breakpoint — no tablet tier needed for this scope.
- **1.1 (desktop)** — Quick Add and Recent Entries go from stacked to side-by-side two-column (Quick Add fixed ~400px left, Recent Entries fills the remainder); all 4 category buttons fit one row instead of wrapping.
- **1.2 (desktop)** — no change needed; the confirm popup was already a centered fixed-width modal, it just now centers over the wider desktop background.
- **1.3 (desktop)** — reuses 1.1's desktop two-column layout; toast stays anchored top-right of the full viewport.
- **2.1 (mobile)** — single-column stack (header → total → chart); bar labels move above each bar instead of beside it so long category names don't squeeze bar width at 375px.
- **2.2 (mobile)** — the right-side drawer becomes a full-screen sheet (resolves the previously-open "mobile equivalent" question) — same content and Object IDs, just full-bleed instead of partial-width.

**Note:** these are text/ASCII layout specs, not new wireframe PNGs — actual pixel mockups for the new breakpoints would be produced in Visual Design [W] if needed before build.

**Artifacts updated:** all 5 page spec files (new `## Responsive Diff` section each), `D-Design-System/00-design-system.md`

**Next:** Validate Specs [V], Design System extraction [M] (modal pattern), Design Delivery [H]

---

### 2026-07-03 — Validate Specs [V] complete (Phase 4)

**Agent:** Freya
**Result:** ✅ READY FOR HANDOFF (pending Design System extraction, already next on backlog)

**Issues found and fixed:**
- 🔴 Broken relative links to `D-Design-System/00-design-system.md` in all 5 page specs (2 levels up used, 3 needed) — 10 link instances corrected
- 🔴 Inconsistent `## Visual Reference` section placement — 1.2, 1.3, 2.2 had it at document end; moved to match 1.1/2.1's position (right after Design Dialog Findings) for a consistent section order across all 5 pages
- ⚠️ 1.2 had 2 stale references to the removed Edit button (Overview interactions list, Page States Default row) — updated to tap-to-edit-inline only

**Confirmed passing:** Object ID uniqueness/naming (29 unique IDs, no duplicates/orphans), Design System token usage (no raw px/hex/CSS in specs), states documented on all pages, all Open Questions resolved, translation key consistency

**Known pending (not a defect):** all 5 pages' Checklist still show "Components reference design system" unchecked — expected, resolves via the next backlog item (Design System extraction)

**Artifact created:** `_progress/validation-report.md` (full findings)

**Next:** Design System extraction [M] (modal pattern), then Design Delivery [H]

---

### 2026-07-03 — Design System extraction [M] complete (Phase 4)

**Agent:** Freya

**Extracted:** `Overlay` component in `D-Design-System/00-design-system.md` → Components — the modal/popup pattern had reached its 2nd use (1.2 confirm popup, 2.2 drill-down panel), crossing this project's own "extract on repeat" threshold. Modeled as one component with two variants:
- **Centered Dialog** (1.2) — write, form fields, footer actions
- **Drawer / Sheet** (2.2) — read-only, desktop right-side drawer / mobile full-screen sheet, single close control

Shared: scrim/dim background, `space-lg` padding, `space-md` element gap, Default/Loading/Error states. Not fully unified into one configurable shape yet — the two variants' content models differ enough (form vs. read-only list) that forcing a single definition would be premature; revisit if a third instance appears.

**Not extracted (by design):** Toast (1.3) and Bar Chart (2.1) are still single-use — left as tracked candidates under `Patterns` rather than force-extracted, consistent with the project's established "extract on 2nd use, not 1st" convention.

**Artifacts updated:**
- `D-Design-System/00-design-system.md` — added `Overlay` under Components; reworked `Patterns` to hold the two single-use candidates (Toast, Bar Chart)
- `1.2-home.md`, `2.2-monthly-breakdown.md` — Component fields now link to the Overlay component; Checklist "Components reference design system" now ✅
- `1.1-home.md` — Checklist item resolved (Quick Add/Recent Entries are page-specific, not shared components, so nothing to extract)
- `1.3-home.md`, `2.1-monthly-breakdown.md` — Checklist wording clarified: unchecked is expected (single-use), not a defect

**Next:** Design Delivery [H] — package for dev handoff

---

### 2026-07-03 — Design Delivery [H] complete — Phase 4 backlog cleared

**Agent:** Freya
**Result:** All Phase 4 backlog items now complete. Project is ready for Phase 5 (Agentic Development).

**Artifacts created:**
- `deliveries/DD-001-expense-tracking-v1.yaml` — the design/dev contract: user value, both scenarios, the Overlay component, technical requirements (.NET Core + Angular, responsive, zero-cost hosting), data model (single Expense Entry type), acceptance criteria, complexity estimate (S/M, Low risk)
- `test-scenarios/TS-001-expense-tracking-v1.yaml` — happy-path/error/edge-case tests, design system token validation, accessibility checks, sign-off criteria (single approver: SIDDI)
- `deliveries/DD-001-handoff-log.md` — condensed briefing covering all 10 standard handoff phases, written for a solo designer-to-builder handoff (this project has no separate architect party) rather than a live two-party dialog

**Flagged for Phase 5 attention:**
- Authentication scope is unspecified anywhere upstream (Product Brief, scenarios, specs) — current working assumption is single-user/no-login; confirm before backend design
- 1.2's wireframe PNG is stale (still shows the removed Edit button) — spec text is authoritative; regenerate only if a pixel-accurate reference is needed

**This closes out every item that was in the Phase 4 backlog** (flagged open items → responsive diffs → validate specs → design system extraction → design delivery), completed across this session in Suggest-mode-style batched checkpoints.

**Next:** Phase 5 — Agentic Development (Mimir Builder)

---

### 2026-07-03 — Scenario 01 (Home) interactive prototype built — Phase 5 [P] Prototyping

**Agent:** Claude (Prototyping activity, steps-p/)
**Scope:** Full interactive prototype for steps 1.1-1.3 (one logical view, "Home," per `work/Logical-View-Map.md`) — Quick Add, category selection with case-insensitive custom-category dedup, Confirm Popup/Overlay, save flow, stacking toasts, Loading/Empty/Error states, and both breakpoints (`bp-mobile`/`bp-desktop`).

**Location:** `C-UX-Scenarios/01-siddi-logs-an-expense/Prototype/` — see `PROTOTYPE-ROADMAP.md` for the folder guide and `work/1.1-home-Work.yaml` for the full section/object-ID plan.

**Process note:** the user initially asked to skip per-section story files ("I need only prototypes") to get straight to working code; after building Sections 1-5 directly, the user asked for story files to be added back for bookkeeping. Sections 1-5 were documented retroactively (`stories/Home.1` through `Home.5`), then Sections 6-7 proceeded with stories written first as originally designed.

**Tooling limitation found:** no interactive browser-automation tool (Puppeteer) is available in this environment. Self-verification instead used headless Chrome (`--dump-dom`, `--screenshot`, and real DOM-event simulation against temporary instrumented copies of the file) plus code review. Also discovered this machine's headless Chrome silently enforces a ~482px minimum viewport width regardless of `--window-size` — screenshots requested below that are unreliable (content lays out at ~482px, image is cropped to the requested smaller size). Worked around it with fixed-width DOM harnesses and direct `getBoundingClientRect()` measurement instead of trusting sub-482px screenshots.

**Real bug found and fixed during verification:** `data/demo-data.js`/`.json` seed entries included one dated "today" at a fixed clock time; since new entries are stamped with the actual current time, this caused newly-saved entries to sort *below* that seed entry whenever tested before that time of day. Fixed by shifting all seed timestamps back one calendar day (see `stories/Home.7-final-integration-polish.md` for the full root-cause writeup).

**Status:** All 7 planned sections complete (`work/1.1-home-Work.yaml`). **Not yet reviewed by the user in a live browser** — recommended before treating this scenario as done.

**Next:** User review of the live prototype (`1.1-home.html`), then either Scenario 02 (Monthly Category Breakdown) prototyping or Acceptance Testing [T] for this scenario.

---

### 2026-07-03 — Scenario 02 (Breakdown) interactive prototype built, desktop-only — Phase 5 [P] Prototyping

**Agent:** Claude (Prototyping activity, steps-p/)
**Scope:** Desktop-only (900px) prototype for steps 2.1-2.2 (one logical view, "Breakdown," per `work/Logical-View-Map.md`) — header + data-driven month selector, headline total, horizontal bar chart with click-to-drill-down, Overlay Drawer/Sheet variant (this project's first real use of that variant), Loading/Empty/Error states. **Mobile responsive diff intentionally deferred** to a later pass — user explicitly chose "Desktop-only for now" during setup, unlike Scenario 01 where both breakpoints were built together.

**Location:** `C-UX-Scenarios/02-siddi-reviews-the-month/Prototype/` — see `PROTOTYPE-ROADMAP.md` and `work/2.1-breakdown-Work.yaml`.

**Demo data:** fresh multi-month dataset (April-July 2026, 27 entries) rather than reusing Scenario 01's — July's category totals deliberately match the spec's own mockup numbers (Rs 12,450 total). Designed to exercise month-selector boundaries, a 2-category month (April), and a custom-category month (June, "Books").

**Two real bugs found and fixed during verification** (same headless-Chrome + DOM-instrumentation method as Scenario 01 — see that session's tooling-limitation note, which applies here too):
1. **Dev Mode / drawer visual collision** — the drill-down drawer is intentionally flush to the viewport's right edge, the same corner as the fixed Dev Mode toggle button, so the toggle covered the drawer's close button in every viewport width tested (not a narrow-viewport artifact this time). Fixed by hiding Dev Mode's toggle while any overlay is open (`body.overlay-open` class) — applied to both this scenario's and **Scenario 01's** `components/modal.js` for consistency.
2. **`state.monthKey` sync fragility** — `loadMonth()` fetched data for a given month but didn't update the canonical `state.monthKey` itself, only working correctly because the sole real caller (`changeMonth()`) happened to set it first. Not reachable through the actual UI, but a latent bug for any future direct caller. Fixed by making `loadMonth()` the single source of truth for `state.monthKey`.

**Status:** All 6 planned sections complete (`work/2.1-breakdown-Work.yaml`). **Not yet reviewed by the user in a live browser.**

**Next:** User review of both prototypes, then either the mobile responsive diff for this scenario, or Acceptance Testing [T].

---

### 2026-07-03 — DD-001 Acceptance Testing complete, APPROVED — Phase 5 [T] Acceptance Testing

**Agent:** Claude (Acceptance Testing activity, steps-t/)
**Scope:** Full TS-001 validation against both scenarios' built prototypes (Scenario 01 full-responsive, Scenario 02 desktop-only per its documented deferral).

**Test execution:** All 5 happy-path tests, 2 error-state tests, 5/6 edge-case tests (1 correctly marked N/A — Scenario 02's mobile viewport boundary test, since that responsive diff isn't built), and design-system token compliance all passed on first execution — no functional or visual-fidelity defects found. Same headless-Chrome + real-DOM-event-simulation methodology as the Prototyping phase (no interactive automation tool available in this environment; see that phase's tooling-limitation notes, which still apply).

**3 High-severity accessibility issues found, fixed, and reverified same session** (all explicit `must_fix` items per TS-001's own sign-off criteria):
1. **ISS-001** — Toast text contrast 2.54:1 (needs 4.5:1): white text on `success-500` #10b981. Fixed by darkening the token to #047857 (live-measured retest: 5.48:1).
2. **ISS-002** — Category buttons 39px tall (needs 44px minimum): `py-xs` → `py-sm` padding fix (live-measured retest: 47px).
3. **ISS-003** — Category bars (`breakdown-chart-row`) not keyboard-accessible — blocked Scenario 02 entirely for keyboard-only users. Fixed by changing `<div>` → `<button>` (matches the pattern already used correctly in Scenario 01).

All 3 fixes were regression-tested against the already-passing happy-path/drill-down flows — no regressions.

2 Low-severity issues remain open, not blocking: ISS-004 (Recent Entries rows not keyboard-accessible — relevant once Phase 3 edit/delete ships) and ISS-005 (toast missing `aria-live` region).

**Artifacts created:**
- `test-artifacts/DD-001/TR-001-expense-tracking-v1-2026-07-03.md` — full test report + retest addendum
- `test-artifacts/DD-001/issues/` — ISS-001 through ISS-005, plus summary
- `test-artifacts/DD-001/SIGN-OFF-DD-001.md` — signed off by SIDDI

**Result:** ✅ **APPROVED** — user confirmed sign-off. All 5 page states across both scenarios now marked `approved` in the Design Loop Status table above.

**Next:** Scenario 02's mobile responsive diff (deferred, not yet built) is the main remaining gap before this delivery is fully complete across all specified breakpoints. Otherwise, this delivery is ready — next could be real production Development [D] handoff to build the actual .NET Core + Angular app per `deliveries/DD-001-expense-tracking-v1.yaml`.

---

### 2026-07-03 — Phase 5 [P]/[T] activities concluded for v1; routing decisions for what's next

**User decisions:**
- **Scenario 02 mobile responsive diff → deferred to a future version.** Not blocking v1. Layout is already fully specified (`2.1-monthly-breakdown.md`/`2.2-monthly-breakdown.md` Responsive Diff sections); only the interactive prototype build is deferred. Added to Backlog above under "Deferred to a future version."
- **Production Development will use BMad's own story pipeline** (`bmad-create-epics-and-stories` → `bmad-create-story` → `bmad-dev-story`/`bmad-agent-dev`), **not** WDS's [D] Development activity in `wds-5-agentic-development`. The approved prototypes (`C-UX-Scenarios/*/Prototype/`), `deliveries/DD-001-expense-tracking-v1.yaml`, and the approved page specs remain the source-of-truth design contract that BMad's dev pipeline should be pointed at.

**Effective state:** WDS Phase 5 work for v1 is done — both scenarios prototyped and approved (DD-001 signed off 2026-07-03). Next actions on this project happen outside `wds-5-agentic-development`, in BMad's epics/stories/dev-story flow.

---

### 2026-07-06 — Spec gap patched during BMad story writing (Phase 4, [P] Write Specifications)

**Agent:** Freya, invoked from BMad's `bmad-create-story` while writing Story `2-1-monthly-breakdown`

**Trigger:** Writing the BMad story surfaced two UX gaps not covered by the approved specs:
1. `2.1-monthly-breakdown.md`'s `breakdown-chart-row` spec said only "onClick opens the drill-down panel" — it never documented the keyboard-accessibility requirement that Phase 5 acceptance testing already found, fixed, and closed (**ISS-003**: row must be a semantic `<button>`, not a `<div>`). This was a documentation gap, not a new decision — patched directly.
2. Whether there's an in-app nav link between Home and Monthly Breakdown was **never decided** in any Phase 4 session — both pages were designed/built as independently-bookmarked entry points (per each scenario's own Entry Context), but nobody ever explicitly confirmed that as the intended nav model versus an oversight. Flagged back to the user rather than assumed.

**Resolved (documentation-only, no new decision):**
- `2.1-monthly-breakdown.md` — `breakdown-chart-row` Page Section and Technical Notes now specify the `<button>` requirement, Tab-reachability, and Enter/Space activation, citing DD-001/ISS-003
- `D-Design-System/00-design-system.md` — Horizontal Bar Chart pattern entry now notes the `<button>`-not-`<div>` requirement

**Still open — needs a real design decision:** in-app navigation between Home and Monthly Breakdown. Not yet resolved as of this log entry.

---

### 2026-07-06 — Nav-link design decision resolved (Phase 4, [C]/[P])

**Agent:** Freya

**Decision (user-confirmed):** One-directional nav link from Monthly Breakdown back to Home — "+ Log an expense" text link in the Breakdown header, muted `text-sm` styling (not a CTA-styled button, per the plain/neutral tone NFR). Home stays link-free; FR-9's wall-free/no-menu-funnel design is not reopened by this. Rationale: Siddi reviews spending on Breakdown and may want to immediately log something after — a one-way link resolves that without adding any UI to Home's zero-friction entry point.

**Artifacts updated:**
- `2.1-monthly-breakdown.md` — new `breakdown-header-home-link` Page Section (under Header), Layout Structure (desktop + mobile ASCII diagrams updated), Responsive Diff table, Typography table

**Both Phase 4 spec gaps found during BMad Story 2-1 writing are now closed.** DD-001's design/dev contract (`deliveries/DD-001-expense-tracking-v1.yaml`) and the Phase 5 prototype (`Prototype/2.1-monthly-breakdown.html`) do not yet reflect this new link — cosmetic drift only, not a spec/build conflict, since Phase 5 for v1 was already signed off before this addition. Flag for whoever builds this in BMad: the link is real spec, the prototype just predates it.

---

## About This Folder

- **This file** — Single source of truth for project progress
- **agent-experiences/** — Compressed insights from design discussions (dated files)
- **wds-project-outline.yaml** — Project configuration from Phase 0 setup

**Do not modify `wds-project-outline.yaml`** — it is the source of truth for project configuration.
