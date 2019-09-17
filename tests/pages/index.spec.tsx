/* eslint-env jest */
import renderer from 'react-test-renderer';
import Index from '../../pages/index';
import blogListFixture from '../fixtures/blog-list-one-blog.json';

const mockGetHydratedBlogList = jest.fn();

jest.mock('../../common/services/get-blog-reference-list.service', () => (a, b) => mockGetHydratedBlogList(a, b));

describe('Index', () => {
  beforeEach(() => {
    process.env.DYNAMIC_CONTENT_REFERENCE_ID = 'reference-id';
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
    mockGetHydratedBlogList.mockImplementation(() => {
      return blogListFixture;
    });
    const query = {};
    const result = await Index.getInitialProps({ query, pathname: '/' });

    expect(result).toEqual({ ...blogListFixture });
  });

  test('getInitialProps should call getHydratedBlogList with base url', async () => {
    mockGetHydratedBlogList.mockImplementation((a, b) => {
      return blogListFixture;
    });
    const query = { vse: 'vse-base-url' };
    await Index.getInitialProps({ query, pathname: '/' });

    expect(mockGetHydratedBlogList).toHaveBeenCalledWith('reference-id', `//${query.vse}`);
  });

  test('getInitialProps should call getHydratedBlogList without base url', async () => {
    mockGetHydratedBlogList.mockImplementation((a, b) => {
      return blogListFixture;
    });
    const query = {};
    await Index.getInitialProps({ query, pathname: '/' });

    expect(mockGetHydratedBlogList).toHaveBeenCalledWith('reference-id', undefined);
  });

  test('getInitialProps throws error when DYNAMIC_CONTENT_REFERENCE_ID is undefined', async () => {
    delete process.env.DYNAMIC_CONTENT_REFERENCE_ID;
    mockGetHydratedBlogList.mockImplementation(() => {
      throw new Error();
    });
    const query = {};

    await expect(Index.getInitialProps({ query, pathname: '/' })).rejects.toThrowError(Error);
  });
});
