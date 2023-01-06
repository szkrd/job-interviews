import { AxiosResponse } from 'axios';
import { apiCall } from '../utils/apiCall';
import { AbortablePromise, IMovieSearchResultItem } from './apiModels';

export interface IGetMoviesResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: IMovieSearchResultItem[];
}

export function getMovies(
  query: string
): AbortablePromise<AxiosResponse<IGetMoviesResponse, unknown>> {
  return apiCall.get('/movies', { query });
}
