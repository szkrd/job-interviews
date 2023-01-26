export function validateTmdbToken(token) {
  return token && typeof token === 'string' && token.length >= 128;
}

export function validateOwmToken(token) {
  return token && typeof token === 'string' && token.length >= 32;
}

export function validateGithubToken(token) {
  return token && typeof token === 'string' && token.startsWith('github_pat_');
}

export const validateToken = {
  tmdb: validateTmdbToken,
  owm: validateOwmToken,
  github: validateGithubToken,
};
