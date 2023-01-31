/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Checks if an object's key and values can be iterated through;
 * similar to lodash isPlainObject, but will also allow class instances.
 * Map and WeakMap are NOT allowed.
 */
export function isKeyValueObject(value: any) {
  const obj = value && typeof value === 'object';
  return obj && toString.call(value) === '[object Object]';
}
