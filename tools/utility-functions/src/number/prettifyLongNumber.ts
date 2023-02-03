/**
 * Pretty/fuzzy prints big numbers: adds "k" for thousand (kilo),
 * adds "M" for million, rounds everything below 1000.
 */
export const prettifyLongNumber = (number: number, decimals = 2, decimalSeparator = '.') => {
  let ret = '';
  if (number > 999999) {
    ret = `${(number / 1000000).toFixed(decimals).replace(/0+$/, '').replace(/\.$/, '')}M`;
  } else if (number > 999) {
    ret = `${(number / 1000).toFixed(decimals).replace(/0+$/, '').replace(/\.$/, '')}k`;
  } else {
    ret = Math.round(number).toString();
  }

  ret = ret.replace(/\./, decimalSeparator);
  return ret;
};
