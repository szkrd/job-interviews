import { apiCall } from '../utils/apiCall';
import { IMovieGenre } from './getMovies';

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

export interface IMovieCollection {
  id: number;
  name: string;
  poster?: string;
  backdrop?: string;
}

export interface IMovieProductionCOmpany {
  id: number;
  logo?: string;
  name: string;
  country: string;
}

export enum MovieStatus {
  Rumored = 'Rumored',
  Planned = 'Planned',
  InProduction = 'InProduction',
  PostProduction = 'PostProduction',
  Released = 'Released',
  Canceled = 'Canceled',
  Unknown = 'Unknown',
}

export interface IGetMovieByIdDetailedResponse extends IGetMovieByIdResponse {
  adult: boolean;
  budget: number;
  revenue: number;
  genres: IMovieGenre[];
  homepage: string;
  runTime: number;
  status: MovieStatus;
  tagLine: string;
  releaseDate: string;
  video: boolean;
  score: number;
  collection: IMovieCollection[];
  productionCompanies: IMovieProductionCOmpany[];
}

export function getMovieById(id: number | string): Promise<IGetMovieByIdResponse> {
  return apiCall.get(`/movie/${id}`);
}

export function getMovieByIdDetailed(id: number | string): Promise<IGetMovieByIdDetailedResponse> {
  return apiCall.get(`/movie/${id}`, { detailed: '1' });
}
