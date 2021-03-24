import client from "../src/apollo/client";
import { GET_PAGES_URI, GET_PAGE } from "../src/queries/pages/get-pages";
import { useRouter } from "next/router";
import Layout from "../src/components/layout/layout";
function Pages({ data }) {
  const router = useRouter();

  // if page not generated@build then fallback as it will need to load while getStaticProps() is running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  //
  return <Layout>{router?.query?.slug.join("/")}</Layout>;
}
export default Pages;

export async function getStaticProps({ params }) {
  // params is
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join("/")
    }
  });

  // const defaultProps =
  return {
    props: {
      data: {
        header: data?.header || [],
        menus: {
          headerMenus: data?.headerMenus?.edges || [],
          footerMenus: data?.footerMenus?.edges || []
        },
        footer: data?.footer || []
      }
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1
  };

  // return handleRedirectsAndReturnData(defaultProps, data, errors, "page");
}
/**
 * Since the page name uses catch-all routes,
 * for example [...slug],
 * that's why params would contain slug which is an array.
 * For example, If we need to have dynamic route '/foo/bar'
 * Then we would add paths: [ params: { slug: ['foo', 'bar'] } } ]
 * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_PAGES_URI
  });

  const pathsData = [];

  data?.pages?.nodes &&
    data?.pages?.nodes.map(page => {
      if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
        // dont return falsy values
        const slugs = page?.uri?.split("/").filter(pageSlug => pageSlug);
        pathsData.push({ params: { slug: slugs } });
      }
    });

  return {
    // at build
    paths: pathsData,
    // generate if exists on request - don't 404
    fallback: FALLBACK
  };
}
