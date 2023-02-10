import { escapeRegExp } from './escapeRegExp';

/**
 * Splits a string into two (or more) parts.
 */
export function split(text: string, splitStr: string, all = false): string[] {
  if (all) return text.split(new RegExp(escapeRegExp(splitStr), 'g'));
  const idx = text.indexOf(splitStr);
  if (idx === -1) return [text];
  return [text.substring(0, idx), text.substring(idx + splitStr.length)];
}
