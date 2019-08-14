import { NextPage } from 'next';
import Layout from '../layouts/default';
import getBlogReferenceList from '../common/services/get-blog-reference-list.service';
import HeroBanner from '../components/hero-banner/hero-banner';
import getBlogPost from './blogs/services/get-blog-post.service';
import BlogPost from './blogs/interfaces/blog-post.interface';
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
    const hydratedBlogPosts: BlogPost[] = await Promise.all(
      blogPosts.map(async (reference: any) => {
        return getBlogPost(reference.id);
      })
    );

    return { title, subTitle, blogPosts: hydratedBlogPosts };
  } catch (err) {
    console.error('Unable to get initial props for Index:', err);
    throw err;
  }
};

export default Index;
