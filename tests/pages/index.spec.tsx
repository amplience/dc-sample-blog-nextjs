/* eslint-env jest */
import renderer from 'react-test-renderer';
import Index from '../../pages/index';
import { MediaType } from '../../common/interfaces/media.interface';

const mockGetBlogReferenceList = jest.fn();
const mockGetBlogPost = jest.fn();

jest.mock('../../common/services/get-blog-reference-list.service', () => () => mockGetBlogReferenceList());
jest.mock('../../pages/blogs/services/get-blog-post.service', () => () => mockGetBlogPost());

jest.mock('../../components/hero-banner/hero-banner', () => () => <div className="hero-banner-mock" />);
jest.mock('../../components/blog-list/blog-list', () => () => <div className="blob-list-mock" />);

const indexPropsFixture = {
  title: 'blog-test-title',
  subTitle: 'blog-test-sub-title',
  blogPosts: [
    {
      title: 'string',
      date: 'string',
      description: 'string',
      authors: [],
      image: {
        image: {
          id: 'string',
          name: 'string',
          endpoint: 'string',
          defaultHost: 'string',
          mediaType: MediaType.IMAGE
        },
        altText: ''
      },
      urlSlug: 'string',
      tags: ['string'],
      readTime: 15,
      content: []
    }
  ]
};

describe('Index', () => {
  test('renders index with content', async () => {
    const props = JSON.parse(JSON.stringify(indexPropsFixture));
    const component = await renderer.create(<Index {...props} />);
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
    const props = JSON.parse(JSON.stringify(indexPropsFixture));
    mockGetBlogReferenceList.mockImplementation(() => {
      return contentData;
    });
    mockGetBlogPost.mockImplementation(() => props.blogPosts[0]);
    const query = {};
    const result = await Index.getInitialProps({ query, pathname: '/' });

    expect(result).toEqual({ ...props });
  });

  test('getInitialProps throws error when getContentItemById returns an error', async () => {
    mockGetBlogReferenceList.mockImplementation(() => {
      throw new Error();
    });
    const query = {};

    await expect(Index.getInitialProps({ query, pathname: '/' })).rejects.toThrowError(Error);
  });
});
