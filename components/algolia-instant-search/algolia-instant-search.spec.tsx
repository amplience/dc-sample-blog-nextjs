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
    const mockSearchClient = algoliasearch('id', 'key'); 
    const props = {
      searchClient: mockSearchClient,
      indexName: 'test-index-name',
      resultsState: {
        testResultStateData: 'test result state value'
      }
    };
    component.render(<AlgoliaInstantSearch {...props} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });
});
