import { ContentClientConfig } from 'dc-delivery-sdk-js';
import { DynamicContentDeliveryService } from '../../../common/services/dynamic-content-delivery.service';
import BlogPost from '../interfaces/blog-post.interface';

export default async function getBlogPost(blogPostId: string): Promise<BlogPost> {
  const clientConfig: ContentClientConfig = {
    account: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME || '',
    baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL
  };

  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const {
    title,
    date,
    description,
    authors,
    readTime,
    image,
    urlSlug,
    content,
    tags
  } = (await deliveryClient.getContentItemById(blogPostId)).toJSON();

  return {
    title,
    date,
    description,
    authors,
    readTime,
    image,
    urlSlug,
    content,
    tags
  };
}
