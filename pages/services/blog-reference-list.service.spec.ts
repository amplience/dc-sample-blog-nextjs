import { getBlogReferenceList } from './blog-reference-list.service';
import { ContentClientConfig } from 'dc-delivery-sdk-js';

const mockGetContentItemById = jest.fn();

jest.mock('../../services/DynamicContentDeliveryService', () => {
  return {
    DynamicContentDeliveryService: jest.fn(() => {
      return {
        getContentItemById: () => mockGetContentItemById()
      };
    })
  };
});
describe('getBlogReferenceList', () => {
  test('should return content', async () => {
    const clientConfig: ContentClientConfig = {
      account: 'test-account',
      baseUrl: 'https://base-url-test'
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
      toJSON: () => {
        return { blogList };
      }
    };
    mockGetContentItemById.mockImplementation(() => contentItem);

    const result = await getBlogReferenceList('test-id', clientConfig);

    expect(result).toEqual(blogList);
  });
});
