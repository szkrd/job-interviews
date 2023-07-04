import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddToWatchlistComponent } from '../add-to-watchlist/add-to-watchlist.component';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { ITopRated } from '../../types/movies';

type TMoviePage = Observable<ITopRated[]>;

@Component({
  selector: 'app-discover-movies',
  standalone: true,
  imports: [CommonModule, RouterLink, AddToWatchlistComponent],
  template: `
    <div class="discover-movies-component">
      <h2>Discover movies</h2>
      <ul>
        <li *ngFor="let moviePage$ of moviePages" class="page">
          <ul>
            <li *ngFor="let movie of moviePage$ | async" class="row">
              <a [routerLink]="['/movie', movie.id]">
                {{ movie.release_date }}
                {{ movie.title }}
              </a>
              <app-add-to-watchlist [movieId]="movie.id!" [movieName]="movie.title!" />
            </li>
          </ul>
        </li>
        <li>
          <button (click)="onShowMoreClick()">Show more</button>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      ul,
      li {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .page {
        list-style: none;
        padding: 5px;
      }

      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
        margin: 5px;
        border-radius: 5px;

        a {
          display: block;
          padding: 5px;
        }
      }
    `,
  ],
})
export class DiscoverMoviesComponent implements OnInit {
  moviePages: TMoviePage[] = [];
  page = 1;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.download();
  }

  download() {
    this.moviePages.push(this.api.getDiscoverableMovies(this.page));
  }

  onShowMoreClick = () => {
    this.page++;
    this.download();
  };
}
