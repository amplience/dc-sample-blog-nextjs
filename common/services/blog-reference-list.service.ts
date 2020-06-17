import { BlogListContent } from '../interfaces/blog-reference-list.interface';
import { defaultClientConfig } from './dynamic-content-client-config';
import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';

export async function getBlogListContent(blogListId: string, stagingEnvironment?: string): Promise<BlogListContent> {
  const clientConfig = { ...defaultClientConfig, baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL, stagingEnvironment };
  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const { blogList } = (await deliveryClient.getContentItemById(blogListId)).toJSON();
  const { title, subTitle }: BlogListContent = blogList;

  return { title, subTitle };
}
