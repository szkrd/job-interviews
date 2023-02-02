/**
 * Hash change must be fired manually on app start if we have a manual hash-router
 * (unless we use a "proper" html5 history implementation).
 */
export function triggerInitialHashChange() {
  setTimeout(() => {
    window.dispatchEvent(new HashChangeEvent('hashchange', { newURL: window.location.href }));
  }, 500);
}
