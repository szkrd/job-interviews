import chalk from 'chalk';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { config } from './modules/config.mjs';
import { log } from './modules/log.mjs';
import { routeGetFavicon } from './routes/getFavicon.mjs';
import { routeGetHealth } from './routes/getHealth.mjs';
import { routeGetMovieById } from './routes/getMovieById.mjs';
import { routeGetMovies } from './routes/getMovies.mjs';
import { routePostLogin } from './routes/postLogin.mjs';

const app = express();
app.use(cors());
app.use(express.json()); // to support JSON-encoded POST bodies

// quick check to see if we have the tmdb auth token
// (and that's not for the v3 url access, but for the auth bearer)
if (config.tmdb.accessToken.length < 128) {
  throw new Error('Invalid or missing tmdb access token!');
}

app.get('/favicon.ico', routeGetFavicon);
app.get('/health', routeGetHealth);
app.get('/movies', routeGetMovies);
app.get('/movie/:id', routeGetMovieById);
app.post('/login', routePostLogin);

// fallback if no other route handler matches the request
app.use((_, res) => {
  res.status(404);
  res.json({ error: 'Not found' });
});

const { host, port } = config.app;
app.listen(port, host, () => {
  const { cyan } = chalk;
  log.info(`Express listening on ${cyan(host)}:${cyan(port)}`);
});
