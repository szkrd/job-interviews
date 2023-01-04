import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IDetails } from '../../types/movies';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.scss']
})
export class MovieDetailsPageComponent implements OnInit, OnDestroy {
  id: number;
  title = '';
  routeChangeSubscription: Subscription;
  details$: Observable<IDetails>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.routeChangeSubscription = this.activatedRoute
      .paramMap
      .subscribe(params => {
        const id = this.id = parseInt(params.get('id'), 10) || 0;
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
