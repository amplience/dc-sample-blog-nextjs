import Link from 'next/link';
import Image from '../images/image.component';
import BlogPost from '../../common/interfaces/blog-post.interface';
import theme from '../../common/styles/default/theme';
import BlogCardMeta from '../blog-card-meta/blog-card-meta';

interface BlogCardProps {
  blogPost: BlogPost;
}

const BlogCard = ({ blogPost }: BlogCardProps) => {
  const blogLink = `/blogs/${blogPost.urlSlug}/${blogPost.id}`;
  return (
    <>
      <Link href={blogLink}>
        <article>
          <div className="blog-card-image">
            <Image {...{ ...blogPost.image, sizes: [324, 476, 684] }} />
          </div>
          <div className="blog-card-content">
            <h1>{blogPost.title}</h1>
            <BlogCardMeta authors={blogPost.authors} publishedDate={blogPost.date} />
            <p>{blogPost.description}</p>
          </div>
        </article>
      </Link>
      <style jsx>{`
        article {
          width: 31%;
          display: flex;
          flex-direction: column;
          margin-bottom: 36px;
          box-shadow: 0 6px 12px 2px ${theme.colors.shadowLight};
          background: white;
          cursor: pointer;
          min-height: 326px;
        }

        article:hover {
          box-shadow: 0 6px 12px 2px ${theme.colors.shadowDark};
        }

        .blog-card-image :global(img) {
          height: 120px;
          max-height: 120px;
          object-fit: cover;
        }

        .blog-card-content {
          padding 0 20px 20px 20px;
        }

        h1 {
          font-size: 1.1rem;
        }

        @media (max-width: ${theme.layout.blogListWidth}) {
          article {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default BlogCard;
