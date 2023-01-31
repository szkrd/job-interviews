/**
 * Remove protocol prefix (http or https) so that a link
 * defaults to the current site's protocol.
 */
export function stripProto(url = '') {
  return (url || '').replace(/^https?:/, '');
}
