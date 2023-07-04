import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { WatchlistService } from '../../../services/watch-list.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-watchlist-link',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="watchlist-link-component" routerLinkActive="active">
      <a href="#" routerLink="/watchlist">
        My watchlist
        <span *ngIf="count | async">({{ count | async }})</span>
      </a>
    </div>
  `,
  styles: [
    `
      .active {
        display: none;
      }
      a {
        color: black;
      }
    `,
  ],
})
export class WatchlistLinkComponent {
  count: BehaviorSubject<number>;

  constructor(private watchlistService: WatchlistService) {
    this.count = this.watchlistService.count;
  }
}
