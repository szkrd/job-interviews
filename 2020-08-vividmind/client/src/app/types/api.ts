import { IDiscovery, IReview, ITopRated } from './movies';

export interface IApiResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: any[];
}

export interface IDiscoveryResponse extends IApiResponse {
  results: IDiscovery[];
}

export interface ITopRatedResponse extends IApiResponse {
  results: ITopRated[];
}

export interface IReviewResponse extends IApiResponse {
  results: IReview[];
}
