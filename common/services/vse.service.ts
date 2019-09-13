import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { isBlogPost, parseBlogPost, parseContent } from './blog-post.service';
import { AmplienceContent } from '../interfaces/content.type';
import BlogPost from '../interfaces/blog-post.interface';
import { defaultClientConfig } from './dynamic-content-client-config';

export default async function getStagingContentItemById(
  stagingEnvironment: string,
  contentId: string
): Promise<AmplienceContent | BlogPost> {
  const clientConfig = { ...defaultClientConfig, baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL, stagingEnvironment };

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
