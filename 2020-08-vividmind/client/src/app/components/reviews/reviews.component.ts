import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview } from '../../types/movies';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews$: Observable<IReview[]>;
  @Input() movieId: number;

  constructor(
    public api: ApiService
  ) {}

  ngOnInit(): void {
    this.reviews$ = this.api.getReviews(this.movieId);
  }
}
