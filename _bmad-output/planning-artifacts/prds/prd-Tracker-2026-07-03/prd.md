---
title: Tracker PRD
status: final
created: 2026-07-03
updated: 2026-07-03
---

# Tracker — PRD (v1)

## Overview

Tracker is a dead-simple, manual-entry expense tracker that turns "I probably spend too much on X" into a trustworthy, actual monthly number per category. It has one user: the founder. There is no bank-linking, no SMS/notification access, no onboarding — you open it, log an amount and a category, and see your month-to-date total update immediately.

V1 is not a market launch. It is a validation gate for a single behavioral bet: that a solo tracker who has bounced off every bank-linked or automation-heavy app before will actually keep logging by hand if logging is fast enough and the number can be trusted. Everything in this document exists to protect that bet.

## Goals & Success Signals

There is no analytics/telemetry infrastructure in v1 — these are checked manually and honestly, not dashboarded.

- **Primary signal:** still logging expenses at day 14 post-launch, with no missed-week gap in month 1. This is the make-or-break read on the abandonment-risk hypothesis.
- **Secondary signal:** shipped within the weekend-scale build window. A slip into weeks/months is itself a signal worth reflecting on, separate from the product's merits.
- **Experience bar:** an entry takes a few seconds, tap to running-total update — well under 5 seconds as a rough bound.
- **Counter-metric:** don't let logging frequency win at the expense of trust. If entries start getting logged carelessly (wrong category, guessed amounts) just to keep a streak alive, the day-14 number is worthless — the loop this product depends on is *log → trust the number → keep logging*, not log for its own sake.

## Who This Is For

Siddi the Self-Tracker: spends mostly digitally (card/UPI), has no consistent tracking today, and has a vague, unconfirmed feeling he overspends somewhere. He's ruled out bank-linked/automation-heavy trackers (distrust of permissions) and existing manual apps or spreadsheets (none of them felt like *his*). He's building this one himself, which is what makes it his — v1 doesn't need a feature for that, it's structural.

He's driven by autonomy and impatience with friction, and explicitly does not want gamification, streaks, or encouraging copy. His two fears: logging feels like filling out a form, and he forgets to log in the moment and the day's picture goes incomplete.

## User Journeys

**UJ-1: Siddi Logs an Expense**
Trigger: he's just paid for something (coffee, cab, groceries) and has a few seconds before moving on. He opens the app directly to the Home screen — no search, no menu — where a quick-add box is always visible. He enters the amount, taps a category, confirms. The entry appears at the top of the list and a toast confirms the save. If he mis-logs something, correcting or deleting it happens right there on the page, not through a separate flow. Outcome: captured in a few seconds, visible confirmation that it registered — the daily streak continues. (The running total itself lives on Monthly Breakdown, not here — see FR-7.)

**UJ-2: Siddi Reviews the Month**
Trigger: near month-end, unhurried, he sits down specifically to see where his money went. He opens the Monthly Category Breakdown, scans the running total and per-category bar chart at a glance, and taps into one or two categories that look off to see the underlying transactions and spot-check them against his own memory. Outcome: a vague feeling of overspending becomes a specific, trustworthy number — the data holds up against his own memory, zero discrepancy.

## Features (v1)

### Logging

- **FR-1 — Quick-add entry.** Home screen shows an always-visible quick-add box: amount field + category buttons. No navigation, no modal, no multi-step form required to log.
- **FR-2 — Category selection, with the ability to add a new one.** A short set of single-tap category buttons for the seeded presets — **Food, Transport, Shopping, Other** — plus the option to create a new category by name if none of the presets fit; a new name is matched case-insensitively against existing categories before a new one is created. `[OVERRIDE]` Originally specified as a fixed list with no free text and no category management — this PRD now supersedes that in favor of the architecture spine's category-creation decision (AD-3), made during architecture coaching. "Other" remains a fourth named preset, not a catch-all — the no-catch-all framing still holds for the preset set itself; it's category *creation*, not "Other," that now absorbs anything the presets don't cover.
- **FR-3 — Save and confirm.** Saving an entry is immediate — no save-and-wait, no confirmation screen. The entry appears at the top of the list and a toast confirms the save (e.g., "₹150 added to Food"); the running total itself lives on Monthly Breakdown (FR-7), not Home. `[OVERRIDE]` Originally the confirmation signal was the Home running total updating in the same action — superseded by FR-7's move off Home (see FR-7).
- **FR-4 — Entry list.** Logged expenses for the current period are visible on the Home screen, each showing amount, category, and time logged. `[ASSUMPTION]` Displaying a timestamp (not just list order) is inferred as necessary for Siddi to spot-check entries against memory — not explicit in any source doc. Confirm before build.
- **FR-5 — Edit an entry.** Any logged entry can be corrected in place (amount and/or category) directly from the Home screen.
- **FR-6 — Delete an entry.** Any logged entry can be removed in place from the Home screen.
- **FR-7 — Live running total (on Monthly Breakdown).** A current-month running total is visible on the Monthly Category Breakdown view (FR-8) and updates whenever that view is opened or the viewed month changes — no refresh or separate step. `[OVERRIDE]` Originally specified as visible on Home; Phase 4 UX design (1.3-home) moved it to Monthly Breakdown only, with a save-confirmation toast replacing it as Home's "it registered" signal (FR-3). This PRD text had lagged that already-finalized design decision until now.

### Review

- **FR-8 — Monthly Category Breakdown.** A separate view shows the current-month running total (FR-7) and per-category totals as a bar chart, sorted largest to smallest — glanceable, exact. A month selector (prev/next) browses past months, bounded by the earliest month with any recorded entry through the current month. Tapping a category opens a read-only drill-down panel listing that category's individual transactions (date + amount, most recent first), so a total that looks off can be checked against memory. `[OVERRIDE]` Originally specified as sums-only with "no drill-down required." Phase 4 UX design (2.1/2.2) added the chart and drill-down specifically to resolve the "distrusting a number" fear this same PRD had already flagged as unaddressed (see prior Open Risks) — this PRD text had lagged that already-finalized design decision until now.

