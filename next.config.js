/* eslint-disable @typescript-eslint/no-var-requires */
const flow = require('lodash.flow');
const withManifest = require('next-manifest');
const withOffline = require('next-offline');
const algoliasearch = require('algoliasearch');
require('dotenv').config();

const exportPathMap = async function () {
  let dynamicPages = {};

  const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_SEARCH_ONLY_KEY);
  const index = client.initIndex(process.env.ALGOLIA_PRODUCTION_INDEX_NAME);

  try {
    const results = await index.search('', {
      attributesToRetrieve: ['objectID', 'deliveryKey'],
      attributesToHighlight: []
    });

    dynamicPages = results.hits.reduce((pages, blogPost) => {
      const slug = blogPost.deliveryKey ? blogPost.deliveryKey.toLowerCase() : blogPost.objectID.toLowerCase();
      return Object.assign({}, pages, {
        [`/blog/${encodeURIComponent(slug)}`]: {
          page: '/blog',
          query: { blogId: blogPost.objectID, slug: slug }
        }
      });
    }, {});
  } catch (err) {
    console.error('Error building exportPathMap', err);
    throw err;
  }

  console.info('\nLoading dynamic pages:');
  Object.keys(dynamicPages).forEach(page => console.info(page));

  return Object.assign({}, dynamicPages, {
    '/': {
      page: '/',
      query: {
        vse: ''
      }
    },
    '/preview': {
      page: '/preview',
      query: {
        content: '',
        vse: ''
      }
    },
    '/visualization.html': {
      page: '/visualization',
      query: {
        vse: '',
        content: ''
      }
    }
  });
};

const env = {
  URL: process.env.URL,
  ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
  ALGOLIA_SEARCH_ONLY_KEY: process.env.ALGOLIA_SEARCH_ONLY_KEY,
  ALGOLIA_PRODUCTION_INDEX_NAME: process.env.ALGOLIA_PRODUCTION_INDEX_NAME,
  DYNAMIC_CONTENT_REFERENCE_ID: process.env.DYNAMIC_CONTENT_REFERENCE_ID,
  DYNAMIC_CONTENT_ACCOUNT_NAME: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME,
  DYNAMIC_CONTENT_BASE_URL: process.env.DYNAMIC_CONTENT_BASE_URL,
  DYNAMIC_CONTENT_SECURE_MEDIA_HOST: process.env.DYNAMIC_CONTENT_SECURE_MEDIA_HOST,
  ROBOTS_META_TAG_NOINDEX: process.env.ROBOTS_META_TAG_NOINDEX
};

const manifest = {
  name: 'Amplience Product Blog',
  short_name: 'Amplience',
  theme_color: '#29333f',
  background_color: '#29333f',
  display: 'standalone',
  orientation: 'portrait',
  Scope: '/',
  start_url: '/',
  cache: true,
  output: './public/static/',
  icons: [
    {
      src: '/static/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-144x144.png',
      sizes: '144x144',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png'
    },
    {
      src: '/static/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ],
  splash_pages: null
};

const plugins = flow([withManifest, withOffline]);

module.exports = plugins({
  env,
  exportPathMap,
  manifest,
  exportTrailingSlash: true,
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /.mp4$/,
        handler: 'NetworkFirst'
      }
    ]
  }
});
