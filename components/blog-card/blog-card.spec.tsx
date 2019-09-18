/* eslint-env jest */
import renderer from 'react-test-renderer';
import BlogCard from './blog-card';
import blogPostFixture from '../../tests/fixtures/single-blog-post-data-object.json';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import StaticLink from '../static-link/static-link';

const mockUseRouter = jest.fn();
jest.mock('next/router', () => {
  return {
    useRouter: () => mockUseRouter()
  };
});

describe('BlogCard', () => {
  test('renders full blog card', () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { query: {} };
    });
    const component = mount(<BlogCard blogPost={blogPostFixture} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  test('renders full blog card with lazy loaded placeholders', () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { query: {} };
    });
    const component = renderer.create(<BlogCard blogPost={blogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders full blog card with vse query string in link for preview', () => {
    mockUseRouter.mockImplementationOnce(() => {
      return {
        query: { vse: 'test-vse.domain' }
      };
    });

    const component = mount(<BlogCard blogPost={blogPostFixture} />);
    expect(component.find('a').props().href).toEqual(
      '/preview?vse=test-vse.domain&content=8d6943c7-6028-4fac-b45e-57fc63bd032a'
    );
  });
});
