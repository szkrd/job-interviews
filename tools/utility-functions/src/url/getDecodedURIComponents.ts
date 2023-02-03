/**
 * Useful when the query params are part of the path:
 * "https://www.search.com/movies/cats%26dogs/page/2" -> `['movies', 'cats&dogs', 'page', '2']`
 * (history.js + react router + search in uri = headache)
 */
export const getDecodedPathParts = (pathName = ''): string[] => {
  const path = (pathName || window.location.pathname).replace(/^\//, '').replace(/\/$/, '');
  if (!path) return [];
  return path.split('/').map(decodeURIComponent);
};
