import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-add-to-watchlist',
  templateUrl: './add-to-watchlist.component.html',
  styleUrls: ['./add-to-watchlist.component.scss']
})
export class AddToWatchlistComponent implements OnInit, OnDestroy {
  @Input() movieId: number;
  unregisterListener: () => void;
  isAdded = false;

  constructor(
    private watchlistService: WatchlistService
  ) { }

  ngOnInit() {
    this.unregisterListener = this.watchlistService
      .registerListener(this.movieId, (state) => this.isAdded = state);
  }

  ngOnDestroy() {
    this.unregisterListener();
  }

  onClick = () => {
    if (this.isAdded) {
      this.watchlistService.removeFromWatchlist(this.movieId);
    } else {
      this.watchlistService.addToWatchlist(this.movieId);
    }
  }
}
