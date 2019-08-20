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
            <Image {...blogPost.image} />
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
          width: 31.5%;
          display: flex;
          flex-direction: column;
          margin-bottom: 55px;
          box-shadow: 0 20px 25px 0 ${theme.colors.black08};
          background: white;
          cursor: pointer;
          min-height: 400px;
        }

        article:hover,
        article:hover h1,
        article:hover p,
        article:hover :global(.card-meta) {
          color: ${theme.colors.dustyGray};
        }

        article:hover {
          box-shadow: 0 20px 14px 2px ${theme.colors.black25};
        }

        .blog-card-image {
          height: 135px;
        }

        .blog-card-image :global(img) {
          object-fit: cover;
          max-height: 135px;
        }

        .blog-card-content {
          padding 0 20px 20px 20px;
        }

        article, h1, p, article :global(.card-meta) {
          transition-property: color, box-shadow;
          transition-duration: 0.3s;
        }

        h1 {
          color: ${theme.colors.mineShaft};
          font-size: 1.5rem;
          font-weight: ${theme.fonts.weight.medium};
          line-height: 1.875rem;
        }

        p {
          color: ${theme.colors.doveGray};
          font-weight: ${theme.fonts.weight.regular};
          line-height: 1.5rem;
        }

        @media (max-width: ${theme.layout.widePageWidth}) {
          article {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default BlogCard;
