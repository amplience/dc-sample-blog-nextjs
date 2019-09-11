/* eslint-env jest */
import renderer from 'react-test-renderer';
import RouteChangeLoader from './route-change-loader';
// @ts-ignore
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
});
