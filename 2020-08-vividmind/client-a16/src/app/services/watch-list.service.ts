import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

export interface IWatchlistItem {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private LS_KEY = 'watchlist';
  list: IWatchlistItem[] = [];

  // a proper store would help of course, but this is kept as simple as possible
  private itemAdded: ReplaySubject<number> = new ReplaySubject();
  private itemRemoved: ReplaySubject<number> = new ReplaySubject();
  count = new BehaviorSubject(0);

  constructor() {
    this.itemAdded.subscribe(() => this.count.next(this.count.value + 1));
    this.itemRemoved.subscribe(() => this.count.next(this.count.value - 1));
    const stored = localStorage.getItem(this.LS_KEY) || '';
    this.list = stored ? JSON.parse(stored) : [];
    this.list.forEach((item) => this.itemAdded.next(item.id));
  }

  registerListener(movieId: number, onChange: (isAdded: boolean) => void) {
    const subscriptions = [
      this.itemAdded.subscribe((id) => {
        if (id === movieId) {
          onChange(true);
        }
      }),
      this.itemRemoved.subscribe((id) => {
        if (id === movieId) {
          onChange(false);
        }
      }),
    ];
    return () => subscriptions.forEach((sub) => sub.unsubscribe());
  }

  addToWatchlist(id: number, title: string) {
    this.itemAdded.next(id);
    this.list = this.list.concat({ id, title });
    this.persist();
  }

  removeFromWatchlist(id: number) {
    this.itemRemoved.next(id);
    this.list = this.list.filter((item) => item.id !== id);
    this.persist();
  }

  reset() {
    this.list.length = 0;
    this.count.next(0);
    localStorage.removeItem(this.LS_KEY);
  }

  private persist() {
    localStorage.setItem(this.LS_KEY, JSON.stringify(this.list));
  }
}
