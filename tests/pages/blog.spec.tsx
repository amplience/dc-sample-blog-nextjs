/* eslint-env jest */
import renderer from 'react-test-renderer';
import BlogPostPage from '../../pages/blog';
import blogPostFixture from '../fixtures/single-blog-post-data-object.json';
import { getBlogPostByDeliveryKey } from '../../common/services/blog-post.service';
import { NextPageContext } from 'next';

jest.mock('../../common/services/blog-post.service', () => {
  return {
    __esModule: true,
    getBlogPostByDeliveryKey: jest.fn()
  };
});

const mockGetBlogPostByDeliveryKey: jest.MockedFunction<typeof getBlogPostByDeliveryKey> = getBlogPostByDeliveryKey as jest.MockedFunction<
  typeof getBlogPostByDeliveryKey
>;

describe('Blog page', () => {
  beforeEach(() => {
    process.env.DYNAMIC_CONTENT_REFERENCE_ID = 'reference-id';
    process.env.GA_TRACKING_ID = 'ga-tracking-id';
    jest.clearAllMocks();
  });

  test('renders Blog page with content', () => {
    const component = renderer.create(<BlogPostPage blogPost={blogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('getInitialProps returns blog post content via api', async () => {
    mockGetBlogPostByDeliveryKey.mockResolvedValue(blogPostFixture);
    const query = { deliveryKey: 'blog-id' };
    const result = await BlogPostPage.getInitialProps({ query, pathname: '/blog' } as unknown as NextPageContext);
    expect(result).toEqual({ blogPost: blogPostFixture });
  });

  test('getInitialProps should call getHydratedBlogList with staging environment', async () => {
    mockGetBlogPostByDeliveryKey.mockResolvedValue(blogPostFixture);
    const query = { deliveryKey: 'blog-id', vse: 'vse-base-url' };
    await BlogPostPage.getInitialProps({ query, pathname: '/blog' } as unknown as NextPageContext);
    expect(mockGetBlogPostByDeliveryKey).toHaveBeenCalledWith(query.deliveryKey, `//${query.vse}`);
  });

  test('getInitialProps should call getHydratedBlogList without staging environment', async () => {
    mockGetBlogPostByDeliveryKey.mockResolvedValue(blogPostFixture);
    const query = { deliveryKey: 'blog-id' };
    await BlogPostPage.getInitialProps({ query, pathname: '/blog' } as unknown as NextPageContext);
    expect(mockGetBlogPostByDeliveryKey).toHaveBeenCalledWith(query.deliveryKey, undefined);
  });

  test('getInitialProps throws error when deliveryKey is undefined', async () => {
    mockGetBlogPostByDeliveryKey.mockRejectedValue(new Error());
    const query = {};
    await expect(BlogPostPage.getInitialProps({ query, pathname: '/blog' } as unknown as NextPageContext)).rejects.toThrowError(Error);
  });
});
