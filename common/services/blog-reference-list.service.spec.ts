/* eslint-env jest */
import getHydratedBlogList, { getBlogReferenceList } from './blog-reference-list.service';
import { ContentItem } from 'dc-delivery-sdk-js';
import { BlogReferenceList } from '../interfaces/blog-reference-list.interface';
import blogListFixture from '../../tests/fixtures/blog-list-one-blog.json';
import BlogPost from '../interfaces/blog-post.interface';

const mockGetContentItemById = jest.fn();
const mockGetBlogPost = jest.fn();

jest.mock('../../common/services/blog-post.service', (): (() => jest.Mock) => (): jest.Mock => mockGetBlogPost());
jest.mock('../../common/services/dynamic-content-delivery.service', () => {
  return {
    DynamicContentDeliveryService: jest.fn(() => {
      return {
        getContentItemById: (): BlogReferenceList => mockGetContentItemById()
      };
    })
  };
});

describe('getBlogReferenceList', (): void => {
  test('should return content', async (): Promise<void> => {
    const blogListMeta = {
      _meta: {
        name: 'test',
        deliveryId: 'test-delivery-id',
        schema: 'test-schema',
        toJSON: (): void => undefined
      }
    };
    const blogList = {
      title: 'blog-test-title',
      subTitle: 'blog-test-sub-title',
      blogPosts: [
        {
          id: '8d6943c7-6028-4fac-b45e-57fc63bd032a',
          _meta: {
            schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference'
          },
          contentType: 'https://schema.localhost.com/blog-post.json'
        }
      ]
    };

    const contentItem = {
      body: { ...blogList, ...blogListMeta },
      toJSON: (): { blogList: BlogReferenceList } => {
        return { blogList };
      }
    };
    mockGetContentItemById.mockImplementation((): ContentItem => contentItem);

    const result = await getBlogReferenceList('test-id');

    expect(result).toEqual(blogList);
  });

  test('should return content with an empty blogPosts array', async (): Promise<void> => {
    const blogListMeta = {
      _meta: {
        name: 'test',
        deliveryId: 'test-delivery-id',
        schema: 'test-schema',
        toJSON: (): void => undefined
      }
    };
    const blogList = {
      title: 'blog-test-title',
      subTitle: 'blog-test-sub-title',
      blogPosts: undefined
    };

    const contentItem = {
      body: { ...blogList, ...blogListMeta },
      toJSON: (): { blogList: BlogReferenceList } => {
        return { blogList };
      }
    };
    mockGetContentItemById.mockImplementation((): ContentItem => contentItem);

    const result = await getBlogReferenceList('test-id');
    blogList.blogPosts = [];
    expect(result).toEqual(blogList);
  });
});

describe('getHydratedBlogList', (): void => {
  test('should return a hydrated blog list, discarding unresovled blog posts', async (): Promise<void> => {
    const blogListMeta = {
      _meta: {
        name: 'test',
        deliveryId: 'test-delivery-id',
        schema: 'test-schema',
        toJSON: (): void => undefined
      }
    };
    const blogListRef = {
      title: 'blog-test-title',
      subTitle: 'blog-test-sub-title',
      blogPosts: [
        {
          id: 'blog-id-1',
          _meta: {
            schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference'
          },
          contentType: 'https://schema.localhost.com/blog-post.json'
        },
        {
          id: 'blog-id-2',
          _meta: {
            schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference'
          },
          contentType: 'https://schema.localhost.com/blog-post.json'
        }
      ]
    };

    const blogPost = blogListFixture.blogPosts[0];

    const contentItem = {
      body: { ...blogListRef, ...blogListMeta },
      toJSON: (): { blogList: BlogReferenceList } => {
        return { blogList: blogListRef };
      }
    };
    mockGetContentItemById.mockImplementation((): ContentItem => contentItem);
    mockGetBlogPost
      .mockImplementationOnce((): BlogPost => blogPost)
      .mockImplementationOnce((): void => {
        throw new Error();
      });
    const result = await getHydratedBlogList('test-id');
    expect(result).toEqual(blogListFixture);
  });

  test('should return a hydrated blog list', async (): Promise<void> => {
    const blogListMeta = {
      _meta: {
        name: 'test',
        deliveryId: 'test-delivery-id',
        schema: 'test-schema',
        toJSON: (): void => undefined
      }
    };
    const blogListRef = {
      title: 'blog-test-title',
      subTitle: 'blog-test-sub-title',
      blogPosts: [
        {
          id: 'blog-id-1',
          _meta: {
            schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference'
          },
          contentType: 'https://schema.localhost.com/blog-post.json'
        }
      ]
    };

    const blogPost = blogListFixture.blogPosts[0];

    const contentItem = {
      body: { ...blogListRef, ...blogListMeta },
      toJSON: (): { blogList: BlogReferenceList } => {
        return { blogList: blogListRef };
      }
    };
    mockGetContentItemById.mockImplementation((): ContentItem => contentItem);
    mockGetBlogPost.mockImplementationOnce((): BlogPost => blogPost);
    const result = await getHydratedBlogList('test-id');
    expect(result).toEqual(blogListFixture);
  });
});
