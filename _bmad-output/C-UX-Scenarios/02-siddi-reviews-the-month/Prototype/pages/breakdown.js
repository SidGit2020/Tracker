/**
 * Breakdown page logic — covers scenario steps 2.1 (chart) and 2.2
 * (drill-down panel) as states of a single view. See
 * work/Logical-View-Map.md for why this is one file, not two.
 */

const state = {
  monthKey: null,
  monthData: null, // { total, categories: [{category, amount}] }
  chartViewState: 'loading', // 'loading' | 'default' | 'empty' | 'error'
  forceChartError: false,
  forceDrilldownError: false,
};

// ============================================================================
// INIT
// ============================================================================

function initPage() {
  state.monthKey = PrototypeAPI.getLatestMonth();
  initPrototypeControls();
  if (typeof initDevMode === 'function') initDevMode();
  renderHeader();
  loadMonth(state.monthKey);
}
window.initPage = initPage;

// ============================================================================
// DATA LOADING
// ============================================================================

function loadMonth(monthKey) {
  state.monthKey = monthKey;
  state.chartViewState = 'loading';
  renderBody();

  if (state.forceChartError) {
    setTimeout(() => {
      state.chartViewState = 'error';
      renderBody();
    }, 400);
    return;
  }

  PrototypeAPI.getMonthSummary(monthKey).then((data) => {
    state.monthData = data;
    state.chartViewState = data.categories.length === 0 ? 'empty' : 'default';
    renderBody();
  });
}

// ============================================================================
// HEADER / MONTH SELECTOR (breakdown-header)
// ============================================================================

