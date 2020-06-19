import React from 'react';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';

import SEO from '../next-seo.config';
import RouteChangeLoader from '../components/page-loader/route-change-loader';

export class CustomApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <DefaultSeo {...SEO} />
        <RouteChangeLoader />
        <Component {...pageProps} />
      </>
    );
  }
}

export default CustomApp;
