# PRD Quality Review — Tracker (prd-Tracker-2026-07-03)

## Overall verdict

This is a well-calibrated, lean PRD that earns its brevity rather than hiding behind it: it states a single behavioral thesis, cuts everything that doesn't serve it, and is unusually honest about what it hasn't solved (forgetting-to-log, un-investigable totals, an unconfirmed category list). The few weak spots are narrow and mechanical — one FR with an ambiguous UI consequence (FR-4's "implicitly when logged"), a couple of unbounded adjectives ("a few seconds," "responsive... across desktop and mobile"), and light terminology drift between "entry box" and "quick-add box." Nothing here blocks build; the two things worth fixing before story creation are FR-4's timestamp ambiguity and confirming the FR-2 category list the PRD already flags as unverified.

## Decision-readiness — strong

The PRD states real decisions and doesn't smooth them over. The clearest example is the `[OVERRIDE]` in Non-Functional Requirements (§ Non-Functional Requirements, "Security & data handling"): *"The PRFAQ originally called real authentication 'non-negotiable even at solo scale'; this PRD supersedes that in favor of the Trigger Map's zero-friction-on-open requirement."* This names what was given up (an explicit prior security requirement), why, and a condition for revisiting it ("if the deployment model ever moves off a single trusted device"). That's a trade-off surfaced honestly, not buried.

The Open Risks section (§ Open Risks) is genuinely open, not rhetorical — "Fear of forgetting to log has no v1 mitigation" and "No way to investigate a total that looks wrong" are both stated as unresolved with no answer smuggled into the next sentence. The Counter-metric in Goals & Success Signals (*"don't let logging frequency win at the expense of trust"*) is a real tension named against the primary signal, not a second metric added for symmetry.

No findings — this dimension has no weak points worth flagging.

## Substance over theater — strong

The single persona (Siddi the Self-Tracker, § Who This Is For) drives concrete decisions rather than sitting decoratively: his stated aversion to "gamification, streaks, or encouraging copy" is directly load-bearing for the Out of Scope list (*"Gamification: streaks, badges, encouragement/celebration copy"*) and the Voice & Tone NFR. His two named fears map one-to-one onto the two Open Risks entries. This is a persona doing work, not furniture.

NFRs are product-specific, not boilerplate: "Accuracy" isn't "system must be reliable" but *"Totals (FR-7, FR-8) must be exact — no estimation, no rounding."* The Overview's framing — *"V1 is not a market launch. It is a validation gate for a single behavioral bet"* — is specific to this founder's abandonment-risk hypothesis and would not swap cleanly into another PRD.

No findings.

## Strategic coherence — strong

The thesis is stated plainly in the Overview: a solo tracker who has "bounced off every bank-linked or automation-heavy app before will actually keep logging by hand if logging is fast enough and the number can be trusted." Every FR traces back to one of the two clauses (fast: FR-1, FR-3, FR-9; trusted: FR-7, FR-8, the Accuracy NFR). Out of Scope directly excludes the categories of app the persona already rejected (bank-linking, SMS parsing, Account Aggregator).

Success Metrics validate the thesis rather than measuring activity for its own sake — the Primary signal is retention-shaped ("still logging... no missed-week gap"), and the Counter-metric explicitly guards against gaming that same signal. MVP scope kind is coherent and named: this is a validation-gate MVP, and the locked-scope framing in Constraints and Out of Scope follows from that, not from "what's easy first."

No findings.

## Done-ness clarity — adequate

Most FRs carry a testable consequence: FR-3 ("no save-and-wait, no confirmation screen... appears in the list and running total updates in the same action"), FR-7 ("updates immediately on every entry, edit, or delete — no refresh"), and FR-8 ("plain, exact sums... no drill-down") are all unambiguous enough for a developer to build and verify against.

### Findings

- **medium** FR-4 entry list timestamp is ambiguous (§ Features, FR-4) — "Logged expenses for the current period are visible on the Home screen (amount, category, and implicitly when logged)." "Implicitly when logged" doesn't say whether a timestamp is actually displayed or only inferred from list order. This is the kind of adjective-vs-bound gap the rubric flags, and it's on an FR downstream story creation will need to implement literally. *Fix:* state explicitly whether the entry list shows a timestamp/time-of-day, or confirm that list order alone is the intended signal.
- **low** Speed NFR has no hard bound (§ Non-Functional Requirements, "Speed") — "a few seconds" (also used in Goals & Success Signals) is a soft target, not a measurable threshold. Given the sole tester is the founder self-checking casually, this is defensible for the stakes, but it's technically an adjective, not a bound. *Fix:* optional — a rough number (e.g. "under 5 seconds from tap to running-total update") would remove any ambiguity at zero cost.
- **low** FR-10 responsiveness has no explicit bounds (§ Features, FR-10) — "Works as a responsive web app across desktop and mobile browsers" names no breakpoints or browser matrix. Low impact for a single-user personal tool built and tested on the founder's own devices, but worth a one-line note if a specific device/browser is the actual target.

## Scope honesty — strong

Out of Scope (§ Out of Scope (v1)) is extensive and specific — 12 explicit exclusions, not a vague "other things are out of scope." Candidate Fast-Follows (§ Candidate Fast-Follows) does real work distinguishing "considered and deliberately deferred" from "not thought about," with each item's deferral reasoning stated inline (e.g., past-dated entry: *"deferred rather than built now to protect locked v1 scope; see Open Risks for the accuracy tradeoff this accepts"*).

The one `[ASSUMPTION]` tag (FR-2, category presets) is honest about its own weak sourcing: *"per the built UX prototype's demo data — the PRFAQ flagged the category list as unverified, and this prototype is the only concrete source found. Confirm before build."* Open-items density (4 Open Risks + 1 Assumption + 1 Override) is proportionate to a lean, low-stakes PRD — neither suspiciously empty nor padded.

### Findings

- **low** No Assumptions Index (mechanical) — see Mechanical notes below.

## Downstream usability — adequate

ID hygiene is clean: FR-1 through FR-10 are contiguous with no gaps or duplicates, UJ-1/UJ-2 are contiguous, and every cross-reference resolves (e.g., "FR-9's wall-free entry and FR-1's always-visible quick-add box" in § Open Risks; "FR-1–FR-3" and "FR-7, FR-8" in § Non-Functional Requirements). Both UJs name a protagonist (Siddi) and carry his context inline rather than floating.

### Findings

- **low** Terminology drift between "entry box" and "quick-add box" (§ Features FR-1 vs § User Journeys UJ-1 and § Open Risks) — FR-1 calls it "an always-visible entry box"; UJ-1 and Open Risks both call the same UI element "the quick-add box." Same concept, two names, no Glossary to anchor either as canonical. *Fix:* pick one term and use it everywhere, or add a two-line Glossary.

## Shape fit — strong

This is correctly shaped as a lean, single-operator capability spec rather than over-formalized into a consumer-product document. Two UJs (not four-plus) are present and both are load-bearing — they justify feature framing and directly seed the Open Risks section, rather than existing as template filler. Compliance/SLA/monetization sections are correctly and explicitly absent (Out of Scope even names "Monetization, pricing, or billing of any kind" as excluded), matching the internal/personal-tool stakes this PRD was calibrated against. Success signals are behavioral/operational (day-14 retention, weekend build window) rather than forced into a user-facing metrics template.

No findings.

## Mechanical notes

- **Glossary drift:** "entry box" (FR-1) vs. "quick-add box" (UJ-1, Open Risks) — same UI element, two names, no Glossary section to resolve which is canonical. Low impact given the PRD's small size, but worth fixing before story creation since story titles will likely inherit one term or the other.
- **ID continuity:** FR-1–FR-10 and UJ-1–UJ-2 are contiguous, unique, with no dangling cross-references found.
- **Assumptions Index roundtrip:** Only one inline `[ASSUMPTION]` tag exists (FR-2, category presets) and there is no dedicated Assumptions Index section to roundtrip it against. With a single assumption this is low-stakes, but if more assumptions get added during build, an index will be worth adding.
- **UJ protagonist naming:** Both UJs name "Siddi" as protagonist and carry his fears/context inline — compliant, no floating UJs.
- **Required sections for stakes:** Overview, Goals & Success Signals, persona, UJs, FRs, NFRs, Out of Scope, Fast-Follows, Constraints, and Open Risks are all present and proportionate to a lean personal-tool PRD. No Glossary section and no formally separate "Open Questions" section exist, but Open Risks functions as the latter and the PRD's small domain vocabulary makes the former low-priority.
