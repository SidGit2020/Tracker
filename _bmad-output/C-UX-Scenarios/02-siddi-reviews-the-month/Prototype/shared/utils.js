/**
 * Shared formatting/helper utilities for the Breakdown prototype.
 */

function formatCurrency(amount) {
  const n = Number(amount) || 0;
  return `Rs ${n.toLocaleString('en-IN')}`;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "2026-07" -> "July 2026" */
function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number);
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

/** Date -> "2026-07" */
function toMonthKey(dateString) {
  return dateString.slice(0, 7);
}

/** "2026-07" + delta months -> "2026-08" / "2026-06" etc. */
function shiftMonthKey(monthKey, delta) {
  const [year, month] = monthKey.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

function formatDateShort(dateString) {
  const d = new Date(dateString + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}
