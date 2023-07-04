import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLinkComponent } from './home-link/home-link.component';
import { WatchlistLinkComponent } from './watchlist-link/watchlist-link.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, HomeLinkComponent, WatchlistLinkComponent],
  template: `
    <app-home-link />
    <app-watchlist-link />
  `,
  styles: [
    `
      :host {
        height: 22px;
        margin: -5px -10px;
        padding: 0 5px;
        background-color: silver;
        display: flex;
        justify-content: space-between;
        position: fixed;
        min-width: inherit;
        max-width: inherit;
        width: 100%;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class TopBarComponent {}
