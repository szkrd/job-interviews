// truncate text and add ellipsis if necessary
export const ellipsis = (value: string | undefined, limit = 100, trail = '...'): string => {
  if (!value) return '';
  return value.length > limit ? value.substring(0, limit) + trail : value;
};

const stringUtils = { ellipsis };
export default stringUtils;
