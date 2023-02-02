/**
 * Similar to lodash groupBy, except that we never used the prop as function feature.
 * NOTE: please prefer inline reduce or proper ts code to preserve type information!
 * @param arr     array of objects
 * @param prop    property to group by
 */
export const groupBy = (arr = [], prop = '') =>
  arr.reduce((obj, item) => {
    const key = item[prop];
    if (!obj.hasOwnProperty(key)) obj[key] = []; // eslint-disable-line no-prototype-builtins
    obj[key].push(item);
    return obj;
  }, {});
