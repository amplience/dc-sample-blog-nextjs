import Link from 'next/link';
import Image from '../images/image.component';
import BlogPost from '../../common/interfaces/blog-post.interface';
import theme from '../../common/styles/default/theme';
import BlogCardMeta from '../blog-card-meta/blog-card-meta';

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
          <Link href={blogLink}>
            <article>
              <div className="blog-card-image">
                <Image
                  {...{
                    ...blogPost.image,
                    dynamicImagingOptions: [
                      { h: 420, w: 320, sm: 'c' },
                      { h: 400, w: 230, sm: 'c' },
                      { h: 420, w: 684, sm: 'c' }
                    ]
                  }}
                />
              </div>
              <div className="blog-card-content">
                <h1>{blogPost.title}</h1>
                <BlogCardMeta authors={blogPost.authors} publishedDate={blogPost.date} />
                <p>{blogPost.description}</p>
              </div>
            </article>
          </Link>
        </section>
        <style jsx>{`
        article {
          width: 31%;
          flex: 1 1 0;
          font-size: ${theme.fonts.size.normal};
          display: flex;
          flex-direction: row;
          box-shadow: 0 6px 12px 2px ${theme.colors.black08};
          background: white;
          cursor: pointer;
          min-height: 400px;
        }
        
        p {
          font-size: 1.1rem;
        }

        article:hover {
          box-shadow: 0 6px 12px 2px ${theme.colors.black25};
        }
        
        .blog-card-image {
          height: 400px;
          width: 30%;
        }
        
        .blog-card-image :global(img) {
          object-fit: cover;
          height: 400px;
        }
        
        .blog-card-content {
          padding 0 20px 20px 20px;
        }

        h1 {
          font-size: ${theme.fonts.size.xLarge};
        }
        
        section {
          display: flex;
          flex-wrap: wrap;
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
          section {
            display: block;
            padding: 0 45px;
          }
          
          .blog-card-image {
            width: 100%;
            height: 135px;
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
