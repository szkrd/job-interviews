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

  // get wikipedia data (url and overview)
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
};
