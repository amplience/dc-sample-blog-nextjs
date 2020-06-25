import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { defaultClientConfig } from './dynamic-content-client-config';
import { DefaultContentBody } from 'dc-delivery-sdk-js';

export default async function getStagingContentItemById(
  stagingEnvironment: string,
  contentId: string
): Promise<DefaultContentBody> {
  const clientConfig = { ...defaultClientConfig, baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL, stagingEnvironment };

  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const contentItem = (await deliveryClient.getContentItemById(contentId)).toJSON();

  return contentItem;
}
