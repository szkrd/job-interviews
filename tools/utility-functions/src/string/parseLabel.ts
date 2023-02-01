import { escapeRegExp } from './escapeRegExp';

/**
 * Replaces (case insensitive) Windows style "variables" in strings from an object's values.
 * Only shallow parsing is supported (json paths or dot separators will not work).
 * For example: `'Hello %NAME%!' + { name: 'Jane'} = 'Hello Jane!'`
 */
const parseLabel = (str = '', obj: unknown, wrapCharLeft = '%', wrapCharRight = '%'): string => {
  let ret = str;
  Object.keys(obj).forEach((key) => {
    const value = String(obj[key]);
    const rex = new RegExp(escapeRegExp(`${wrapCharLeft}${key}${wrapCharRight}`), 'gi');
    ret = ret.replace(rex, value);
  });
  return ret;
};

export default parseLabel;
