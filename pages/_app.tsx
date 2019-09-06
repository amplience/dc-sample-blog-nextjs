import App, { Container } from 'next/app';
import React from 'react';
import { DefaultSeo } from 'next-seo';

import SEO from '../next-seo.config';
import PageLoader from '../components/page-loader/page-loader';

export class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <DefaultSeo {...SEO} />
        <PageLoader />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default CustomApp;
