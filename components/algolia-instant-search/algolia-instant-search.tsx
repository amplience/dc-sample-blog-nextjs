import React from 'react';
import { SearchClient } from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchResultList from '../algolia-search-result-list/algolia-search-result-list';

interface AlgoliaInstantSearchProps {
  indexName: string;
  resultsState: unknown;
  searchClient: SearchClient;
}

export default function AlgoliaInstantSearch({
  indexName,
  resultsState,
  searchClient
}: AlgoliaInstantSearchProps): JSX.Element {
  return (
    <InstantSearch indexName={indexName} searchClient={searchClient} resultsState={resultsState}>
      <SearchResultList></SearchResultList>
    </InstantSearch>
  );
}
