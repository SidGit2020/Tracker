# UX Scenarios: Tracker

> Design experiences, not screens — every page serves a user with a goal and an emotion.

**Created:** 2026-07-02
**Phase:** 3 (Scenario Outline) + Phase 4 (UX Design)
**Agents:** Saga (Scenario Outline), Freya (Page Specifications)

---

## What Belongs Here

Scenarios organize the product into meaningful user journeys. Each scenario groups related pages. Each page gets a full specification that a developer can build from.

**Folder structure per scenario:**
```
C-UX-Scenarios/
├── 00-ux-scenarios.md          ← This file (scenario guide + page index)
├── 01-scenario-name/
│   ├── 1.1-page-name/
│   │   ├── 1.1-page-name.md   ← Page specification
│   │   └── Sketches/           ← Wireframes and concepts
│   └── ...
├── Components/                  ← Shared component specs
└── Features/
    └── Storyboards/             ← Multi-step interaction flows
```

---

## For Agents

### Scenario Outline (Saga)
**Workflow:** `skill:wds-3-scenarios`
**Agent trigger:** `SC` (Saga)

### Page Specifications (Freya)
**Workflow:** `skill:wds-4-ux-design`
**Agent trigger:** `UX` (Freya)

**Before writing any page specification:**
1. Read `B-Trigger-Map/` — know the personas and their driving forces
2. Discuss the page purpose with the user before filling in details
3. Each page folder needs a `Sketches/` subfolder for wireframes

**Harm:** Producing page specs from memory instead of the actual template. Plausible-looking specs that use the wrong structure break the pipeline.

**Help:** Reading the actual template, discussing page purpose with the user, then filling the template with specific content.

---

## Scenarios

_This section will be updated as scenarios are outlined during Phase 3._

---

## Page Index

_This section will be updated as page specifications are created during Phase 4._

---

_Created using Whiteport Design Studio (WDS) methodology_
