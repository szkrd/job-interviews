import { environment as env } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IDetails, IDiscovery, IReview, ITopRated } from '../types/movies';
import { IDiscoveryResponse, IReviewResponse, ITopRatedResponse } from '../types/api';
import { ICredits } from '../types/people';

export interface IHttpError {
  status: number;
  url: string | null;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpErrors$ = new ReplaySubject<IHttpError>();

  constructor(private http: HttpClient) {}

  getTopRatedMovies(maxItems = 10) {
    return this.http.get(this.url('/movie/top_rated')).pipe(
      this.handleError('Could not download top movies') as any,
      map((data: IDiscoveryResponse) => data.results.slice(0, maxItems))
    ) as Observable<IDiscovery[]>;
  }

  getDiscoverableMovies(page = 1) {
    return this.http
      .get(
        this.url('/discover/movie', {
          sort_by: 'release_date.desc',
          'release_date.lte': new Date().toISOString().substring(0, 10),
          page: '' + page,
        })
      )
      .pipe(
        this.handleError('Could not download discoverable movies.'),
        map((data: ITopRatedResponse) => data.results) as any
      ) as Observable<ITopRated[]>;
  }

  getReviews(movieId: number): Observable<IReview[]> {
    return this.http
      .get(this.url(`/movie/${movieId}/reviews`))
      .pipe(
        this.handleError('Could not download the reviews.'),
        map((data: IReviewResponse) => data.results) as any
      ) as Observable<IReview[]>;
  }

  getMovieDetails(movieId: number): Observable<IDetails> {
    return this.http
      .get<IDetails>(this.url(`/movie/${movieId}`))
      .pipe(
        this.handleError('Could not download the details of this movie.')
      ) as Observable<IDetails>;
  }

  getMovieCredits(movieId: number): Observable<ICredits> {
    return this.http
      .get(this.url(`/movie/${movieId}/credits`))
      .pipe(
        this.handleError('Could not download the credits for this movie.')
      ) as Observable<ICredits>;
  }

  /**
   * Adds an error message to httpErrors$,
   * then breaks the observable chain (which will never emit a proper value).
   * This is a rather simple way of handling errors, having proper fetch states
   * like uninitialized/loading/success/failure would require something robust.
   */
  private handleError = (message: string) =>
    catchError((err: HttpErrorResponse) => {
      const { status, url } = err;
      this.httpErrors$.next({ status, url, message });
      // this is slightly better than `throw err`, because we will get a somewhat usable stack trace
      throw new Error(err.message);
    });

  private url(pathName: string, queryParams?: Record<string, string>) {
    const qs: string = queryParams ? new URLSearchParams(queryParams).toString() : '';
    return env.apiUrl + pathName + (qs ? `?${qs}` : '');
  }
}
