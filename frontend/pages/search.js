import React, { useState, useEffect } from 'react'
import { GET_MENUS } from '../src/queries/get-menus'
import { PER_PAGE_FIRST } from '../src/utils/pagination'
import Router from 'next/router';
import { isEmpty } from 'lodash';
import client from '../src/apollo/client'
import Header from '../src/components/layout/header'
import Footer from '../src/components/layout/footer'
import LoadMorePosts from '../src/components/news/load-more-posts'
import { handleRedirectsAndReturnData } from '../src/utils/slugs'
import SearchBox from '../src/components/search/search-box'
import ResultInfo from '../src/components/search/result-info'
import ErrorMessage from '../src/components/error'
import Loading from '../src/components/loading'
import { useLazyQuery } from '@apollo/client'
import { GET_SEARCH_RESULTS_WITH_TOTAL_PAGES, GET_SEARCH_RESULTS } from '../src/queries/search/get-search-results'

function Search({ data }) {
  // url-params
  const searchQueryString = process.browser ? (Router?.query?.s ?? '') : '';

  const { header, footer, headerMenus, footerMenus, slug } = data || {}

  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [queryResultPosts, setQueryResultPosts] = useState({});
  const [showResultInfo, setShowResultInfo] = useState(false);

  const [fetchPosts, { loading }] = useLazyQuery(GET_SEARCH_RESULTS_WITH_TOTAL_PAGES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      // console.log(`data?.posts`, data?.posts);
      setQueryResultPosts(data?.posts ?? {});
      setShowResultInfo(true);
    },
    onError: (error) => {
      setSearchError(error?.graphQLErrors ?? '');
    }
  });

  const handleSearchFormSubmit = (event) => {

    event.preventDefault();
    setShowResultInfo(false);

    if (isEmpty(searchQuery)) {
      setSearchError('Please enter text to search');
      setQueryResultPosts({});
      return null;
    }

    setSearchError('');

    fetchPosts({
      variables: {
        first: PER_PAGE_FIRST,
        after: null,
        query: searchQuery
      }
    });
  };

  useEffect(() => {
    /**
     * If the query params is set, set the searchQuery in the in
     * 1. Set the search input value to that query.
     * 2. Call fetchPosts to get the results as per the query string from query params.
     */
    if (searchQueryString) {
      setSearchQuery(searchQueryString);
      fetchPosts({
        variables: {
          first: PER_PAGE_FIRST,
          after: null,
          query: searchQueryString
        }
      });
    }
    // only invoke if set
  }, [searchQueryString]);

  const totalPostResultCount = queryResultPosts?.pageInfo?.offsetPagination?.total;

  return (
    <>
      <Header header={header} headerMenus={headerMenus?.edges ?? []} slug={slug} />
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />
      <ResultInfo showResultInfo={showResultInfo} totalPostResultCount={totalPostResultCount} classnames="mt-4 text-center" />
      <ErrorMessage text={searchError} classes="max-w-xl mx-auto -mt-8" />
      <Loading showSpinner visible={loading} classes="mx-auto text-center -mt-8" />
      <LoadMorePosts
        posts={queryResultPosts}
        classes="md:container px-5 py-12 mx-auto min-h-almost-screen"
        graphQLQuery={GET_SEARCH_RESULTS}
        searchQuery={searchQuery}
      />
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
