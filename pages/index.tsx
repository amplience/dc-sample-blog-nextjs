import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { InstantSearchProps } from 'react-instantsearch-dom';
import { findResultsState } from 'react-instantsearch-dom/server';
import { BlogListData } from '../common/interfaces/blog-list.interface';
import getSearchClient from '../common/services/algolia-search-client-factory.service';
import { getBlogListContent } from '../common/services/blog-reference-list.service';
import AlgoliaInstantSearch from '../components/algolia-instant-search/algolia-instant-search';
import HeroBanner from '../components/hero-banner/hero-banner';
import Layout from '../layouts/default';

const Index: NextPage<BlogListData> = ({title, subTitle, searchParams}): JSX.Element => {
  const seoParams: { [key: string]: string | boolean } = {
    title,
    description: subTitle
  };

  if (process.env.ROBOTS_META_TAG_NOINDEX === 'true') {
    seoParams.noindex = true;
  }

  return (
    <Layout>
      <NextSeo {...seoParams} />
      <HeroBanner title={title} subTitle={subTitle} />
      <>
        <AlgoliaInstantSearch {...searchParams}></AlgoliaInstantSearch>
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
  const searchClient = getSearchClient();
  const indexName = process.env.ALGOLIA_PRODUCTION_INDEX_NAME || '';
  const stagingEnvironment = query?.vse ? `//${query.vse.toString()}` : undefined;
  const id: string = process.env.DYNAMIC_CONTENT_REFERENCE_ID || '';

  try {
    const { title, subTitle } = await getBlogListContent(id, stagingEnvironment);
    const resultsState = await findResultsState(AlgoliaInstantSearch, {
      searchClient,
      indexName
    });
    const searchParams: InstantSearchProps = { searchClient, indexName, resultsState };

    return { title, subTitle, searchParams };
  } catch (err) {
    console.error('Unable to get static props for Index:', err);
    throw err;
  }
};

export default Index;
