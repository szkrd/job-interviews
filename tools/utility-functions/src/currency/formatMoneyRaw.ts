import { formatNumberRaw } from '../number/formatNumberRaw';

/**
 * Manual format money function (without using browser Intl).
 */
export function formatMoneyRaw(
  value: number,
  symbol: string,
  precision: number,
  thousand: string,
  decimal: string,
  template: string
) {
  return template.replace('%s', symbol).replace('%v', formatNumberRaw(value, precision, thousand, decimal));
}
