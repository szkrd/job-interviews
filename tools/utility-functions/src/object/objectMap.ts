/* eslint-disable @typescript-eslint/no-explicit-any */

interface IObjectMapOptions {
  mutate?: boolean; // modify the original object or create a new one (default)
  skipPrivate?: boolean; // skip keys that start with an underscore (aka pretend privacy)
}

export function objectMap(obj: object, cb: (any: any) => any, options: IObjectMapOptions = {}) {
  const { mutate, skipPrivate } = options;
  const ret = mutate ? obj : {};

  Object.keys(obj).forEach((key) => {
    if (skipPrivate && key.startsWith('_')) {
      // for example to skip `_location` or `_status`
      return; // skip current iteration
    }
    ret[key] = cb(obj[key]);
  });

  return ret;
}
