import { ApolloError, QueryLazyOptions, useLazyQuery } from '@apollo/client';
import React, { createContext, useState, useCallback } from 'react';
import { SEARCH } from '../graphql/queries';
import { Search, SearchVariables, Search_search_results_Movie } from '../graphql/__generated__/Search';
import WikipediaService from '../services/wikipedia';
import { WikipediaPost } from '../types';

type Media = Search_search_results_Movie & { wikipedia: WikipediaPost };

type MediaMap = { [key: string]: Media };

interface Context {
  error: null | ApolloError;
  media: MediaMap;
  selectedMediaId: string | null;
  isLoading: boolean;
  getMedia: (id: string) => Media | null;
  setSelectedMediaId: (mediaId: string) => void;
  fetchMedia: (options?: QueryLazyOptions<SearchVariables>) => void;
  fetchWikipediaPost: (movieId: string, title: string) => void;
}

export const MediaContext = createContext<Context>({
  error: null,
  media: {},
  selectedMediaId: null,
  getMedia: () => null,
  isLoading: false,
  fetchMedia: () => ({}),
  setSelectedMediaId: () => ({}),
  fetchWikipediaPost: () => ({}),
});

export const MediaProvider: React.FC<{}> = ({ children }) => {
  const [media, setMedia] = useState<MediaMap>({});
  const [isLoading, setLoading] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

  const getMedia = (mediaId: string) => media[mediaId];

  const [fetchMedia, { loading, error }] = useLazyQuery<Search, SearchVariables>(SEARCH, {
    onCompleted: ({ search: { results } }) => {
      const media = results.reduce((prev, actual) => {
        if ((actual.__typename === 'Movie' || actual.__typename === 'Show') && actual.posterPath) {
          return { ...prev, [actual.id]: actual };
        }
        return prev;
      }, {});

      setMedia(media);
    },
  });

  const fetchWikipediaPost = async (movieId: string, title: string) => {
    try {
      setLoading(true);

      const postList = await WikipediaService.fetchPost(title);

      setMedia((media) => ({
        ...media,
        [movieId]: { ...media[movieId], wikipedia: postList[0] },
      }));
    } catch (error) {
      console.log('fetchWikipediaPost#error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const _setSelectedMediaId = (mediaId: string) => {
    setSelectedMediaId((id) => (id === mediaId ? null : mediaId));
  };

  return (
    <MediaContext.Provider
      value={{
        selectedMediaId,
        error,
        media,
        getMedia,
        isLoading: isLoading || loading,
        setSelectedMediaId: _setSelectedMediaId,
        fetchMedia,
        fetchWikipediaPost,
      }}>
      {children}
    </MediaContext.Provider>
  );
};
