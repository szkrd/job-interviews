import { toFixed } from './toFixed';

/**
 * Formats a number without using browser locale data / Intl.
 * (pretty much taken from accounting.js, but adapted to ts and cleaned up a bit)
 */
export function formatNumberRaw(number: number, precision = 2, thousand = ',', decimal = '.'): string {
  const sign = number < 0 ? '-' : '';
  const base = parseInt(toFixed(Math.abs(number || 0), precision), 10) + '';
  const mod = base.length > 3 ? base.length % 3 : 0;
  return (
    sign +
    (mod ? base.substr(0, mod) + thousand : '') +
    base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (precision ? decimal + toFixed(Math.abs(number), precision).split('.')[1] : '')
  );
}
