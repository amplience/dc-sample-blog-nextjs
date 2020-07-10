/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import BlogPostPage from '../../pages/blog/[...slug]';
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
  let blogPost;

  beforeEach(() => {
    process.env.DYNAMIC_CONTENT_REFERENCE_ID = 'reference-id';
    process.env.GA_TRACKING_ID = 'ga-tracking-id';
    process.env.TAGS_FACET_FIELD = 'tags';
    blogPost = { ...blogPostFixture };
    blogPost._meta.toJSON = () => ({});
    jest.clearAllMocks();
  });

  test('renders Blog page with content', () => {
    const component = renderer.create(<BlogPostPage blogPost={blogPost} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('getInitialProps returns blog post content via api', async () => {
    mockGetBlogPostByDeliveryKey.mockResolvedValue(blogPost);
    const query = { slug: ['blog-slug'] };
    const result = await BlogPostPage.getInitialProps(({ query } as unknown) as NextPageContext);
    expect(result).toEqual({ blogPost: blogPostFixture });
  });

  test('getInitialProps should call getHydratedBlogList with staging environment', async () => {
    mockGetBlogPostByDeliveryKey.mockResolvedValue(blogPost);
    const query = { vse: 'vse-base-url', slug: ['blog-slug'] };
    await BlogPostPage.getInitialProps(({ query } as unknown) as NextPageContext);
    expect(mockGetBlogPostByDeliveryKey).toHaveBeenCalledWith('blog-slug', `//${query.vse}`);
  });

  test('getInitialProps should call getHydratedBlogList without staging environment', async () => {
    mockGetBlogPostByDeliveryKey.mockResolvedValue(blogPost);
    const query = { slug: ['blog-slug'] };
    await BlogPostPage.getInitialProps(({ query } as unknown) as NextPageContext);
    expect(mockGetBlogPostByDeliveryKey).toHaveBeenCalledWith('blog-slug', undefined);
  });

  test('getInitialProps throws error when deliveryKey is undefined', async () => {
    mockGetBlogPostByDeliveryKey.mockRejectedValue(new Error());
    const query = {};
    await expect(BlogPostPage.getInitialProps(({ query } as unknown) as NextPageContext)).rejects.toThrowError(Error);
  });
});
