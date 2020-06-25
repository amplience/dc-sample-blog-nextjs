/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import PageLoader from './page-loader';
import { shallow } from 'enzyme';

describe('PageLoader', () => {
  test('renders page loader', async () => {
    const component = await renderer.create(<PageLoader />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prevents on click events when loaded', () => {
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    const wrapper = shallow(<PageLoader />);
    wrapper
      .find('div.page-loading')
      .simulate('click', { preventDefault: mockPreventDefault, stopPropagation: mockStopPropagation });

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockStopPropagation).toHaveBeenCalled();
  });
});
