/* eslint-disable react/display-name */
/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import BlogCard from './blog-card';
import blogPostFixture from '../../tests/fixtures/single-blog-post-data-object.json';
import { mount } from 'enzyme';
import { ContentMeta } from 'dc-delivery-sdk-js';

const mockUseRouter = jest.fn();
jest.mock('search-insights');
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
      return { asPath: '' };
    });

    const component = ShallowRenderer.createRenderer();
    component.render(<BlogCard blogPost={blogPostFixture} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });

  test('renders full blog card with lazy loaded placeholders', () => {
    mockUseRouter.mockImplementationOnce(() => {
      return { asPath: '' };
    });
    const component = renderer.create(<BlogCard blogPost={blogPostFixture} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders full blog card with vse query string in link for preview', () => {
    mockUseRouter.mockImplementationOnce(() => {
      return {
        asPath: '/?vse=test-vse.domain'
      };
    });

    const component = mount(<BlogCard blogPost={blogPostFixture} />);
    expect(component.find('a').props().href).toEqual(
      '/preview?vse=test-vse.domain&content=8d6943c7-6028-4fac-b45e-57fc63bd032a'
    );
  });

  test('renders full blog card with a lower-cased deliveryId in the link', () => {
    mockUseRouter.mockImplementationOnce(() => {
      return {
        asPath: ''
      };
    });

    const _meta = { deliveryId: 'UC-DELIVERY-ID' } as ContentMeta;
    const component = mount(<BlogCard blogPost={{ ...blogPostFixture, _meta }} />);
    expect(component.find('a').props().href).toMatchInlineSnapshot(`"/blog/uc-delivery-id"`);
  });

  test('renders full blog card with a deliveryKey in the link', () => {
    mockUseRouter.mockImplementationOnce(() => {
      return {
        asPath: ''
      };
    });

    const _meta = {
      deliveryKey: 'BlogCardDeliveryKey',
      deliveryId: '8d6943c7-6028-4fac-b45e-57fc63bd032a'
    } as ContentMeta;
    const component = mount(<BlogCard blogPost={{ ...blogPostFixture, _meta }} />);
    expect(component.find('a').props().href).toMatchInlineSnapshot(`"/blog/BlogCardDeliveryKey"`);
  });
});
