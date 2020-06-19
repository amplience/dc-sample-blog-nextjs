/* eslint-env jest */
import { getBlogListContent } from './blog-reference-list.service';
import { ContentItem } from 'dc-delivery-sdk-js';
import { BlogListContent } from '../interfaces/blog-reference-list.interface';

const mockGetContentItemById = jest.fn();
const mockGetBlogPost = jest.fn();

jest.mock('../../common/services/blog-post.service', (): (() => jest.Mock) => (): jest.Mock => mockGetBlogPost());
jest.mock('../../common/services/dynamic-content-delivery.service', () => {
  return {
    DynamicContentDeliveryService: jest.fn(() => {
      return {
        getContentItemById: (): BlogListContent => mockGetContentItemById()
      };
    })
  };
});

describe('getBlogListContent', (): void => {
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
      subTitle: 'blog-test-sub-title'
    };

    const contentItem = {
      body: { ...blogList, ...blogListMeta },
      toJSON: (): { blogList: BlogListContent } => {
        return { blogList };
      }
    };
    mockGetContentItemById.mockImplementation((): ContentItem => contentItem);

    const result = await getBlogListContent('test-id');

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
      subTitle: 'blog-test-sub-title'
    };

    const contentItem = {
      body: { ...blogList, ...blogListMeta },
      toJSON: (): { blogList: BlogListContent } => {
        return { blogList };
      }
    };
    mockGetContentItemById.mockImplementation((): ContentItem => contentItem);

    const result = await getBlogListContent('test-id');
    expect(result).toEqual(blogList);
  });
});
