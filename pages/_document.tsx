import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#fffff" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="icon" href="/static/favicon.ico"></link>
          <link rel="apple-touch-icon" href="/static/icons/icon-192x192.png"></link>
          <link rel="preconnect" href="https://www.google-analytics.com"></link>
          <link rel="preconnect" href="https://i1.adis.ws"></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
