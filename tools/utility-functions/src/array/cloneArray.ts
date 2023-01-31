/** Shallow clones an array using `slice`. */
export function cloneArray<T>(arr: T[]): T[] {
  return arr.slice();
}
