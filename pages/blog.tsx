import { NextPage } from 'next';
import BlogPost from '../common/interfaces/blog-post.interface';
import Layout from '../layouts/default';
import getBlogPost from '../common/services/blog-post.service';
import Microdata from '../components/microdata/microdata';
import { NextSeo } from 'next-seo';
import Blog from '../components/blog/blog';
import SharePost from '../components/share-post/share-post';

interface BlogPostProps {
  blogPost: BlogPost;
}

const BlogPostPage: NextPage<BlogPostProps> = ({ blogPost }: BlogPostProps) => {
  return (
    <Layout>
      <NextSeo
        title={blogPost.title}
        description={blogPost.description}
        twitter={{
          cardType: 'summary_large_image'
        }}
        openGraph={{
          title: blogPost.title,
          description: blogPost.description,
          images: [
            {
              url: 'https:' + blogPost.image.src + '?w=1080',
              width: 1080
            }
          ]
        }}
      />
      <Blog blogPost={blogPost} />
      <div className="content-footer">
        <SharePost twitterText={blogPost.title} />
      </div>
      <Microdata
        description={blogPost.description}
        headline={blogPost.title}
        imageUrl={blogPost.image.src}
        authors={blogPost.authors}
        datePublished={blogPost.date}
      />
      <style jsx>{`
        .content-footer {
          margin: auto;
          max-width: 740px;
        }
      `}</style>
    </Layout>
  );
};

BlogPostPage.getInitialProps = async ({ query }) => {
  const { vse, blogId } = query;
  let baseUrl;
  if (vse) {
    baseUrl = `//${vse.toString()}`;
  }
  try {
    const blogPostId = blogId.toString();
    const blogPost = await getBlogPost(blogPostId, baseUrl);
    return { blogPost };
  } catch (err) {
    throw err;
  }
};

export default BlogPostPage;
