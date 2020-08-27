type MovieResult = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export type MovieSearchResult = {
  totalResults: number;
  Response: string;
  Error?: string;
  Search?: MovieResult[];
};

export type WikipediaPost = {
  extract: string;
};

export interface Movie extends MovieResult {
  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Country?: string;
  DVD?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;
  Production?: string;
  Rated?: string;
  Released?: string;
  Response?: string;
  Runtime?: string;
  Website?: string;
  Writer?: string;
  imdbRating?: string;
  imdbVotes?: string;
  wikipedia?: WikipediaPost;
}