function renderHeader() {
  const root = document.getElementById('header-root');
  const earliest = PrototypeAPI.getEarliestMonth();
  const latest = PrototypeAPI.getLatestMonth();
  const atEarliest = state.monthKey <= earliest;
  const atLatest = state.monthKey >= latest;

  root.innerHTML = `
    <div id="breakdown-header" class="flex items-center justify-between px-xl py-lg">
      <h1 id="breakdown-header-title" class="text-xl font-semibold">Monthly Category Breakdown</h1>
      <div id="breakdown-header-month-selector" class="flex items-center gap-sm text-sm font-medium">
        <button id="month-prev" class="px-xs py-3xs rounded-md border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-gray-50" ${atEarliest ? 'disabled' : ''} aria-label="Previous month">‹</button>
        <span class="min-w-[120px] text-center">${formatMonthLabel(state.monthKey)}</span>
        <button id="month-next" class="px-xs py-3xs rounded-md border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-gray-50" ${atLatest ? 'disabled' : ''} aria-label="Next month">›</button>
      </div>
    </div>
    <hr class="border-gray-200" />
  `;

  const prevBtn = document.getElementById('month-prev');
  const nextBtn = document.getElementById('month-next');
  if (prevBtn) prevBtn.addEventListener('click', () => changeMonth(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeMonth(1));
}

function changeMonth(delta) {
  const candidate = shiftMonthKey(state.monthKey, delta);
  const earliest = PrototypeAPI.getEarliestMonth();
  const latest = PrototypeAPI.getLatestMonth();
  if (candidate < earliest || candidate > latest) return;
  loadMonth(candidate); // sets state.monthKey internally — single source of truth
  renderHeader();
}

// ============================================================================
// TOTAL SUMMARY + BAR CHART (breakdown-total, breakdown-chart)
// ============================================================================

function renderBody() {
  const root = document.getElementById('body-root');

  if (state.chartViewState === 'loading') {
    root.innerHTML = `
      <div class="px-xl py-md">
        <div class="h-4 w-40 bg-gray-100 rounded animate-pulse mb-2xs"></div>
        <div class="h-9 w-48 bg-gray-100 rounded animate-pulse"></div>
      </div>
      <div class="px-xl py-md flex flex-col gap-lg">
        ${Array.from({ length: 4 })
          .map(() => `<div class="h-8 bg-gray-100 rounded animate-pulse"></div>`)
          .join('')}
      </div>
    `;
    return;
  }

  if (state.chartViewState === 'error') {
    root.innerHTML = `
      <div class="px-xl py-2xl text-center">
        <p class="text-sm text-red-600 mb-xs">Couldn't load data for ${formatMonthLabel(state.monthKey)}.</p>
        <button id="body-retry" class="text-sm font-medium text-tracker-600 underline">Retry</button>
      </div>
    `;
    document.getElementById('body-retry').addEventListener('click', () => loadMonth(state.monthKey));
    return;
  }

  const totalHTML = `
    <div id="breakdown-total" class="px-xl py-md">
      <p id="breakdown-total-label" class="text-sm text-gray-500">Total Spent This Month</p>
      <p id="breakdown-total-amount" class="text-3xl font-bold">${formatCurrency(state.monthData.total)}</p>
    </div>
  `;

  if (state.chartViewState === 'empty') {
    root.innerHTML =
      totalHTML +
      `<div class="px-xl py-2xl text-center text-sm text-gray-500">No entries for ${formatMonthLabel(state.monthKey)}</div>`;
    return;
  }

  const maxAmount = Math.max(...state.monthData.categories.map((c) => c.amount));
  const rowsHTML = state.monthData.categories
    .map((c) => {
      const widthPct = Math.round((c.amount / maxAmount) * 100);
      return `
        <button id="breakdown-chart-row" data-category="${c.category}" class="chart-row w-full flex items-center gap-sm cursor-pointer group bg-transparent border-0 p-0 text-left appearance-none">
          <span class="w-24 shrink-0 text-sm font-medium">${c.category}</span>
          <div class="flex-1 bg-gray-100 rounded-md h-6 relative overflow-hidden">
            <div class="bg-tracker-500 h-full rounded-md group-hover:bg-tracker-600 transition-colors" style="width:${widthPct}%"></div>
          </div>
          <span class="w-20 shrink-0 text-sm text-right">${formatCurrency(c.amount)}</span>
        </button>
      `;
    })
    .join('');

  root.innerHTML = totalHTML + `<div id="breakdown-chart" class="px-xl py-md flex flex-col gap-lg">${rowsHTML}</div>`;

  document.querySelectorAll('.chart-row').forEach((row) => {
    row.addEventListener('click', () => openDrilldown(row.dataset.category));
  });
}

// ============================================================================
// DRILL-DOWN PANEL / OVERLAY (breakdown-drilldown-panel)
// ============================================================================

function openDrilldown(category) {
  renderDrilldown(category, 'loading', []);

  if (state.forceDrilldownError) {
    setTimeout(() => renderDrilldown(category, 'error', []), 400);
    return;
  }

  PrototypeAPI.getCategoryTransactions(state.monthKey, category).then((rows) => {
    renderDrilldown(category, 'default', rows);
  });
}

function renderDrilldown(category, viewState, transactions) {
  let bodyHTML = `
    <div class="flex items-center justify-between">
      <h2 id="breakdown-drilldown-title" class="text-lg font-semibold">${category}</h2>
      <button id="breakdown-drilldown-close" class="bg-transparent border-0 p-0 text-lg leading-none cursor-pointer text-gray-500 hover:text-gray-900" aria-label="Close">×</button>
    </div>
    <hr class="border-gray-200" />
  `;

  if (viewState === 'loading') {
    bodyHTML += Array.from({ length: 3 })
      .map(() => `<div class="h-6 bg-gray-100 rounded animate-pulse"></div>`)
      .join('<div class="h-sm"></div>');
  } else if (viewState === 'error') {
    bodyHTML += `
      <p class="text-sm text-red-600">Couldn't load transactions.</p>
      <button id="drilldown-retry" class="text-sm font-medium text-tracker-600 underline self-start">Retry</button>
    `;
  } else {
    bodyHTML += transactions
      .map(
        (t) => `
        <div id="breakdown-drilldown-row" class="flex items-center justify-between py-2xs text-sm">
          <span class="text-gray-500">${formatDateShort(t.date)}</span>
          <span>${formatCurrency(t.amount)}</span>
        </div>`,
      )
      .join('');
  }

  openOverlay({
    id: 'breakdown-drilldown-panel',
    variant: 'drawer',
    bodyHTML,
    dismissible: true,
  });

  const closeBtn = document.getElementById('breakdown-drilldown-close');
  if (closeBtn) closeBtn.addEventListener('click', () => closeActiveOverlay());

  const retryBtn = document.getElementById('drilldown-retry');
  if (retryBtn) retryBtn.addEventListener('click', () => openDrilldown(category));
}

// ============================================================================
// PROTOTYPE CONTROLS — manual state simulation for testing Empty/Error
// (not part of the shipped spec; a testing aid for this prototype only)
// ============================================================================

function initPrototypeControls() {
  const panel = document.createElement('div');
  panel.className = 'fixed bottom-3 left-3 z-50 text-xs';
  panel.innerHTML = `
    <button id="proto-controls-toggle" class="bg-gray-900 text-white rounded-md px-sm py-xs shadow-lg">⚙ Prototype Controls</button>
    <div id="proto-controls-panel" class="hidden mt-xs bg-white border border-gray-300 rounded-md p-sm shadow-lg flex flex-col gap-2xs w-64">
      <label class="flex items-center gap-2xs">
        <input type="checkbox" id="proto-force-chart-error" />
        Force chart to error on next month switch
      </label>
      <label class="flex items-center gap-2xs">
        <input type="checkbox" id="proto-force-drilldown-error" />
        Force drill-down to error on next open
      </label>
      <button id="proto-reload-current" class="text-left text-tracker-600 underline mt-xs">Reload current month (test Loading)</button>
      <button id="proto-clear-data" class="text-red-600 underline text-left">Clear demo data &amp; reload</button>
    </div>
  `;
  document.body.append(panel);

  document.getElementById('proto-controls-toggle').addEventListener('click', () => {
    document.getElementById('proto-controls-panel').classList.toggle('hidden');
  });

  document.getElementById('proto-force-chart-error').addEventListener('change', (e) => {
    state.forceChartError = e.target.checked;
  });

  document.getElementById('proto-force-drilldown-error').addEventListener('change', (e) => {
    state.forceDrilldownError = e.target.checked;
  });

  document.getElementById('proto-reload-current').addEventListener('click', () => {
    loadMonth(state.monthKey);
  });

  document.getElementById('proto-clear-data').addEventListener('click', () => {
    PrototypeAPI.clearAllData();
    location.reload();
  });
}
