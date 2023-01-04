import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { WatchlistPageComponent } from './components/watchlist-page/watchlist-page.component';
import { MovieDetailsPageComponent } from './components/movie-details-page/movie-details-page.component';

const routes: Routes = [
  { path: '', component: OverviewPageComponent },
  { path: 'movie/:id', component: MovieDetailsPageComponent },
  { path: 'watchlist', component: WatchlistPageComponent },
  { path: '*', component: OverviewPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
