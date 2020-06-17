import algoliasearch, { SearchClient } from 'algoliasearch';
import getSearchClient from './algolia-search-client-factory.service';

jest.mock('algoliasearch');

describe('algolia-search-client-factory.service', (): void => {
  let mockAlgoliaSearch: jest.Mock;
  beforeEach(() => {
    process.env.ALGOLIA_APPLICATION_ID = 'APP-ID';
    process.env.ALGOLIA_SEARCH_ONLY_KEY = 'SEARCH-KEY';
    mockAlgoliaSearch = (algoliasearch as unknown) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getSearchClient should return a searchClient', (): void => {
    mockAlgoliaSearch.mockReturnValueOnce('SEARCH_CLIENT');
    const searchClient = getSearchClient();
    expect(searchClient).toEqual('SEARCH_CLIENT');
    expect(mockAlgoliaSearch).toHaveBeenCalledTimes(1);
    expect(mockAlgoliaSearch).toHaveBeenCalledWith('APP-ID', 'SEARCH-KEY');
  });

  test('getSearchClient should throw an error when the app ID is undefined', (): void => {
    delete process.env.ALGOLIA_APPLICATION_ID;
    expect(getSearchClient).toThrowErrorMatchingInlineSnapshot(
      `"Invalid configuration params, missing ALGOLIA_APPLICATION_ID"`
    );
    expect(mockAlgoliaSearch).not.toHaveBeenCalled();
  });

  test('getSearchClient should throw an error when the search key is undefined', (): void => {
    delete process.env.ALGOLIA_SEARCH_ONLY_KEY;
    expect(getSearchClient).toThrowErrorMatchingInlineSnapshot(
      `"Invalid configuration params, missing ALGOLIA_SEARCH_ONLY_KEY"`
    );
    expect(mockAlgoliaSearch).not.toHaveBeenCalled();
  });
});
