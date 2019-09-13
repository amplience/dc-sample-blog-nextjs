/* eslint-env jest */
import renderer from 'react-test-renderer';
import Blog from './blog';
import blogPostFixture from '../../tests/fixtures/single-blog-post-data-object.json';

jest.mock('../images/image.component', () => () => <div className="image-mock" />);
jest.mock('../blog-card-meta/blog-card-meta', () => () => <div className="blog-card-meta-mock" />);

describe('Blog', () => {
  test('renders full blog', async () => {
    const component = renderer.create(<Blog blogPost={blogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
