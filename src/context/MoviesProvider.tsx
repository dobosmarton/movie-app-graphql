import React, { createContext, useState, useCallback } from "react";
import OMDBService from "../services/movie";
import WikipediaService from "../services/wikipedia";
import { Movie, MovieSearchResult } from "../types";

type MoviesMap = { [key: string]: Movie };

interface Context {
  movies: MoviesMap;
  isLoading: boolean;
  fetchError: boolean;
  getMovie: (id: string) => Movie | null;
  fetchMovies: (query: string) => void;
  fetchMovieDetails: (movieId: string) => void;
  fetchWikipediaPost: (movieId: string, title: string) => void;
}

export const MoviesContext = createContext<Context>({
  movies: {},
  getMovie: () => null,
  isLoading: false,
  fetchError: false,
  fetchMovies: () => ({}),
  fetchMovieDetails: () => ({}),
  fetchWikipediaPost: () => ({}),
});

export const MoviesProvider: React.FC<{}> = ({ children }) => {
  const [movies, setMovies] = useState({});
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const getMovie = useCallback((movieId) => movies[movieId], [movies]);

  const fetchMovies = useCallback(
    async (query) => {
      try {
        setLoading(true);
        const response = await OMDBService.fetchMovie(query);

        const movies: MoviesMap = {};
        (response.Search || []).map((movie) => {
          movies[movie.imdbID] = movie;
        });
        setMovies(movies);
        setFetchError(false);
      } catch (error) {
        console.log("fetchMovie#error", error.message);
        setMovies({});
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    },
    [setFetchError]
  );

  const fetchMovieDetails = useCallback(async (movieId) => {
    try {
      setLoading(true);
      const response = await OMDBService.fetchMovieDetails(movieId);

      setMovies((movies) => ({ ...movies, [movieId]: response }));
    } catch (error) {
      console.log("fetchMovieDetails#error", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWikipediaPost = useCallback(async (movieId, title) => {
    try {
      setLoading(true);
      const postList = await WikipediaService.fetchPost(title);

      setMovies((movies) => ({
        ...movies,
        [movieId]: { ...movies[movieId], wikipedia: postList[0] },
      }));
    } catch (error) {
      console.log("fetchWikipediaPost#error", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        getMovie,
        isLoading,
        fetchError,
        fetchMovies,
        fetchMovieDetails,
        fetchWikipediaPost,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
