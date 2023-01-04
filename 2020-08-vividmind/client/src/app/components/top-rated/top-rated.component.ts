import { Component, OnInit } from '@angular/core';
import { IDiscovery } from '../../types/movies';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

// unfortunately top rated can NOT be sorted by release date
@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {
  MAX_ITEMS = 10;
  movies$: Observable<IDiscovery[]>;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    this.movies$ = this.api.getTopRatedMovies(this.MAX_ITEMS);
  }
}
