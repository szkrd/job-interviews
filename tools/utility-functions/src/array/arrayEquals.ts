/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Deep triple equality check for array contents, the order matters.
 */
export function arrayEquals(arr1: any[], arr2: any[]): boolean {
  if (!arr1 || !arr2) {
    // not an array or length mismatch
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (!Array.isArray(arr1[i]) && arr1[i] !== null && typeof arr1[i] === 'object') {
      console.warn('arrayEquals: object comparison not supported');
    }
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!arrayEquals(arr1[i], arr2[i])) {
        // deep
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
