/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * JSON stringify that omits circular references
 * @see https://gist.github.com/boussou/ca738c68b1850115e314979a8ae69b58
 */
export function safeStringify(value: any, space?: number): string {
  let cache: Record<string, any>[] = [];
  const output = JSON.stringify(
    value,
    function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          return; // circular reference found, discard key
        }
        cache.push(value);
      }
      return value;
    },
    space
  );
  cache = []; // let gc throw away contents
  return output;
}
