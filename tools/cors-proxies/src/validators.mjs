export function validateTmdbToken(token) {
  return token && typeof token === 'string' && token.length >= 128;
}

export function validateOwmToken(token) {
  return token && typeof token === 'string' && token.length >= 32;
}

export const validateToken = {
  tmdb: validateTmdbToken,
  owm: validateOwmToken,
};
