import getBlogReferenceList from './get-blog-reference-list.service';
import { ContentItem } from 'dc-delivery-sdk-js';
import { BlogReferenceList } from '../interfaces/blog-reference-list.interface';

const mockGetContentItemById = jest.fn();

jest.mock('../../common/services/dynamic-content-delivery.service', (): {} => {
  return {
    DynamicContentDeliveryService: jest.fn((): { [key: string]: {} } => {
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
        toJSON: (): void => {}
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
});
