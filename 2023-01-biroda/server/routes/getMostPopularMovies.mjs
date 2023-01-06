import { tmdbApi } from '../modules/tmdbApi.mjs';

const TMDB_IMAGE_PATH = 'https://www.themoviedb.org/t/p/w45';

export const routeGetMostPopularMovies = async (req, res, next) => {
  let result = {};
  try {
    result = await tmdbApi.discoverMovie({ sort_by: 'popularity.desc' });
  } catch (error) {
    res.status(500).send({ error: String(error) });
    return next();
  }

  // TODO DRY

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
    poster: tmdbMovie.poster_path ? `${TMDB_IMAGE_PATH}/${tmdbMovie.poster_path}` : '',
  }));

  // return with proper camelCase
  res.send({
    page: result.page,
    results: result.results,
    totalPages: result.total_pages,
    totalResults: result.total_results,
  });
};
