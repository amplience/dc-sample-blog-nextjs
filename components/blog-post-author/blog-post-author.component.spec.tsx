/* eslint-env jest */
import renderer from 'react-test-renderer';
import BlogPostAuthor from './blog-post-author.component';

describe('BlogPostAuthor', () => {
  test('renders author with an avatar, name and read time', (): void => {
    const props = {
      authors: [
        {
          name: 'Sir Bloblog',
          avatar: {
            _meta: {
              schema: 'https://schema.localhost.com/image.json',
              deliveryId: '9ef5a6d0-5a34-414f-9fd3-1098698c6629',
              name: 'bloblog-avatar'
            },
            image: {
              defaultHost: 'i1-qa.adis.ws',
              endpoint: 'bloblogltd',
              name: 'man-business-suit',
              id: 'f9549d3d-f616-487c-b1ad-fad5152f2c7d',
              _meta: {
                schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link'
              },
              mediaType: 'i'
            },
            altText: 'The dashing Sir Bloblog avatar',
            src: '//i1-qa.adis.ws/i/bloblogltd/man-business-suit'
          }
        }
      ],
      readTime: 15,
      date: '2019-08-14'
    };
    const component = renderer.create(<BlogPostAuthor {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
