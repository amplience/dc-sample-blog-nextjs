/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Index from '../../pages/index';
import blogListFixture from '../fixtures/blog-list-one-blog.json';

jest.mock('react-instantsearch-dom/server', () => ({
  findResultsState: jest.fn()
}));

jest.mock('../../components/algolia-instant-search/algolia-instant-search');

describe('Index', () => {
  beforeEach(() => {
    process.env.ALGOLIA_APPLICATION_ID = 'algolia-app-id';
    process.env.ALGOLIA_API_KEY = 'algolia-search-key';
    process.env.ALGOLIA_PRODUCTION_INDEX_NAME = 'algolia-index-name';
    process.env.DYNAMIC_CONTENT_REFERENCE_ID = 'reference-id';
    process.env.GA_TRACKING_ID = 'ga-tracking-id';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('components', () => {
    test('renders index with content', async () => {
      const component = await renderer.create(<Index {...blogListFixture} />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    test('renders index with content but no blog posts', async () => {
      const emptyBlogPostFixture = JSON.parse(JSON.stringify(blogListFixture));
      emptyBlogPostFixture.resultsState.rawResults.hits = [];
      emptyBlogPostFixture.resultsState.rawResults.nbHits = 0;
      const component = await renderer.create(<Index {...emptyBlogPostFixture} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
