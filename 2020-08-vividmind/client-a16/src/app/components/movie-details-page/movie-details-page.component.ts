import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { IDetails } from '../../types/movies';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CastAndCrewComponent } from '../cast-and-crew/cast-and-crew.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { ForNumberPipe } from '../../pipes/for-number.pipe';
import { AddToWatchlistComponent } from '../add-to-watchlist/add-to-watchlist.component';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  imports: [
    CommonModule,
    CastAndCrewComponent,
    ReviewsComponent,
    ForNumberPipe,
    AddToWatchlistComponent,
  ],
  template: `
    <div class="movie-details-page-component">
      <div *ngIf="details$ | async as details">
        <h1>{{ details.title }}</h1>
        <aside>{{ details.overview }}</aside>
        <app-add-to-watchlist [movieId]="details.id!" [movieName]="details.title!" />
        <p *ngIf="details.vote_count! > 0">
          <strong>Score:</strong>
          <span *ngFor="let i of details.vote_average | forNumber">⭐</span>
          <span>10 / {{ details.vote_average }}</span>
        </p>
      </div>
      <div *ngIf="id">
        <app-cast-and-crew [movieId]="id"></app-cast-and-crew>
        <app-reviews [movieId]="id"></app-reviews>
      </div>
    </div>
  `,
  styles: [
    `
      h1 {
        margin: 0;
        padding: 30px 0 20px 0;
      }
      aside {
        padding-bottom: 10px;
      }
    `,
  ],
})
export class MovieDetailsPageComponent implements OnInit, OnDestroy {
  id!: number;
  title = '';
  routeChangeSubscription!: Subscription;
  details$!: Observable<IDetails>;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.routeChangeSubscription = this.activatedRoute.paramMap.subscribe((params) => {
      const urlId = params.get('id') || '0';
      const id = (this.id = parseInt(urlId, 10) || 0);
      this.title = `#${id}`;
      if (this.id) {
        this.getDetails();
      }
    });
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
  }

  getDetails() {
    this.details$ = this.api.getMovieDetails(this.id);
  }
}
