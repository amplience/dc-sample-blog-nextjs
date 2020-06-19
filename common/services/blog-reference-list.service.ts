import { BlogListContent, BlogPostReference } from '../interfaces/blog-reference-list.interface';
import { defaultClientConfig } from './dynamic-content-client-config';
import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import BlogPost from '../interfaces/blog-post.interface';
import getBlogPost from './blog-post.service';
import allSettled from 'promise.allsettled';

export async function getReferencedBlogPosts(
  blogPosts: BlogPostReference[],
  stagingEnvironment?: string
): Promise<BlogPost[]> {
  const promises = blogPosts.map(
    async (reference: BlogPostReference): Promise<BlogPost> => {
      return getBlogPost(reference.id, stagingEnvironment);
    }
  );
  const promiseResults = await allSettled(promises);
  const rejectedPromises = promiseResults.filter(
    (promise: { status: string }): boolean => promise.status === 'rejected'
  );

  rejectedPromises.forEach((rejectedBlog: { reason: string }): void => console.warn(`Warn: ${rejectedBlog.reason}`));
  const hydratedBlogPosts = promiseResults
    .filter((promise: { status: string }): boolean => promise.status === 'fulfilled')
    .map((resolvedPromise: { value: BlogPost }): BlogPost => resolvedPromise.value);
  return hydratedBlogPosts;
}

export async function getBlogListContent(blogListId: string, stagingEnvironment?: string): Promise<BlogListContent> {
  const clientConfig = { ...defaultClientConfig, baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL, stagingEnvironment };
  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const { blogList } = (await deliveryClient.getContentItemById(blogListId)).toJSON();
  const { title, subTitle }: BlogListContent = blogList;

  return { title, subTitle };
}
