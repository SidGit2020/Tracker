# Forged Idea: Tracker v1 Scope

**Outcome:** Hardened

## The idea

Tracker v1 is a bare, solo-use expense logger — deliberately *not* the innovation strategy's Horizon 1. It's the phase that precedes it.

## Locked scope

- Manual expense entry only — no SMS/UPI/email/voice capture
- Fixed, short, predefined category list — no category management UI
- Recurring bills (rent/EMI/tuition) logged as normal entries — no recurrence/reminder engine
- Monthly total per category — plain sums, no charts/trends
- No friend-voice, no tone, no gamification
- No investment/retirement advice
- Platform: web app, .NET Core + Angular (carried over from 2026-07-01 design thinking, confirmed unchanged)

## Why this scope, not less or more

- **Audience of one.** v1 has no external users. The trust/tone/moat layer from the innovation strategy has nothing to build trust *with* yet — cutting it isn't abandoning the moat, there's no one to build it for. That layer, and the innovation strategy's Phase 1 cohort-seeding, start whenever v-next introduces other users.
- **A log with zero payoff doesn't survive.** Pure logging with no summary was tested and rejected — it gives nothing back, so there's no reason to keep opening the app on day 10. The monthly per-category total is the minimum needed to answer the question the design-thinking session actually set out to answer: *where does the money go.*
- **Tone is nearly free; cutting it anyway was rejected first, then re-confirmed.** Tone/copy costs no engineering time — it was nearly kept for that reason, then deliberately cut anyway once framed as a solo-audience decision, not a cost-cutting one.
- **Recurring bills need no special handling.** They're just expenses entered when they happen — no recurrence engine required for "manual entry and tracking."

## What was killed

- Automated capture (SMS/UPI/email/voice) for v1
- Category management (add/edit) for v1
- Gamification (streaks, badges) for v1
- Friend/coach tone and personality for v1
- Investment/retirement advice for v1
- A no-summary, pure-log version — considered, rejected as having no payoff

## Cracks surfaced

- "Keep it simple" initially collapsed two different cuts (capture channels vs. the tone/moat layer) into one vague answer — forced apart before either was locked.
- The literal reading of "bare minimum" (no summary at all) would have shipped a tool with zero output for the effort of logging — caught before locking.

## Feeds into

`bmad-spec` or `bmad-prd` for this scoped v1.
