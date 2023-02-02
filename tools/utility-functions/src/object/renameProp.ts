/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Rename prop with object mutation.
 */
export function renameProp(obj: any, from: string, to: string): any {
  // there's no sane way to do this in a ts fashion
  if (obj[from] !== undefined) {
    obj[to] = obj[from];
  }
  delete obj[from];
  return obj;
}

export function renameProps(sourceObj, mapObj: Record<string, string>) {
  Object.keys(mapObj).forEach((key) => renameProp(sourceObj, key, mapObj[key]));
  return sourceObj;
}
