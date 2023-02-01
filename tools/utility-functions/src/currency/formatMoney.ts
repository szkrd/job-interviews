// the use of utf8 nbsp is INTENTIONAL
const CURRENCY_SIGNS = {
  'en-US': '$@',
  'hu-HU': '@ Ft',
};

type TCurrencyLocale = keyof typeof CURRENCY_SIGNS;

/**
 * Locale string based currency formatter. The default is `en-US`
 * new currencies must be added manually, though the number format
 * part is taken care of by the browser (via toLocaleString).
 */
export function formatMoney(val?: number, locale: TCurrencyLocale = 'en-US', fallback = ''): string {
  if (typeof val !== 'number') return fallback ?? '';
  const hasCurrencyData = CURRENCY_SIGNS[locale] !== undefined;
  const valFormatted = Number(val).toLocaleString(hasCurrencyData ? locale : 'en-US', { minimumFractionDigits: 2 });
  if (!CURRENCY_SIGNS[locale]) return String(val);
  return CURRENCY_SIGNS[locale].replace('@', valFormatted);
}
