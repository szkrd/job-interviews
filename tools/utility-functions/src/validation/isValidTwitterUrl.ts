export function isValidTwitterUrl(url: string): boolean {
  const rex = /^https:\/\/(.*\.)?twitter\.com\/?([A-Z0-9_]+)?\/?/i;
  return rex.test(url);
}
