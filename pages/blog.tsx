import { NextPage } from 'next';
import Image from '../components/images/image.component';
import BlogPost from '../common/interfaces/blog-post.interface';
import Layout from '../layouts/default';
import getBlogPost, { parseContent } from '../common/services/blog-post.service';
import convertToBlogDate from '../common/services/blog-date.service';
import BlogPostHeroBanner from '../components/hero-banner/blog-post-hero-banner.component';
import BlogPostAuthor from '../components/blog-post-author/blog-post-author.component';
import Content from '../components/content/content';
import Microdata from '../components/microdata/microdata';

interface BlogPostProps {
  blogPost: BlogPost;
}

const BlogPostPage: NextPage<BlogPostProps> = ({ blogPost }: BlogPostProps) => {
  return (
    <Layout title={blogPost.title} description={blogPost.description}>
      <div className="content-wrapper">
        <BlogPostAuthor authors={blogPost.authors} date={blogPost.date} readTime={blogPost.readTime} />
        <BlogPostHeroBanner title={blogPost.title} subTitle={blogPost.description} />
      </div>
      <div className="blog-image">
        <Image
          altText={blogPost.image.altText}
          src={blogPost.image.src}
          dynamicImagingOptions={[{ w: 4096 }, { w: 2048 }, { w: 1080 }, { w: 414 }]}
        />
      </div>
      <div className="content-wrapper">
        <Content content={blogPost.content} />
      </div>
      <Microdata
        description={blogPost.description}
        headline={blogPost.title}
        imageUrl={blogPost.image.src}
        authors={blogPost.authors}
        datePublished={blogPost.date}
      />
      <style jsx>{`
        .content-wrapper {
          margin: auto;
          max-width: 675px;
        }

        .blog-image :global(img) {
          object-fit: cover;
          max-height: 400px;
        }

        @media (max-width: 675px) {
          .content-wrapper {
            display: block;
            padding: 0 20px;
          }
        }
      `}</style>
    </Layout>
  );
};

BlogPostPage.getInitialProps = async ({ query }) => {
  try {
    const blogPostId = query['blog-id'].toString();
    const blogPost = await getBlogPost(blogPostId);
    blogPost.content = await parseContent(blogPost.content);
    blogPost.date = convertToBlogDate(blogPost.date);
    return { blogPost };
  } catch (err) {
    throw err;
  }
};

export default BlogPostPage;
