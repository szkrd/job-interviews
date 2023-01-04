import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private LS_KEY = 'watchlist';
  private list: number[] = [];

  // or just use a behaviour subject with one big array...
  // or use a proper store with proper access control, but we have NO TIME FOR THAT
  private idsAdded: ReplaySubject<number> = new ReplaySubject();
  private idsRemoved: ReplaySubject<number> = new ReplaySubject();
  count = new BehaviorSubject<number>(0);

  constructor() {
    this.idsAdded.subscribe(() => this.count.next(this.count.value + 1));
    this.idsRemoved.subscribe(() => this.count.next(this.count.value - 1));
    const stored = localStorage.getItem(this.LS_KEY) || '';
    this.list = stored ? stored.split(',').map(n => parseInt(n, 10)) : [];
    this.list.forEach(n => this.idsAdded.next(n));
  }

  registerListener(movieId: number, onChange: (isAdded: boolean) => void) {
    const subscriptions = [
      this.idsAdded.subscribe(id => { if (id === movieId) { onChange(true); }}),
      this.idsRemoved.subscribe(id => { if (id === movieId) { onChange(false); }})
    ];
    return () => subscriptions.forEach(sub => sub.unsubscribe());
  }

  addToWatchlist(movieId: number) {
    this.idsAdded.next(movieId);
    this.list = this.list.concat(movieId);
    this.persist();
  }

  removeFromWatchlist(movieId: number) {
    this.idsRemoved.next(movieId);
    this.list = this.list.filter(n => n !== movieId);
    this.persist();
  }

  reset() {
    this.count.next(this.list.length = 0);
    localStorage.removeItem(this.LS_KEY);
  }

  private persist() {
    localStorage.setItem(this.LS_KEY, String(this.list));
  }
}
