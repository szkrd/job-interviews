import { random } from './number';

export function getRandomItem<T>(arr: T[]): T {
  return arr[random(arr.length)];
}
