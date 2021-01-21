import React, { ReactElement } from 'react';
import Layout from '../layouts/default';
import Visualization from '../components/visualization/visualization';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import qs from 'qs';

const PreviewPage = (): ReactElement => {
  const router = useRouter();
  const parsedQueryString = qs.parse(router.asPath.substring(router.asPath.indexOf('?') + 1));
  const stagingEnvironment: string = parsedQueryString.vse as string;
  const contentItemId: string = parsedQueryString.content as string;

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
