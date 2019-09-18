/* eslint-env jest */
import ShallowRenderer from 'react-test-renderer/shallow';
import Blog from './blog';
import blogPostFixture from '../../tests/fixtures/single-blog-post-data-object.json';

describe('Blog', () => {
  test('renders full blog', async () => {
    const component = ShallowRenderer.createRenderer();
    component.render(<Blog blogPost={blogPostFixture} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });
});
