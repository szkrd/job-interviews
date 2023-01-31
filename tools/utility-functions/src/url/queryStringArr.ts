/* eslint-disable @typescript-eslint/no-explicit-any */

import { isKeyValueObject } from '../validation/isKeyValueObject';

/**
 * Parses query string into an object by splitting
 * it into parts; this implementation supports php style arrays:
 * `?foo=1&bar=2&bar=3&bar=4` -> `{ foo: '1', bar: ['2', '3', '4'] }`
 */
function parse(text: string): Record<string, string> {
  text = text.replace(/^\?/, '');
  const ret = {};
  const pairs = text.split('&');
  pairs.forEach((pair) => {
    const keyVal = pair.split('=');
    if (keyVal.length === 1) return; // skip if we have no value
    const key = keyVal[0];
    const val = decodeURIComponent(keyVal[1]);
    if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else if (ret[key] !== undefined) {
      ret[key] = [ret[key], val];
    } else {
      ret[key] = val;
    }
  });
  return ret;
}

/**
 * Converts object to query string WITHOUT using URLSearchParams,
 * so shallow arrays are supported (nested ones are NOT):
 * `{ foo: 1, bar: [2, 3] }` -> `foo=1&bar=2&bar=3`
 */
function from(obj: any): string {
  if (!isKeyValueObject(obj)) return '';
  const ret: string[] = [];
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (Array.isArray(val)) {
      val.forEach((el) => {
        ret.push(`${key}=${encodeURIComponent(el)}`);
      });
    } else {
      ret.push(`${key}=${encodeURIComponent(val)}`);
    }
  });
  return ret.join('&');
}

export const queryStringArr = { from, parse };
