import { AxiosResponse } from 'axios';
import { apiCall } from '../utils/apiCall';
import { AbortablePromise } from './apiModels';
import { IGetMoviesResponse } from './getMovies';

export function getMostPopularMovies(): AbortablePromise<
  AxiosResponse<IGetMoviesResponse, unknown>
> {
  return apiCall.get('/movies/most-popular');
}
