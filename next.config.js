/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase*/
const flow = require('lodash.flow');
const withManifest = require('next-manifest');
const withOffline = require('next-offline');
const ContentClient = require('dc-delivery-sdk-js').ContentClient;
const allSettled = require('promise.allsettled');
require('dotenv').config();

const checkForDuplicateSlugs = blogPosts => {
  let seen = new Set();
  let lastSlug;
  const hasDuplicateSlugs = blogPosts.some(post => {
    const isDuplicate = seen.size === seen.add(post.urlSlug).size;
    lastSlug = post.urlSlug;
    return isDuplicate;
  });
  if (hasDuplicateSlugs) {
    throw new Error(`Blog posts contain duplicate urlSlugs: ${lastSlug}`);
  }
};

const buildDynamicBlogPages = blogPosts => {
  return blogPosts.reduce(
    (pages, blogPost) =>
      Object.assign({}, pages, {
        [`/blog/${encodeURIComponent(blogPost.urlSlug.toLowerCase())}`]: {
          page: '/blog',
          query: { blogId: blogPost._meta.deliveryId, slug: blogPost.urlSlug }
        }
      }),
    {}
  );
};

const getBlogList = async () => {
  const dcClientConfig = {
    account: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME || '',
    baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL || ''
  };
  const dcDeliveryClient = new ContentClient(dcClientConfig);
  const { title, subTitle, blogList } = (await dcDeliveryClient.getContentItem(
    process.env.DYNAMIC_CONTENT_REFERENCE_ID
  )).toJSON();

  const promises = blogList.blogPosts.map(async reference =>
    (await dcDeliveryClient.getContentItem(reference.id)).toJSON()
  );
  const promiseResults = await allSettled(promises);
  const rejectedPromises = promiseResults.filter(promise => promise.status === 'rejected');
  rejectedPromises.forEach(rejectedBlog => console.warn(`Warn: ${rejectedBlog.reason}`));
  const hydratedBlogPosts = promiseResults
    .filter(promise => promise.status === 'fulfilled')
    .map(resolvedPromise => resolvedPromise.value);

  return { title, subTitle, blogPosts: hydratedBlogPosts };
};

const exportPathMap = async function() {
  let dynamicPages = {};

  try {
    const blogList = await getBlogList();
    checkForDuplicateSlugs(blogList.blogPosts);
    dynamicPages = buildDynamicBlogPages(blogList.blogPosts);
  } catch (err) {
    console.log('Error building exportPathMap', err);
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
  DYNAMIC_CONTENT_REFERENCE_ID: process.env.DYNAMIC_CONTENT_REFERENCE_ID,
  DYNAMIC_CONTENT_ACCOUNT_NAME: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME,
  DYNAMIC_CONTENT_BASE_URL: process.env.DYNAMIC_CONTENT_BASE_URL
};

const manifest = {
  name: 'Amplience Development',
  short_name: 'Amplience',
  theme_color: '#29333f',
  background_color: '#29333f',
  display: 'standalone',
  orientation: 'portrait',
  Scope: '/',
  start_url: '/',
  cache: true,
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
  exportTrailingSlash: true
});
