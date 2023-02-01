export interface ISerializedToken {
  iat?: number;
  exp?: number;
  // ... add what you need here
  id: string;
  name: string;
}

/**
 * Decodes JWT token without external libraries.
 * Iat and exp (if present) is supported by default, nbf (not before) is not.
 * @see https://stackoverflow.com/a/38552302
 */
export function parseJwt(token, mayExpireWithExp = true): ISerializedToken | null {
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
  if (mayExpireWithExp && ret !== null && ret.exp !== undefined) {
    const expired = ret.exp * 1000 < Date.now();
    if (expired) return null;
  }
  return ret;
}
