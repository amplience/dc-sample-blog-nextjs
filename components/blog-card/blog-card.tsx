import Image from '../images/image.component';
import BlogPost from '../../common/interfaces/blog-post.interface';
import theme from '../../common/styles/default/theme';
import BlogCardMeta from '../blog-card-meta/blog-card-meta';
import StaticLink from '../static-link/static-link';
import { useRouter } from 'next/router';

interface BlogCardProps {
  blogPost: BlogPost;
}

const BlogCard = ({ blogPost }: BlogCardProps) => {
  const router = useRouter();
  const { vse } = router.query;
  const routerQuery = vse ? `?vse=${vse}&content=${blogPost.id}` : '';
  const path = vse ? '/preview' : `/blog/${encodeURIComponent(blogPost.urlSlug.toLowerCase())}`;
  const blogLink = `${path}${routerQuery}`;
  return (
    <section>
      <StaticLink ariaLabel={blogPost.title} href={blogLink}>
        <article>
          <div className="blog-card-image">
            <Image
              {...{
                ...blogPost.image,
                dynamicImagingOptions: [
                  { h: 140, w: 285, sm: 'c', scaleFit: 'poi' },
                  { h: 140, w: 321, sm: 'c', scaleFit: 'poi' },
                  { h: 140, w: 345, sm: 'c', scaleFit: 'poi' }
                ],
                mediaQueryOptions: [
                  { mediaFeature: 'max-width', mediaSize: '320px', containerSize: '285px' },
                  { mediaFeature: 'max-width', mediaSize: '480px', containerSize: '321px' },
                  { mediaFeature: 'min-width', mediaSize: theme.layout.narrowPageWidth, containerSize: '350px' },
                  { mediaSize: '345px' }
                ]
              }}
            />
          </div>
          <div className="blog-card-content">
            <h1>{blogPost.title}</h1>
            <BlogCardMeta authors={blogPost.authors} publishedDate={blogPost.date} readTime={blogPost.readTime} />
            <p>{blogPost.description}</p>
          </div>
        </article>
      </StaticLink>
      <style jsx>{`
        section {
          display: flex;
        }
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

        .blog-card-image :global(img) {
          object-fit: cover;
          width: 100%;
          height: 135px;
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
          font-size: ${theme.fonts.size.xxLarge};
          font-weight: ${theme.fonts.weight.medium};
          line-height: 1.875rem;
          margin-top: 0;
          margin-bottom: 12px;
        }

        p {
          color: ${theme.colors.doveGray};
          font-weight: ${theme.fonts.weight.regular};
          line-height: ${theme.fonts.size.xxLarge};
          margin-bottom: 0;
        }

        @media (max-width: ${theme.layout.widePageWidth}) {
          section {
            margin-bottom: 60px;
          }
          article {
            min-width: 100%;
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
    </section>
  );
};

export default BlogCard;
