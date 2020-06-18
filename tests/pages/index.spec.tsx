/* eslint-env jest */
import renderer from 'react-test-renderer';
import Index from '../../pages/index';
import blogListFixture from '../fixtures/blog-list-one-blog.json';
import * as blogListService from '../../common/services/blog-reference-list.service';

jest.mock('../../common/services/blog-reference-list.service', () => ({
  getBlogListContent: jest.fn()
}));

jest.mock('algoliasearch');
jest.mock('react-instantsearch-dom/server');
jest.mock('react-instantsearch-dom');
jest.mock('react-instantsearch-core');

describe('Index', () => {
  let getBlogListContentSpy;

  beforeEach(() => {
    process.env.ALGOLIA_APPLICATION_ID = 'algolia-app-id';
    process.env.ALGOLIA_SEARCH_ONLY_KEY = 'algolia-search-key';
    process.env.ALGOLIA_PRODUCTION_INDEX_NAME = 'algolia-index-name';
    process.env.DYNAMIC_CONTENT_REFERENCE_ID = 'reference-id';
    process.env.GA_TRACKING_ID = 'ga-tracking-id';

    getBlogListContentSpy = jest.spyOn(blogListService, 'getBlogListContent');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders index with content', async () => {
    const component = await renderer.create(<Index {...blogListFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders index with content but no blog posts', async () => {
    const emptyBlogPostFixture = JSON.parse(JSON.stringify(blogListFixture));
    emptyBlogPostFixture.requestsState.rawResults.hits = [];
    emptyBlogPostFixture.requestsState.rawResults.nbHits = 0;
    const component = await renderer.create(<Index {...emptyBlogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('getInitialProps returns content via api', async () => {
    getBlogListContentSpy.mockImplementation(() => {
      return blogListFixture;
    });
    const query = {};
    const result = await Index.getInitialProps({ query, pathname: '/' });

    expect(result).toEqual({ ...blogListFixture });
  });

  test('getInitialProps should call getHydratedBlogList with base url', async () => {
    getBlogListContentSpy.mockImplementation((a, b) => {
      return blogListFixture;
    });
    const query = { vse: 'vse-base-url' };
    await Index.getInitialProps({ query, pathname: '/' });

    expect(getBlogListContentSpy).toHaveBeenCalledWith('reference-id', `//${query.vse}`);
  });

  test('getInitialProps should call getHydratedBlogList without base url', async () => {
    getBlogListContentSpy.mockImplementation((a, b) => {
      return blogListFixture;
    });
    const query = {};
    await Index.getInitialProps({ query, pathname: '/' });

    expect(getBlogListContentSpy).toHaveBeenCalledWith('reference-id', undefined);
  });

  test('getInitialProps throws error when DYNAMIC_CONTENT_REFERENCE_ID is undefined', async () => {
    delete process.env.DYNAMIC_CONTENT_REFERENCE_ID;
    getBlogListContentSpy.mockImplementation(() => {
      throw new Error();
    });
    const query = {};

    await expect(Index.getInitialProps({ query, pathname: '/' })).rejects.toThrowError(Error);
  });

  test('getInitialProps throws error when ALGOLIA_APPLICATION_ID is undefined', async () => {
    delete process.env.ALGOLIA_APPLICATION_ID;
    getBlogListContentSpy.mockImplementation(() => {
      throw new Error();
    });
    const query = {};

    await expect(Index.getInitialProps({ query, pathname: '/' })).rejects.toThrowError(Error);
  });

  test('getInitialProps throws error when ALGOLIA_SEARCH_ONLY_KEY is undefined', async () => {
    delete process.env.ALGOLIA_SEARCH_ONLY_KEY;
    getBlogListContentSpy.mockImplementation(() => {
      throw new Error();
    });
    const query = {};

    await expect(Index.getInitialProps({ query, pathname: '/' })).rejects.toThrowError(Error);
  });
});
