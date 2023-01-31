/**
 * Truncate text with added ellipsis if needed.
 */
export const truncateText = (text: string, count: number, ellipsis = '…'): string => {
  if (text.length < count) {
    return text;
  }
  return text.substring(0, count) + ellipsis;
};
