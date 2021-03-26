import { gql } from "@apollo/client";
import { PRE_RENDER_PAGES_COUNT } from "../../utils/slugs";

/**
 * Get pages.
 *
 */
export const GET_PAGES_URI = gql`
  query GET_PAGES_URI {
    # limit number of pre-rendered pages
    pages: pages(first: ${PRE_RENDER_PAGES_COUNT}) {
      nodes {
        id
        uri
      }
    }
  }
`;
