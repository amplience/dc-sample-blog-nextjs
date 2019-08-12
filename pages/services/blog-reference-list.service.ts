import { ContentClientConfig } from 'dc-delivery-sdk-js';

import { DynamicContentDeliveryService } from '../../common/services/dynamic-content-delivery.service';
import { BlogReferenceList } from '../interfaces/blog-reference-list.interface';

const getBlogReferenceList = async (id: string, clientConfig: ContentClientConfig): Promise<BlogReferenceList> => {
  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const { blogList } = (await deliveryClient.getContentItemById(id)).toJSON();
  const { title, subTitle, blogPosts = [] }: BlogReferenceList = blogList;
  return { title, subTitle, blogPosts };
};

export { getBlogReferenceList };
