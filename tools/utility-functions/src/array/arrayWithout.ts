/**
 * Returns the first array without the passed list of items.
 */
export function arrayWithout<T>(arr: T[], items: T[]) {
  return arr.filter((item) => items.indexOf(item) === -1);
}
