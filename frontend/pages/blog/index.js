import client from "../../src/apollo/client";
import Layout from "../../src/components/layout/layout";
import { PER_PAGE_FIRST, totalPagesCount } from "../../src/utils/pagination";
// import Pagination from "../../src/components/blog/pagination";
// import Posts from "../../src/components/blog/posts";
import { handleRedirectsAndReturnData } from "../../src/utils/slugs";
import { GET_POSTS } from "../../src/queries/posts/get-posts";

const Blog = ({ data }) => {
  console.log(`data`, data);
  const pagesCount = totalPagesCount(
    data?.posts?.pageInfo?.offsetPagination?.total ?? 0
  );
  return (
    <Layout data={data}>
      <h1>Blog</h1>
      {/* <Posts posts={data?.posts?.edges ?? []} />
      <Pagination pagesCount={pagesCount} postName="blog" /> */}
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const { data, errors } = await client.query({
    query: GET_POSTS,
    variables: {
      uri: "/blog/",
      perPage: PER_PAGE_FIRST,
      offset: null
    }
  });

  const defaultProps = {
    props: {
      data: data || {}
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1
  };

  return handleRedirectsAndReturnData(defaultProps, data, errors, "posts");
}
