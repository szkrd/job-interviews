import { Component } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.scss']
})
export class WatchlistPageComponent {
  constructor(
    private watchlistService: WatchlistService
  ) {}

  onClearWatchlistClick() {
    this.watchlistService.reset();
  }
}
