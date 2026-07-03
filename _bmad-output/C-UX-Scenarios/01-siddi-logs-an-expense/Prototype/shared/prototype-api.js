/**
 * PrototypeAPI — sessionStorage-backed data layer simulating a backend.
 * Console commands for debugging:
 *   PrototypeAPI.getDebugInfo()
 *   PrototypeAPI.clearAllData()
 */

const STORAGE_KEY = 'tracker_prototype_state';
const SAVE_DELAY_MS = 600; // simulated network latency for pessimistic save

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
    writeState({
      user: seed.user,
      categories: { presets: [...seed.categories.presets], custom: [...seed.categories.custom] },
      entries: [...seed.entries],
    });
    console.log('%c✅ Demo data loaded', 'color: #10B981; font-weight: bold;');
  },

  getUser() {
    return readState().user;
  },

  /** All known category names (presets + every custom category ever used), for case-insensitive duplicate matching. */
  getAllCategoryNames() {
    const { categories } = readState();
    return [...categories.presets, ...categories.custom];
  },

  getPresetCategories() {
    return readState().categories.presets;
  },

  getEntries() {
    const { entries } = readState();
    return [...entries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  /**
   * Simulates a pessimistic save (delay before resolving) per 1.2 Technical Notes.
   * Resolves { entry, isNewCategory } — never rejects (no error-simulation path;
   * see Prototype Controls panel for manual error-state testing).
   */
  addEntry({ amount, category }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = readState();
        const existing = findExistingCategory(category, [...data.categories.presets, ...data.categories.custom]);
        const finalCategory = existing || category;
        const isNewCategory = !existing && !data.categories.presets.includes(category);

        if (isNewCategory) {
          data.categories.custom.push(finalCategory);
        }

        const entry = {
          id: generateId('entry'),
          amount: Number(amount),
          category: finalCategory,
          createdAt: new Date().toISOString(),
        };
        data.entries.push(entry);
        writeState(data);
        resolve({ entry, isNewCategory });
      }, SAVE_DELAY_MS);
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
