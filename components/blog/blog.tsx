import BlogPostAuthor from '../blog-post-author/blog-post-author.component';
import BlogPostHeroBanner from '../hero-banner/blog-post-hero-banner.component';
import Content from '../content/content';
import BlogPost from '../../common/interfaces/blog-post.interface';
import Picture from '../picture/picture';

const Blog = ({ blogPost }: { blogPost: BlogPost }) => {
  return (
    <>
      <div className="content-header">
        <BlogPostAuthor authors={blogPost.authors} date={blogPost.date} readTime={blogPost.readTime} />
        <BlogPostHeroBanner title={blogPost.title} subTitle={blogPost.description} />
      </div>
      <div className="blog-image">
        <Picture
          image={blogPost.image}
          sources={[
            {
              di: { w: 2048, sm: 'c', scaleFit: 'poi' },
              media: '(min-width: 1080px)'
            },
            {
              di: { w: 1080, sm: 'c', scaleFit: 'poi' },
              media: '(min-width: 768px)'
            },
            {
              di: { w: 768, sm: 'c', scaleFit: 'poi' },
              media: '(min-width: 480px)'
            },
            {
              di: { w: 480, sm: 'c', scaleFit: 'poi' }
            }
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
          width: 100%;
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
