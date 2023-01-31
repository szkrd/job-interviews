/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Checks if a value exists in an enum definition; useful as a safeguard
 * if the backend uses enums and we have the enum type duplicated on the frontend.
 * If it returns false, then probably our enum definition is outdated.
 */
export function isValueInEnum(enumObj: any, val: any) {
  // if we have lodash, then we can use invert:
  // `const reverseValue = invert(enumObj as any)[val];`
  const reverseValue = Object.keys(enumObj).reduce((acc, key) => {
    acc[enumObj[key]] = key;
    return acc;
  }, {})[val];
  if (reverseValue === undefined) {
    console.warn('[validation/isValueInEnum] Unknown enum value:', val);
    return false;
  }
  return true;
}
