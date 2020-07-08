/* eslint-env jest */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import HeaderSearchBox from './header-search-box';

describe('HeaderSearchBox', () => {
  it('should render a header search box', async () => {
    const props = {
      placeholderText: 'Search box placeholder text'
    };

    const component = ShallowRenderer.createRenderer();
    component.render(<HeaderSearchBox {...props} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });
});
