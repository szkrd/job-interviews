import { Routes } from '@angular/router';
import { OverviewPageComponent } from './app/components/overview-page/overview-page.component';
import { MovieDetailsPageComponent } from './app/components/movie-details-page/movie-details-page.component';
import { WatchlistPageComponent } from './app/components/watchlist-page/watchlist-page.component';

export const routes: Routes = [
  { path: '', component: OverviewPageComponent },
  { path: 'movie/:id', component: MovieDetailsPageComponent },
  { path: 'watchlist', component: WatchlistPageComponent },
  { path: '*', component: OverviewPageComponent },
];
