import { isFractional } from './isFractional';

/**
 * Truncates the decimal digits of a number. Also works with strings,
 * but type conversion oddities will return zero! Non fractional
 * values are returned as is.
 *
 * 1.1234 => 1.12
 * '-1.1234' => -1.12
 * '1' => 1
 * 'foobar' => 0
 */
export const truncateDecimals = (numLike: string | number, digits = 2): number => {
  const numVal = typeof numLike === 'string' ? parseFloat(numLike) : numLike;
  if (isNaN(numVal) || !isFinite(numVal)) return 0;
  if (!isFractional(numVal)) return numVal;
  // js numbers are floats internally, so trunc/floor/ceil may introduce rounding errors,
  // for example `Math.trunc(812.1234 * 10000) === 8121233` (unless we add a small amount)
  const parts = String(numLike).split('.');
  return parseFloat(`${parts[0]}.${parts[1].substring(0, digits)}`);
};
