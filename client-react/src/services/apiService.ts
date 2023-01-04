import { ICredits } from '../../../client/src/app/types/people';
import { from, Observable } from 'rxjs';
import { IDetails, IDiscovery, IReview, ITopRated } from '../../../client/src/app/types/movies';
import { map, mergeMap } from 'rxjs/operators';
import { call, getUrl } from '../utils/ajax';

class ApiService {
  // for cast and crew
  getMovieCredits(movieId: number) {
    return call.get<ICredits>(getUrl(`/movie/${movieId}/credits`));
  }

  // for discover movies
  discoverMovie(page = 1) {
    return call.get<ITopRated[]>(getUrl('/discover/movie', {
      sort_by: 'release_date.desc',
      'release_date.lte': (new Date()).toISOString().substr(0, 10),
      page: '' + page
    })).pipe(map((data: any) => data.results));
  }

  // for details
  getMovieDetails(movieId: number): Observable<IDetails> {
    return call.get(getUrl(`/movie/${movieId}`));
  }

  // for watchlist (one by one, to decrease load on the server)
  getMovieDetailsOneByOne(movieIds: number[], max = 20, page = 0): Observable<IDetails> {
    const CONCURRENT_CALLS = 3;
    const ids = movieIds.length > max ? movieIds.slice(page * max, page * max + max) : movieIds;
    const urls = ids.map(id => getUrl(`/movie/${id}`));
    return from(urls).pipe(
      mergeMap(call.get, CONCURRENT_CALLS)
    ) as Observable<IDetails>;
  }

  // for reviews
  getMovieReviews(movieId: number) {
    return call.get<IReview[]>(getUrl(`/movie/${movieId}/reviews`))
      .pipe(map((data: any) => data.results));
  }

  // for top rated
  getTopRatedMovies() {
    const MAX_ITEMS = 10;
    return call.get<IDiscovery[]>(getUrl('/movie/top_rated'))
      .pipe(map((data: any) => data.results.slice(0, MAX_ITEMS)));
  }
}

const apiService = new ApiService();
export default apiService;
