import { AxiosResponse } from 'axios';
import { apiCall } from '../utils/apiCall';
import { AbortablePromise } from './apiModels';

export interface IGetMovieByIdResponse {
  id: number;
  title: string;
  overview: string;
  overviewSource: string;
  wikipediaUrl?: string;
  imdbUrl: string;
}

export function getMovieById(
  id: number | string
): AbortablePromise<AxiosResponse<IGetMovieByIdResponse, unknown>> {
  return apiCall.get(`/movie/${id}`);
}
