import { defaultClientConfig } from './dynamic-content-client-config';
import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { Blog, isBlog } from '../interfaces/blog.interface';

export default async function getBlogContentItem(blogDeliveryKey: string, stagingEnvironment?: string): Promise<Blog> {
  const clientConfig = { ...defaultClientConfig, baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL, stagingEnvironment };
  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const blog = (await deliveryClient.getContentItemByKey(blogDeliveryKey)).toJSON();
  if (!isBlog(blog)) {
    throw new Error(`Expecting "${blogDeliveryKey} to be a Blog Content Type`);
  }
  return blog;
}
