/**
 * Limits the value between a floor and a ceiling,
 * strings are converted to floats, invalid values will be converted to zero with errors swallowed.
 */
export const limit = (numLike: number | string, min: number | undefined, max?: number): number => {
  const num = typeof numLike === 'string' ? parseFloat(numLike) || 0 : numLike;
  if (min !== undefined && num < min) return min;
  if (max !== undefined && num > max) return max;
  return num;
};
