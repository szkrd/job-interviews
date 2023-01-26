import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

export const config = {
  port: parseInt(process.env.PORT, 10) || 5050,
  delay: parseInt(process.env.DELAY, 10) || 0,
  activeProxies: String(process.env.ACTIVE_PROXIES || 'tmdb,owm,github').split(','),
  tmdb: {
    apiUrl: process.env.TMDB_API_URL || 'https://api.themoviedb.org',
    token: process.env.TMDB_ACCESS_TOKEN,
    prefix: process.env.TMDB_API_PREFIX || '/tmdb',
  },
  owm: {
    apiUrl: process.env.OWM_API_URL || 'https://api.openweathermap.org',
    token: process.env.OWM_ACCESS_TOKEN,
    prefix: process.env.OWM_API_PREFIX || '/owm',
  },
  github: {
    apiUrl: process.env.GITHUB_API_URL || 'https://api.github.com',
    token: process.env.GITHUB_ACCESS_TOKEN,
    prefix: process.env.GITHUB_API_PREFIX || '/github',
  },
};
