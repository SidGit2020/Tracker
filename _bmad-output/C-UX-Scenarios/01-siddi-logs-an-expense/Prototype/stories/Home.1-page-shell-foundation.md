# Story Home.1: Home - Page Shell & Foundation

**Page**: 1.1-1.3 Home
**Section**: 1 of 7
**Complexity**: Simple
**Estimated Time**: 10 minutes

---

## 🎯 Goal

Stand up the HTML skeleton every later section builds on: Tailwind CDN + design-token config, shared JS scaffolding, demo-data loading, and a responsive container switching mobile stacked → desktop two-column at `bp-desktop` (640px).

---

## 📋 What Was Built

**`1.1-home.html`** — skeleton with Tailwind CDN inline config carrying the full design-token set (colors, spacing scale `3xs`→`3xl`, type scale `xs`→`3xl`, custom `desktop: '640px'` breakpoint). Mount points: `#quick-add-root`, `#recent-entries-root` (responsive two-region flex container), `#popup-root`, `#toast-root`. Includes Dev Mode toggle (Object-ID copy-to-clipboard for feedback, from the WDS component template).

**`data/demo-data.js`** — demo data as a `window.DEMO_DATA` global, loaded via `<script src>` rather than `fetch()`. **Deviation from original plan**: the work file specified `data/demo-data.json` loaded via fetch; switched to a `.js` script-tag global because `fetch()` of local JSON is blocked by CORS when the HTML is opened directly via `file://` in Chrome/Edge. `demo-data.json` is kept alongside as a human-readable reference/edit source, but `demo-data.js` is what actually loads. Documented in code comments.

**`shared/utils.js`** — `formatCurrency`, `formatRelativeDate`, `generateId`, `findExistingCategory` (case-insensitive category matching).

**`shared/prototype-api.js`** — sessionStorage-backed `PrototypeAPI`: `ensureDemoDataLoaded()`, `getUser()`, `getAllCategoryNames()`, `getPresetCategories()`, `getEntries()` (sorted newest-first), `addEntry()` (simulated 600ms pessimistic save), `getDebugInfo()`, `clearAllData()`.

**`shared/init.js`** — `DOMContentLoaded` → `ensureDemoDataLoaded()` → `window.initPage()`.

---

## ✅ Acceptance Criteria

### Agent-Verifiable

| # | Criterion | Expected | Result |
|---|-----------|----------|--------|
| 1 | Page title | "Home — Tracker" | ✓ Pass (code review) |
| 2 | Demo data loads | 9 entries in sessionStorage after load | ✓ Pass — confirmed via headless Chrome DOM inspection, entries rendered with correct amounts |
| 3 | Mount points exist | `#quick-add-root`, `#recent-entries-root`, `#popup-root`, `#toast-root` | ✓ Pass |
| 4 | Responsive breakpoint | `desktop:` variants scoped to `@media (min-width: 640px)` | ✓ Pass — confirmed by extracting the generated Tailwind stylesheet and checking the media query wrapping `.desktop\:*` rules |
| 5 | No console errors | Zero | ✓ Pass (no errors surfaced during headless runs) |

### User-Evaluable (Qualitative)

- [ ] Page loads cleanly with no visible flash/layout shift
- [ ] Container feels appropriately centered/padded on both a narrow and wide window

---

## 🧪 How This Was Tested

**No interactive Puppeteer tool is available in this environment.** Verification used headless Chrome (`chrome.exe --headless=new --dump-dom` / `--screenshot`) driven manually via shell, plus direct `getBoundingClientRect()`/`window.innerWidth` instrumentation injected into throwaway diagnostic pages — not a scripted Puppeteer session.

**Tooling finding**: this machine's headless Chrome enforces a **~482px minimum viewport width** regardless of `--window-size` below that floor — screenshots requested at 375px wide still lay out content at ~482px internally, then crop the output image to 375px, producing misleading screenshots (missing right-side content, buttons appearing not to wrap). Confirmed via instrumented DOM measurement (`window.innerWidth` read directly), not by trusting the screenshot pixels. Real sub-482px mobile verification requires the user's own browser (resize window or DevTools device toolbar) — full-screenshot self-verification below 482px is not reliable in this environment.

### User Qualitative Review

Open `1.1-home.html` directly in your browser (double-click). Confirm demo data loads (browser console: `PrototypeAPI.getDebugInfo()`). Resize the window across 640px to confirm no breakage.

---

## 📊 Status Tracking

**Status**: ✅ Complete
**Started**: 2026-07-03
**Completed**: 2026-07-03
**Approved By**: Pending user review
**Notes**: Retroactively documented — built directly without an interim story-review gate per user request, then story files added back for bookkeeping.

---

## 🔄 Changes from Original Plan

- Demo data loading switched from `fetch('data/demo-data.json')` to a `<script src="data/demo-data.js">` global (`window.DEMO_DATA`) to avoid `file://` CORS blocking of local `fetch()`. `demo-data.json` retained as an edit-friendly reference copy.
