import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchResultList from '../algolia-search-result-list/algolia-search-result-list';

interface AlgoliaInstantSearchProps {
  indexName: string;
  resultsState: unknown;
  appId: string;
  apiKey: string;
}

export default function AlgoliaInstantSearch({
  indexName,
  resultsState,
  appId,
  apiKey
}: AlgoliaInstantSearchProps): JSX.Element {
  const searchClient = algoliasearch(appId, apiKey);
  return (
    <InstantSearch indexName={indexName} searchClient={searchClient} resultsState={resultsState}>
      <SearchResultList></SearchResultList>
    </InstantSearch>
  );
}
