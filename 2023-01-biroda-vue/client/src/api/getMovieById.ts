import { AxiosResponse } from 'axios';
import { apiCall } from '../utils/apiCall';

export interface IGetMovieByIdResponse {
  id: number;
  title: string;
  overview: string;
  overviewSource: string;
  poster?: string;
  backdrop?: string;
  wikipediaUrl?: string;
  imdbUrl: string;
}

export function getMovieById(
  id: number | string
): Promise<AxiosResponse<IGetMovieByIdResponse, unknown>> {
  return apiCall.get(`/movie/${id}`);
}
