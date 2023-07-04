import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopRatedComponent } from '../top-rated/top-rated.component';
import { DiscoverMoviesComponent } from '../discover-movies/discover-movies.component';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [CommonModule, TopRatedComponent, DiscoverMoviesComponent],
  template: `
    <div class="overview-page-component">
      <h1>Film DB App</h1>
      <app-top-rated></app-top-rated>
      <app-discover-movies></app-discover-movies>
    </div>
  `,
  styles: [],
})
export class OverviewPageComponent {}
