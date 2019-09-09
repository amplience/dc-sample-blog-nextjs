import { ContentClientConfig } from 'dc-delivery-sdk-js';
import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { isBlogPost, parseBlogPost, parseContent } from './blog-post.service';
import { AmplienceContent } from '../interfaces/content.type';
import BlogPost from '../interfaces/blog-post.interface';

export default async function getStagingContentItemById(
  stagingEnvironment: string,
  contentId: string
): Promise<AmplienceContent | BlogPost> {
  const clientConfig: ContentClientConfig = {
    account: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME || '',
    baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL,
    stagingEnvironment: stagingEnvironment
  };

  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const contentItem = (await deliveryClient.getContentItemById(contentId)).toJSON();

  if (isBlogPost(contentItem)) {
    const blogPost = await parseBlogPost(contentItem);
    return blogPost;
  } else {
    const content = await parseContent([contentItem]);
    return content[0];
  }
}
