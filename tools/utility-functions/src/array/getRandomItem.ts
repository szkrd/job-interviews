import { random } from '../number/random';

export function getRandomItem<T>(arr: T[]): T {
  return arr[random(arr.length)];
}
