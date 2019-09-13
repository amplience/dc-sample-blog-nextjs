import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { BlogReferenceList, BlogPostReference } from '../interfaces/blog-reference-list.interface';
import { BlogListData } from '../interfaces/blog-list.interface';
import getBlogPost from './blog-post.service';
import BlogPost from '../interfaces/blog-post.interface';
import { defaultClientConfig } from './dynamic-content-client-config';
// eslint-disable-next-line
const allSettled = require('promise.allsettled');

export async function getBlogReferenceList(
  blogReferenceListid: string,
  stagingEnvironment?: string
): Promise<BlogReferenceList> {
  const clientConfig = { ...defaultClientConfig, baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL, stagingEnvironment };
  const deliveryClient = new DynamicContentDeliveryService(clientConfig);
  const { blogList } = (await deliveryClient.getContentItemById(blogReferenceListid)).toJSON();
  const { title, subTitle, blogPosts = [] }: BlogReferenceList = blogList;

  return { title, subTitle, blogPosts };
}

export default async function getHydratedBlogList(
  blogListid: string,
  stagingEnvironment?: string
): Promise<BlogListData> {
  const { title, subTitle, blogPosts } = await getBlogReferenceList(blogListid, stagingEnvironment);
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

  return { title, subTitle, blogPosts: hydratedBlogPosts };
}
