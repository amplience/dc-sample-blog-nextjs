import { NextPage } from 'next';
import Layout from '../layouts/default';
import HeroBanner from '../components/hero-banner/hero-banner';
import { BlogListData } from '../common/interfaces/blog-list.interface';
import BlogList from '../components/blog-list/blog-list';
import HeroCard from '../components/hero-card/hero-card';
import { NextSeo } from 'next-seo';
import getHydratedBlogList from '../common/services/blog-reference-list.service';
import NoBlogPosts from '../components/blog-list/no-blog-posts';

const Index: NextPage<BlogListData> = ({ title, subTitle, blogPosts }) => {
  return (
    <Layout>
      <NextSeo title={title} description={subTitle} />
      <HeroBanner title={title} subTitle={subTitle} />
      {blogPosts.length ? (
        <>
          <HeroCard blogPost={blogPosts[0]} />
          <BlogList blogPosts={blogPosts.slice(1)} />
        </>
      ) : (
        <NoBlogPosts />
      )}

      <style jsx>{`
        :global(footer) {
          margin-top: 120px;
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async ({ query }): Promise<BlogListData> => {
  const stagingEnvironment = query.vse ? `//${query.vse.toString()}` : undefined;
  const id: string = process.env.DYNAMIC_CONTENT_REFERENCE_ID || '';
  try {
    return getHydratedBlogList(id, stagingEnvironment);
  } catch (err) {
    console.error('Unable to get initial props for Index:', err);
    throw err;
  }
};

export default Index;
