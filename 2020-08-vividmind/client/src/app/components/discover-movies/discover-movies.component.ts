import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITopRated } from '../../types/movies';
import { ApiService } from '../../services/api.service';

type TMoviePage = Observable<ITopRated[]>;

@Component({
  selector: 'app-discover-movies',
  templateUrl: './discover-movies.component.html',
  styleUrls: ['./discover-movies.component.scss']
})
export class DiscoverMoviesComponent implements OnInit {
  moviePages: TMoviePage[] = [];
  page = 1;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.download();
  }

  download() {
    this.moviePages.push(this.api.getDiscoverableMovies(this.page));
  }

  onShowMoreClick = () => {
    this.page++;
    this.download();
  }
}
