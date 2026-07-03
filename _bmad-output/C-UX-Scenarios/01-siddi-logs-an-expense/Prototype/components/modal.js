/**
 * Overlay component — Centered Dialog variant (D-Design-System #overlay).
 * Generic scrim + centered container; callers own the inner content/behavior.
 * Drawer/Sheet variant is not needed by this scenario (used by 2.2 only).
 */

let activeOverlayCloseHandler = null;

function openOverlay({ id, bodyHTML, onClose, dismissible = true }) {
  const root = document.getElementById('popup-root');
  root.innerHTML = `
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-40" data-overlay-scrim>
      <div id="${id}" class="bg-white rounded-lg p-lg max-w-[360px] w-[90%] flex flex-col gap-md shadow-xl" role="dialog" aria-modal="true">
        ${bodyHTML}
      </div>
    </div>
  `;

  const scrim = root.querySelector('[data-overlay-scrim]');
  const dialog = root.querySelector(`#${id}`);
  dialog.addEventListener('click', (e) => e.stopPropagation());

  // Dev Mode's toggle button is fixed top-right — hide it while any overlay
  // is open so it can never visually collide with overlay content (found via
  // Scenario 02's drawer variant, applied here too for consistency).
  document.body.classList.add('overlay-open');

  function close() {
    root.innerHTML = '';
    document.body.classList.remove('overlay-open');
    document.removeEventListener('keydown', onKeydown);
    activeOverlayCloseHandler = null;
    if (onClose) onClose();
  }

  function onKeydown(e) {
    if (e.key === 'Escape' && dismissible) close();
  }

  if (dismissible) {
    scrim.addEventListener('click', close);
    document.addEventListener('keydown', onKeydown);
  }

  activeOverlayCloseHandler = close;

  const firstFocusable = dialog.querySelector('input, button, [tabindex]');
  if (firstFocusable) firstFocusable.focus();

  return { close };
}

function closeActiveOverlay() {
  if (activeOverlayCloseHandler) activeOverlayCloseHandler();
}

window.openOverlay = openOverlay;
window.closeActiveOverlay = closeActiveOverlay;
