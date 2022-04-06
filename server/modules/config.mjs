import 'dotenv/config';

const host = process.env.HOST ?? '127.0.0.1';
const port = parseInt(process.env.PORT, 10) || 8080;
const tmdbAccessToken = process.env.TMDB_ACCESS_TOKEN ?? '';
const tmdbApiUrl = process.env.TMDB_API_URL ?? 'https://api.themoviedb.org/3';

export const config = {
  app: { host, port },
  tmdb: { apiUrl: tmdbApiUrl, accessToken: tmdbAccessToken },
};
