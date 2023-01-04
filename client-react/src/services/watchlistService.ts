import { BehaviorSubject } from 'rxjs';

class WatchlistService {
  private LS_KEY = 'watchlist';
  #list$ = new BehaviorSubject<number[]>([]);

  // technically if you mess up the list$, the internal implementation
  // will still remain intact (not that it would matter to the rest of
  // the subscribers... the angular version overcomes this by using
  // register listeners, but that's mor complicated)
  public list$ = new BehaviorSubject<number[]>([]);
  public count$ = new BehaviorSubject<number>(0);

  constructor() {
    const stored = localStorage.getItem(this.LS_KEY) || '';
    this.#list$.subscribe(value => {
      this.list$.next(value);
      this.count$.next(value.length);
    });
    this.#list$.next(stored ? stored.split(',').map(n => parseInt(n, 10)) : []);
  }

  addToWatchlist(movieId: number) {
    this.#list$.next(this.#list$.getValue().concat(movieId));
    this.persist();
  }

  removeFromWatchlist(movieId: number) {
    this.#list$.next(this.#list$.getValue().filter(n => n !== movieId));
    this.persist();
  }

  reset() {
    this.#list$.next([]);
    localStorage.removeItem(this.LS_KEY);
  }

  private persist() {
    localStorage.setItem(this.LS_KEY, String(this.#list$.getValue()));
  }
}

const watchlistService = new WatchlistService()
export default watchlistService;
