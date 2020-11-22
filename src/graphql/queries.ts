import { gql } from '@apollo/client';

const FRAGMENT_MEDIA_CHORE = gql`
  fragment mediaChore on Media {
    id
    originalTitle
    overview
    popularity
    posterPath
    title
    voteAverage
    homepage
    posters {
      filePath
    }
  }
`;

export const SEARCH = gql`
  query Search($query: String!, $type: SearchForType, $page: Int) {
    search(query: $query, type: $type, page: $page) {
      totalResults
      totalPages
      page
      results {
        ... on Media {
          ...mediaChore
        }
        ... on Movie {
          genres {
            id
            name
          }
        }
      }
    }
  }
  ${FRAGMENT_MEDIA_CHORE}
`;
