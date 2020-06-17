import { InstantSearch, InstantSearchProps, SearchBox } from 'react-instantsearch-dom';
import SearchResultList from '../algolia-search-result-list/algolia-search-result-list';
// import SearchBox from '../algolia-search-input/algolia-search-input';

export default function AlgoliaInstantSearch({
  searchClient,
  indexName,
  searchState,
  resultsState
}: InstantSearchProps): JSX.Element {
  console.log(searchClient);
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
