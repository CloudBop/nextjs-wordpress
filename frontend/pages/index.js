// import Head from 'next/head'
import client from "../src/apollo/client";
import { GET_MENUS } from "../src/queries/get-menus";
export default function Index({ menus }) {
  console.log(`menus`, menus);
  return (
    <div>
      <h1 className={"text-lg leading-6 font-medium text-gray-900"}>Index</h1>
    </div>
  );
}

export async function getStaticProps(context) {
  const { data, loading, networkStatus } = await client.query({
    query: GET_MENUS
  });

  return {
    props: {
      menus: {
        headerMenus: data?.headerMenus?.edges,
        footerMenus: data?.footerMenus?.edges
      }
    }
  };
}
