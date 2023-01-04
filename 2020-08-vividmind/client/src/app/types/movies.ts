export interface IDiscovery {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export interface ITopRated {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export interface IReview {
  id?: string;
  author?: string;
  content?: string;
  url?: string;
}

// partial
export interface IDetails {
  id?: number;
  title?: string;
  runtime?: number;
  popularity?: number;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
}
