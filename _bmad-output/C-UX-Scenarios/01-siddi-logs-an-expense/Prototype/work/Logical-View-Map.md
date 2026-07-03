# Logical View Map — Scenario 01: Siddi Logs an Expense

**Created**: 2026-07-03
**Scenario Steps Analyzed**: 1.1, 1.2, 1.3

---

## Logical Views

### View: Home

**File**: `1.1-home.html`

**Scenario steps mapped to this view**:

| Step | Spec | Role in view |
|------|------|---------------|
| 1.1 | [1.1-home.md](../../1.1-home/1.1-home.md) | Base layout — Quick Add + Recent Entries, idle/ready |
| 1.2 | [1.2-home.md](../../1.2-home/1.2-home.md) | Overlay (Centered Dialog) on top of the 1.1 base layout — confirm popup |
| 1.3 | [1.3-home.md](../../1.3-home/1.3-home.md) | 1.1 base layout reset to idle + toast notification |

**Why one view, not three**: 1.2's own spec states the popup shows "Base Home screen (same as 1.1) shown underneath a scrim" — an overlay, not a navigation. 1.3's own spec states it is "1.1's idle state + a toast" and explicitly reuses `home-quickadd-*` / `home-recent-*` Object IDs rather than defining new ones. No step introduces a new page structure.

**All states for this view**:

| State | Source | Trigger |
|-------|--------|---------|
| Default (idle) | 1.1 | Entries exist for current month |
| Loading | 1.1 | Initial page load, entries fetching |
| Empty | 1.1 | No entries logged yet this month |
| Error (list) | 1.1 | Recent Entries fail to load |
| Confirm Popup — Default | 1.2 | "Add Expense" tapped, popup opens |
| Confirm Popup — Editing | 1.2 | Amount or Category field tapped inline |
| Confirm Popup — Saving | 1.2 | Confirm tapped, waiting for save |
| Confirm Popup — Error | 1.2 | Save fails |
| Toast — Default | 1.3 | Save succeeds, single toast shown |
| Toast — Stacked | 1.3 | New entry saved while a prior toast still showing |
| Toast — Settled | 1.3 | All toasts dismissed (= Default/idle state) |

**Object IDs owned by this view**: `home-quickadd`, `home-quickadd-amount-input`, `home-quickadd-category-{food|transport|shopping|other}`, `home-quickadd-category-custom-input`, `home-quickadd-submit`, `home-recent`, `home-recent-heading`, `home-recent-count-selector`, `home-recent-entry-row`, `home-confirm-popup`, `home-confirm-title`, `home-confirm-amount`, `home-confirm-category`, `home-confirm-cancel`, `home-confirm-submit`, `home-toast`, `home-toast-message`

**Shared components used**: `Overlay` — Centered Dialog variant (`D-Design-System/00-design-system.md#overlay`)

---

## Build Order

1. **Home** (`1.1-home.html`) — only logical view in this scenario; built section-by-section per Step 3 breakdown, covering all 11 states above within the single file.

---

## Notes

- This scenario has no page-to-page navigation — the entire journey (log → confirm → saved) happens within one file's state transitions, matching the spec's "no navigation, no menu, no funnel" framing.
- Responsive diff (desktop two-column layout) applies to this same view/file via a CSS breakpoint at `bp-desktop` (640px) — not a separate HTML file.
