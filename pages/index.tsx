import React from 'react';
import algoliasearch from 'algoliasearch';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { findResultsState } from 'react-instantsearch-dom/server';
import getBlogContentItem from '../common/services/get-blog-content-item.service';
import HeroBanner from '../components/hero-banner/hero-banner';
import Layout from '../layouts/default';
import useSWR from 'swr';
import { Blog } from '../common/interfaces/blog.interface';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import SearchResultList from '../components/search-result-list/search-result-list';
import HeaderSearchBox from '../components/header-search-box/header-search-box';
import SearchResultPagination from '../components/search-result-pagination/search-result-pagination';

interface IndexProps extends Blog {
  buildTimeResultState: unknown;
}

const Index: NextPage<IndexProps> = ({ title, heading, searchPlaceHolder, buildTimeResultState }): JSX.Element => {
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
      indexName: process.env.ALGOLIA_PRODUCTION_INDEX_NAME as string
    })
  );

  return (
    <Layout>
      <NextSeo {...seoParams} />
      <InstantSearch
        indexName={process.env.ALGOLIA_PRODUCTION_INDEX_NAME as string}
        searchClient={searchClient}
        resultsState={runtimeResultState || buildTimeResultState}
      >
        <Configure hitsPerPage={10} />
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

Index.getInitialProps = async ({ query }): Promise<IndexProps> => {
  const searchClient = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID as string,
    process.env.ALGOLIA_API_KEY as string
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const stagingEnvironment = query?.vse ? `//${query.vse.toString()}` : undefined;

  try {
    const blog = await getBlogContentItem(
      process.env.DYNAMIC_CONTENT_BLOG_LIST_DELIVERY_KEY as string,
      stagingEnvironment
    );
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
