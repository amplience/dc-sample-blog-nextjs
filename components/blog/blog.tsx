import BlogPostAuthor from '../blog-post-author/blog-post-author.component';
import BlogPostHeroBanner from '../hero-banner/blog-post-hero-banner.component';
import Image from '../images/image.component';
import Content from '../content/content';
import BlogPost from '../../common/interfaces/blog-post.interface';

const Blog = ({blogPost}: { blogPost: BlogPost }) => {
  return (
    <>
      <div className="content-header">
        <BlogPostAuthor authors={blogPost.authors} date={blogPost.date} readTime={blogPost.readTime} />
        <BlogPostHeroBanner title={blogPost.title} subTitle={blogPost.description} />
      </div>
      <div className="blog-image">
        <Image
          altText={blogPost.image.altText}
          src={blogPost.image.src}
          dynamicImagingOptions={[
            { h: 400, w: 2048, sm: 'c', scaleFit: 'poi' },
            { h: 400, w: 1080, sm: 'c', scaleFit: 'poi' },
            { h: 400, w: 768, sm: 'c', scaleFit: 'poi' },
            { h: 200, w: 480, sm: 'c', scaleFit: 'poi' }
          ]}
        />
      </div>
      <div className="content-wrapper">
        <Content content={blogPost.content} />
      </div>
      <style jsx>{`
        .content-header {
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
          margin-bottom: 75px;
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
    </>
  );
};

export default Blog;
