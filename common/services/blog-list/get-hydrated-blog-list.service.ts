import { BlogListData } from '../../interfaces/blog-list.interface';
import getBlogReferenceList from './get-blog-reference-list.service';
import getReferencedBlogPosts from '../blog-post/get-referenced-blog-posts.service';

export default async function getHydratedBlogList(
  blogListDeliveryKey: string,
  stagingEnvironment?: string
): Promise<BlogListData> {
  const { title, subTitle, blogPosts } = await getBlogReferenceList(blogListDeliveryKey, stagingEnvironment);
  const hydratedBlogPosts = await getReferencedBlogPosts(blogPosts, stagingEnvironment);
  return { title, subTitle, blogPosts: hydratedBlogPosts };
}
