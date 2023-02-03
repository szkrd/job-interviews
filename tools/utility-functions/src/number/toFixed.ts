export function toFixed(value: number, precision = 2): string {
  const rounded = Math.round(Number(value + 'e' + precision));
  return Number(rounded + 'e-' + precision).toFixed(precision);
}
