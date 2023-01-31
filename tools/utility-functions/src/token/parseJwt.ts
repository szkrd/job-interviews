export interface ISerializedToken {
  exp: number;
  hashId: string;
  iat: number;
  id: string;
  // ... add what you need here
}

/**
 * Decodes JWT token without external libraries.
 * @see https://stackoverflow.com/a/38552302
 */
export function parseJwt(token): ISerializedToken | null {
  const base64Url = token.split('.')[1] ?? '';
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const uriComp = window
    .atob(base64)
    .split('')
    .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
    .join('');
  let ret = null;
  try {
    ret = JSON.parse(decodeURIComponent(uriComp));
  } catch (err) {
    console.error('[token/parseJwt] token parse failure', err);
  }
  return ret;
}
