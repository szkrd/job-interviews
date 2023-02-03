/**
 * Replaces colon sections in a react router path with a parameter;
 * the "/:part/" can be anything only, the initial colon character matters!
 */
export function parseRawRoutePath(path: string, urlParams: (string | number)[] = []): string {
  let i = 0;
  const params = urlParams || [];
  return path
    .split('/')
    .map((part) => (part.startsWith(':') ? params[i++] || '' : part))
    .join('/')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '');
}
