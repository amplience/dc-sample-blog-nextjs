import Document, { Html, Head, Main, NextScript } from 'next/document';
import Manifest from 'next-manifest/manifest';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Manifest />
          <link rel="icon" href="/static/favicon.ico"></link>
          <link rel="apple-touch-icon" href="/static/icons/icon-192x192.png"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
