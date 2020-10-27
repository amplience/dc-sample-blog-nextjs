/* eslint-disable @typescript-eslint/no-var-requires */
const sitemap = require('nextjs-sitemap-generator');
require('dotenv').config();

sitemap({
  baseUrl: process.env.URL,
  pagesDirectory: 'out/',
  targetDirectory: 'out/',
  ignoredExtensions: ['js', 'map'],
  ignoredPaths: ['static', 'preview', '404', '_next', 'visualization', 'sitemap', 'robots'],
  ignoreIndexFiles: true
});
