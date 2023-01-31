/**
 * Performant array shuffle.
 */
export default function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    const x: T = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}
