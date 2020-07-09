import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import HeaderFacetBar from './header-facet-bar';

jest.mock('react-instantsearch-dom', () => ({
  ...jest.requireActual('react-instantsearch-dom')
}));
describe('HeaderFaceBar component', () => {
  it('should render author and tags facet menus with a clear button', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = { tags: 'tags', authors: 'authors' };
    component.render(<HeaderFacetBar {...props} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });
});
