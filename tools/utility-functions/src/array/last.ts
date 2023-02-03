/** Returns the last element of an array. */
export function last<T>(array: T[]): T | undefined {
  if (!Array.isArray(array)) return;
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
