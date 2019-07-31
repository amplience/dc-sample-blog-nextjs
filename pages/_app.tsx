import App, { Container } from 'next/app';
import React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { DefaultSeo } from 'next-seo';

import SEO from '../next-seo.config';

interface InitialPropsConfig {
  Component: NextComponentType;
  ctx: NextPageContext;
}

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }: InitialPropsConfig) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Container>
    );
  }
}
