import { AxiosResponse } from 'axios';
import { apiCall } from '../utils/apiCall';

export interface IMovieGenre {
  id: number;
  name: string;
}

export interface IMovieSearchResultItem {
  id: number;
  title: string;
  score: number;
  genres: IMovieGenre[];
  releaseDate: string;
  poster: string;
}

export interface IGetMoviesResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: IMovieSearchResultItem[];
}

export function getMovies(query: string): Promise<AxiosResponse<IGetMoviesResponse, unknown>> {
  return apiCall.get('/movies', { query });
}