### Entry & Platform

- **FR-9 — Direct, wall-free entry.** Opening the app lands straight on the Home/Log screen — no login wall, no dashboard to click through first, no menu funnel between opening the app and logging an expense. Bookmarkable/pinnable straight to Home.
- **FR-10 — Responsive web.** Works as a responsive web app across desktop and mobile browsers, with touch and mouse/keyboard input both supported. Mobile and desktop are equal priority, not mobile-first with a desktop afterthought.

## Non-Functional Requirements

- **Security & data handling.** There is no login wall (FR-9), by explicit design — the trust boundary is the host machine and its local network, not an auth gate. Financial entries are still personal data, so storage must be encrypted at rest regardless, via the host's OS-level full-disk encryption (BitLocker/Device Encryption/FileVault, whichever the host supports) — the user is responsible for confirming it's actually enabled on their machine, since the app enforces no application-level encryption. `[OVERRIDE]` The PRFAQ originally called real authentication "non-negotiable even at solo scale"; this PRD supersedes that in favor of the Trigger Map's zero-friction-on-open requirement. `[OVERRIDE]` The trust boundary was further widened during architecture coaching from "a single trusted device" to "that device's local network" (any device on the same home LAN can reach the app unauthenticated, not just one machine). Revisit if the deployment model ever moves off the local network (public internet exposure, multi-tenant hosting, a shared/untrusted network, etc.).
- **Speed.** Logging an expense (FR-1–FR-3) should complete in a few seconds, well under 5 seconds tap-to-update — the Product Brief's bar is sub-few-second for the entry action itself. This is not a nice-to-have — it's the mechanism the retention hypothesis depends on.
- **Accuracy.** Totals (FR-7, FR-8) must be exact — no estimation, no rounding. A number that looks even slightly wrong breaks the trust the whole loop depends on.
- **Voice & tone.** All UI copy — errors, empty states, totals — is plain, direct, neutral, and unobtrusive. No judgment, no encouragement, no streak language. This isn't cosmetic: judgment-free copy is one of the specific mitigations for Siddi's abandonment risk. Full tone-of-voice spec lives in the Product Brief and Design System docs; this PRD only carries the constraint.

## Out of Scope (v1)

Locked scope — the biggest risk to this product existing is scope creep turning a weekend build into months. New requests during build defer to a future iteration, not this one.

- Automated capture: SMS/UPI/email/voice parsing, bank-linking, Account Aggregator integration
- Category management beyond creation — editing, removing, or reordering existing categories (creating a new one is now in scope, FR-2)
- Charts, trends, or visualizations beyond the single-month bar chart and category drill-down in FR-8 (e.g., trend-over-time graphs, cross-month comparisons)
- Gamification: streaks, badges, encouragement/celebration copy
- Reminders or notifications for missed logging days
- Shared or multi-user expenses, bill-splitting
- Recurring/automatic bill scheduling — recurring bills are logged as normal one-off entries, not a distinct feature
- Investment or retirement advice
- Monetization, pricing, or billing of any kind
- Native app, camera capture, push notifications
- Offline/PWA support
- Analytics or telemetry infrastructure
- Vernacular/regional language support

## Candidate Fast-Follows (not committed, no timeline)

Noted so they aren't rediscovered as "new" ideas mid-build — none of these are in v1.

- CSV export (data portability/continuity)
- Past-dated entry (log an expense against an earlier date, not just today) — deferred rather than built now to protect locked v1 scope; see Open Risks for the accuracy tradeoff this accepts
- Reminder mechanism — only reconsidered if forgetting-to-log proves a real problem after launch
- Category editing, removal, and reordering — creation is now in v1 (FR-2); only these remaining management actions stay deferred
- Offline cash-logging resilience

## Constraints

- **Tech stack:** .NET Core backend, Angular frontend — already settled, not open for reconsideration in this PRD.
- **Budget:** zero-cost — free-tier or local hosting only.
- **Timeline:** weekend-scale build window. This is load-bearing, not a soft target — the PRFAQ treats a slip as cause to revisit whether shipping bare v1 at all is still the right call, not just "a signal to reflect on."
- **Platform:** responsive web only, per FR-10 — no native app track.

## Open Risks

- **Fear of forgetting to log has no v1 mitigation.** FR-9's wall-free entry and FR-1's always-visible quick-add box reduce friction once Siddi opens the app, but nothing addresses him not opening it in the first place — or getting distracted mid-entry and never finishing. This is the named, unresolved core abandonment risk — flagged to watch post-launch, not solved by design in v1 (a reminder mechanism is a fast-follow candidate, not a v1 answer).
- **Entry timestamps are an assumption (FR-4).** No source doc says whether the entry list should show a time logged — assumed necessary for month-review spot-checking. Confirm before build.
- **Preset category set is still a demo-data assumption (FR-2).** The Food/Transport/Shopping/Other presets are sourced from prototype demo data, not an explicit PRFAQ decision — confirm before build. The risk of a wrong/missing preset is now lower than originally scoped, since FR-2 lets the user create a category the presets don't cover, rather than being stuck with a fixed list.
- **Past-dated entry is deferred, which accepts a real accuracy risk.** The PRFAQ's own fallback for a missed day is "log it from memory once you're back," but with no way to log against a past date, a late entry gets attributed to today instead of when it happened — misattributing spend to the wrong month. Accepted for v1 to keep scope locked; revisit if this causes visible drift in the monthly breakdown.
