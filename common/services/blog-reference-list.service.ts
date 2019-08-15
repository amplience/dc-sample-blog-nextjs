import { ContentClientConfig } from 'dc-delivery-sdk-js';

import { BlogReferenceList } from '../interfaces/blog-reference-list.interface';
import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';

const getBlogReferenceList = async (id: string, clientConfig: ContentClientConfig): Promise<BlogReferenceList> => {
  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const { blogList } = (await deliveryClient.getContentItemById(id)).toJSON();
  const { title, subTitle, blogPosts = [] }: BlogReferenceList = blogList;
  return { title, subTitle, blogPosts };
};

export { getBlogReferenceList };
