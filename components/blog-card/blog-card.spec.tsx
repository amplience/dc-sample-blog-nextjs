/* eslint-disable react/display-name */
/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import BlogCard from './blog-card';
import blogPostFixture from '../../tests/fixtures/single-blog-post-data-object.json';
import { mount } from 'enzyme';

const mockUseRouter = jest.fn();
jest.mock('next/router', () => {
  return {
    useRouter: () => mockUseRouter()
  };
});

jest.mock('react-instantsearch-dom', () => ({
  ...jest.requireActual('react-instantsearch-core'),
  Highlight: () => {
    return <></>;
  }
}));

describe('BlogCard', () => {
  test('renders full blog card', () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { query: {} };
    });

    const component = ShallowRenderer.createRenderer();
    component.render(<BlogCard blogPost={blogPostFixture} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
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
