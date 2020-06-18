import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import AlgoliaInstantSearchProps from '../../common/interfaces/algolia-instant-search-props.interface';
import getSearchClient from '../../common/services/algolia-search-client-factory.service';
import SearchResultList from '../algolia-search-result-list/algolia-search-result-list';
import algoliasearch from 'algoliasearch';
// import SearchBox from '../algolia-search-input/algolia-search-input';

export function getClient() {}

export default function AlgoliaInstantSearch({
  indexName,
  searchState,
  resultsState,
  appId,
  searchKey
}: AlgoliaInstantSearchProps): JSX.Element {
  const searchClient = algoliasearch(appId, searchKey);
  return (
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      searchState={searchState}
      resultsState={resultsState}
    >
      <SearchBox />
      <SearchResultList></SearchResultList>
    </InstantSearch>
  );
}
