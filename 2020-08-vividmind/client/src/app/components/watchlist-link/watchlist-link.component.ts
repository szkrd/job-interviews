import { Component } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-watchlist-link',
  templateUrl: './watchlist-link.component.html',
  styleUrls: ['./watchlist-link.component.scss']
})
export class WatchlistLinkComponent {
  count: BehaviorSubject<number>;

  constructor(
    private watchlistService: WatchlistService
  ) {
    this.count = this.watchlistService.count;
  }
}
