# Deferred Work

## Deferred from: code review of 1-1-data-model-foundation (2026-07-05)

- `Entry.CreatedAt` has no default and nothing in Story 1.1 sets it — the entry-creation (quick-add) story must explicitly set it to `DateTimeOffset.UtcNow`. [server/Entries/Entry.cs:11]
- No domain-value constraints on `Entry.Amount` (no positive/range check) or `Category.Name` (no max length) — validation belongs to the future entry-creation/category-creation endpoints. [server/Entries/Entry.cs:8; server/Categories/Category.cs:6]
- SQLite connection string `Data Source=../tracker.db` resolves relative to the process's current working directory, not the app base directory — correct resolution strategy depends on the FR-9 deployment story's launch mechanism. [server/appsettings.json:11]
- SQLite's `LOWER()` is ASCII-only, so non-ASCII category names (e.g. `"Café"` vs `"café"`) won't case-fold and match correctly — low priority given no i18n requirement in the PRD and single-user English-language usage. [server/Categories/CategoryMatcher.cs:9-10]

## Deferred from: code review of 1-2-home-screen (2026-07-05)

- No keyboard/accessibility support for the Overlay component (Escape to dismiss, focus trap, `role="dialog"`/`aria-modal`) — cross-cutting concern better addressed once across all Overlay usages (Confirm, Edit, and future Epic 2 Drawer/Sheet variant) rather than per-story. [client/src/app/shared/components/overlay/overlay.ts; overlay.html]
- `GET /api/entries` loads the entire `Entries` table into memory instead of filtering via SQL (EF Core SQLite couldn't translate the `WHERE` on `DateTimeOffset`) — accepted as a v1 trade-off given single-user/local-device scale; revisit if entry counts grow large enough to matter. [server/Entries/EntriesEndpoints.cs:76]
- Raw pixel border-widths (`1px`/`2px`) hardcoded in several new Angular component styles instead of a design token — no border-width token exists yet; not worth blocking this story. [client/src/app/home/category-selector/category-selector.scss; confirm-popup/confirm-popup.scss; edit-popup/edit-popup.scss; recent-list/recent-list.scss]
