import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../services/watch-list.service';

@Component({
  selector: 'app-add-to-watchlist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="add-to-watchlist">
      <button (click)="onClick()">
        {{ isAdded ? 'Remove from watchlist' : 'Add to watchlist' }}
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class AddToWatchlistComponent implements OnInit, OnDestroy {
  @Input({ required: true }) movieId = -1;
  @Input({ required: true }) movieName = '';
  unregisterListener!: () => void;
  isAdded = false;

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit() {
    this.unregisterListener = this.watchlistService.registerListener(
      this.movieId,
      (state) => (this.isAdded = state)
    );
    // (re)initialize with the proper value (since now we can clear the list from the watchlist page)
    this.isAdded = this.watchlistService.list.map((item) => item.id).includes(this.movieId);
  }

  ngOnDestroy() {
    this.unregisterListener();
  }

  onClick = () => {
    if (this.isAdded) {
      this.watchlistService.removeFromWatchlist(this.movieId);
    } else {
      this.watchlistService.addToWatchlist(this.movieId, this.movieName);
    }
  };
}
