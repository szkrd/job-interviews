import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IDiscovery } from '../../types/movies';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="top-rated-component">
      <h2>Top movies of all time</h2>
      <ul>
        <li *ngFor="let movie of movies$ | async">
          <a [routerLink]="['/movie', movie.id]">
            {{ movie.title }}
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [],
})
export class TopRatedComponent implements OnInit {
  movies$: Observable<IDiscovery[]> = new Observable<IDiscovery[]>();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.movies$ = this.api.getTopRatedMovies();
  }
}
