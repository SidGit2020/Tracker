# Design System: Tracker

> Components, tokens, and patterns that grow from actual usage — not upfront planning.

**Created:** 2026-07-02
**Phase:** 7 — Design System (optional)
**Agent:** Freya (Designer)

---

## What Belongs Here

The Design System captures reusable patterns that emerge during UX Design (Phase 4). It is not designed upfront — it crystallizes from real page specifications.

**What goes here:**
- **Design Tokens** — Colors, spacing, typography, shadows
- **Components** — Buttons, inputs, cards, navigation elements
- **Patterns** — Layouts, form structures, content blocks
- **Visual Design** — Mood boards, design concepts, color and typography explorations
- **Assets** — Logos, icons, images, graphics

**What does NOT go here:**
- Page-specific content (that lives in `C-UX-Scenarios/`)
- Business logic or API specs (that's BMM territory)
- Aspirational components nobody uses yet

Component library decision: **skip / decide later** — revisit before Phase 5.

---

## Folder Structure

```
D-Design-System/
├── 00-design-system.md          ← This file (hub + guide)
├── 01-Visual-Design/            [Early design exploration]
│   ├── mood-boards/
│   ├── design-concepts/
│   ├── color-exploration/
│   └── typography-tests/
├── 02-Assets/                   [Final production assets]
│   ├── logos/
│   ├── icons/
│   ├── images/
│   └── graphics/
└── components/                  [Emerges during Phase 4]
    ├── interactive/
    ├── form/
    ├── layout/
    ├── content/
    ├── feedback/
    └── navigation/
```

---

## For Agents

**Workflow:** `skill:wds-7-design-system`
**Agent trigger:** `DS` (Freya)

**Before creating any component:**
1. Check if it already exists in the chosen component library
2. Look at actual usage in `C-UX-Scenarios/` page specs — extract, don't invent
3. Load the component template from the workflow templates folder

**File naming:** Number all documents with a two-digit prefix: `01-design-tokens.md`, `02-button.md`, etc.

**Harm:** Designing an abstract component library before any pages exist.

**Help:** Extracting patterns from real page specs. When three pages use similar card layouts, that's a component.

---

## Spacing Scale

_To be defined once page specifications begin in Phase 4 — see WDS default 9-token scale in the skill template for reference._

---

## Type Scale

_To be defined once page specifications begin in Phase 4._

---

## Tokens

_Additional design tokens (colors, shadows, borders) will be documented here as they emerge from page specifications._

---

## Patterns

_Patterns will be documented here as spacing objects recur across pages._

---

## Components

_Components will be documented here as patterns emerge across scenarios._

---

_Created using Whiteport Design Studio (WDS) methodology_
