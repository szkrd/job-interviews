import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

export const config = {
  port: parseInt(process.env.PORT, 10) || 5050,
  delay: parseInt(process.env.DELAY, 10) || 0,
  tmdb: {
    apiUrl: process.env.TMDB_API_URL || 'https://api.themoviedb.org/3',
    token: process.env.TMDB_ACCESS_TOKEN,
    prefix: process.env.TMDB_API_PREFIX || '/tmdb',
  },
};
