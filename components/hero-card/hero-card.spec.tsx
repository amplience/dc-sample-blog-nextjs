/* eslint-env jest */
import renderer from 'react-test-renderer';
import HeroCard from './hero-card';
import blogPostFixture from '../../tests/fixtures/single-blog-post-data-object.json';

const mockUseRouter = jest.fn();
jest.mock('next/router', () => {
  return {
    useRouter: () => mockUseRouter()
  };
});

describe('HeroCard', () => {
  test('renders full hero card', async () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { query: {} };
    });
    const component = await renderer.create(<HeroCard blogPost={blogPostFixture} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders full hero card with vse query string in link for preview', async () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { query: { vse: 'test-vse.domain' } };
    });
    const component = await renderer.create(<HeroCard blogPost={blogPostFixture} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders empty hero card when blog list is undefined', async () => {
    const props = {
      blogPosts: undefined
    };
    //@ts-ignore
    const component = await renderer.create(<HeroCard {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
