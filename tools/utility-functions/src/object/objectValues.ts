/** Object.values es7 shim */
export const objectValues = (obj: object) => Object.keys(obj).map((key) => obj[key]);
