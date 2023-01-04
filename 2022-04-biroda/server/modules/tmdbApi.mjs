import got from 'got';
import { config } from './config.mjs';
import { log } from './log.mjs';
import { clone } from './utils.mjs';

const headers = {
  Authorization: `Bearer ${config.tmdb.accessToken}`,
  'Content-Type': 'application/json;charset=utf-8',
};

/**
 * Search for movies, will cache found results
 * in memory (but without cache busting).
 * TODO: add pagination support?!
 */
const foundMovies = {};
function search(query = '') {
  if (foundMovies[query]) {
    return Promise.resolve(clone(foundMovies[query]));
  }
  return got(`${config.tmdb.apiUrl}/search/movie`, { headers, searchParams: { query } })
    .json()
    .then((result) => {
      if (!foundMovies[query]) {
        foundMovies[query] = clone(result); // do NOT reuse the cached got object
      }
      return result;
    });
}

/**
 * Get every genre
 */
function getMovieGenres() {
  return got(`${config.tmdb.apiUrl}/genre/movie/list`, { headers }).json();
}

/**
 * Get name of a genre, will cache found results,
 * but it's rather dumb so repeated (but new) missing ids
 * can bomb the server, please don't do that.
 */
let genres = [];
const alreadyTriedIds = [];
async function getGenreName(id = 0) {
  const hasName = genres.find((item) => item.id === id);
  if (genres.length === 0 || (!hasName && !alreadyTriedIds.includes(id))) {
    alreadyTriedIds.push(id);
    try {
      const result = await getMovieGenres();
      genres = result.genres;
    } catch (error) {
      log.error('Could not download genres!', error);
      return '';
    }
  }
  const genre = genres.find((genre) => genre.id === id);
  return genre ? genre.name : '';
}

/**
 * Get the primary information about a movie.
 */
function getDetails(id = 0) {
  return got(`${config.tmdb.apiUrl}/movie/${id}`, { headers }).json();
}

export const tmdbApi = { search, getDetails, getGenreName };
