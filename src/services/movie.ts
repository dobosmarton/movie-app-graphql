import { MovieSearchResult } from "../types";

export default class OMBDService {
  static API_KEY = "df69bc7f";
  static BASE_URL = `http://www.omdbapi.com/`;

  static fetchMovie = (query: string): Promise<MovieSearchResult> =>
    new Promise((resolve, reject) =>
      fetch(`${OMBDService.BASE_URL}?s=${query}&apikey=${OMBDService.API_KEY}`)
        .then((resp) => resp)
        .then((resp) => resp.json())
        .then((result) => {
          if (result.Error) {
            return reject(new Error(result.Error));
          }
          resolve(result);
        })
        .catch(reject)
    );

  static fetchMovieDetails = (movieId: string): Promise<any> =>
    new Promise((resolve, reject) =>
      fetch(
        `${OMBDService.BASE_URL}?i=${movieId}&apikey=${OMBDService.API_KEY}`
      )
        .then((resp) => resp)
        .then((resp) => resp.json())
        .then((result) => {
          if (result.Error) {
            return reject(new Error(result.Error));
          }
          resolve(result);
        })
        .catch(reject)
    );
}
