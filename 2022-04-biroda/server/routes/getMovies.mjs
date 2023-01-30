import { tmdbApi } from '../modules/tmdbApi.mjs';
import { getGenreColor } from '../modules/utils.mjs';

const TMDB_IMAGE_PATH = 'https://www.themoviedb.org/t/p/w45';
const TMDB_IMAGE_PATH_HI = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
const MAX_QUERY_LENGTH = 128;

/**
 * Search for movies with `query`;
 * If no query present, then it will return the most popular movies.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const routeGetMovies = async (req, res, next) => {
  const query = (req.query.query ?? '').trim();
  const mostPopular = !query;
  let action = 'search';

  if (query && query.length > MAX_QUERY_LENGTH) {
    res.status(400).send({ error: 'Invalid query.' });
    return next();
  }

  let result = {};
  try {
    if (mostPopular) {
      result = await tmdbApi.discover({ sort_by: 'popularity.desc' });
      action = 'discover';
    } else {
      result = await tmdbApi.search(query);
    }
  } catch (error) {
    res.status(500).send({ error: String(error) });
    return next();
  }

  // resolve genre ids into `{ id, name }` objects
  const genreIds = [...new Set(result.results.map((tmdbMovie) => tmdbMovie.genre_ids).flat())];
  const genres = new Map();
  for (let idx = 0; idx < genreIds.length; idx++) {
    const name = await tmdbApi.getGenreName(genreIds[idx]);
    genres.set(genreIds[idx], { id: genreIds[idx], name, color: getGenreColor(name) });
  }

  // cherrypick some props
  result.results = result.results.map((tmdbMovie) => ({
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    score: tmdbMovie.vote_average * 10,
    genres: (tmdbMovie.genre_ids ?? []).map(
      (gId) => genres.get(gId) ?? { id: gId, name: '', color: getGenreColor() }
    ),
    releaseDate: tmdbMovie.release_date,
    poster: tmdbMovie.poster_path ? `${TMDB_IMAGE_PATH}/${tmdbMovie.poster_path}` : '',
    posterHigh: tmdbMovie.poster_path ? `${TMDB_IMAGE_PATH_HI}/${tmdbMovie.poster_path}` : '',
  }));

  // return with proper camelCase
  res.send({
    action,
    page: result.page,
    results: result.results,
    totalPages: result.total_pages,
    totalResults: result.total_results,
  });
};
