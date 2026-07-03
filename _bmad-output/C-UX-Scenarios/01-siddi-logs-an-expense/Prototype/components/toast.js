/**
 * Toast notifications — home-toast / home-toast-message.
 * Stacks vertically (most recent on top), each with its own independent
 * ~2.5s auto-dismiss timer. onDismiss lets callers fade a related row
 * (e.g. the newly-added entry) on the same timer.
 */

const TOAST_DURATION_MS = 2500;

function showToast(message, { onDismiss } = {}) {
  const root = document.getElementById('toast-root');
  const toast = document.createElement('div');
  toast.className = 'home-toast bg-success-500 text-white rounded-md px-md py-sm shadow-lg text-sm font-medium animate-toast-in';
  toast.setAttribute('data-object-id', 'home-toast');
  toast.innerHTML = `<span id="home-toast-message">${message}</span>`;

  // Most recent on top.
  root.prepend(toast);

  setTimeout(() => {
    toast.classList.add('animate-toast-out');
    toast.addEventListener(
      'animationend',
      () => {
        toast.remove();
        if (onDismiss) onDismiss();
      },
      { once: true },
    );
  }, TOAST_DURATION_MS);
}

window.showToast = showToast;
