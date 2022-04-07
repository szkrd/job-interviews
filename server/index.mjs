// import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { config } from './modules/config.mjs';
import { tmdbApi } from './modules/tmdbApi.mjs';
import { wikipediaApi } from './modules/wikipediaApi.mjs';

const app = express();
app.use(cors());

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
app.get('/movies', async (req, res, next) => {
  const query = (req.query.query ?? '').trim();
  // invalid query
  if (!query) {
    res.status(400).end();
    return next();
  }
  let result = {};
  try {
    result = await tmdbApi.search(query);
  } catch (error) {
    res.status(500).send({ error });
    return next();
  }
  const genreIds = [...new Set(result.results.map((tmdbMovie) => tmdbMovie.genre_ids).flat())];
  const genres = new Map();
  for (let idx = 0; idx < genreIds.length; idx++) {
    const name = await tmdbApi.getGenreName(genreIds[idx]);
    genres.set(genreIds[idx], { id: genreIds[idx], name });
  }
  result.results = result.results.map((tmdbMovie) => ({
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    score: tmdbMovie.vote_average * 10,
    genres: (tmdbMovie.genre_ids ?? []).map((gId) => genres.get(gId) ?? { id: gId, name: '' }),
    releaseDate: tmdbMovie.release_date,
    poster: `https://www.themoviedb.org/t/p/w220_and_h330_face/${tmdbMovie.poster_path}`,
  }));
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
  let wiki = {};
  console.info(`Searching wikipedia for the movie "${title}" from the year ${releaseYear}...`);
  try {
    wiki = await wikipediaApi.searchForMovie(title, releaseYear);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, source: 'wikipedia' });
    return next();
  }
  let overviewSource = 'none';
  if (wiki.firstParagraph || wiki.teaserSnippet) {
    overviewSource = 'wikipedia';
  } else if (movie.overview) {
    overviewSource = 'tmdb';
  }
  res.send({
    id: movie.id,
    title,
    overview: wiki.firstParagraph || wiki.teaserSnippet || movie.overview || '',
    overviewSource,
    wikipediaUrl: wiki.canonicalUrl || '',
    imdbUrl: movie.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}/` : '',
  });
});

const { host, port } = config.app;
app.listen(port, host, () => {
  const { cyan } = chalk;
  console.info(`Express listening on ${cyan(host)}:${cyan(port)}`);
});
