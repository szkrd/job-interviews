// import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import { config } from './modules/config.mjs';
import { tmdbApi } from './modules/tmdbApi.mjs';
const app = express();

// quick check to see if we have the tmdb auth token (and that's not for the v3 url access)
if (config.tmdb.accessToken.length < 128) {
  throw new Error('Invalid or missing tmdb access token!');
}

// no content for favicons
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

// +---------------------------------+
// | SEARCH MOVIES                   |
// +---------------------------------+
const moviesSearchCache = {};
app.get('/movies', async (req, res, next) => {
  const query = (req.query.query ?? '').trim();
  // invalid query
  if (!query) {
    res.status(400).end();
    return next();
  }
  // if possible, serve the page from the dumb mem cache
  if (moviesSearchCache[query]) {
    console.info(`Sending result from mem cache for query "${query}"`);
    res.send(moviesSearchCache[query]);
    return next();
  }
  let result = {};
  try {
    result = await tmdbApi.search(query);
  } catch (error) {
    res.status(500).send({ error });
    return next();
  }
  moviesSearchCache[query] = result;
  res.send(result);
});

// +---------------------------------+
// | MOVIE DETAILS                   |
// +---------------------------------+
app.get('/movies/:id', async (req, res, next) => {
  const { id } = req.params;
  // invalid movie id
  if (!id || !/^\d+$/.test(id)) {
    res.status(400).end();
    return next();
  }
  // TODO: add wiki description, wiki url, imdb url, tmdb movie info
  res.send({ id, status: 'TODO' });
});

const { host, port } = config.app;
app.listen(port, host, () => {
  const { cyan } = chalk;
  console.info(`Express listening on ${cyan(host)}:${cyan(port)}`);
});
