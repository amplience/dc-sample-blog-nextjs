import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { findResultsState } from 'react-instantsearch-dom/server';
import qs from 'qs';
import getBlogContentItem from '../common/services/get-blog-content-item.service';
import HeroBanner from '../components/hero-banner/hero-banner';
import Layout from '../layouts/default';
import useSWR from 'swr';
import { Blog } from '../common/interfaces/blog.interface';
import { InstantSearch, Configure, ScrollTo } from 'react-instantsearch-dom';
import { SearchState } from 'react-instantsearch-core';
import SearchResultList from '../components/search-result-list/search-result-list';
import HeaderSearchBox from '../components/header-search-box/header-search-box';
import SearchResultPagination from '../components/search-result-pagination/search-result-pagination';

interface IndexProps extends Blog {
  buildTimeResultState: unknown;
}

const sanitiseStateParams = (state: SearchState) => {
  const acceptedKeys = ['page', 'query', 'sortBy'];
  return Object.keys(state).reduce((r: SearchState, s) => {
    if (acceptedKeys.includes(s)) {
      r[s] = state[s];
    }
    return r;
  }, {});
};

const createURL = (state: SearchState): string => `?${qs.stringify(sanitiseStateParams(state))}`;

const urlToSearchState = (path: string): SearchState =>
  path.includes('?') ? sanitiseStateParams(qs.parse(path.substring(path.indexOf('?') + 1))) : {};

const searchStateToUrl = (searchState: SearchState): string => {
  return searchState ? `${window.location.pathname}?${qs.stringify(sanitiseStateParams(searchState))}` : '';
};

const DEBOUNCE_TIME = 500;

const Index: NextPage<IndexProps> = ({ title, heading, searchPlaceHolder, buildTimeResultState }): JSX.Element => {
  const router = useRouter();
  const [searchState, setSearchState] = useState(urlToSearchState(router.asPath));
  const [debouncedSetState, setDebouncedSetState] = useState(0);
  const seoParams: { [key: string]: string | boolean } = {
    title,
    description: heading
  };

  if (process.env.ROBOTS_META_TAG_NOINDEX === 'true') {
    seoParams.noindex = true;
  }

  const searchClient = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID as string,
    process.env.ALGOLIA_API_KEY as string
  );
  const { data: runtimeResultState } = useSWR('index', () =>
    findResultsState(InstantSearch, {
      searchClient,
      indexName: process.env.ALGOLIA_PRODUCTION_INDEX_NAME as string,
      searchState
    })
  );
  const onSearchStateChange = (updatedSearchState: SearchState) => {
    const searchStateUrl = searchStateToUrl(updatedSearchState);
    clearTimeout(debouncedSetState);
    setDebouncedSetState(
      window.setTimeout(() => {
        Router.push(searchStateUrl, searchStateUrl, { shallow: true });
      }, DEBOUNCE_TIME)
    );
    setSearchState(updatedSearchState);
  };

  useEffect(() => {
    setSearchState(urlToSearchState(router.asPath));
  }, [router.asPath]);

  return (
    <Layout>
      <NextSeo {...seoParams} />
      <InstantSearch
        indexName={process.env.ALGOLIA_PRODUCTION_INDEX_NAME as string}
        searchClient={searchClient}
        resultsState={runtimeResultState || buildTimeResultState}
        createURL={createURL}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <Configure hitsPerPage={10} />
        <ScrollTo scrollOn="page" />
        <HeroBanner heading={heading}>
          <HeaderSearchBox placeholderText={searchPlaceHolder} />
        </HeroBanner>
        <SearchResultList></SearchResultList>
        <SearchResultPagination />
      </InstantSearch>

      <style jsx>
        {`
          :global(footer) {
            margin-top: 120px;
          }
        `}
      </style>
    </Layout>
  );
};

Index.getInitialProps = async (): Promise<IndexProps> => {
  const searchClient = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID as string,
    process.env.ALGOLIA_API_KEY as string
  );
  try {
    const blog = await getBlogContentItem(process.env.DYNAMIC_CONTENT_BLOG_LIST_DELIVERY_KEY as string);
    const buildTimeResultState = await findResultsState(InstantSearch, {
      searchClient,
      indexName: process.env.ALGOLIA_PRODUCTION_INDEX_NAME as string
    });

    return { ...blog, buildTimeResultState };
  } catch (err) {
    console.error('Unable to get static props for Index:', err);
    throw err;
  }
};

export default Index;
