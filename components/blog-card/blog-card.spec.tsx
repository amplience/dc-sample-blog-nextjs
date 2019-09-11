/* eslint-env jest */
import renderer from 'react-test-renderer';
import BlogCard from './blog-card';
import blogPostFixture from '../../tests/fixtures/single-blog-post-data-object.json';

const mockUseRouter = jest.fn();
jest.mock('next/router', () => {
  return {
    useRouter: () => mockUseRouter()
  };
});

describe('BlogCard', () => {
  test('renders full blog card', async () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { query: {} };
    });
    const component = await renderer.create(<BlogCard blogPost={blogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders full blog card with vse query string in link for preview', async () => {
    mockUseRouter.mockImplementationOnce(() => {
      return {
        query: { vse: 'test-vse.domain' }
      };
    });
    const component = await renderer.create(<BlogCard blogPost={blogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
