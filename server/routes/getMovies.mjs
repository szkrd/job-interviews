import { tmdbApi } from '../modules/tmdbApi.mjs';

const TMDB_IMAGE_PATH = 'https://www.themoviedb.org/t/p/w220_and_h330_face';

/**
 * Search for movies with `query`;
 * TODO: add default movie list for no query, instead of status 400
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const routeGetMovies = async (req, res, next) => {
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

  // resolve genre ids into `{ id, name }` objects
  const genreIds = [...new Set(result.results.map((tmdbMovie) => tmdbMovie.genre_ids).flat())];
  const genres = new Map();
  for (let idx = 0; idx < genreIds.length; idx++) {
    const name = await tmdbApi.getGenreName(genreIds[idx]);
    genres.set(genreIds[idx], { id: genreIds[idx], name });
  }

  // cherrypick some props
  result.results = result.results.map((tmdbMovie) => ({
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    score: tmdbMovie.vote_average * 10,
    genres: (tmdbMovie.genre_ids ?? []).map((gId) => genres.get(gId) ?? { id: gId, name: '' }),
    releaseDate: tmdbMovie.release_date,
    poster: `${TMDB_IMAGE_PATH}/${tmdbMovie.poster_path}`,
  }));

  res.send(result);
};
