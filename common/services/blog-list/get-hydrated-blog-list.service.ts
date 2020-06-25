import { Blog } from '../../interfaces/blog.interface';
import getBlogReferenceList from './get-blog-reference-list.service';
import getReferencedBlogPosts from '../blog-post/get-referenced-blog-posts.service';

export default async function getHydratedBlogList(
  blogListDeliveryKey: string,
  stagingEnvironment?: string
): Promise<Blog> {
  const blogReferenceList = await getBlogReferenceList(blogListDeliveryKey, stagingEnvironment);
  const hydratedBlogPosts = await getReferencedBlogPosts(blogReferenceList.blogPosts, stagingEnvironment);
  return { ...blogReferenceList, blogPosts: hydratedBlogPosts };
}
