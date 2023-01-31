/** Escape regexp characters in a string. */
export const escapeRegExp = (text: string) => {
  return text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/** Creates RegExp from string. */
export const newRex = (text: string, flags: string) => new RegExp(escapeRegExp(String(text)), flags);
