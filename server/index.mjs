// import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import { config } from './modules/config.mjs';
import { tmdbApi } from './modules/tmdbApi.mjs';
import { wikipediaApi } from './modules/wikipediaApi.mjs';
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
  let movie = {};
  try {
    movie = await tmdbApi.getDetails(id);
  } catch (error) {
    res.status(500).send({ error, source: 'tmdb' });
    return next();
  }
  const title = movie.title;
  const releaseYear = movie.release_date.split(/-/)[0];
  let wikiSearchResult = {};
  console.info(`Searching wikipedia for the movie "${title}" from the year ${releaseYear}...`);
  try {
    wikiSearchResult = await wikipediaApi.searchForMovie(title, releaseYear);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, source: 'wikipedia' });
    return next();
  }
  // TODO: add wiki description, wiki url, imdb url, tmdb movie info
  res.send({
    status: 'TODO',
    wikiSearchResult,
    id: movie.id,
    title,
    tmdbOverview: movie.overview,
    imdbUrl: movie.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}/` : '',
  });
});

const { host, port } = config.app;
app.listen(port, host, () => {
  const { cyan } = chalk;
  console.info(`Express listening on ${cyan(host)}:${cyan(port)}`);
});
