/* eslint-env jest */
import renderer from 'react-test-renderer';
import Index from '../../pages/index';
import { MediaType } from '../../common/interfaces/media.interface';
import { BlogListData } from '../../common/interfaces/blog-list.interface';

const mockGetBlogReferenceList = jest.fn();
const mockGetBlogPost = jest.fn();

jest.mock('../../common/services/get-blog-reference-list.service', () => () => mockGetBlogReferenceList());
jest.mock('../../common/services/get-blog-post.service', () => () => mockGetBlogPost());

jest.mock('../../components/hero-banner/hero-banner', () => () => <div className="hero-banner-mock" />);
jest.mock('../../components/hero-card/hero-card', () => () => <div className="hero-card-mock" />);
jest.mock('../../components/blog-list/blog-list', () => () => <div className="blob-list-mock" />);

describe('Index', () => {
  let indexPropsFixture: BlogListData;

  beforeEach(() => {
    indexPropsFixture = {
      title: 'blog-test-title',
      subTitle: 'blog-test-sub-title',
      blogPosts: [
        {
          id: 'blog-post-id',
          title: 'blog-post-test',
          date: '2019-08-13',
          description: 'blog-post-description',
          authors: [],
          image: {
            image: {
              id: 'image-id',
              name: 'image-name',
              endpoint: 'image-endpoint',
              defaultHost: 'image-default-host',
              mediaType: MediaType.IMAGE
            },
            altText: ''
          },
          urlSlug: 'url-slug',
          tags: ['test-tag'],
          readTime: 15,
          content: []
        }
      ]
    };
  });
  test('renders index with content', async () => {
    const component = await renderer.create(<Index {...indexPropsFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('getInitialProps returns content', async () => {
    const contentData = {
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
    mockGetBlogReferenceList.mockImplementation(() => {
      return contentData;
    });
    mockGetBlogPost.mockImplementation(() => indexPropsFixture.blogPosts[0]);
    const query = {};
    const result = await Index.getInitialProps({ query, pathname: '/' });

    expect(result).toEqual({ ...indexPropsFixture });
  });

  test('getInitialProps throws error when getContentItemById returns an error', async () => {
    mockGetBlogReferenceList.mockImplementation(() => {
      throw new Error();
    });
    const query = {};

    await expect(Index.getInitialProps({ query, pathname: '/' })).rejects.toThrowError(Error);
  });

  test('getInitialProps only returns resolved blog posts', async () => {
    const contentData = {
      title: 'blog-test-title',
      subTitle: 'blog-test-sub-title',
      blogPosts: [
        {
          id: '8d6943c7-6028-4fac-b45e-57fc63bd032a',
          _meta: {
            schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference'
          },
          contentType: 'https://schema.localhost.com/blog-post.json'
        },
        {
          id: '8d6943c7-6028-4fac-b45e-57fc63bd032b',
          _meta: {
            schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference'
          },
          contentType: 'https://schema.localhost.com/blog-post.json'
        }
      ]
    };
    mockGetBlogReferenceList.mockImplementation(() => {
      return contentData;
    });
    mockGetBlogPost
      .mockImplementationOnce(() => indexPropsFixture.blogPosts[0])
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const query = {};
    const result = await Index.getInitialProps({ query, pathname: '/' });

    expect(result).toEqual({ ...indexPropsFixture });
  });
});
