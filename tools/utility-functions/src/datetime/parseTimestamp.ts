/**
 * Parses a date number (either unix or ts), returns null for invalid.
 * WARN this can only be used with "fairly recent" dates, since 1970
 * april is the tipping point between "unixish" and "normal" dates.
 */
export function parseTimestamp(timestamp: number): Date | null {
  let n = timestamp;
  if (!n || typeof n !== 'number') {
    return null;
  }
  // if it's proper unix ts, then we have to add the msecs
  if (n < 10000000000) {
    n = n * 1000;
  }
  const date = new Date(n);
  // somehow I doubt that anyone will pass Infinity, but whatever...
  return isNaN(date.getDate()) ? null : date;
}
