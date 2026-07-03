/**
 * PrototypeAPI — sessionStorage-backed data layer simulating a backend.
 * Console commands for debugging:
 *   PrototypeAPI.getDebugInfo()
 *   PrototypeAPI.clearAllData()
 */

const STORAGE_KEY = 'tracker_breakdown_prototype_state';
const FETCH_DELAY_MS = 400; // simulated latency for month-switch loading state

function readState() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function writeState(state) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const PrototypeAPI = {
  ensureDemoDataLoaded() {
    if (readState()) return;
    const seed = window.DEMO_DATA;
    writeState({ user: seed.user, entries: [...seed.entries] });
    console.log('%c✅ Demo data loaded', 'color: #10B981; font-weight: bold;');
  },

  getUser() {
    return readState().user;
  },

  /** All months with at least one entry, ascending ("2026-04" ... "2026-07"). */
  getAvailableMonths() {
    const { entries } = readState();
    const months = new Set(entries.map((e) => toMonthKey(e.date)));
    return [...months].sort();
  },

  getEarliestMonth() {
    return this.getAvailableMonths()[0];
  },

  /** Latest month with data — treated as "current month" for this prototype (no browsing into the future). */
  getLatestMonth() {
    const months = this.getAvailableMonths();
    return months[months.length - 1];
  },

  /**
   * Simulates fetch latency, then resolves { total, categories: [{category, amount}] }
   * sorted largest-to-smallest for the given month. Empty months resolve total:0, categories:[].
   */
  getMonthSummary(monthKey) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { entries } = readState();
        const monthEntries = entries.filter((e) => toMonthKey(e.date) === monthKey);
        const byCategory = {};
        for (const e of monthEntries) {
          byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
        }
        const categories = Object.entries(byCategory)
          .map(([category, amount]) => ({ category, amount }))
          .sort((a, b) => b.amount - a.amount);
        const total = categories.reduce((sum, c) => sum + c.amount, 0);
        resolve({ total, categories });
      }, FETCH_DELAY_MS);
    });
  },

  /** Resolves that category's transactions for the given month, sorted most-recent-first. */
  getCategoryTransactions(monthKey, category) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { entries } = readState();
        const rows = entries
          .filter((e) => toMonthKey(e.date) === monthKey && e.category === category)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        resolve(rows);
      }, FETCH_DELAY_MS);
    });
  },

  getDebugInfo() {
    const state = readState();
    console.log('Current state:', state);
    return state;
  },

  clearAllData() {
    sessionStorage.removeItem(STORAGE_KEY);
    console.log('%c🗑️ Prototype data cleared — reload to re-seed from demo data', 'color: #EF4444;');
  },
};

window.PrototypeAPI = PrototypeAPI;
