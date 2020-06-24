import { BlogPostReference } from '../../interfaces/blog-reference-list.interface';
import { getBlogPostByDeliveryKey } from '../blog-post.service';
import BlogPost from '../../interfaces/blog-post.interface';
// eslint-disable-next-line
const allSettled = require('promise.allsettled');

export default async function getReferencedBlogPosts(
  blogPosts: BlogPostReference[],
  stagingEnvironment?: string
): Promise<BlogPost[]> {
  const promises = blogPosts.map(
    (reference: BlogPostReference): Promise<BlogPost> =>
      getBlogPostByDeliveryKey(reference.deliveryKey, stagingEnvironment)
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
