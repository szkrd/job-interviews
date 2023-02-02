/** Returns the location hash without the hashmark prefix. */
export function getLocationHash(hash?: string) {
  return (hash ?? window.location.hash).replace(/^#/, '');
}
