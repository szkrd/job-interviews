import { log } from '../modules/log.mjs';
import { tmdbApi } from '../modules/tmdbApi.mjs';
import { wikipediaApi } from '../modules/wikipediaApi.mjs';

const TMDB_IMAGE_PATH_LARGE = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';

function getImagePath(path = '') {
  if (path && typeof path === 'string') {
    return TMDB_IMAGE_PATH_LARGE + path;
  }
  return '';
}

/**
 * Get movie data (from Wikipedia and TMDB)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const routeGetMovieById = async (req, res, next) => {
  const { id } = req.params;
  const detailed = ['1', 'true'].includes(req.query.detailed);

  // invalid movie id, bail out with 400
  if (!id || !/^\d+$/.test(id)) {
    res.status(400).send({ error: 'Invalid id.' });
    return next();
  }

  // first let's get the tmdb details, if we can't that's a show stopper
  let movie = {};
  try {
    movie = await tmdbApi.getDetails(id);
  } catch (error) {
    const message = String(error);
    let status = 500;
    // at this point it's much easier to parse the got message than to dig into its error
    if (message.endsWith('(Not Found)')) status = 404;
    res.status(status).send({ error: message, source: 'tmdb' });
    return next();
  }

  // get wikipedia data (url and overview)
  const title = movie.title;
  const releaseYear = movie.release_date.split(/-/)[0];
  let wiki = {};
  log.info(`Searching wikipedia for the movie "${title}" from the year ${releaseYear}...`);
  try {
    wiki = await wikipediaApi.searchForMovie(title, releaseYear);
  } catch (error) {
    log.error('Wikipedia search failed', error);
    res.status(500).send({ error: String(error), source: 'wikipedia' });
    return next();
  }
  let overviewSource = 'none';
  if (wiki.firstParagraph || wiki.teaserSnippet) {
    overviewSource = 'wikipedia';
  } else if (movie.overview) {
    overviewSource = 'tmdb';
  }

  let details = {};
  if (detailed) {
    details = {
      adult: movie.adult ?? false,
      budget: movie.budget ?? -1,
      revenue: movie.revenue ?? -1,
      genres: movie.genres || [],
      homepage: movie.homepage || '',
      runTime: movie.runtime ?? -1,
      status: movie.status, // Rumored, Planned, In Production, Post Production, Released, Canceled
      tagLine: movie.tagLine || '',
      video: movie.video ?? false,
      score: movie.vote_average * 10,
    };
    if (movie.belongs_to_collection) {
      const data = movie.belongs_to_collection;
      details.collection = {
        id: data.id,
        name: data.name,
        poster: getImagePath(data.poster_path),
        backdrop: getImagePath(data.backdrop_path),
      };
    }
    if (movie.production_companies) {
      details.productionCompanies = movie.production_companies.map((company) => ({
        id: company.id,
        logo: getImagePath(company.logo),
        name: company.name,
        country: company.originCountry,
      }));
    }
  }

  res.send({
    ...details,
    id: movie.id,
    title,
    releaseDate: movie.release_date || '',
    poster: getImagePath(movie.poster_path),
    backdrop: getImagePath(movie.backdrop_path),
    overview: wiki.firstParagraph || wiki.teaserSnippet || movie.overview || '',
    overviewSource,
    wikipediaUrl: wiki.canonicalUrl || '',
    imdbUrl: movie.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}/` : '',
  });
};
