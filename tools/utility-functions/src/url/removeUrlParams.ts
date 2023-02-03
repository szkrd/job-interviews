/**
 * Keeps the proto+host+path part of a URL.
 * For example "http://www.foobar.com/search?q=cheese#section=form" -> "http://www.foobar.com/search"
 */
export function removeUrlParams(url: string) {
  const generatedUrl = new URL(url);
  return `${generatedUrl.protocol}//${generatedUrl.host}${generatedUrl.pathname}`;
}
