import { BehaviorSubject, combineLatest } from 'rxjs';
import { IDetails } from '../../../client/src/app/types/movies';
import watchlistService from './watchlistService';
import { map, switchMap } from 'rxjs/operators';
import apiService from './apiService';

// we have to handle _our_ state outside the component, otherwise a rerender would wipe out
// these observables (or the buffer); also note that if we tried to do this _inside_ the component,
// then state dependencies would be really hard to control
class WatchlistPageService {
  MAX_ITEMS = 5;
  private offset$ = new BehaviorSubject(0);
  private detailsList: IDetails[] = [];

  increaseOffset() {
    watchlistPageService.offset$.next(watchlistPageService.offset$.getValue() + 1);
  }

  // on teardown let's reset the internal state
  reset = () => {
    this.offset$.next(0);
    this.detailsList = [];
  };

  // when the list or the offset changes and we have subscribers (the watchlist page component)
  downloadWatchlistDetails = () =>
    combineLatest(watchlistService.list$, this.offset$).pipe(
      switchMap(([list, offset]) =>
        apiService.getMovieDetailsOneByOne(list, this.MAX_ITEMS, offset)),
      map((result: IDetails) => {
        this.detailsList = this.detailsList.concat(result);
        return this.detailsList;
      })
    );
}

const watchlistPageService = new WatchlistPageService();
export default watchlistPageService;
