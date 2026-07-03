# Story Home.4: Home - Confirm Popup / Overlay

**Page**: 1.1-1.3 Home
**Section**: 4 of 7
**Complexity**: Complex
**Estimated Time**: 25 minutes

---

## 🎯 Goal

The `home-confirm-popup` Overlay (Centered Dialog variant) — tap-to-edit-inline Amount/Category, Cancel/Confirm, and the Default/Editing/Saving/Error states.

---

## 📋 What Was Built

**`components/modal.js`** — generic `openOverlay({ id, bodyHTML, onClose, dismissible })` / `closeActiveOverlay()`. Renders a scrim + centered dialog into `#popup-root`, traps first-focusable-element focus, closes on scrim click or Escape (both suppressed while `dismissible: false`, used during the Saving state so the in-flight save can't be abandoned mid-request).

**`renderConfirmPopup()` / `wireConfirmPopupEvents()`** in `pages/home.js`:

- `home-confirm-title` — "Confirm Entry"
- `home-confirm-amount` — read view (value + pencil icon) → click switches to an inline `<input>` bound to the **same** `state.amount` used by Quick Add (not a separate copy), committing on blur/Enter
- `home-confirm-category` — read view → click switches to an inline selector (preset buttons + custom input), sharing `state.category`
- `home-confirm-cancel` — closes the overlay; since Amount/Category are the same shared state as Quick Add (not copies), whatever was last set remains filled on return — satisfies the spec's "Cancel returns to Home with fields still filled" without needing separate snapshot/restore logic
- `home-confirm-submit` — label swaps between "Confirm" / spinner+"Saving" / "Retry" (error state) based on `state.popup.state`; disabled together with Cancel while saving

**Deviation from spec's literal wording**: the spec says inline edit "reuses the same input/selector components as 1.1's Quick Add... rather than being separate components" — implemented as *shared underlying state* with visually-similar-but-distinct DOM elements (`home-confirm-amount-edit-input`, `confirm-category-btn` etc.), not literally the same DOM nodes, since Quick Add and the popup are both present in the DOM simultaneously (popup overlays, doesn't replace, Quick Add). Documented in `work/1.1-home-Work.yaml` migration notes as intentional.

**Save-error simulation**: no real backend exists to fail naturally. `state.forceSaveError` (toggled via the Prototype Controls panel — see Home.5) makes the next Confirm skip the actual `PrototypeAPI.addEntry()` call and go straight to the Error state after the same simulated delay, so Retry is testable.

---

## ✅ Acceptance Criteria

### Agent-Verifiable

| # | Criterion | Expected | Result |
|---|-----------|----------|--------|
| 1 | Cancel preserves fields | Amount/category still filled on Home after Cancel | ✓ Pass (code review — shared state, no clear-on-cancel path exists) |
| 2 | Saving state | Spinner replaces Confirm label, Cancel+Confirm both disabled | ✓ Pass (code review) |
| 3 | Pessimistic save | Toast only appears after `addEntry()` resolves, not before | ✓ Pass (code review — `await` before any UI update) |
| 4 | Error → Retry | Retry re-invokes the same save path | ✓ Pass (code review — `handleConfirmSave` is reused for both Confirm and Retry, no separate handler) |
| 5 | Escape/scrim-dismiss disabled while saving | `dismissible: !isSaving` | ✓ Pass |

### User-Evaluable (Qualitative)

- [ ] Popup feels appropriately weighted (not too heavy/light) as a confirmation step
- [ ] Tap-to-edit-inline discoverability (pencil icon) is clear without the removed standalone Edit button

---

## 🧪 How This Was Tested

Code review only for this section — the full open → edit → cancel/confirm → save interaction sequence has **not** been exercised live (would require driving real click/focus/blur events, which needs an interactive automation tool this environment doesn't have). This is the highest-risk section to hand-verify yourself before relying on it.

---

## 📊 Status Tracking

**Status**: ✅ Complete (code), ⚠️ Untested interactively
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review
**Notes**: Retroactively documented. Recommend this section gets a real click-through before trusting it.

---

## 🔄 Changes from Original Plan

- Inline-edit fields implemented as shared-state-but-distinct-DOM (see above), not literal same-component reuse — a pragmatic reading of the spec's intent given both views coexist in the DOM.
- Added `forceSaveError` testing hook (Prototype Controls) to make the Error/Retry path reachable without a real backend.
