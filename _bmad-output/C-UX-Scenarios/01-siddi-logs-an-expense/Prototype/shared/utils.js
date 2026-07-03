/**
 * Shared formatting/helper utilities for the prototype.
 */

function formatCurrency(amount) {
  const n = Number(amount) || 0;
  return `Rs ${n % 1 === 0 ? n : n.toFixed(2)}`;
}

function formatRelativeDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const isSameDay = date.toDateString() === now.toDateString();
  if (isSameDay) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function normalizeCategoryName(name) {
  return String(name || '').trim().toLowerCase();
}

/** Finds the existing category (preset or custom) matching `name` case-insensitively. Returns the existing spelling, or null if no match. */
function findExistingCategory(name, allCategories) {
  const target = normalizeCategoryName(name);
  if (!target) return null;
  return allCategories.find((c) => normalizeCategoryName(c) === target) || null;
}
