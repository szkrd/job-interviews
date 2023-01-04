import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredits } from '../../types/people';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cast-and-crew',
  templateUrl: './cast-and-crew.component.html',
  styleUrls: ['./cast-and-crew.component.scss']
})
export class CastAndCrewComponent implements OnInit {
  maxShown = 10;
  credit$: Observable<ICredits>;
  @Input() movieId: number;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.credit$ = this.api.getMovieCredits(this.movieId);
  }
}
