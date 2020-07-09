/* eslint-disable react/display-name */
/* eslint-env jest */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import blogPostFixture from '../../tests/fixtures/single-blog-post-data-object.json';
import HeroCard from './hero-card';

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

describe('HeroCard', () => {
  test('renders full hero card', async () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { query: {} };
    });
    const component = ShallowRenderer.createRenderer();
    component.render(<HeroCard blogPost={blogPostFixture} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });

  test('renders full hero card with vse query string in link for preview', async () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { query: { vse: 'test-vse.domain' } };
    });
    const component = ShallowRenderer.createRenderer();
    component.render(<HeroCard blogPost={blogPostFixture} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });

  test('renders empty hero card when blog list is undefined', async () => {
    const props = {
      blogPosts: undefined
    };
    const component = ShallowRenderer.createRenderer();
    component.render(<HeroCard {...props} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });
});
