/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Checks if a variable "looks like" a mongo ID or not.
 * Nulls, undefineds, string nulls are "properly detected".
 * Mongo ids are 12 bytes (24 characters in hex representation).
 */
export function isMongoId(id: any) {
  if (typeof id !== 'string') {
    return false;
  }
  return /^[0-9a-fA-F]{24}$/.test(id);
}
