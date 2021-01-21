import getStagingContentItemById from './vse.service';
import { ContentItem } from 'dc-delivery-sdk-js';

const mockGetContentItemById = jest.fn().mockImplementation(
  async (): Promise<ContentItem> => {
    return await {
      body: {
        _meta: {
          schema: 'schema',
          deliveryId: 'deliveryId',
          name: 'name',
          toJSON: (): unknown => {
            return {};
          }
        }
      },
      toJSON: (): unknown => {
        return {};
      }
    };
  }
);

jest.mock('dc-delivery-sdk-js', () => {
  return {
    ...jest.requireActual('dc-delivery-sdk-js'),
    ContentClient: jest.fn((): { getContentItemById: jest.Mock } => {
      return {
        getContentItemById: mockGetContentItemById
      };
    })
  };
});

jest.mock('./blog-post.service');

describe('VSE Service', (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  test('should invoke getContentItemById()', async (): Promise<void> => {
    const blogPost = await getStagingContentItemById('stagingEnvironment', 'contentId');
    expect(blogPost).toMatchInlineSnapshot(`Object {}`);
    expect(mockGetContentItemById).toHaveBeenCalled();
  });
});
