import { MovieSearchResult } from "../types";

export default class WikipediaService {
  static BASE_URL = ` http://en.wikipedia.org/w/api.php`;

  //api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=Pet_door&explaintext=1&formatversion=2

  static fetchPost = (query: string): Promise<MovieSearchResult> =>
    new Promise((resolve, reject) =>
      fetch(
        `${WikipediaService.BASE_URL}?action=query&prop=extracts&exsentences=10&exlimit=1&titles=${query}&explaintext=1&format=json&formatversion=2&origin=*`
      )
        .then((response) => response.json())
        .then((result) => {
          if (!result.batchcomplete) {
            return reject(new Error("There is no wikipedia post"));
          }

          resolve(result.query.pages);
        })
        .catch(reject)
    );
}
