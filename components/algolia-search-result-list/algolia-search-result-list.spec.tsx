import React from 'react';

import ShallowRenderer from 'react-test-renderer/shallow';
import SearchResultList from './algolia-search-result-list';

import blogListFixture from '../../tests/fixtures/blog-list-one-blog.json';

jest.mock('react-instantsearch-dom', () => ({
  connectStateResults: templateFn => params => templateFn(params)
}));

describe('SearchResultList', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('renders component with a multiple blog posts', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = { searchResults: blogListFixture.resultsState.rawResults[0] };

    component.render(<SearchResultList {...props} />);

    expect(component.getRenderOutput()).toMatchSnapshot();
  });

  test('renders component with no blog posts', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = { searchResults: { nbHits: 0 } };

    component.render(<SearchResultList {...props} />);

    expect(component.getRenderOutput()).toMatchSnapshot();
  });
});
