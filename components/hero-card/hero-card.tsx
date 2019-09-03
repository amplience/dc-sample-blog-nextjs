import Image from '../images/image.component';
import BlogPost from '../../common/interfaces/blog-post.interface';
import theme from '../../common/styles/default/theme';
import BlogCardMeta from '../blog-card-meta/blog-card-meta';
import StaticLink from '../static-link/static-link';

interface HeroCardProps {
  blogPost: BlogPost;
}

const HeroCard = ({ blogPost }: HeroCardProps) => {
  if (!blogPost) {
    return <div />;
  } else {
    const blogLink = `/blog/${blogPost.urlSlug}/${blogPost.id}`;
    return (
      <>
        <section>
          <StaticLink ariaLabel={blogPost.title} href={blogLink}>
            <article>
              <div className="blog-card-image">
                <Image
                  {...{
                    ...blogPost.image,
                    dynamicImagingOptions: [
                      { h: 342, w: 684, sm: 'c', scaleFit: 'poi' },
                      { h: 400, w: 330, sm: 'c', scaleFit: 'poi' },
                      { h: 205, w: 410, sm: 'c', scaleFit: 'poi' }
                    ],
                    mediaSizeOptions: [
                      {
                        maxWidth: 736,
                        breakPoints: [50, 100]
                      }
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
        </section>
        <style jsx>{`
        article {
          width: 31%;
          flex: 1 1 0;
          font-size: ${theme.fonts.size.normal};
          display: flex;
          flex-direction: row;
          box-shadow: 0 20px 15px 2px ${theme.colors.black08};
          background: white;
          cursor: pointer;
          min-height: 400px;
        }
        
        p {
          font-size: ${theme.fonts.size.xLarge};
          color: ${theme.colors.doveGray};
          line-height: 1.875rem;
        }

        article:hover {
          box-shadow: 0 20px 15px 2px ${theme.colors.black25};
        }
        
        article:hover :global(.publish-date) {
          border-color: ${theme.colors.dustyGray};
        }
        
        article:hover h1, article:hover p, article:hover :global(.card-meta) {
          color: ${theme.colors.dustyGray};
        }
        
        .blog-card-image {
          width: 30%;
        }
        
        .blog-card-image :global(img) {
          object-fit: cover;
          height: 100%;
          width: 100%;
        }
        
        .blog-card-content {
          padding 0 20px 20px 20px;
        }

        h1 {
          line-height: 2.8125rem;
          font-size: ${theme.fonts.size.xxxLarge};
          font-weight: ${theme.fonts.weight.medium};
          color: ${theme.colors.mineShaft};
        }
        
        article :global(.card-meta div) {
          font-size: ${theme.fonts.size.large};
        }
        
        section {
          margin: auto;
          margin-top: 40px;
          max-width: ${theme.layout.widePageWidth};
        }

        @media (max-width: ${theme.layout.widePageWidth}) {
          section {
            max-width: 100%;
            padding: 0 20px;
          }

          article {
            margin-bottom: 55px;
          }
        }
        
        @media (max-width: ${theme.layout.narrowPageWidth}) {
          article {
            width: 100%;
            flex: initial;
            flex-direction: column;
            box-shadow: unset;
            min-height: unset;
          }

          article:hover {
            box-shadow: unset;
          }
          
          section {
            display: block;
            padding: 0 45px;
          }
          
          .blog-card-image {
            width: unset;
          }
          
          .blog-card-image :global(img) {
            object-fit: cover;
            height: 135px;
          }
        }
        
        

      `}</style>
      </>
    );
  }
};

export default HeroCard;
