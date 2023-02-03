/**
 * Subtract the second array from the first.
 */
export function arrayDifference<T>(a1: T[], a2: T[], isEqual?: (a: T, b: T) => boolean): T[] {
  return a1.filter(
    (i) =>
      a2.findIndex((a2Val) => {
        if (isEqual) {
          return isEqual(i, a2Val);
        } else {
          return i === a2Val;
        }
      }) === -1
  );
}
