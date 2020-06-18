import algoliasearch, { SearchClient } from 'algoliasearch';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { findResultsState } from 'react-instantsearch-dom/server';
import { BlogListData } from '../common/interfaces/blog-list.interface';
import { getBlogListContent } from '../common/services/blog-reference-list.service';
import AlgoliaInstantSearch from '../components/algolia-instant-search/algolia-instant-search';
import SearchResultList from '../components/algolia-search-result-list/algolia-search-result-list';
import HeroBanner from '../components/hero-banner/hero-banner';
import Layout from '../layouts/default';
import { string } from 'yargs';

interface AlgoliaSearchParams {appId: string; searchKey: string; indexName: string;}

function getSearchParams(): AlgoliaSearchParams {
  const { ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_ONLY_KEY , ALGOLIA_PRODUCTION_INDEX_NAME} = process.env;
  const indexName = ALGOLIA_PRODUCTION_INDEX_NAME || '';

  if (!ALGOLIA_APPLICATION_ID) {
    throw new Error('Invalid configuration params, missing ALGOLIA_APPLICATION_ID');
  }

  if (!ALGOLIA_SEARCH_ONLY_KEY) {
    throw new Error('Invalid configuration params, missing ALGOLIA_SEARCH_ONLY_KEY');
  }

  return {appId: ALGOLIA_APPLICATION_ID, searchKey: ALGOLIA_SEARCH_ONLY_KEY, indexName}
}

const Index: NextPage<BlogListData> = ({title, subTitle, indexName, resultsState}): JSX.Element => {
  const {appId, searchKey} = getSearchParams();
  const seoParams: { [key: string]: string | boolean } = {
    title,
    description: subTitle
  };

  if (process.env.ROBOTS_META_TAG_NOINDEX === 'true') {
    seoParams.noindex = true;
  }

  const searchParams = {
    appId,
    searchKey,
    indexName,
    resultsState
  }

  return (
    <Layout>
      <NextSeo {...seoParams} />
      <HeroBanner title={title} subTitle={subTitle} />
      <>
      <AlgoliaInstantSearch {...searchParams} />
      </>

      <style jsx>{`
        :global(footer) {
          margin-top: 120px;
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async (query?: GetServerSideProps): Promise<BlogListData> => {
  const {appId, searchKey, indexName } = getSearchParams();
  const searchClient = algoliasearch(appId, searchKey);

  const stagingEnvironment = query?.vse ? `//${query.vse.toString()}` : undefined;
  const id: string = process.env.DYNAMIC_CONTENT_REFERENCE_ID || '';

  try {
    const { title, subTitle } = await getBlogListContent(id, stagingEnvironment);
    const resultsState = await findResultsState(AlgoliaInstantSearch, {
      searchClient,
      indexName
    });

    return { title, subTitle, indexName, resultsState };
  } catch (err) {
    console.error('Unable to get static props for Index:', err);
    throw err;
  }
};

export default Index;
