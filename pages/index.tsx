import { NextPage } from 'next';
import allSettled from 'promise.allsettled';
import Layout from '../layouts/default';
import getBlogReferenceList from '../common/services/get-blog-reference-list.service';
import HeroBanner from '../components/hero-banner/hero-banner';
import getBlogPost from '../common/services/get-blog-post.service';
import { BlogListData } from '../common/interfaces/blog-list.interface';
import BlogList from '../components/blog-list/blog-list';

const Index: NextPage<BlogListData> = ({ title, subTitle, blogPosts }) => {
  return (
    <Layout title={title} description={subTitle}>
      <HeroBanner title={title} subTitle={subTitle}></HeroBanner>
      <BlogList blogPosts={blogPosts} />
    </Layout>
  );
};

Index.getInitialProps = async (): Promise<BlogListData> => {
  const id: string = process.env.DYNAMIC_CONTENT_REFERENCE_ID || '';
  try {
    const { title, subTitle, blogPosts } = await getBlogReferenceList(id);
    const promises = blogPosts.map(async reference => {
      return getBlogPost(reference.id);
    });
    const promiseResults = await allSettled(promises);
    const rejectedPromises = promiseResults.filter(promise => promise.status === 'rejected');
    rejectedPromises.forEach((rejectedBlog: any) => console.warn(`Warn: ${rejectedBlog.reason}`));
    const hydratedBlogPosts = promiseResults
      .filter(promise => promise.status === 'fulfilled')
      .map((resolvedPromise: any) => resolvedPromise.value);

    return { title, subTitle, blogPosts: hydratedBlogPosts };
  } catch (err) {
    console.error('Unable to get initial props for Index:', err);
    throw err;
  }
};

export default Index;
