import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICredits } from '../../types/people';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cast-and-crew',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cast-and-crew-component">
      <div *ngIf="credit$ | async as credits">
        <h2>Cast</h2>
        <ul>
          <li *ngFor="let member of credits.cast?.slice(0, maxShown)">
            <p>
              <strong>{{ member.character || 'unspecified' }}</strong> - {{ member.name }}
            </p>
          </li>
        </ul>
        <p *ngIf="credits.cast!.length > maxShown && maxShown !== -1">
          <button (click)="maxShown = -1">Show all {{ credits.cast?.length }}</button>
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class CastAndCrewComponent implements OnInit {
  maxShown = 5;
  credit$!: Observable<ICredits>;
  @Input() movieId = -1;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.credit$ = this.api.getMovieCredits(this.movieId);
  }
}
