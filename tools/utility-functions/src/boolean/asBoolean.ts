/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Converts string to boolean (possible matches: true, 1, yes, ok).
 */
export function asBoolean(text: any): boolean {
  return /^true|yes|1|ok$/i.test(String(text).trim());
}
