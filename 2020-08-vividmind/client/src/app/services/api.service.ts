import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { IDiscoveryResponse, IReviewResponse, ITopRatedResponse } from '../types/api';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { IDetails, IDiscovery, IReview, ITopRated } from '../types/movies';
import { ICredits } from '../types/people';

export interface IHttpError {
  status: number;
  url: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpErrors$ = new ReplaySubject<IHttpError>();

  constructor(
    private http: HttpClient
  ) {}

  getTopRatedMovies(maxItems = 20): Observable<IDiscovery[]> {
    return this.http.get(this.url('/movie/top_rated'))
      .pipe(this.handleError('Could not download top movies'))
      .pipe(map((data: IDiscoveryResponse) => data.results.slice(0, maxItems)));
  }

  getDiscoverableMovies(page = 1): Observable<ITopRated[]> {
    return this.http.get(this.url('/discover/movie', {
      sort_by: 'release_date.desc',
      'release_date.lte': (new Date()).toISOString().substr(0, 10),
      page: '' + page
    }))
      .pipe(this.handleError('Could not download discoverable movies.'))
      .pipe(map((data: ITopRatedResponse) => data.results));
  }

  getReviews(movieId: number): Observable<IReview[]> {
    return this.http.get(this.url(`/movie/${movieId}/reviews`))
      .pipe(this.handleError('Could not download the reviews.'))
      .pipe(map((data: IReviewResponse) => data.results));
  }

  getMovieDetails(movieId: number): Observable<IDetails> {
    return this.http.get(this.url(`/movie/${movieId}`))
      .pipe(this.handleError('Could not download the details of this movie.'));
  }

  getMovieCredits(movieId: number): Observable<ICredits> {
    return this.http.get(this.url(`/movie/${movieId}/credits`))
      .pipe(this.handleError('Could not download the credits for this movie.'));
  }

  private handleError = (message) => catchError((err: HttpErrorResponse) => {
    const { status, url } = err;
    this.httpErrors$.next({ status, url, message });
    return throwError(err);
  })

  private url(pathName: string, queryParams?: Record<string, string>) {
    const qs: string = queryParams ? new URLSearchParams(queryParams).toString() : '';
    return env.apiUrl + pathName + (qs ? `?${qs}` : '');
  }
}
