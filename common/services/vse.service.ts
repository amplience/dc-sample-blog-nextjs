import { ContentClientConfig } from 'dc-delivery-sdk-js';
import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { parseContent } from './blog-post.service';
import { AmplienceContent } from '../interfaces/content.type';

export default async function getStagingContentItemById(
  stagingEnvironment: string,
  contentId: string
): Promise<AmplienceContent[]> {
  const clientConfig: ContentClientConfig = {
    account: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME || '',
    baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL,
    stagingEnvironment: stagingEnvironment
  };

  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const contentItem = (await deliveryClient.getContentItemById(contentId)).toJSON();
  return await parseContent([contentItem]);
}
