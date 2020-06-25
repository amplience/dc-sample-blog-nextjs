/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import RouteChangeLoader from './route-change-loader';
import { mockRouterOn } from 'next/router';
import { shallow } from 'enzyme';

describe('RouteChangeLoader', () => {
  test('renders route change loader when loading', async () => {
    const wrapper = shallow(<RouteChangeLoader />);
    wrapper.setState({ isLoading: true });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('renders route change loader when not loading', async () => {
    const wrapper = shallow(<RouteChangeLoader />);
    wrapper.setState({ isLoading: false });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('renders route change loader with correct event listeners', async () => {
    await renderer.create(<RouteChangeLoader />);
    expect(mockRouterOn.mock.calls[0][0]).toEqual('routeChangeStart');
    expect(mockRouterOn.mock.calls[1][0]).toEqual('routeChangeComplete');
    expect(mockRouterOn.mock.calls[2][0]).toEqual('routeChangeError');
  });
  test('renders route change loader with routeChangeStart event listener and execute function', async () => {
    let routeChangeStartCallback;
    const mockRouteChangeStartFn = (event, callback) => {
      if (event === 'routeChangeStart') {
        routeChangeStartCallback = callback;
      }
    };
    mockRouterOn.mockImplementation(mockRouteChangeStartFn);
    const wrapper = shallow(<RouteChangeLoader />);
    // forcing isLoading to true so we know it is changed by the callback
    wrapper.setState({ isLoading: false });
    routeChangeStartCallback();
    expect(wrapper.state('isLoading')).toBe(true);
  });

  test('renders route change loader with routeChangeComplete event listener and execute function', async () => {
    let routeChangeCompleteCallback;
    const mockRouteChangeComplete = (event, callback) => {
      if (event === 'routeChangeComplete') {
        routeChangeCompleteCallback = callback;
      }
    };
    mockRouterOn.mockImplementation(mockRouteChangeComplete);
    const wrapper = shallow(<RouteChangeLoader />);
    // forcing isLoading to true so we know it is changed by the callback
    wrapper.setState({ isLoading: true });
    routeChangeCompleteCallback();
    expect(wrapper.state('isLoading')).toBe(false);
  });

  test('renders route change loader with routeChangeError event listener and execute function', async () => {
    let routeChangeErrorCallback;
    const mockRouteChangeErrorComplete = (event, callback) => {
      if (event === 'routeChangeError') {
        routeChangeErrorCallback = callback;
      }
    };
    mockRouterOn.mockImplementation(mockRouteChangeErrorComplete);
    const wrapper = shallow(<RouteChangeLoader />);
    // forcing isLoading to true so we know it is changed by the callback
    wrapper.setState({ isLoading: true });
    routeChangeErrorCallback();
    expect(wrapper.state('isLoading')).toBe(false);
  });
});
