/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a unique list of items, where prop (`_id` for example) will be unique.
 * `[{x:1},{x:1},{x:2}]` -> `[{x:1},{x:2}]` (where prop is "x")
 */
export function uniqBy<T>(arr: T[], propName: keyof T): T[] {
  const ids: any[] = [];
  const ret: T[] = [];
  arr.forEach((item) => {
    const uniqId: any = item[propName];
    if (!ids.includes(uniqId)) {
      ids.push(uniqId);
      ret.push(item);
    }
  });
  return ret;
}
