/**
 * Random with range support.
 * from: inclusive
 * to: exclusive
 * rand(5) = 0-1-2-3-4
 * rand(2, 6) = 2-3-4-5
 */
export const randRange = (minOrMax = 0, max?: number) => {
  let from = minOrMax;
  let to = max;
  if (max === undefined) {
    to = minOrMax;
    from = 0;
  }
  return Math.floor(Math.random() * (to - from + 1)) + from;
};
