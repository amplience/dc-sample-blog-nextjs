import React from 'react';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import RouteChangeLoader from '../components/page-loader/route-change-loader';
import Head from 'next/head';

export class CustomApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <DefaultSeo {...SEO} />
        <RouteChangeLoader />
        <Component {...pageProps} />
      </>
    );
  }
}

export default CustomApp;
