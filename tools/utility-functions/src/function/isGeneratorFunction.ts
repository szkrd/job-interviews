/* eslint-disable @typescript-eslint/no-explicit-any */

export function isGeneratorFunction(fn: any) {
  if (typeof fn !== 'function') return false;
  return (fn.constructor + '').includes('GeneratorFunction') || (fn.prototype + '').includes('Generator');
}
