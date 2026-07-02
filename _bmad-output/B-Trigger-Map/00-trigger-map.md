# Trigger Map: Tracker

> Connects business goals to user psychology — the strategic North Star for all Tracker design decisions.

**Document:** Trigger Map - Hub
**Created:** 2026-07-02
**Status:** COMPLETE

---

## How to Read This Map

Tracker is a genuine audience-of-one product — one person builds it, one person uses it, forever. That collapses the usual multi-persona Trigger Map into a single, deep psychological profile. Read this as: **3 business goals → 1 product → 1 user → that user's driving forces**, all pointing at the same behavioral bet: *will removing setup and logging friction actually keep him tracking past day 14?*

---

## The Transformation

Tracker turns "I probably spend too much on X" — a vague, unconfirmed feeling — into a specific, trustworthy monthly number per category, with logging that takes only a few seconds and never requires more than an amount and a category tap.

---

## Visual Map

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'fontFamily':'Inter, system-ui, sans-serif', 'fontSize':'14px'}}}%%
flowchart LR
    BG0["<br/>🎯 BUILD A LASTING HABIT<br/>PRIMARY GOAL<br/><br/>Still logging at day 14<br/>No missed-week gaps<br/>Entry takes seconds<br/><br/>"]
    BG1["<br/>📊 TRUST THE NUMBER<br/><br/>Exact, immediate totals<br/>No judgmental copy<br/>Spot-check accuracy<br/><br/>"]
    BG2["<br/>🚀 SHIP WITHIN THE WINDOW<br/><br/>Weekend-scale build<br/>Locked v1 scope<br/>Quick-add + total at launch<br/><br/>"]

    PLATFORM["<br/>💰 TRACKER<br/><br/>Manual expense logger<br/>audience of one<br/><br/>Turns a vague feeling<br/>into an exact monthly<br/>number, owned completely<br/><br/>"]

    TG0["<br/>🎯 SIDDI THE SELF-TRACKER<br/>ONLY TARGET GROUP<br/><br/>Autonomy-driven<br/>Impatient with friction<br/>Builder and sole user<br/><br/>"]

    DF0["<br/>🎯 SIDDI'S DRIVERS<br/><br/>WANTS<br/>✅ Log in seconds, no broken flow<br/>✅ Immediate running-total feedback<br/>✅ A trustworthy number, not a guess<br/><br/>FEARS<br/>❌ Filling out a form to log an expense<br/>❌ Forgetting to log in the moment<br/>❌ Distrusting a number that looks wrong<br/><br/>"]

    BG0 --> PLATFORM
    BG1 --> PLATFORM
    BG2 --> PLATFORM
    PLATFORM --> TG0
    TG0 --> DF0

    classDef primaryGoal fill:#fef3c7,color:#78350f,stroke:#d97706,stroke-width:2px
    classDef businessGoal fill:#f3f4f6,color:#1f2937,stroke:#d1d5db,stroke-width:2px
    classDef platform fill:#e5e7eb,color:#111827,stroke:#9ca3af,stroke-width:3px
    classDef targetGroup fill:#f9fafb,color:#1f2937,stroke:#d1d5db,stroke-width:2px
    classDef drivingForces fill:#f3f4f6,color:#1f2937,stroke:#d1d5db,stroke-width:2px

    class BG0 primaryGoal
    class BG1,BG2 businessGoal
    class PLATFORM platform
    class TG0 targetGroup
    class DF0 drivingForces
```

---

## Business Strategy

- **Primary Goal — Build a lasting personal logging habit:** the actual behavioral bet this launch tests. Success = still logging at day 14.
- **Prerequisite — Trust the number:** the habit only survives if Siddi believes what he sees. Exact, immediate, non-judgmental totals.
- **Prerequisite — Ship within the window:** gates whether the other two goals ever get tested. A weekend-scale build with a locked scope.

See [01-Business-Goals.md](01-Business-Goals.md) for full objectives.

---

## The Only Target Group

**Siddi the Self-Tracker** — solo founder, sole user, autonomy-driven, impatient with friction, has a quiet personal stake in shipping this solo. This is deliberately the only persona: the Product Brief states audience-of-one as a strategic choice, not a gap to fill with invented users.

See [02-Siddi-the-Self-Tracker.md](02-Siddi-the-Self-Tracker.md) for the full psychological profile and driving forces.

---

## Strategic Implications

1. **Speed of logging and absence of form-like friction are the highest-scored forces (15/15 each)** — the quick-add box's single-tap category design is already pointed at the right target.
2. **Fear of forgetting (14/15) is the named core abandonment risk** — v1's always-visible quick-add mitigates it but doesn't fully solve it; worth watching post-launch.
3. **Trust in the number matters as much as speed** — every entry must reflect exactly and immediately, with zero judgmental copy, or the habit collapses even if logging itself is fast.

Full scoring: [06-Feature-Impact.md](06-Feature-Impact.md). Full strategic synthesis: [05-Key-Insights.md](05-Key-Insights.md).

---

## Related Documents

- **[01-Business-Goals.md](01-Business-Goals.md)** — Vision and SMART objectives
- **[02-Siddi-the-Self-Tracker.md](02-Siddi-the-Self-Tracker.md)** — The only persona, in full psychological depth
- **[05-Key-Insights.md](05-Key-Insights.md)** — Strategic implications for design
- **[06-Feature-Impact.md](06-Feature-Impact.md)** — Driving force scoring and prioritization
