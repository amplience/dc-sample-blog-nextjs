import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import SearchResultList from '../algolia-search-result-list/algolia-search-result-list';

interface AlgoliaInstantSearchProps {
  indexName: string;
  resultsState: unknown;
  appId: string;
  searchKey: string;
}

export default function AlgoliaInstantSearch({
  indexName,
  resultsState,
  appId,
  searchKey
}: AlgoliaInstantSearchProps): JSX.Element {
  const searchClient = algoliasearch(appId, searchKey);
  return (
    <InstantSearch indexName={indexName} searchClient={searchClient} resultsState={resultsState}>
      <SearchBox />
      <SearchResultList></SearchResultList>
    </InstantSearch>
  );
}
