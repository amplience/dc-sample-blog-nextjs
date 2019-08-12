/* eslint-env jest */
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Index from '../../pages/index';

const mockGetBlogReferenceList = jest.fn();

jest.mock('../../common/services/get-blog-reference-list.service', () => {
  return () => mockGetBlogReferenceList();
});

describe('Index', () => {
  test('renders index with content', async () => {
    const props = {
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

    const component = await renderer.create(<Index {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders pre with prettified content', () => {
    const props = {
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
    const component = shallow(<Index {...props} />);
    expect(component.find('pre').text()).toEqual(JSON.stringify(props.blogPosts, null, 2));
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
    mockGetBlogReferenceList.mockImplementation(() => contentData);
    const query = {
      id: 'test-id',
      account: 'test-acccount'
    };
    const result = await Index.getInitialProps({ query, pathname: '/' });

    expect(result).toEqual({ ...contentData });
  });

  test('getInitialProps throws error when getContentItemById returns an error', async () => {
    mockGetBlogReferenceList.mockImplementation(() => {
      throw new Error();
    });
    const query = {
      id: 'test-id',
      account: 'test-acccount'
    };

    await expect(Index.getInitialProps({ query, pathname: '/' })).rejects.toThrowError(Error);
  });
});
