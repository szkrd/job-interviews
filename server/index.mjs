// import 'dotenv/config';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import { config } from './modules/config.mjs';
import { log } from './modules/log.mjs';
import { routeGetFavicon } from './routes/getFavicon.mjs';
import { routeGetHealth } from './routes/getHealth.mjs';
import { routeGetMovieById } from './routes/getMovieById.mjs';
import { routeGetMovies } from './routes/getMovies.mjs';

const app = express();
app.use(cors());

// quick check to see if we have the tmdb auth token
// (and that's not for the v3 url access, but for the auth bearer)
if (config.tmdb.accessToken.length < 128) {
  throw new Error('Invalid or missing tmdb access token!');
}

app.get('/favicon.ico', routeGetFavicon);
app.get('/health', routeGetHealth);
app.get('/movies', routeGetMovies);
app.get('/movie/:id', routeGetMovieById);

const { host, port } = config.app;
app.listen(port, host, () => {
  const { cyan } = chalk;
  log.info(`Express listening on ${cyan(host)}:${cyan(port)}`);
});
