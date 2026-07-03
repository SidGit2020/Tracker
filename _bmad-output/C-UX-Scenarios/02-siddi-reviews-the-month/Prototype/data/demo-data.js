/**
 * Demo data for the Monthly Category Breakdown prototype (Scenario 02).
 * Loaded via <script src> (not fetch()) — same file:// CORS reasoning as
 * Scenario 01's data/demo-data.js.
 *
 * Spans April 2026 (earliest month with data, for month-selector lower-bound
 * testing) through July 2026 (current month, "today" per session context is
 * 2026-07-03). July's category totals (Food 4200 / Shopping 3100 / Transport
 * 2800 / Other 2350 = Rs 12,450) intentionally match the spec's own mockup
 * numbers in 2.1-monthly-breakdown.md. June includes one custom category
 * (Books) to test the non-preset-category bar rendering. April has only 2
 * categories, to test month-to-month category set changes.
 *
 * All July dates are on/before 07-02 (yesterday relative to today), avoiding
 * the same-day timestamp trap documented in Scenario 01's demo data.
 */
window.DEMO_DATA = {
  user: {
    id: 'demo-user-siddi',
    firstName: 'Siddi',
    lastName: '',
    email: 'siddi@example.com',
  },
  entries: [
    // April 2026 — earliest month with data (3 entries, 2 categories, Rs 3,000)
    { id: 'apr-1', amount: 900, category: 'Food', date: '2026-04-05' },
    { id: 'apr-2', amount: 900, category: 'Food', date: '2026-04-18' },
    { id: 'apr-3', amount: 1200, category: 'Other', date: '2026-04-22' },

    // May 2026 (7 entries, 4 categories, Rs 9,000)
    { id: 'may-1', amount: 1200, category: 'Food', date: '2026-05-03' },
    { id: 'may-2', amount: 1300, category: 'Food', date: '2026-05-19' },
    { id: 'may-3', amount: 900, category: 'Transport', date: '2026-05-07' },
    { id: 'may-4', amount: 1000, category: 'Transport', date: '2026-05-21' },
    { id: 'may-5', amount: 1700, category: 'Shopping', date: '2026-05-10' },
    { id: 'may-6', amount: 1500, category: 'Shopping', date: '2026-05-25' },
    { id: 'may-7', amount: 1400, category: 'Other', date: '2026-05-14' },

    // June 2026 (6 entries, 4 categories incl. custom "Books", Rs 8,000)
    { id: 'jun-1', amount: 1600, category: 'Food', date: '2026-06-05' },
    { id: 'jun-2', amount: 1500, category: 'Food', date: '2026-06-20' },
    { id: 'jun-3', amount: 1200, category: 'Transport', date: '2026-06-08' },
    { id: 'jun-4', amount: 1000, category: 'Transport', date: '2026-06-24' },
    { id: 'jun-5', amount: 1800, category: 'Books', date: '2026-06-12' },
    { id: 'jun-6', amount: 900, category: 'Shopping', date: '2026-06-28' },

    // July 2026 — current month (11 entries, 4 categories, Rs 12,450 — matches spec mockup)
    { id: 'jul-1', amount: 1200, category: 'Food', date: '2026-07-01' },
    { id: 'jul-2', amount: 1500, category: 'Food', date: '2026-07-01' },
    { id: 'jul-3', amount: 900, category: 'Food', date: '2026-07-02' },
    { id: 'jul-4', amount: 600, category: 'Food', date: '2026-07-02' },
    { id: 'jul-5', amount: 1250, category: 'Shopping', date: '2026-07-01' },
    { id: 'jul-6', amount: 1850, category: 'Shopping', date: '2026-07-02' },
    { id: 'jul-7', amount: 800, category: 'Transport', date: '2026-07-01' },
    { id: 'jul-8', amount: 1200, category: 'Transport', date: '2026-07-01' },
    { id: 'jul-9', amount: 800, category: 'Transport', date: '2026-07-02' },
    { id: 'jul-10', amount: 850, category: 'Other', date: '2026-07-01' },
    { id: 'jul-11', amount: 1500, category: 'Other', date: '2026-07-02' },
  ],
};
