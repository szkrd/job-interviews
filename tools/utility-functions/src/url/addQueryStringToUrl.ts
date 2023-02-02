/**
 * Appends a query string to a url while taking care of the
 * concatenating '?' or '&' character.
 */
export function addQueryStringToUrl(url: string, queryString: string) {
  return url + (url.includes('?') ? '&' : '?') + queryString.replace(/^[&?]/, '');
}
