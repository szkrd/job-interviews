export function formatMoney(val?: number, locale = 'en-US', fallback = ''): string {
  if (typeof val !== 'number') return fallback ?? '';
  return '$' + Number(val).toLocaleString(locale, { minimumFractionDigits: 2 });
}
