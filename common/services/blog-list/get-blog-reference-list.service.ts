import { DynamicContentDeliveryService } from '../dynamic-content-delivery.service';
import { BlogReferenceList, BlogPostReference } from '../../interfaces/blog-reference-list.interface';
import { defaultClientConfig } from '../dynamic-content-client-config';
import algoliasearch from 'algoliasearch';

const INDEX_HITS_PER_PAGE = 1000;

export default async function getBlogReferenceList(
  blogListDeliveryKey: string,
  stagingEnvironment?: string
): Promise<BlogReferenceList> {
  if (
    !process.env.ALGOLIA_APPLICATION_ID ||
    !process.env.ALGOLIA_SEARCH_ONLY_KEY ||
    !process.env.ALGOLIA_PRODUCTION_INDEX_NAME
  ) {
    throw new Error('Missing Algolia configuration, please refer the readme');
  }
  // get the blogPost from the algolia index
  const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_SEARCH_ONLY_KEY);
  const index = client.initIndex(process.env.ALGOLIA_PRODUCTION_INDEX_NAME);

  const results = await index.search<BlogPostReference>('', {
    attributesToRetrieve: ['deliveryKey'],
    attributesToHighlight: [],
    hitsPerPage: INDEX_HITS_PER_PAGE
  });

  // get the title and subTitle from DC
  const clientConfig = { ...defaultClientConfig, baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL, stagingEnvironment };
  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const { title, subTitle } = (await deliveryClient.getContentItemByKey(blogListDeliveryKey)).toJSON();

  return { title, subTitle, blogPosts: results.hits };
}
