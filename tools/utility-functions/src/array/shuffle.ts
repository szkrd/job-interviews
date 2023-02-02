/**
 * Performant array shuffle.
 */
export function shuffle<T>(arr: T[]): T[] {
  for (let idx = arr.length - 1; idx > 0; idx--) {
    const idxRnd: number = Math.floor(Math.random() * (idx + 1));
    [arr[idx], arr[idxRnd]] = [arr[idxRnd], arr[idx]];
  }
  return arr;
}
