/**
 * JSON parse/stringify based clone;
 * WARN regex, fn, date, undefined will of course be broken.
 */
export function deepDumbClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
