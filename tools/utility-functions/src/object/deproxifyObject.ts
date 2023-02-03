import { isKeyValueObject } from '../validation/isKeyValueObject';
import { deepDumbClone } from './deepDumbClone';

/**
 * Renders a proxied object into a plain object,
 * but the performance implications may not be "very good"
 */
export const deProxify = (obj: unknown): unknown => {
  if (isKeyValueObject(obj) || Array.isArray(obj)) return deepDumbClone(obj);
  return obj;
};
