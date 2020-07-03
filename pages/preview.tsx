import React, { ReactElement } from 'react';
import Layout from '../layouts/default';
import Visualization from '../components/visualization/visualization';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const PreviewPage = (): ReactElement => {
  const router = useRouter();
  const stagingEnvironment = router.query.vse ? router.query.vse.toString() : '';
  const contentItemId = router.query.content ? router.query.content.toString() : '';
  return (
    <>
      <NextSeo noindex={true} />
      <Layout contentOnly={false}>
        <Visualization stagingEnvironment={stagingEnvironment} contentItemId={contentItemId} />
      </Layout>
    </>
  );
};

PreviewPage.getInitialProps = () => {
  return {};
};

export default PreviewPage;
