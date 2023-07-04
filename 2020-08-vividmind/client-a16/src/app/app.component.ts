import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WatchlistLinkComponent } from './components/top-bar/watchlist-link/watchlist-link.component';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { HomeLinkComponent } from './components/top-bar/home-link/home-link.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-component">
      <app-top-bar />
      <app-error-notification />
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host,
      .app-component {
        display: block;
        min-height: 100vh;
      }
      .app-component {
        position: relative;
        padding: 5px 10px 10px 10px;
        min-width: 320px;
        max-width: 1000px;
        margin: 0 auto;
        background-color: #fff;
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.2);
      }
    `,
  ],
  imports: [
    RouterOutlet,
    WatchlistLinkComponent,
    ErrorNotificationComponent,
    HomeLinkComponent,
    TopBarComponent,
  ],
  standalone: true,
})
export class AppComponent {
  title = 'vivid-entry-client-a16';
}
