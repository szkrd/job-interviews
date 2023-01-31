import { escapeRegExp } from './escapeRegExp';

/**
 * Replaces (case insensitive) Windows style "variables" in strings from an object's values.
 * Only shallow parsing is supported (json paths or dot separators will not work).
 * For example: `'Hello %NAME%!' + { name: 'Jane'} = 'Hello Jane!'`
 */
const parseLabel = (str = '', obj: unknown): string => {
  let ret = str;
  Object.keys(obj).forEach((key) => {
    const value = String(obj[key]);
    const rexPerc = new RegExp(escapeRegExp(`%${key}%`), 'gi');
    const rexCurly = new RegExp(escapeRegExp(`{${key}}`), 'gi');
    ret = ret.replace(rexPerc, value).replace(rexCurly, value);
  });
  return ret;
};

export default parseLabel;
