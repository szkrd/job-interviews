import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWatchlistItem, WatchlistService } from '../../services/watch-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>My watchlist</h1>
    <p *ngIf="movies.length === 0">Your watchlist is empty.</p>
    <ol>
      <li *ngFor="let movie of movies">
        <a [routerLink]="['/movie', movie.id]">
          {{ movie.title }}
        </a>
      </li>
    </ol>
    <p *ngIf="movies.length > 0">
      <button (click)="onClearWatchlistClick()">Clear my watchlist</button>
    </p>
  `,
  styles: [
    `
      h1 {
        margin: 0;
        padding: 30px 0 20px 0;
      }
    `,
  ],
})
export class WatchlistPageComponent implements OnInit, OnDestroy {
  // current static snapshot is fine, since the user
  // can't add an item to the list from this page
  movies: IWatchlistItem[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit() {
    this.movies = this.watchlistService.list.slice();
  }

  onClearWatchlistClick() {
    this.watchlistService.reset();
    this.movies.length = 0;
  }

  ngOnDestroy() {
    this.movies.length = 0;
  }
}
