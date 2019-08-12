import { ContentClientConfig } from 'dc-delivery-sdk-js';

import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { BlogReferenceList } from '../interfaces/blog-reference-list.interface';

export default async function getBlogReferenceList(blogReferenceListid: string): Promise<BlogReferenceList> {
  const clientConfig: ContentClientConfig = {
    account: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME || '',
    baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL || ''
  };
  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const { blogList } = (await deliveryClient.getContentItemById(blogReferenceListid)).toJSON();
  const { title, subTitle, blogPosts = [] }: BlogReferenceList = blogList;

  return { title, subTitle, blogPosts };
}
