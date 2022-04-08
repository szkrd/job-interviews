import { log } from '../modules/log.mjs';
import { tmdbApi } from '../modules/tmdbApi.mjs';
import { wikipediaApi } from '../modules/wikipediaApi.mjs';

/**
 * Get movie data (from Wikipedia and TMDB)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const routeGetMoviesById = async (req, res, next) => {
  const { id } = req.params;

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
    log.error('xxx' + error);
    res.status(500).send({ error: String(error), source: 'wikipedia' });
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
};
