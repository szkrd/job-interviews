/**
 * Replaces plain urls with strings.
 * Compared to the SO solution, this one has the following changes:
 * - fixed "<" as delimiters
 * - removed multiline flag, $s, unneeded escapes, unneeded uppercased parts
 * - do NOT use on html text (will only work with <br> tags added)
 * @see https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
 */

import xrex from 'xregexp';

// - added support for localized urls using xregexp (L= letter, N = number)
export function linkify(str: string): string {
  const rel = 'rel="noreferrer nofollow"';
  const target = 'target="_blank"';

  // URLs starting with http://, https://, or ftp://
  // from /(\b(https?|ftp):\/\/[-a-z0-9+&@#\/%?=~_|!:,.;]+)/
  let rex = xrex('(\\b(https?|ftp):\\/\\/[\\p{L}\\p{N}-+&@#\\/%?=~_|!:,.;]+)', 'gi');
  let text = str.replace(rex, `<a href="$1" ${target} ${rel}>$1</a>`);

  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  // from /(^|[^\/])(www\.[-a-z0-9+&@#\/%?=~_|!:,.;]+)/
  rex = xrex('(^|[^\\/])(www\\.[\\p{L}\\p{N}-+&@#\\/%?=~_|!:,.;]+)', 'gi');
  text = text.replace(rex, `$1<a href="https://$2" ${target} ${rel}>$2</a>`);

  // Change email addresses to mailto links.
  // from /(([a-z0-9-_.+])+@[a-z-_]+?(\.[a-z]{2,6})+)/
  rex = xrex('(([\\p{L}\\p{N}-_.+])+@[\\p{L}\\p{N}-_]+?(\\.[a-z]{2,6})+)', 'gi');
  text = text.replace(rex, '<a href="mailto:$1">$1</a>');

  return text;
}
