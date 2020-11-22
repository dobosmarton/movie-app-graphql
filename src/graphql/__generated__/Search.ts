/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchForType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_search_results_Person {
  __typename: "Person" | "Company";
}

export interface Search_search_results_Movie_posters {
  __typename: "Image";
  filePath: string;
}

export interface Search_search_results_Movie_genres {
  __typename: "Genre";
  id: number;
  name: string;
}

export interface Search_search_results_Movie {
  __typename: "Movie";
  id: string;
  originalTitle: string;
  overview: string | null;
  popularity: number;
  posterPath: string | null;
  title: string;
  voteAverage: number;
  homepage: string | null;
  posters: Search_search_results_Movie_posters[];
  genres: Search_search_results_Movie_genres[];
}

export interface Search_search_results_Show_posters {
  __typename: "Image";
  filePath: string;
}

export interface Search_search_results_Show {
  __typename: "Show";
  id: string;
  originalTitle: string;
  overview: string | null;
  popularity: number;
  posterPath: string | null;
  title: string;
  voteAverage: number;
  homepage: string | null;
  posters: Search_search_results_Show_posters[];
}

export type Search_search_results = Search_search_results_Person | Search_search_results_Movie | Search_search_results_Show;

export interface Search_search {
  __typename: "SearchResponse";
  totalResults: number;
  totalPages: number;
  page: number;
  results: Search_search_results[];
}

export interface Search {
  /**
   * Searches the database for objects matchings the given search query. By
   * default, this will use the multi search api, which search movies, tv shows
   * and people simultaneously. It has an optional `type` argument which can be
   * used to search for a specific object type.
   */
  search: Search_search | null;
}

export interface SearchVariables {
  query: string;
  type?: SearchForType | null;
  page?: number | null;
}
