export interface IMovieGenre {
  id: number;
  name: string;
}

export interface IMovieSearchResultItem {
  id: number;
  title: string;
  score: number;
  genres: IMovieGenre[];
  releaseDate: string;
  poster: string;
  posterHigh?: string;
}

export interface AbortablePromise<T> extends Promise<T> {
  abort: () => void;
}
