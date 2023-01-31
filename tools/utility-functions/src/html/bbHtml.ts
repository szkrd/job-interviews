const strCount = (haystack = '', needle = '') => haystack.split(needle).length - 1;

/**
 * Convert "bb-ish" codes to html. So far the supported tags are:
 * `[b]`, `[i]`, `[br]`, `[url]`. In case of tag count mismatch it will
 * NOT do anything, just returns the original input. See the spec
 * file for working examples.
 */
export const bbHtml = (s = '') => {
  let html = s.replace(/\[br]/g, '<br>');
  if (strCount(html, '[b]') === strCount(html, '[/b]')) {
    html = html.replace(/\[b]/g, '<strong>').replace(/\[\/b]/g, '</strong>');
  }
  if (strCount(html, '[i]') === strCount(html, '[/i]')) {
    html = html.replace(/\[i]/g, '<em>').replace(/\[\/i]/g, '</em>');
  }
  // it would be very easy to write a generic link parser
  // but I want to minimize the chances of accidental bbcode translations
  if (strCount(html, '[url=') === strCount(html, '[/url]')) {
    html = html
      .replace(/\[url=.*?]/g, (s) => {
        const url = s
          .trim()
          .split('=')[1]
          .replace(/^['"]/, '')
          .replace(/['"]?]$/, '');
        return `<a href="${url}" target="_blank">`;
      })
      .replace(/\[\/url]/g, '</a>');
  }
  return html;
};
