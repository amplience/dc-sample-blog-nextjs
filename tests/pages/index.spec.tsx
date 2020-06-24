/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Index, { getStaticProps } from '../../pages/index';
import blogGetStaticPropsFixture from '../fixtures/blog-list-one-blog.json';
import * as blogListService from '../../common/services/get-blog-content-item.service';
import * as reactInstantsearchDomServer from 'react-instantsearch-dom/server';
import blogContentItem from '../fixtures/blog-content-item.json';

jest.mock('react-instantsearch-dom/server', () => ({
  findResultsState: jest.fn()
}));

jest.mock('../../components/algolia-instant-search/algolia-instant-search');

describe('Index', () => {
  let getBlogListContentSpy : jest.SpyInstance;
  let findResultsStateSpy: jest.SpyInstance;

  beforeEach(() => {
    process.env.ALGOLIA_APPLICATION_ID = 'algolia-app-id';
    process.env.ALGOLIA_SEARCH_ONLY_KEY = 'algolia-search-key';
    process.env.ALGOLIA_PRODUCTION_INDEX_NAME = 'algolia-production-index-name';
    process.env.ALGOLIA_STAGING_INDEX_NAME = 'algolia-staging-index-name';
    process.env.DYNAMIC_CONTENT_BLOG_LIST_DELIVERY_KEY = 'reference-key';
    process.env.GA_TRACKING_ID = 'ga-tracking-id';

    getBlogListContentSpy = jest.spyOn(blogListService, 'default');
    findResultsStateSpy = jest.spyOn(reactInstantsearchDomServer, 'findResultsState');
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders index with content', () => {
    const component = renderer.create(<Index {...blogGetStaticPropsFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders index with content but no blog posts', () => {
    const emptyBlogPostFixture = JSON.parse(JSON.stringify(blogGetStaticPropsFixture));
    emptyBlogPostFixture.resultsState = JSON.parse(emptyBlogPostFixture.buildTimeResultState);
    emptyBlogPostFixture.resultsState.rawResults.hits = [];
    emptyBlogPostFixture.resultsState.rawResults.nbHits = 0;
    emptyBlogPostFixture.resultsState = JSON.stringify(emptyBlogPostFixture.buildTimeResultState);
    const component = renderer.create(<Index {...emptyBlogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('getStaticProps returns content via api - none preview', async () => {
    getBlogListContentSpy.mockResolvedValue(blogContentItem);
    findResultsStateSpy.mockImplementation(() => {
      return JSON.parse(blogGetStaticPropsFixture.buildTimeResultState);
    });
    const result = await getStaticProps({});

    expect(result).toEqual({ props: { ...blogGetStaticPropsFixture } });
  });

  test('getStaticProps returns content via api - preview', async () => {
    getBlogListContentSpy.mockResolvedValue(blogContentItem);
    findResultsStateSpy.mockImplementation(() => {
      return JSON.parse(blogGetStaticPropsFixture.buildTimeResultState);
    });

    const previewData = { vse: 'vse-base-url' };
    const result = await getStaticProps({ preview: true, previewData });

    expect(result).toEqual({ props: { ...blogGetStaticPropsFixture, indexName: 'algolia-staging-index-name' } });
  });

  test('getStaticProps should call getBlogListContent with base url', async () => {
    getBlogListContentSpy.mockResolvedValue(blogContentItem);
    findResultsStateSpy.mockImplementation(() => {
      return blogGetStaticPropsFixture.buildTimeResultState;
    });
    const previewData = { vse: 'vse-base-url' };
    await getStaticProps({ preview: true, previewData });

    expect(getBlogListContentSpy).toHaveBeenCalledWith('reference-key', `${previewData.vse}`);
  });

  test('getStaticProps should call getBlogListContent without base url', async () => {
    getBlogListContentSpy.mockResolvedValue(blogContentItem);
    findResultsStateSpy.mockImplementation(() => {
      return blogGetStaticPropsFixture.buildTimeResultState;
    });
    const previewData = {};
    await getStaticProps({ preview: true, previewData });

    expect(getBlogListContentSpy).toHaveBeenCalledWith('reference-key', undefined);
  });

  test('getStaticProps throws error when DYNAMIC_CONTENT_REFERENCE_ID is undefined', async () => {
    delete process.env.DYNAMIC_CONTENT_REFERENCE_ID;
    getBlogListContentSpy.mockImplementation(() => {
      throw new Error();
    });
    const previewData = {};

    await expect(getStaticProps({ preview: true, previewData })).rejects.toThrowError(Error);
  });

  test('getStaticProps throws error when ALGOLIA_APPLICATION_ID is undefined', async () => {
    delete process.env.ALGOLIA_APPLICATION_ID;
    getBlogListContentSpy.mockImplementation(() => {
      throw new Error();
    });
    const previewData = {};

    await expect(getStaticProps({ preview: true, previewData })).rejects.toThrowError(Error);
  });

  test('getStaticProps throws error when ALGOLIA_SEARCH_ONLY_KEY is undefined', async () => {
    delete process.env.ALGOLIA_SEARCH_ONLY_KEY;
    getBlogListContentSpy.mockImplementation(() => {
      throw new Error();
    });
    const previewData = {};

    await expect(getStaticProps({ preview: true, previewData })).rejects.toThrowError(Error);
  });

  test('getStaticProps throws error when ALGOLIA_PRODUCTION_INDEX_NAME is undefined', async () => {
    delete process.env.ALGOLIA_PRODUCTION_INDEX_NAME;
    getBlogListContentSpy.mockImplementation(() => {
      throw new Error();
    });

    await expect(getStaticProps({})).rejects.toThrowError(Error);
  });

  test('getStaticProps throws error when ALGOLIA_STAGING_INDEX_NAME is undefined', async () => {
    delete process.env.ALGOLIA_STAGING_INDEX_NAME;
    getBlogListContentSpy.mockImplementation(() => {
      throw new Error();
    });
    const previewData = {};

    await expect(getStaticProps({ preview: true, previewData })).rejects.toThrowError(Error);
  });
});
