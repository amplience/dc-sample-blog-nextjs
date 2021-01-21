import algoliasearch from 'algoliasearch';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Router, { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { SearchState } from 'react-instantsearch-core';
import { Configure, InstantSearch, ScrollTo } from 'react-instantsearch-dom';
import { findResultsState } from 'react-instantsearch-dom/server';
import useSWR from 'swr';
import { Blog } from '../common/interfaces/blog.interface';
import getBlogContentItem from '../common/services/get-blog-content-item.service';
import HeaderFacetBar from '../components/header-facet-bar/header-facet-bar';
import HeaderSearchBox from '../components/header-search-box/header-search-box';
import HeroBanner from '../components/hero-banner/hero-banner';
import SearchResultList from '../components/search-result-list/search-result-list';
import SearchResultPagination from '../components/search-result-pagination/search-result-pagination';
import Layout from '../layouts/default';

interface IndexProps extends Blog {
  buildTimeResultState: unknown;
}

const sanitizeStateParams = (state: SearchState) => {
  const acceptedKeys = ['page', 'query', 'sortBy', 'menu', 'vse'];
  return Object.keys(state).reduce((r: SearchState, s) => {
    if (acceptedKeys.includes(s)) {
      r[s] = state[s];
    }
    return r;
  }, {});
};

const createURL = (state: SearchState): string => `?${qs.stringify(sanitizeStateParams(state))}`;

const urlToSearchState = (path: string): SearchState =>
  path.includes('?') ? sanitizeStateParams(qs.parse(path.substring(path.indexOf('?') + 1))) : {};

const searchStateToUrl = (searchState: SearchState): string => {
  return searchState ? `${window.location.pathname}?${qs.stringify(sanitizeStateParams(searchState))}` : '';
};

const getPaginatedSuffix = (page = 0): string => page > 1 ? ` - Page ${page}` : '';

const Index: NextPage<IndexProps> = ({ title, heading, searchPlaceHolder, buildTimeResultState }): JSX.Element => {
  const router = useRouter();
  // only use builtTimeResultState server-side
  const [resultState, setResultState] = useState(typeof window === 'object' ? null : buildTimeResultState);
  const [searchState, setSearchState] = useState(urlToSearchState(router.asPath));

  const suffix = getPaginatedSuffix(searchState.page);
  const seoParams: { [key: string]: string | boolean } = {
    title: `${title}${suffix}`,
    description: `${heading}${suffix}`
  };

  if (process.env.ROBOTS_META_TAG_NOINDEX === 'true') {
    seoParams.noindex = true;
  }

  const searchClient = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID as string,
    process.env.SEARCH_API_KEY as string
  );

  useSWR('index', async () => {
    const { data: resultState } = await findResultsState(InstantSearch, {
      searchClient,
      indexName: process.env.SEARCH_INDEX_NAME_PRODUCTION as string,
      searchState
    });
    setResultState(resultState);
  });

  const onSearchStateChange = (updatedSearchState: SearchState) => {
    const searchStateUrl = searchStateToUrl(updatedSearchState);
    Router.push(searchStateUrl, searchStateUrl, { shallow: true });
  };

  useEffect(() => {
    setSearchState(urlToSearchState(router.asPath));
  }, [router.asPath]);

  return (
    <Layout>
      <NextSeo {...seoParams} />
      <InstantSearch
        indexName={process.env.SEARCH_INDEX_NAME_PRODUCTION as string}
        searchClient={searchClient}
        resultsState={resultState}
        createURL={createURL}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <Configure hitsPerPage={process.env.HITS_PER_PAGE} clickAnalytics />
        <ScrollTo scrollOn="page" />
        <ScrollTo scrollOn="menu" />
        <HeroBanner heading={heading}>
          <HeaderSearchBox placeholderText={searchPlaceHolder} />
          <HeaderFacetBar
            authors={process.env.AUTHORS_FACET_FIELD as string}
            tags={process.env.TAGS_FACET_FIELD as string}
          />
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
    process.env.SEARCH_API_KEY as string
  );

  try {
    const blog = await getBlogContentItem(process.env.DYNAMIC_CONTENT_DELIVERY_KEY as string);
    const buildTimeResultState = await findResultsState(InstantSearch, {
      searchClient,
      indexName: process.env.SEARCH_INDEX_NAME_PRODUCTION as string
    });

    return { ...blog, buildTimeResultState };
  } catch (err) {
    console.error('Unable to get static props for Index:', err);
    throw err;
  }
};

export default Index;
