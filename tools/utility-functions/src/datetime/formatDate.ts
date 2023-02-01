import parseLabel from '../string/parseLabel';

const MONTHS = {
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  full: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

/**
 * Minimal date formatter. Defaults to "YYYY-MM-DD".
 * For anything more complicated, probably dayjs is a better option.
 * Supported tokens:
 * - YYYY	= four-digit year (2023)
 * - YY = two-digit year (23)
 * - M = month, beginning at 1 (1)
 * - MM = month, 2-digits (01)
 * - MMM = abbreviated month name (Jan)
 * - MMMM = full month name (January)
 * - D = day of the month (1)
 * - DD = day of the month, 2-digits (01)
 */
export function formatDate(date?: string, format = 'YYYY-MM-DD') {
  if (!date) return '';
  const dateObj = new Date(date);
  const monthNum = dateObj.getMonth();
  const yearFull = String(dateObj.getFullYear());
  const yearShort = yearFull.substring(yearFull.length - 2);
  const monthDigit = String(monthNum + 1);
  const monthTwoDigits = monthDigit.padStart(2, '0');
  const monthNameShort = MONTHS.abbreviated[monthNum];
  const monthNameFull = MONTHS.full[monthNum];
  const dayOneDigit = String(dateObj.getDate());
  const dayTwoDigits = dayOneDigit.padStart(2, '0');
  // the order of the keys is important (longer pattern first);
  // we also want to a two-step replace, because in a single step only
  // a "December" would end up parsed as "D+ecember"
  const patterns = {
    YYYY: yearFull,
    YY: yearShort,
    MMMM: monthNameFull,
    MMM: monthNameShort,
    MM: monthTwoDigits,
    M: monthDigit,
    DD: dayTwoDigits,
    D: dayOneDigit,
  };
  const tokensKeys = Object.keys(patterns);
  const tokensNum = tokensKeys.map((_, idx) => `%_${idx}_%`);
  // YYYY -> %_0_%
  const repObj1 = tokensKeys.reduce((acc, key, idx) => {
    acc[key] = tokensNum[idx];
    return acc;
  }, {} as Record<string, string>);
  // %_0_% -> yearFull
  const repObj2 = tokensNum.reduce((acc, key, idx) => {
    acc[key] = Object.values(patterns)[idx];
    return acc;
  }, {} as Record<string, string>);
  const step1 = parseLabel(format, repObj1, '', '');
  return parseLabel(step1, repObj2, '', '');
}
