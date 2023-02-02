/* eslint-disable @typescript-eslint/no-explicit-any */

import { uniq } from '../array/uniq';

/**
 * Convert error "object" to proper serializable object.
 */
export function freezeErrorObject(error: any) {
  if (!(error instanceof Error)) {
    return error;
  }
  let props = Object.getOwnPropertyNames(error);
  // modern browser should have reflection proper
  if (typeof Reflect === 'object' && Reflect.toString() === '[object Reflect]') {
    props = uniq(['name', 'message', 'stack', ...(Reflect.ownKeys(error) as string[])]);
  }
  return props.reduce((acc, k) => {
    acc[k] = (error as any)[k];
    return acc;
  }, {} as Record<string, any>);
}
