// import Head from 'next/head'
import client from '../src/apollo/client';
import Layout from '../src/components/layout/layout';
import { GET_PAGE } from '../src/queries/pages/get-page';
import { handleRedirectsAndReturnData } from '../src/utils/slugs';
export default function Index( { data } ) {
  return (
    <Layout data={data}>
      <h1 className={'text-lg leading-6 font-medium text-gray-900'}>Index</h1>
    </Layout>
  );
}

export async function getStaticProps( context ) {
  const {
    data,
    errors
    // loading, networkStatus
  } = await client.query( {
    query: GET_PAGE,
    variables: {
      uri: '/'
    }
  } );

  const defaultProps = {
    props: {
      data: data || {}
    },
    revalidate: 1
  };

  return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' );
}
