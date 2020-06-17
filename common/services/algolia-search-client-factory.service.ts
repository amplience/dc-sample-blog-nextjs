import algoliasearch, { SearchClient } from 'algoliasearch';

export default function getSearchClient(): SearchClient {
  const { ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_ONLY_KEY } = process.env;

  if (!ALGOLIA_APPLICATION_ID) {
    throw new Error('Invalid configuration params, missing ALGOLIA_APPLICATION_ID');
  }

  if (!ALGOLIA_SEARCH_ONLY_KEY) {
    throw new Error('Invalid configuration params, missing ALGOLIA_SEARCH_ONLY_KEY');
  }

  return algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_ONLY_KEY);
}
