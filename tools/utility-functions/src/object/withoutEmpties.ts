/* eslint-disable @typescript-eslint/no-explicit-any */

import { isNullOrUndefined } from '../validation/isNullOrUndefined';

const nope = () => false;
const isEmptyString = (val: any) => val === '';

/**
 * Remove keys of an object with null or undefined as value.
 * Pass a second true to remove empty strings as well.
 */
export function withoutEmpties(obj: any, disallowEmptyStrings = false): any {
  const stringComparator = disallowEmptyStrings ? isEmptyString : nope;
  const comparator = (val: any) => isNullOrUndefined(val) || stringComparator(val);

  // if you really want to use this for an array...
  if (Array.isArray(obj)) return obj.map(comparator);

  return Object.keys(obj).reduce((acc, key) => {
    if (!comparator(obj[key])) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
