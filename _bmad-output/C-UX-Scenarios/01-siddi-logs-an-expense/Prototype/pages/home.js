/**
 * Home page logic — covers scenario steps 1.1 (idle), 1.2 (confirm popup),
 * 1.3 (toast + updated list) as states of a single view. See
 * work/Logical-View-Map.md for why this is one file, not three.
 */

const state = {
  amount: '',
  category: null, // string | null — the selected/typed category name
  entriesCountLimit: 10,
  entriesViewState: 'loading', // 'loading' | 'default' | 'empty' | 'error'
  popup: null, // null | { state: 'default'|'editing-amount'|'editing-category'|'saving'|'error' }
  highlightedEntryIds: new Set(),
  forceSaveError: false, // Prototype Controls testing hook — see initPrototypeControls()
};

const PRESET_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Other'];

// ============================================================================
// INIT
// ============================================================================

function initPage() {
  renderQuickAdd();
  renderRecentEntries();
  initPrototypeControls();
  if (typeof initDevMode === 'function') initDevMode();

  // Simulate initial fetch latency for Recent Entries (Quick Add is usable immediately regardless).
  setTimeout(() => {
    const entries = PrototypeAPI.getEntries();
    state.entriesViewState = entries.length === 0 ? 'empty' : 'default';
    renderRecentEntries();
  }, 500);
}
window.initPage = initPage;

// ============================================================================
// QUICK ADD (home-quickadd)
// ============================================================================

function isQuickAddValid() {
  return Number(state.amount) > 0 && !!state.category;
}

function renderQuickAdd() {
  const root = document.getElementById('quick-add-root');
  const categoryButtonsHTML = PRESET_CATEGORIES.map((cat) => {
    const selected = state.category === cat;
    return `
      <button
        id="home-quickadd-category-${cat.toLowerCase()}"
        data-category="${cat}"
        class="quick-add-category-btn px-md py-sm rounded-md text-sm font-medium border transition-colors ${
          selected ? 'bg-tracker-600 text-white border-tracker-600' : 'bg-white text-gray-700 border-gray-300 hover:border-tracker-500'
        }"
        aria-pressed="${selected}"
      >${cat}</button>`;
  }).join('');

  const isCustomActive = state.category && !PRESET_CATEGORIES.includes(state.category);

  root.innerHTML = `
    <div class="bg-white rounded-lg p-md flex flex-col gap-sm shadow-sm">
      <label class="text-sm font-medium text-gray-500" for="home-quickadd-amount-input">Quick Add</label>
      <input
        id="home-quickadd-amount-input"
        type="number"
        inputmode="decimal"
        min="0"
        step="1"
        placeholder="Amount"
        class="w-full text-md px-md py-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tracker-500"
        value="${state.amount}"
      />
      <div class="flex flex-wrap desktop:flex-nowrap gap-xs">${categoryButtonsHTML}</div>
      <input
        id="home-quickadd-category-custom-input"
        type="text"
        placeholder="+ Type a new category"
        class="w-full text-sm px-md py-xs border border-dashed rounded-md focus:outline-none focus:ring-2 focus:ring-tracker-500 ${
          isCustomActive ? 'border-tracker-500 text-gray-900' : 'border-gray-300 text-gray-500'
        }"
        value="${isCustomActive ? state.category : ''}"
      />
      <button
        id="home-quickadd-submit"
        class="w-full py-sm bg-tracker-600 text-white rounded-md font-semibold text-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed hover:enabled:bg-tracker-700"
        ${isQuickAddValid() ? '' : 'disabled'}
      >Add Expense</button>
    </div>
  `;

  document.getElementById('home-quickadd-amount-input').addEventListener('input', (e) => {
    state.amount = e.target.value;
    updateSubmitButtonState();
  });

  document.querySelectorAll('.quick-add-category-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category;
      renderQuickAdd(); // full re-render needed to clear custom input + update selection styling
    });
  });

  document.getElementById('home-quickadd-category-custom-input').addEventListener('input', (e) => {
    state.category = e.target.value.trim() || null;
    updateSelectedPresetStyling();
    updateSubmitButtonState();

    const isActive = !!state.category;
    e.target.classList.toggle('border-tracker-500', isActive);
    e.target.classList.toggle('text-gray-900', isActive);
    e.target.classList.toggle('border-gray-300', !isActive);
    e.target.classList.toggle('text-gray-500', !isActive);
  });

  document.getElementById('home-quickadd-submit').addEventListener('click', openConfirmPopup);
}

