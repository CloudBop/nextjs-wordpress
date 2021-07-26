import React from 'react'
import { GET_MENUS } from '../src/queries/get-menus'
import client from '../src/apollo/client'
import Header from '../src/components/layout/header'
import Footer from '../src/components/layout/footer'
import { handleRedirectsAndReturnData } from '../src/utils/slugs'
import SearchBox from '../src/components/search/search-box'
function Search({ data }) {
  const { header, footer, headerMenus, footerMenus, slug } = data || {}
  return (
    <>
      <Header header={header} headerMenus={headerMenus?.edges ?? []} slug={slug} />
      <SearchBox />
      <Footer footer={footer} footerMenus={footerMenus?.edges ?? []} />
    </>
  )
}

export default Search

export async function getStaticProps() {
  const { data, errors } = await client.query({
    query: GET_MENUS
  })

  const defaultProps = {
    props: {
      data: {
        ...data, slug: 'search'
      },
      // seconds
      revalidate: 1
    }
  }
  return handleRedirectsAndReturnData(defaultProps, data, errors, 'headerMenus');
}
