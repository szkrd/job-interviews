export function clone(any) {
  return JSON.parse(JSON.stringify(any));
}

export function toInt(text = '', fallback) {
  if (fallback === undefined) throw new Error('toInt fallback value missing');
  if (/^\d+$/.test(text)) return parseInt(text, 10);
  return fallback;
}
