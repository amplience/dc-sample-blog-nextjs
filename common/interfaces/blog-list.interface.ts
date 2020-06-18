import { SearchClient } from 'algoliasearch';

export interface BlogListData {
  title: string;
  subTitle: string;
  indexName: string;
  resultsState: unknown;
}
