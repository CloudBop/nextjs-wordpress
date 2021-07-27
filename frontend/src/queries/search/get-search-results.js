import { gql } from '@apollo/client';
import ImageFragment from '../fragments/image';
import PostFragment from '../fragments/post';

/**
 * Get Search Results. cheaper than below, used for loadmore
 *
 */
export const GET_SEARCH_RESULTS = gql`
 query GET_SEARCH_RESULTS( $first: Int, $after: String, $query: String ) {
  posts: posts(first: $first, after: $after, where: {search: $query}) {
    edges {
      node {
        ...PostFragment
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
 }
 ${ImageFragment}
 ${PostFragment}
 `;

/**
 * Get Search Results with Total Pages (more expensive), this is the initial client query...
 *
 */
export const GET_SEARCH_RESULTS_WITH_TOTAL_PAGES = gql`
 query GET_SEARCH_RESULTS( $first: Int, $after: String, $query: String ) {
  posts: posts(first: $first, after: $after, where: {search: $query}) {
    edges {
      node {
        ...PostFragment
      }
      cursor
    }
    pageInfo {
      offsetPagination {
        total
      }
      hasNextPage
      endCursor
    }
  }
 }
 ${ImageFragment}
 ${PostFragment}
 `;