/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Es6 object get, but unless you really need the string dot notation
 * method, you are probably much better of with the elvis operator `?.`
 */
export function objectGet(value: any, path: string | Array<string | number> = ''): any {
  let pArr = [];
  if (Array.isArray(path)) {
    pArr = path;
  } else {
    pArr = String(path)
      .replace(/\[(\d+)]/g, '.$1')
      .split('.');
  }
  // there's not much point to do this in ts, it's going to be any or generic return
  return pArr.reduce((acc, v) => {
    acc = acc[v];
    return acc;
  }, value);
}
