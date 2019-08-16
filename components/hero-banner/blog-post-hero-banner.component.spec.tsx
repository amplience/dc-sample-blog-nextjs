/* eslint-env jest */
import renderer from 'react-test-renderer';
import BlogPostHeroBanner from './blog-post-hero-banner.component';

describe('BlogPostHeroBanner', () => {
  test('renders hero banner with title and subtitle', async () => {
    const props = {
      title: 'Test title',
      subTitle: 'Test subtitle'
    };
    const component = await renderer.create(<BlogPostHeroBanner {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders hero banner with title only', async () => {
    const props = {
      title: 'Test title'
    };
    const component = await renderer.create(<BlogPostHeroBanner {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
