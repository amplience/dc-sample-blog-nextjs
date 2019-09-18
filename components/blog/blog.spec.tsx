/* eslint-env jest */
import renderer from 'react-test-renderer';
import Blog from './blog';
import blogPostFixture from '../../tests/fixtures/single-blog-post-data-object.json';

describe('Blog', () => {
  test('renders full blog', async () => {
    const component = renderer.create(<Blog blogPost={blogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
