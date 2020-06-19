import React from 'react';
import Error from 'next/error';
import Layout from '../layouts/default';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo/lib';

interface CustomErrorProps {
  statusCode: number | undefined;
}

const CustomError: NextPage<CustomErrorProps> = ({ statusCode = 404 }: CustomErrorProps) => {
  return (
    <Layout>
      <NextSeo title={`${statusCode} Error`} description={`Error on page with status ${statusCode}`} noindex={true} />
      <section>
        <Error statusCode={statusCode} />
      </section>
      <style jsx>{`
        section :global(> div) {
          height: calc(100vh - 75px) !important;
        }
      `}</style>
    </Layout>
  );
};

CustomError.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
