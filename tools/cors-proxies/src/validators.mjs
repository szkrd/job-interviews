export function validateTmdbToken(token) {
  return token && typeof token === 'string' && token.length >= 128;
}

export const validateToken = {
  tmdb: validateTmdbToken,
};
