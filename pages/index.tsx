import { NextPage } from 'next';
import Layout from '../layouts/default';
import HeroBanner from '../components/hero-banner/hero-banner';
import { BlogListData } from '../common/interfaces/blog-list.interface';
import BlogList from '../components/blog-list/blog-list';
import HeroCard from '../components/hero-card/hero-card';
import { NextSeo } from 'next-seo';
import getHydratedBlogList from '../common/services/get-blog-reference-list.service';

const Index: NextPage<BlogListData> = ({ title, subTitle, blogPosts }) => {
  const noPublishedBlogs = (
    <div className="no-published-blogs">
      <p>No blogs published yet!</p>
      <style jsx>{`
        .no-published-blogs {
          padding-top: 60px;
          display: flex;
          justify-content: center;
          min-height: 500px;
        }
      `}</style>
    </div>
  );
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
        noPublishedBlogs
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
