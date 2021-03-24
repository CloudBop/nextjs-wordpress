// import Head from 'next/head'
import client from "../src/apollo/client";
import Layout from "../src/components/layout/layout";
import { GET_MENUS } from "../src/queries/get-menus";
export default function Index({ data }) {
  console.log(`data`, data);
  return (
    <Layout data={data}>
      <h1 className={"text-lg leading-6 font-medium text-gray-900"}>Index</h1>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { data, loading, networkStatus } = await client.query({
    query: GET_MENUS
  });

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
    revalidate: 1
  };
}
