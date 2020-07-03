import React, { ReactElement } from 'react';
import Layout from '../layouts/default';
import Visualization from '../components/visualization/visualization';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo/lib';

const VisualizationPage = (): ReactElement => {
  const router = useRouter();
  const stagingEnvironment = router.query.vse ? router.query.vse.toString() : '';
  const contentItemId = router.query.content ? router.query.content.toString() : '';
  return (
    <>
      <NextSeo noindex={true} />
      <Layout contentOnly={true}>
        <Visualization stagingEnvironment={stagingEnvironment} contentItemId={contentItemId} />
      </Layout>
    </>
  );
};

VisualizationPage.getInitialProps = () => {
  return {};
};

export default VisualizationPage;
