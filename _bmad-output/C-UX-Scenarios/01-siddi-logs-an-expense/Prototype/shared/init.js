/**
 * Auto-init: loads demo data (first run only), then calls window.initPage().
 */
document.addEventListener('DOMContentLoaded', () => {
  PrototypeAPI.ensureDemoDataLoaded();
  if (typeof window.initPage === 'function') {
    window.initPage();
  }
});
