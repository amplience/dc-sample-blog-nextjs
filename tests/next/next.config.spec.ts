import blogListFixture from '../fixtures/blog-list-one-blog.json';
import blogListDuplicateBlogFixture from '../fixtures/blog-list-one-blog-duplicate.json';
import blogPostFixture from '../fixtures/single-blog-post-content-item.json';
import nextConfig from '../../next.config';
import { BlogListData } from '../../common/interfaces/blog-list.interface.js';
import BlogPost from '../../common/interfaces/blog-post.interface.js';

const mockGetContentItem = jest.fn();
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
jest.mock(
  'next-manifest',
  (): Function => {
    return (config): { [key: string]: string } => config;
  }
);
jest.mock(
  'next-offline',
  (): Function => {
    return (config): { [key: string]: string } => config;
  }
);

describe('next.config.js', (): void => {
  test('exportPathMap should return landing page and a single blog paths', async (): Promise<void> => {
    const blogListContentItem = {
      toJSON: (): { blogList: BlogListData } => {
        return { blogList: blogListFixture };
      }
    };
    const blogPostContentItem = {
      toJSON(): BlogPost {
        return blogPostFixture;
      }
    };
    mockGetContentItem
      .mockImplementationOnce((): { toJSON: Function } => blogListContentItem)
      .mockImplementationOnce((): { toJSON: Function } => blogPostContentItem);

    const result = await nextConfig.exportPathMap();

    expect(result).toEqual({
      '/blog/my-first-blog': {
        page: '/blog',
        query: {
          blogId: '8d6943c7-6028-4fac-b45e-57fc63bd032a',
          slug: 'my-first-blog'
        }
      },
      '/': {
        page: '/',
        query: {
          vse: ''
        }
      },
      '/preview': {
        page: '/preview',
        query: {
          content: '',
          vse: ''
        }
      },
      '/visualization.html': {
        page: '/visualization',
        query: {
          vse: '',
          content: ''
        }
      }
    });
  });

  test('should throw an error when blog posts contain duplicate slugs', async (): Promise<void> => {
    const blogListContentItem = {
      toJSON: (): { blogList: BlogListData } => {
        return { blogList: blogListDuplicateBlogFixture };
      }
    };
    const blogPostContentItem = {
      toJSON(): BlogPost {
        return blogPostFixture;
      }
    };
    mockGetContentItem
      .mockImplementationOnce((): { toJSON: Function } => blogListContentItem)
      .mockImplementationOnce((): { toJSON: Function } => blogPostContentItem)
      .mockImplementationOnce((): { toJSON: Function } => blogPostContentItem);

    await expect(nextConfig.exportPathMap()).rejects.toThrowError(
      `Blog posts contain duplicate urlSlugs: my-first-blog`
    );
  });

  test('should throw an error when delivery sdk returns content with an empty blog list', async (): Promise<void> => {
    const blogListContentItem = {
      toJSON: (): { blogList: BlogListData } => {
        return {
          // @ts-ignore
          notBlogList: {}
        };
      }
    };
    mockGetContentItem.mockImplementationOnce((): { toJSON: Function } => blogListContentItem);

    await expect(nextConfig.exportPathMap()).rejects.toThrowError(
      `Error building exportPathMap: slot does not contain a blog list`
    );
  });

  test('should return an empty array when delivery sdk returns content with a blog list but no blog posts', async (): Promise<
    void
  > => {
    const blogListContentItem = {
      toJSON: (): { blogList: BlogListData } => {
        return {
          // @ts-ignore
          blogList: {
            title: 'some title',
            subTitle: 'some subtitle'
          }
        };
      }
    };
    mockGetContentItem.mockImplementationOnce((): { toJSON: Function } => blogListContentItem);

    const result = await nextConfig.exportPathMap();

    expect(result).toEqual({
      '/': {
        page: '/',
        query: {
          vse: ''
        }
      },
      '/preview': {
        page: '/preview',
        query: {
          content: '',
          vse: ''
        }
      },
      '/visualization.html': {
        page: '/visualization',
        query: {
          vse: '',
          content: ''
        }
      }
    });
  });

  test('should return log an issue if a blog does not exist', async (): Promise<void> => {
    jest.spyOn(global.console, 'warn');
    const blogListContentItem = {
      toJSON: (): { blogList: BlogListData } => {
        return { blogList: blogListFixture };
      }
    };
    mockGetContentItem
      .mockImplementationOnce((): { toJSON: Function } => blogListContentItem)
      .mockImplementationOnce((): Error => new Error('Content id not found'));

    const result = await nextConfig.exportPathMap();

    expect(result).toEqual({
      '/': {
        page: '/',
        query: {
          vse: ''
        }
      },
      '/preview': {
        page: '/preview',
        query: {
          content: '',
          vse: ''
        }
      },
      '/visualization.html': {
        page: '/visualization',
        query: {
          vse: '',
          content: ''
        }
      }
    });
    expect(global.console.warn).toHaveBeenCalled();
  });
});
