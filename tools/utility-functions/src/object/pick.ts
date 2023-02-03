// Creates an object composed of the picked `object` properties,
// but considering how TS works, this is "not very useful".
export function pick<T extends object, K extends keyof T>(object: T, ...paths: K[]) {
  return paths.reduce<Partial<Pick<T, K>>>((result, key) => {
    if (key in object) {
      result[key] = object[key];
    }
    return result;
  }, {});
}
