/* eslint-env jest */
import BlogPostAuthor from './blog-post-author.component';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('BlogPostAuthor', () => {
  let renderer;
  beforeEach(() => {
    renderer = ShallowRenderer.createRenderer();
  });
  test('renders author with an avatar, name and read time', (): void => {
    const props = {
      authors: [
        {
          name: 'Sir Bloblog',
          avatar: {
            image: {
              defaultHost: 'i1-qa.adis.ws',
              endpoint: 'bloblogltd',
              name: 'man-business-suit',
              id: 'f9549d3d-f616-487c-b1ad-fad5152f2c7d'
            },
            altText: 'The dashing Sir Bloblog avatar'
          }
        }
      ],
      readTime: 15,
      date: '2019-08-14'
    };
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<BlogPostAuthor {...props} />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  test('renders author without an avatar, but still has name and read time', (): void => {
    const props = {
      authors: [
        {
          name: 'Sir Bloblog'
        }
      ],
      readTime: 15,
      date: '2019-08-14'
    };
    renderer.render(<BlogPostAuthor {...props} />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
