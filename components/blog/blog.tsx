import BlogPostAuthor from '../blog-post-author/blog-post-author.component';
import BlogPostHeroBanner from '../hero-banner/blog-post-hero-banner.component';
import Image from '../images/image.component';
import Content from '../content/content';
import BlogPost from '../../common/interfaces/blog-post.interface';

const Blog = ({ blogPost }: { blogPost: BlogPost }) => {
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
            { w: 2048, scaleFit: 'poi' },
            { w: 1080, scaleFit: 'poi' },
            { w: 768, scaleFit: 'poi' },
            { w: 480, scaleFit: 'poi' }
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
        }
      `}</style>
    </>
  );
};

export default Blog;
