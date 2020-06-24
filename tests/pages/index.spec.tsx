/* eslint-env jest */
import renderer from 'react-test-renderer';
import Index from '../../pages/index';
import blogListFixture from '../fixtures/blog-list-one-blog.json';
import mockConsole from 'jest-mock-console';
import getHydratedBlogList from '../../common/services/blog-list/get-hydrated-blog-list.service';

jest.mock('../../common/services/blog-list/get-hydrated-blog-list.service');

describe('Index', () => {
  let restoreConsole;
  beforeEach(() => {
    restoreConsole = mockConsole(['log', 'info', 'warn', 'error']);
  });

  afterEach(() => {
    restoreConsole();
  });

  beforeEach(() => {
    process.env.DYNAMIC_CONTENT_BLOG_LIST_DELIVERY_KEY = 'delivery-key';
    process.env.GA_TRACKING_ID = 'ga-tracking-id';
    (getHydratedBlogList as jest.Mock).mockClear();
  });

  test('renders index with content', async () => {
    const component = await renderer.create(<Index {...blogListFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders index with content but no blog posts', async () => {
    const emptyBlogPostFixture = JSON.parse(JSON.stringify(blogListFixture));
    emptyBlogPostFixture.blogPosts = [];
    const component = await renderer.create(<Index {...emptyBlogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('getInitialProps returns content via api', async () => {
    (getHydratedBlogList as jest.Mock).mockImplementation(() => {
      return blogListFixture;
    });
    const query = {};
    const result = await Index.getInitialProps({ query, pathname: '/' });

    expect(result).toEqual({ ...blogListFixture });
  });

  test('getInitialProps should call getHydratedBlogList with base url', async () => {
    (getHydratedBlogList as jest.Mock).mockImplementation((a, b) => {
      return blogListFixture;
    });
    const query = { vse: 'vse-base-url' };
    await Index.getInitialProps({ query, pathname: '/' });

    expect(getHydratedBlogList).toHaveBeenCalledWith('delivery-key', `//${query.vse}`);
  });

  test('getInitialProps should call getHydratedBlogList without base url', async () => {
    (getHydratedBlogList as jest.Mock).mockImplementation((a, b) => {
      return blogListFixture;
    });
    const query = {};
    await Index.getInitialProps({ query, pathname: '/' });

    expect(getHydratedBlogList).toHaveBeenCalledWith('delivery-key', undefined);
  });

  test('getInitialProps throws error when DYNAMIC_CONTENT_REFERENCE_DELIVERY_KEY is undefined', async () => {
    delete process.env.DYNAMIC_CONTENT_REFERENCE_DELIVERY_KEY;
    (getHydratedBlogList as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    const query = {};

    await expect(Index.getInitialProps({ query, pathname: '/' })).rejects.toThrowError(Error);
  });
});
