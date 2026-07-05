# Deferred Work

## Deferred from: code review of 1-1-data-model-foundation (2026-07-05)

- `Entry.CreatedAt` has no default and nothing in Story 1.1 sets it — the entry-creation (quick-add) story must explicitly set it to `DateTimeOffset.UtcNow`. [server/Entries/Entry.cs:11]
- No domain-value constraints on `Entry.Amount` (no positive/range check) or `Category.Name` (no max length) — validation belongs to the future entry-creation/category-creation endpoints. [server/Entries/Entry.cs:8; server/Categories/Category.cs:6]
- SQLite connection string `Data Source=../tracker.db` resolves relative to the process's current working directory, not the app base directory — correct resolution strategy depends on the FR-9 deployment story's launch mechanism. [server/appsettings.json:11]
- SQLite's `LOWER()` is ASCII-only, so non-ASCII category names (e.g. `"Café"` vs `"café"`) won't case-fold and match correctly — low priority given no i18n requirement in the PRD and single-user English-language usage. [server/Categories/CategoryMatcher.cs:9-10]
