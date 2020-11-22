/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: mediaChore
// ====================================================

export interface mediaChore_posters {
  __typename: "Image";
  filePath: string;
}

export interface mediaChore {
  __typename: "Movie" | "Show";
  id: string;
  originalTitle: string;
  overview: string | null;
  popularity: number;
  posterPath: string | null;
  title: string;
  voteAverage: number;
  homepage: string | null;
  posters: mediaChore_posters[];
}
