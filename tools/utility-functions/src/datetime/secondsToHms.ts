/**
 * Converts seconds to hour:minute:seconds format.
 * For example: `70` -> `1:10` or `01:10` (with twoDigits true).
 */
export default function secondsToHms(d: number, twoDigits = false): string {
  const MINUTES_IN_HOUR = 3600;
  const SECONDS_IN_MINUTES = 60;
  const NOTATION_DIVIDER = 10;
  const h = Math.floor(d / MINUTES_IN_HOUR);
  const m = Math.floor((d % MINUTES_IN_HOUR) / SECONDS_IN_MINUTES);
  const s = Math.floor((d % MINUTES_IN_HOUR) % SECONDS_IN_MINUTES);
  const result: string =
    (h > 0 ? h + ':' + (m < NOTATION_DIVIDER ? '0' : '') : '') + m + ':' + (s < NOTATION_DIVIDER ? '0' : '') + s;
  return twoDigits
    ? result
        .split(/:/)
        .map((s) => (s.length === 1 ? `0${s}` : s))
        .join(':')
    : result;
}
