/* eslint-disable @typescript-eslint/no-explicit-any */

type TVoidFn = (...args: any[]) => void;

// Throttling is a straightforward reduction of the trigger rate.
// It will cause the event listener to ignore some portion of the events
// while still firing the listeners at a constant (but reduced) rate.
export function throttle(fn: TVoidFn, delay: number): TVoidFn {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}
