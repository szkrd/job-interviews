import 'dotenv/config';
import { toInt } from './utils.mjs';

const host = process.env.HOST ?? '127.0.0.1';
const port = toInt(process.env.PORT, 8080);
const tmdbAccessToken = process.env.TMDB_ACCESS_TOKEN ?? '';
const jwtSecret = process.env.JWT_SECRET ?? 'very-demo-secret';
const tmdbApiUrl = process.env.TMDB_API_URL ?? 'https://api.themoviedb.org/3';
const wikipediaApiUrl = process.env.WIKIPEDIA_API_URL ?? 'https://en.wikipedia.org/w/api.php';
const logLevel = toInt(process.env.LOG_LEVEL, 3);

export const config = {
  app: { host, port, logLevel, jwtSecret },
  tmdb: { apiUrl: tmdbApiUrl, accessToken: tmdbAccessToken },
  wikipedia: { apiUrl: wikipediaApiUrl },
};
