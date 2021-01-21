import React, { ReactElement } from 'react';
import BlogPost from '../../common/interfaces/blog-post.interface';
import theme from '../../common/styles/default/theme';
import BlogCardMeta from '../blog-card-meta/blog-card-meta';
import { useRouter } from 'next/router';
import Picture from '../picture/picture';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import NextLink from '../next-link/next-link';
import { Highlight } from 'react-instantsearch-dom';
import qs from 'qs';
import TagChips from '../tag-chips/tag-chips';
import TrackClick from '../analytics/track-click/track-click';

interface BlogCardProps {
  blogPost: BlogPost;
  position: number;
  queryId: string;
}

const BlogCard = ({ blogPost, position, queryId }: BlogCardProps): ReactElement => {
  const router = useRouter();
  const parsedQueryString = qs.parse(router.asPath.substring(router.asPath.indexOf('?') + 1));
  const { vse } = parsedQueryString;
  const routerQuery = vse ? `?vse=${vse}&content=${blogPost._meta.deliveryId}` : '';

  const path = vse
    ? '/preview'
    : `/blog/${encodeURIComponent(blogPost._meta.deliveryKey || blogPost._meta.deliveryId.toLowerCase())}`;
  const blogHref = vse ? '/preview' : '/blog/[...slug]';

  return (
    <>
      <section>
        <TrackClick
          eventName="Blog list - article clicked"
          queryId={queryId}
          objectIds={[blogPost.objectID]}
          positions={[position + 1]}
        >
          <NextLink href={blogHref} as={`${path}${routerQuery}`} ariaLabel={blogPost.title}>
            <LazyLoadComponent placeholder={<div className="article-placeholder"></div>}>
              <article>
                <div className="blog-card-image">
                  <Picture
                    image={blogPost.image}
                    sources={[
                      {
                        di: {
                          sm: 'c',
                          h: 140,
                          w: 345,
                          scaleFit: 'poi'
                        },
                        media: '(min-width: 1098px)'
                      },
                      {
                        di: {
                          sm: 'c',
                          h: 140,
                          w: 728,
                          scaleFit: 'poi'
                        },
                        media: '(min-width: 728px)'
                      },
                      {
                        di: {
                          sm: 'c',
                          h: 140,
                          w: 728,
                          scaleFit: 'poi'
                        },
                        media: '(min-width: 528px)'
                      },
                      {
                        di: {
                          sm: 'c',
                          h: 140,
                          w: 528,
                          scaleFit: 'poi'
                        },
                        media: '(min-width: 415px)'
                      },
                      {
                        di: {
                          sm: 'c',
                          h: 140,
                          w: 414,
                          scaleFit: 'poi'
                        }
                      }
                    ]}
                  />
                </div>
                <div className="blog-card-content">
                  <h1>
                    <Highlight hit={blogPost} attribute="title" tagName="mark" />
                  </h1>
                  <BlogCardMeta authors={blogPost.authors} publishedDate={blogPost.date} readTime={blogPost.readTime} />
                  <p>
                    <Highlight hit={blogPost} attribute="description" tagName="mark" />
                  </p>
                  <TagChips tags={blogPost.tags} />
                </div>
              </article>
            </LazyLoadComponent>
          </NextLink>
        </TrackClick>
      </section>

      <style jsx>{`
        section {
          display: flex;
        }

        section :global(a) {
          flex: 1;
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

        .article-placeholder {
          height: 400px;
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

          h1 {
            font-weight: ${theme.fonts.weight.bold};
            line-height: unset;
            margin: 20px 0;
          }

          p {
            font-weight: ${theme.fonts.weight.light};
          }

          .blog-card-content {
            padding 0 10px 0 10px;
          }
        }
      `}</style>
    </>
  );
};

export default BlogCard;
