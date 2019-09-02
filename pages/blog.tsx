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
import SharePost from '../components/share-post/share-post';
import { NextSeo } from 'next-seo';

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
      <div className="content-header">
        <BlogPostAuthor authors={blogPost.authors} date={blogPost.date} readTime={blogPost.readTime} />
        <BlogPostHeroBanner title={blogPost.title} subTitle={blogPost.description} />
      </div>
      <div className="blog-image">
        <Image
          altText={blogPost.image.altText}
          src={blogPost.image.src}
          dynamicImagingOptions={[
            { h: 1024, w: 4096, sm: 'c', scaleFit: 'poi' },
            { h: 512, w: 2048, sm: 'c', scaleFit: 'poi' },
            { h: 270, w: 1080, sm: 'c', scaleFit: 'poi' },
            { h: 200, w: 414, sm: 'c', scaleFit: 'poi' }
          ]}
        />
      </div>
      <div className="content-wrapper">
        <Content content={blogPost.content} />
      </div>
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
        .content-header,
        .content-footer {
          margin: auto;
          max-width: 740px;
        }

        .content-wrapper {
          margin: auto;
          max-width: 675px;
          padding-bottom: 100px;
        }

        .blog-image :global(img) {
          object-fit: cover;
          height: 400px;
        }

        :global(footer) {
          margin-top: 100px;
        }

        @media (max-width: 675px) {
          .content-header,
          .content-footer,
          .content-wrapper {
            display: block;
            padding: 0 20px;
          }

          .blog-image :global(img) {
            height: 200px;
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
