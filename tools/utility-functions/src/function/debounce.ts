/* eslint-disable @typescript-eslint/no-explicit-any */

type TVoidFn = (...args: any[]) => void;

interface IDebouncedFn {
  (...args: any[]): void;
  stop: () => void;
}

/**
 * Debouncing enforces that a function not be called again
 * until a certain amount of time has passed without it
 * being called. As in "execute this function only if
 * 100 milliseconds have passed without it being called."
 * WARN: debounced functions may need to be stopped on component unmount
 * since the components will be gone during the last delayed call!
 */
export function debounce(fn: TVoidFn, delay: number): IDebouncedFn {
  let timerId;
  let done;
  return Object.assign(
    (...args: any[]): void => {
      if (timerId || done) {
        clearTimeout(timerId);
      }
      if (done) {
        return;
      }
      timerId = setTimeout(() => {
        if (done) {
          return;
        }
        fn(...args);
        timerId = null;
      }, delay);
    },
    {
      // stop will need to be called on component unmount, but ts for some reason
      // thinks that the .stop attached property doesn't exist, so please use `(foo as any).stop()`
      stop: () => {
        done = true;
      },
    }
  );
}
