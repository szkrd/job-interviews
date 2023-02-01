/**
 * Converts minutes to hours and minutes. For example `90` -< `1h 30m`
 */
export function formatDuration(mins?: number, fallback = ''): string {
  if (typeof mins !== 'number' || isNaN(mins)) return fallback; // in case the backend sent something weird
  const hours = Math.floor(mins / 60);
  const minMod = mins % 60;
  return `${hours > 0 ? hours + 'h' : ''}${minMod > 0 ? ` ${minMod}m` : ''}`.trimStart();
}
