/**
 * Overlay component (D-Design-System #overlay) — both variants:
 * - "dialog": Centered Dialog (write flows) — not used by this scenario, kept for parity with Scenario 01
 * - "drawer": Drawer/Sheet (read-only supporting detail) — used by breakdown-drilldown-panel
 * Generic scrim + positioned container; callers own the inner content/behavior.
 */

let activeOverlayCloseHandler = null;

function openOverlay({ id, bodyHTML, onClose, dismissible = true, variant = 'dialog' }) {
  const root = document.getElementById('popup-root');

  const containerClass =
    variant === 'drawer'
      ? 'bg-white p-lg w-[380px] h-full ml-auto flex flex-col gap-md shadow-xl overflow-y-auto'
      : 'bg-white rounded-lg p-lg max-w-[360px] w-[90%] flex flex-col gap-md shadow-xl';

  const scrimClass = variant === 'drawer' ? 'fixed inset-0 bg-black/40 flex z-40' : 'fixed inset-0 bg-black/40 flex items-center justify-center z-40';

  root.innerHTML = `
    <div class="${scrimClass}" data-overlay-scrim>
      <div id="${id}" class="${containerClass}" role="dialog" aria-modal="true">
        ${bodyHTML}
      </div>
    </div>
  `;

  const scrim = root.querySelector('[data-overlay-scrim]');
  const dialog = root.querySelector(`#${id}`);
  dialog.addEventListener('click', (e) => e.stopPropagation());

  // Dev Mode's toggle button is fixed top-right, same corner as a right-edge
  // drawer's close control — hide it while any overlay is open to avoid the
  // two competing for the same screen space (found via visual verification).
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
