/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Node utility null or undef has been deprecated,
 * and if you're using eqeqeq, then this is a bit simpler.
 */
export function isNullOrUndefined(val: any) {
  return val === null || typeof val === 'undefined';
}
