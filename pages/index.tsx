import { NextPage } from 'next';
import Layout from '../layouts/default';
import HeroBanner from '../components/hero-banner/hero-banner';
import { Blog } from '../common/interfaces/blog.interface';
import BlogList from '../components/blog-list/blog-list';
import HeroCard from '../components/hero-card/hero-card';
import { NextSeo } from 'next-seo';
import NoBlogPosts from '../components/blog-list/no-blog-posts';
import getHydratedBlogList from '../common/services/blog-list/get-hydrated-blog-list.service';

const Index: NextPage<Blog> = ({ title, subTitle, blogPosts }) => {
  const seoParams: { [key: string]: string | boolean } = {
    title,
    description: subTitle
  };

  if (process.env.ROBOTS_META_TAG_NOINDEX === 'true') {
    seoParams.noindex = true;
  }

  return (
    <Layout>
      <NextSeo {...seoParams} />
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

Index.getInitialProps = async ({ query }): Promise<Blog> => {
  if (!process.env.DYNAMIC_CONTENT_BLOG_LIST_DELIVERY_KEY) {
    throw new Error('Missing env var DYNAMIC_CONTENT_BLOG_LIST_DELIVERY_KEY');
  }
  const stagingEnvironment = query.vse ? `//${query.vse.toString()}` : undefined;
  try {
    return getHydratedBlogList(
      process.env.DYNAMIC_CONTENT_BLOG_LIST_DELIVERY_KEY,
      stagingEnvironment
    );
  } catch (err) {
    console.error('Unable to get initial props for Index:', err);
    throw err;
  }
};

export default Index;
