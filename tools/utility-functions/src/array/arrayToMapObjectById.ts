/**
 * Converts an array of objects with `_id` or `id` to a lookup object.
 */
export function arrayToMapObjectById(items = [], prop = 'id') {
  return items.reduce((acc, item) => {
    const id = item.id || item._id || item[prop];
    acc[id] = item;
    return acc;
  }, {});
}
