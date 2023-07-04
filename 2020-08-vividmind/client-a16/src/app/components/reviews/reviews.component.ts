import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IReview } from '../../types/movies';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { TextEllipsisPipe } from '../../pipes/text-ellipsis.pipe';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, TextEllipsisPipe],
  template: `
    <div class="reviews-component">
      <h2>Reviews</h2>
      <p *ngIf="reviews$">This movie has no reviews yet.</p>
      <ul>
        <li *ngFor="let review of reviews$ | async">
          <h3>
            {{ review.author }}
          </h3>
          <p>
            {{ review.content | textEllipsis : [500] }}
            <a href="{{ review.url }}" *ngIf="review.url" target="_blank" title="Read all">🔗</a>
          </p>
        </li>
      </ul>
    </div>
  `,
  styles: [],
})
export class ReviewsComponent implements OnInit {
  reviews$!: Observable<IReview[]>;
  @Input() movieId = -1;

  constructor(public api: ApiService) {}

  ngOnInit(): void {
    this.reviews$ = this.api.getReviews(this.movieId);
  }
}
