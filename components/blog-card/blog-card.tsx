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
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px 0 ${theme.colors.black08};
          background: white;
          cursor: pointer;
          min-height: 400px;
          min-width: 324px;
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
          padding: 15px;
        }

        article,
        h1,
        p,
        article :global(.card-meta) {
          transition-property: color, box-shadow;
          transition-duration: 0.3s;
        }

        h1 {
          color: ${theme.colors.mineShaft};
          font-size: ${theme.fonts.size.xLarge};
          font-weight: ${theme.fonts.weight.medium};
          line-height: 1.875rem;
          margin-top: 0;
          margin-bottom: 12px;
        }

        p {
          color: ${theme.colors.doveGray};
          font-weight: ${theme.fonts.weight.regular};
          line-height: ${theme.fonts.size.xLarge};
          margin-bottom: 0;
        }

        @media (max-width: ${theme.layout.widePageWidth}) {
          article {
            min-width: 100%;
            margin-bottom: 60px;
          }
        }
        @media (max-width: ${theme.layout.narrowPageWidth}) {
          article {
            min-height: unset;
            box-shadow: unset;
          }

          article:hover {
            box-shadow: unset;
          }
        }
      `}</style>
    </>
  );
};

export default BlogCard;
