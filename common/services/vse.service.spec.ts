import getStagingContentItemById from './vse.service';
// @ts-ignore
import { mockIsBlogPost, mockParseBlogPost, mockParseContent } from './blog-post.service';
import { ContentItem } from 'dc-delivery-sdk-js';

const mockGetContentItem = jest.fn().mockImplementation(
  async (): Promise<ContentItem> => {
    return await {
      body: {
        _meta: {
          schema: 'schema',
          deliveryId: 'deliveryId',
          name: 'name',
          toJSON: (): {} => {
            return {};
          }
        }
      },
      toJSON: (): {} => {
        return {};
      }
    };
  }
);

jest.mock(
  'dc-delivery-sdk-js',
  (): Function => {
    return {
      ...jest.requireActual('dc-delivery-sdk-js'),
      ContentClient: jest.fn((): { getContentItem: Function } => {
        return {
          getContentItem: mockGetContentItem
        };
      })
    };
  }
);

jest.mock('./blog-post.service');

describe('VSE Service', (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  test('should invoke parseBlog when content-item is a BlogPost', async (): Promise<void> => {
    mockIsBlogPost.mockReturnValue(true);
    mockParseBlogPost.mockResolvedValue({});

    const blogPost = await getStagingContentItemById('stagingEnvironment', 'contentId');

    expect(mockGetContentItem).toHaveBeenCalled();
    expect(mockIsBlogPost).toHaveBeenCalled();
    expect(mockParseBlogPost).toHaveBeenCalled();
    expect(blogPost).toEqual({});
  });

  test('should invoke parseContent when content-item is not a BlogPost', async (): Promise<void> => {
    mockIsBlogPost.mockReturnValue(false);
    mockParseContent.mockResolvedValue([{}]);

    const blogPost = await getStagingContentItemById('stagingEnvironment', 'contentId');

    expect(mockGetContentItem).toHaveBeenCalled();
    expect(mockIsBlogPost).toHaveBeenCalled();
    expect(mockParseContent).toHaveBeenCalled();
    expect(blogPost).toEqual({});
  });
});
