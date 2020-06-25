import BlogPost from '../interfaces/blog-post.interface';
import { DefaultContentBody } from 'dc-delivery-sdk-js';
import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { AmplienceContent } from '../interfaces/content.type';
import { getVideoSources } from './video.service';
import convertToBlogDate from './blog-date.service';
import { defaultClientConfig } from './dynamic-content-client-config';

export async function parseContent(content: AmplienceContent[]): Promise<AmplienceContent[]> {
  const updatedContent: AmplienceContent[] = [];

  for (const c of content) {
    if ('video' in c) {
      c.srcSet = await getVideoSources(c);
    }
    updatedContent.push(c);
  }

  return updatedContent;
}

export function isBlogPost(contentItem: DefaultContentBody): contentItem is BlogPost & DefaultContentBody {
  const blogPost = contentItem as BlogPost;
  return (
    blogPost.title !== undefined &&
    blogPost.authors !== undefined &&
    blogPost.date !== undefined &&
    blogPost.description !== undefined &&
    blogPost.image !== undefined &&
    blogPost.readTime !== undefined &&
    blogPost.content !== undefined
  );
}

export async function parseBlogPost(contentItem: BlogPost & DefaultContentBody): Promise<BlogPost> {
  const { _meta, title, date, description, authors, readTime, image, content, tags } = contentItem;

  return {
    _meta,
    id: contentItem._meta.deliveryId,
    title,
    date: convertToBlogDate(date),
    description,
    authors,
    readTime,
    image,
    content: await parseContent(content),
    tags
  };
}

export async function getBlogPostByDeliveryId(id: string, stagingEnvironment?: string): Promise<BlogPost> {
  const clientConfig = { ...defaultClientConfig, baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL, stagingEnvironment };

  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const contentItem = (await deliveryClient.getContentItemById(id)).toJSON();
  if (!isBlogPost(contentItem)) {
    throw new Error('Content Item is not a Blog Post');
  }
  return await parseBlogPost(contentItem);
}

export async function getBlogPostByDeliveryKey(key: string, stagingEnvironment?: string): Promise<BlogPost> {
  const clientConfig = { ...defaultClientConfig, baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL, stagingEnvironment };

  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const contentItem = (await deliveryClient.getContentItemByKey(key)).toJSON();
  if (!isBlogPost(contentItem)) {
    throw new Error('Content Item is not a Blog Post');
  }
  return await parseBlogPost(contentItem);
}
