/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: movieChore
// ====================================================

export interface movieChore_genres {
  __typename: "Genre";
  id: number;
  name: string;
}

export interface movieChore {
  __typename: "Movie";
  id: string;
  genres: movieChore_genres[];
  originalTitle: string;
  overview: string | null;
  popularity: number;
  posterPath: string | null;
  title: string;
  voteAverage: number;
}
