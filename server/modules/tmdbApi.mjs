import got from 'got';
import { config } from './config.mjs';

const headers = {
  Authorization: `Bearer ${config.tmdb.accessToken}`,
  'Content-Type': 'application/json;charset=utf-8',
};

// Search for movies.
function search(query = '') {
  return got(`${config.tmdb.apiUrl}/search/movie`, { headers, searchParams: { query } }).json();
}

// Get the primary information about a movie.
function getDetails(id = 0) {
  return got(`${config.tmdb.apiUrl}/movie/${id}`, { headers }).json();
}

export const tmdbApi = { search, getDetails };
