export function parseJwt(token?: string | null): null | unknown {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((chunk) => '%' + ('00' + chunk.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  let parsed: any;
  try {
    parsed = JSON.parse(jsonPayload);
  } catch {
    return null;
  }
  if (!parsed.exp || !parsed.iat) return null;
  const expired = parsed.exp * 1000 < Date.now();
  if (expired) return null;
  return parsed;
}
