/**
 * Removes duplicates from an array, keeping unique items only;
 * uses array filter, which is much faster than set operations.
 * Returns a new array.
 */
export function uniq<T>(arr: T[] = []) {
  return arr.filter((val, i, self) => self.indexOf(val) === i);
}
