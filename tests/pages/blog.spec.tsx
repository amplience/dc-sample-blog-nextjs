/* eslint-env jest */
import renderer from 'react-test-renderer';
import BlogPostPage from '../../pages/blog';
import blogPostFixture from '../fixtures/single-blog-post-data-object.json';

const mockGetBlogPost = jest.fn();
jest.mock('../../common/services/blog-post.service', () => (a, b) => mockGetBlogPost(a, b));

describe('Blog page', () => {
  beforeEach(() => {
    process.env.DYNAMIC_CONTENT_REFERENCE_ID = 'reference-id';
    process.env.GA_TRACKING_ID = 'ga-tracking-id';
    mockGetBlogPost.mockClear();
  });

  test('renders Blog page with content', () => {
    const component = renderer.create(<BlogPostPage blogPost={blogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('getInitialProps returns blog post content via api', async () => {
    mockGetBlogPost.mockImplementation(() => {
      return blogPostFixture;
    });
    const query = { blogId: 'blog-id' };
    const result = await BlogPostPage.getInitialProps({ query, pathname: '/blog' });
    expect(result).toEqual({ blogPost: blogPostFixture });
  });

  test('getInitialProps should call getHydratedBlogList with staging environment', async () => {
    mockGetBlogPost.mockImplementation(() => {
      return blogPostFixture;
    });
    const query = { blogId: 'blog-id', vse: 'vse-base-url' };
    await BlogPostPage.getInitialProps({ query, pathname: '/blog' });
    expect(mockGetBlogPost).toHaveBeenCalledWith(query.blogId, `//${query.vse}`);
  });

  test('getInitialProps should call getHydratedBlogList without staging environment', async () => {
    mockGetBlogPost.mockImplementation(() => {
      return blogPostFixture;
    });
    const query = { blogId: 'blog-id' };
    await BlogPostPage.getInitialProps({ query, pathname: '/blog' });
    expect(mockGetBlogPost).toHaveBeenCalledWith(query.blogId, undefined);
  });

  test('getInitialProps throws error when blogId is undefined', async () => {
    mockGetBlogPost.mockImplementation(() => {
      throw new Error();
    });
    const query = {};
    await expect(BlogPostPage.getInitialProps({ query, pathname: '/blog' })).rejects.toThrowError(Error);
  });
});
