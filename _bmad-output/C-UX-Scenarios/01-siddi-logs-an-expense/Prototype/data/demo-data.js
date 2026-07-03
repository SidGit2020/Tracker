/**
 * Demo data for the Home prototype (Scenario 01: Siddi Logs an Expense).
 * Loaded via <script src="data/demo-data.js"> (not fetch()) so it works
 * when the HTML file is opened directly via file:// — fetch() of local
 * JSON is blocked by CORS in that mode in some browsers, script tags are not.
 *
 * Edit this file to change demo data. Mirrors data/demo-data.json 1:1.
 *
 * IMPORTANT: no entry below is dated "today" — the newest is one full
 * calendar day back. A newly-saved entry always gets a real `new Date()`
 * timestamp for whatever day it's actually logged on, so if any seed entry
 * shared that same day, it could sort ABOVE a just-saved entry depending on
 * what time of day testing happens (found via integration testing: the seed
 * data used to include an 08:12 UTC "today" entry, which sorted above any
 * entry saved before 08:12 UTC on a real test run). Keeping all seed data
 * strictly in the past avoids that flakiness entirely.
 */
window.DEMO_DATA = {
  user: {
    id: 'demo-user-siddi',
    firstName: 'Siddi',
    lastName: '',
    email: 'siddi@example.com',
  },
  categories: {
    presets: ['Food', 'Transport', 'Shopping', 'Other'],
    custom: ['Books'],
  },
  entries: [
    { id: 'entry-009', amount: 45, category: 'Food', createdAt: '2026-07-02T08:12:00.000Z' },
    { id: 'entry-008', amount: 320, category: 'Transport', createdAt: '2026-07-01T18:40:00.000Z' },
    { id: 'entry-007', amount: 150, category: 'Food', createdAt: '2026-07-01T13:05:00.000Z' },
    { id: 'entry-006', amount: 899, category: 'Books', createdAt: '2026-07-01T10:22:00.000Z' },
    { id: 'entry-005', amount: 1250, category: 'Shopping', createdAt: '2026-06-30T19:15:00.000Z' },
    { id: 'entry-004', amount: 60, category: 'Transport', createdAt: '2026-06-30T14:30:00.000Z' },
    { id: 'entry-003', amount: 220, category: 'Food', createdAt: '2026-06-30T09:50:00.000Z' },
    { id: 'entry-002', amount: 500, category: 'Other', createdAt: '2026-06-30T08:05:00.000Z' },
    { id: 'entry-001', amount: 90, category: 'Food', createdAt: '2026-06-29T21:00:00.000Z' },
  ],
};
