# Logical View Map — Scenario 02: Siddi Reviews the Month

**Created**: 2026-07-03
**Scenario Steps Analyzed**: 2.1, 2.2

---

## Logical Views

### View: Breakdown

**File**: `2.1-monthly-breakdown.html`

**Scenario steps mapped to this view**:

| Step | Spec | Role in view |
|------|------|---------------|
| 2.1 | [2.1-monthly-breakdown.md](../../2.1-monthly-breakdown/2.1-monthly-breakdown.md) | Base layout — header, month selector, total, bar chart |
| 2.2 | [2.2-monthly-breakdown.md](../../2.2-monthly-breakdown/2.2-monthly-breakdown.md) | Overlay (Drawer/Sheet variant) on top of 2.1 — drill-down panel |

**Why one view, not two**: 2.2's own spec states "This is a drill-down state of 2.1, not a separate page — a modal/expandable panel slides in over the 2.1 chart on tap, rather than navigating to a full 'Category Detail' page." Same pattern as Scenario 01's 1.2/1.3 being states of 1.1.

**All states for this view**:

| State | Source | Trigger |
|-------|--------|---------|
| Default | 2.1 | Selected month has entries |
| Loading | 2.1 | Month data fetching (initial load or after month switch) |
| Empty | 2.1 | Selected month has zero entries |
| Error | 2.1 | Data fails to load |
| Drill-down Panel — Default | 2.2 | Category bar tapped, transactions exist |
| Drill-down Panel — Loading | 2.2 | Transaction list fetching |
| Drill-down Panel — Error | 2.2 | List fails to load |

*(2.2's "Empty" state — "category total exists but somehow has no line items" — is explicitly flagged in the spec as "shouldn't normally occur"; not built as a distinct simulated state, matching its own spec's framing as a defensive edge case rather than a designed state.)*

**Object IDs owned by this view**: `breakdown-header`, `breakdown-header-title`, `breakdown-header-month-selector`, `breakdown-total`, `breakdown-total-label`, `breakdown-total-amount`, `breakdown-chart`, `breakdown-chart-row`, `breakdown-drilldown-panel`, `breakdown-drilldown-title`, `breakdown-drilldown-close`, `breakdown-drilldown-row`

**Shared components used**: `Overlay` — Drawer/Sheet variant (`D-Design-System/00-design-system.md#overlay`) — this scenario's first real use (Scenario 01 used the Centered Dialog variant)

---

## Build Order

1. **Breakdown** (`2.1-monthly-breakdown.html`) — only logical view in this scenario. Desktop-only for this pass per user decision (see `PROTOTYPE-ROADMAP.md` Change Log); mobile responsive diff deferred.

---

## Notes

- No page-to-page navigation within this scenario, same as Scenario 01 — the whole journey (scan totals → browse months → drill into a category → close) happens within one file's state transitions.
- Unlike Scenario 01, this view has **cross-cutting data dependent on the selected month** (total, chart, and drill-down transactions all re-derive from whichever month is selected) — month selection is effectively a piece of page state that most other rendering depends on.
