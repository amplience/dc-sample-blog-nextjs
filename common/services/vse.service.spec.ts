import getStagingContentItemById from './vse.service';
import * as blogPostService from './blog-post.service';
import { ContentItem } from 'dc-delivery-sdk-js';

jest.mock('./blog-post.service');

const mockIsBlogPost: any = blogPostService.isBlogPost;
const mockParseBlogPost: any = blogPostService.parseBlogPost;
const mockParseContent: any = blogPostService.parseContent;

const mockGetContentItem = jest.fn().mockImplementation(
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

jest.mock(
  'dc-delivery-sdk-js',
  (): jest.Mock => {
    return {
      ...jest.requireActual('dc-delivery-sdk-js'),
      ContentClient: jest.fn((): { getContentItem: jest.Mock } => {
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
