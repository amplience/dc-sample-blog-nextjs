/* eslint-env jest */
import React from 'react';

import algoliasearch from 'algoliasearch';

import ShallowRenderer from 'react-test-renderer/shallow';
import AlgoliaInstantSearch from './algolia-instant-search';

jest.mock('algoliasearch', () => jest.fn().mockImplementation(() => ({})));
jest.mock('../algolia-search-result-list/algolia-search-result-list');

describe('AlgoliaInstantSearch', () => {
  test('renders component', async () => {
    const component = ShallowRenderer.createRenderer();
    const props = {
      appId: 'test-app-id',
      searchKey: 'test-search-key',
      indexName: 'test-index-name',
      resultsState: {
        testResultStateData: 'test result state value'
      }
    };
    component.render(<AlgoliaInstantSearch {...props} />);

    expect(algoliasearch).toHaveBeenCalledWith(props.appId, props.searchKey);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });
});
