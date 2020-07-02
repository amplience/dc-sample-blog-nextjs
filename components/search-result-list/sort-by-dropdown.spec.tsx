import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SortByDropdown from './sort-by-dropdown';
import getIndexName from '../../common/services/get-index-name';

jest.mock('../../common/services/get-index-name');

jest.mock('react-instantsearch-dom', () => ({
  ...jest.requireActual('react-instantsearch-dom'),
  connectSortBy: templateFn => params => templateFn(params)
}));

describe('SortByDropdown', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render LoadingBlogPosts when searchResults is undefined', async () => {
    (getIndexName as jest.Mock).mockReturnValue('indexName');
    const component = ShallowRenderer.createRenderer();
    component.render(<SortByDropdown />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });
});
