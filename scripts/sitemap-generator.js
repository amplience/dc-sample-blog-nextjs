/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, writeFileSync } = require('fs');
const sitemap = require('nextjs-sitemap-generator');
const { resolve } = require('path');
require('dotenv').config();

if (!process.env.URL) {
  console.error('URL env var must be set');
  return;
}

process.env.SITEMAP_GENERATOR = true;

sitemap({
  baseUrl: process.env.URL,
  nextConfigPath: __dirname + '/../next.config.js',
  pagesDirectory: 'out/',
  targetDirectory: 'out/',
  ignoredExtensions: ['js', 'map'],
  ignoredPaths: ['static', 'preview', '404', '_next', 'visualization', 'sitemap', 'robots'],
  ignoreIndexFiles: true
});

function appendSitemapToRobotsTxt(robotsFileName, siteMapUrl) {
  if (!robotsFileName || !siteMapUrl) {
    return;
  }

  const robotsBuffer = readFileSync(robotsFileName);
  if (!robotsBuffer) {
    return;
  }

  const robotsContents = robotsBuffer.toString();
  const cleanedContents = robotsContents
    .split('\n')
    .filter(line => !/^sitemap:.*$/i.test(line))
    .join('\n');

  writeFileSync(robotsFileName, `${cleanedContents}\nSitemap: ${siteMapUrl}`);
}

appendSitemapToRobotsTxt(resolve('out/robots.txt'), `${process.env.URL}/sitemap.xml`);
