import { WikipediaPost } from '../types';

export default class WikipediaService {
  static BASE_URL = ` https://en.wikipedia.org/w/api.php`;

  static fetchPost = (query: string): Promise<WikipediaPost[]> =>
    new Promise((resolve, reject) =>
      fetch(
        `${WikipediaService.BASE_URL}?action=query&prop=extracts&exsentences=10&exintro=true&exlimit=1&titles=${query}&explaintext=1&format=json&formatversion=2&origin=*`
      )
        .then((response) => response.json())
        .then((result) => {
          if (!result.batchcomplete) {
            return reject(new Error('There is no wikipedia post'));
          }

          resolve(result.query.pages);
        })
        .catch(reject)
    );
}
