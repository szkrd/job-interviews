/* eslint-disable @typescript-eslint/no-explicit-any */

import { isKeyValueObject } from '../validation/isKeyValueObject';

export function getArrayIndexById(arr: any[], id: string | number, idName = 'id'): number {
  const element = arr.filter(isKeyValueObject).find((item) => item[idName] === id);
  return arr.indexOf(element);
}