/** Lightweight update (no full re-render) so typing doesn't steal input focus. */
function updateSubmitButtonState() {
  document.getElementById('home-quickadd-submit').disabled = !isQuickAddValid();
}

function updateSelectedPresetStyling() {
  document.querySelectorAll('.quick-add-category-btn').forEach((btn) => {
    const selected = state.category === btn.dataset.category;
    btn.setAttribute('aria-pressed', String(selected));
    btn.classList.toggle('bg-tracker-600', selected);
    btn.classList.toggle('text-white', selected);
    btn.classList.toggle('border-tracker-600', selected);
    btn.classList.toggle('bg-white', !selected);
    btn.classList.toggle('text-gray-700', !selected);
    btn.classList.toggle('border-gray-300', !selected);
  });
}

// ============================================================================
// CONFIRM POPUP / OVERLAY (home-confirm-popup)
// ============================================================================

function openConfirmPopup() {
  state.popup = { state: 'default' };
  renderConfirmPopup();
}

function renderConfirmPopup() {
  if (!state.popup) return;

  const isEditingAmount = state.popup.state === 'editing-amount';
  const isEditingCategory = state.popup.state === 'editing-category';
  const isSaving = state.popup.state === 'saving';
  const isError = state.popup.state === 'error';

  const amountFieldHTML = isEditingAmount
    ? `<input id="home-confirm-amount-edit-input" type="number" inputmode="decimal" min="0" class="w-full text-md px-sm py-xs border border-tracker-500 rounded-md focus:outline-none" value="${state.amount}" />`
    : `<button id="home-confirm-amount" class="w-full flex items-center justify-between text-left bg-transparent border-0 p-0 appearance-none cursor-pointer" data-edit-field="amount">
         <span class="text-md">${formatCurrency(state.amount)}</span><span aria-hidden="true">✎</span>
       </button>`;

  const categoryFieldHTML = isEditingCategory
    ? `<div class="flex flex-wrap gap-xs" id="home-confirm-category-options">
         ${PRESET_CATEGORIES.map(
           (cat) => `<button data-category="${cat}" class="confirm-category-btn px-md py-xs rounded-md text-sm font-medium border ${
             state.category === cat ? 'bg-tracker-600 text-white border-tracker-600' : 'bg-white text-gray-700 border-gray-300'
           }">${cat}</button>`,
         ).join('')}
         <input id="home-confirm-category-custom-input" type="text" placeholder="+ Type a new category" class="w-full text-sm px-md py-xs border border-dashed border-gray-300 rounded-md mt-2xs" value="${
           state.category && !PRESET_CATEGORIES.includes(state.category) ? state.category : ''
         }" />
       </div>`
    : `<button id="home-confirm-category" class="w-full flex items-center justify-between text-left bg-transparent border-0 p-0 appearance-none cursor-pointer" data-edit-field="category">
         <span class="text-md">${state.category || ''}</span><span aria-hidden="true">✎</span>
       </button>`;

  openOverlay({
    id: 'home-confirm-popup',
    dismissible: !isSaving,
    bodyHTML: `
      <h2 id="home-confirm-title" class="text-lg font-semibold">Confirm Entry</h2>

      <div class="flex flex-col gap-2xs">
        <span class="text-xs text-gray-500">Amount</span>
        ${amountFieldHTML}
      </div>

      <div class="flex flex-col gap-2xs">
        <span class="text-xs text-gray-500">Category</span>
        ${categoryFieldHTML}
      </div>

      ${isError ? `<p class="text-sm text-red-600" role="alert">Couldn't save — please try again.</p>` : ''}

      <div class="flex justify-end gap-sm pt-xs">
        <button id="home-confirm-cancel" class="px-md py-xs rounded-md text-sm font-medium text-gray-700 border border-gray-300 disabled:opacity-50" ${isSaving ? 'disabled' : ''}>Cancel</button>
        <button id="home-confirm-submit" class="px-md py-xs rounded-md text-sm font-semibold text-white bg-tracker-600 disabled:opacity-70 flex items-center gap-xs" ${isSaving ? 'disabled' : ''}>
          ${isSaving ? '<span class="spinner" aria-hidden="true"></span> Saving' : isError ? 'Retry' : 'Confirm'}
        </button>
      </div>
    `,
    onClose: () => {
      state.popup = null;
    },
  });

  wireConfirmPopupEvents();
}

function wireConfirmPopupEvents() {
  const amountField = document.getElementById('home-confirm-amount');
  if (amountField) {
    amountField.addEventListener('click', () => {
      state.popup.state = 'editing-amount';
      renderConfirmPopup();
    });
  }

  const amountInput = document.getElementById('home-confirm-amount-edit-input');
  if (amountInput) {
    const commit = () => {
      state.amount = amountInput.value;
      state.popup.state = 'default';
      renderQuickAdd(); // keep Quick Add in sync — same underlying value
      renderConfirmPopup();
    };
    amountInput.addEventListener('blur', commit);
    amountInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') amountInput.blur();
    });
  }

  const categoryField = document.getElementById('home-confirm-category');
  if (categoryField) {
    categoryField.addEventListener('click', () => {
      state.popup.state = 'editing-category';
      renderConfirmPopup();
    });
  }

  document.querySelectorAll('.confirm-category-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category;
      state.popup.state = 'default';
      renderQuickAdd();
      renderConfirmPopup();
    });
  });

  const customInput = document.getElementById('home-confirm-category-custom-input');
  if (customInput) {
    customInput.addEventListener('change', () => {
      const value = customInput.value.trim();
      if (value) {
        state.category = value;
        state.popup.state = 'default';
        renderQuickAdd();
        renderConfirmPopup();
      }
    });
  }

  const cancelBtn = document.getElementById('home-confirm-cancel');
  if (cancelBtn) cancelBtn.addEventListener('click', () => closeActiveOverlay());

  const submitBtn = document.getElementById('home-confirm-submit');
  if (submitBtn) submitBtn.addEventListener('click', handleConfirmSave);
}

async function handleConfirmSave() {
  state.popup.state = 'saving';
  renderConfirmPopup();

  if (state.forceSaveError) {
    // Prototype Controls testing hook — simulates a failed save without calling the API.
    await new Promise((r) => setTimeout(r, 600));
    state.popup.state = 'error';
    renderConfirmPopup();
    return;
  }

  const { entry } = await PrototypeAPI.addEntry({ amount: state.amount, category: state.category });

  closeActiveOverlay();
  state.popup = null;

  // Reset Quick Add to idle (1.3: fields reset after successful save).
  state.amount = '';
  state.category = null;
  renderQuickAdd();

  state.entriesViewState = 'default';
  state.highlightedEntryIds.add(entry.id);
  renderRecentEntries();

  showToast(`${formatCurrency(entry.amount)} added to ${entry.category}`, {
    onDismiss: () => {
      state.highlightedEntryIds.delete(entry.id);
      renderRecentEntries();
    },
  });
}

// ============================================================================
// RECENT ENTRIES (home-recent)
// ============================================================================

function renderRecentEntries() {
  const root = document.getElementById('recent-entries-root');

  const headerHTML = `
    <div class="flex items-center justify-between mb-sm">
      <h2 id="home-recent-heading" class="text-lg font-semibold">Recent Entries</h2>
      <select id="home-recent-count-selector" class="text-sm border border-gray-300 rounded-md px-xs py-3xs">
        ${[5, 10, 20].map((n) => `<option value="${n}" ${state.entriesCountLimit === n ? 'selected' : ''}>${n}</option>`).join('')}
      </select>
    </div>
  `;

  let bodyHTML = '';
  if (state.entriesViewState === 'loading') {
    bodyHTML = Array.from({ length: 3 })
      .map(() => `<div class="h-10 bg-gray-100 rounded-md animate-pulse mb-xs"></div>`)
      .join('');
  } else if (state.entriesViewState === 'empty') {
    bodyHTML = `<p class="text-center text-sm text-gray-500 py-xl">No entries yet this month</p>`;
  } else if (state.entriesViewState === 'error') {
    bodyHTML = `
      <div class="text-center py-lg">
        <p class="text-sm text-red-600 mb-xs">Couldn't load your entries.</p>
        <button id="recent-entries-retry" class="text-sm font-medium text-tracker-600 underline">Retry</button>
      </div>`;
  } else {
    const entries = PrototypeAPI.getEntries().slice(0, state.entriesCountLimit);
    bodyHTML = entries
      .map((entry) => {
        const highlighted = state.highlightedEntryIds.has(entry.id);
        return `
        <div
          id="home-recent-entry-row"
          data-entry-id="${entry.id}"
          class="entry-row flex items-center justify-between py-xs px-xs rounded-md cursor-pointer hover:bg-gray-50 ${
            highlighted ? 'outline outline-2 outline-success-500 bg-green-50' : ''
          }"
          title="Tap to edit/delete (not implemented in this prototype)"
        >
          <span class="text-md">${formatCurrency(entry.amount)}</span>
          <span class="text-sm text-gray-500">${entry.category}</span>
        </div>`;
      })
      .join('');
  }

  root.innerHTML = `<div id="home-recent" class="bg-white rounded-lg p-md shadow-sm">${headerHTML}<div class="flex flex-col gap-xs">${bodyHTML}</div></div>`;

  const selector = document.getElementById('home-recent-count-selector');
  if (selector) {
    selector.addEventListener('change', (e) => {
      state.entriesCountLimit = Number(e.target.value);
      renderRecentEntries();
    });
  }

  const retryBtn = document.getElementById('recent-entries-retry');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      state.entriesViewState = 'default';
      renderRecentEntries();
    });
  }

  document.querySelectorAll('.entry-row').forEach((row) => {
    row.addEventListener('click', () => {
      console.info(`Tapped entry ${row.dataset.entryId} — edit/delete is out of scope for this prototype (Phase 3 scope per spec).`);
    });
  });
}

// ============================================================================
// PROTOTYPE CONTROLS — manual state simulation for testing Loading/Empty/Error
// (not part of the shipped spec; a testing aid for this prototype only)
// ============================================================================

function initPrototypeControls() {
  const panel = document.createElement('div');
  panel.className = 'fixed bottom-3 left-3 z-50 text-xs';
  panel.innerHTML = `
    <button id="proto-controls-toggle" class="bg-gray-900 text-white rounded-md px-sm py-xs shadow-lg">⚙ Prototype Controls</button>
    <div id="proto-controls-panel" class="hidden mt-xs bg-white border border-gray-300 rounded-md p-sm shadow-lg flex flex-col gap-2xs w-56">
      <p class="font-semibold text-gray-700">Recent Entries state</p>
      <div class="flex flex-wrap gap-2xs">
        <button data-state="default" class="proto-state-btn border rounded px-xs py-3xs">Default</button>
        <button data-state="loading" class="proto-state-btn border rounded px-xs py-3xs">Loading</button>
        <button data-state="empty" class="proto-state-btn border rounded px-xs py-3xs">Empty</button>
        <button data-state="error" class="proto-state-btn border rounded px-xs py-3xs">Error</button>
      </div>
      <label class="flex items-center gap-2xs mt-xs">
        <input type="checkbox" id="proto-force-save-error" />
        Force next save to fail
      </label>
      <button id="proto-clear-data" class="text-red-600 underline text-left mt-xs">Clear demo data &amp; reload</button>
    </div>
  `;
  document.body.append(panel);

  document.getElementById('proto-controls-toggle').addEventListener('click', () => {
    document.getElementById('proto-controls-panel').classList.toggle('hidden');
  });

  panel.querySelectorAll('.proto-state-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.entriesViewState = btn.dataset.state;
      renderRecentEntries();
    });
  });

  document.getElementById('proto-force-save-error').addEventListener('change', (e) => {
    state.forceSaveError = e.target.checked;
  });

  document.getElementById('proto-clear-data').addEventListener('click', () => {
    PrototypeAPI.clearAllData();
    location.reload();
  });
}
