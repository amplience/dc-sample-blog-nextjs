import React, { ReactElement } from 'react';
import Video from '../videos/video.component';
import { AmplienceContent } from '../../common/interfaces/content.type';
import ReactMarkdown from 'react-markdown';
import markdown from '../markdown-renderers/markdown';
import theme from '../../common/styles/default/theme';
import Picture from '../picture/picture';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const MARKDOWN_RENDERERS = { ...markdown };

const Content = ({ content }: { content: AmplienceContent[] }): ReactElement => {
  return (
    <>
      <section>
        {content.map((c: AmplienceContent, index: number) => {
          let contentComponent;

          if ('image' in c) {
            contentComponent = (
              <LazyLoadComponent key={index} placeholder={<div className="content-placeholder"></div>}>
                <div key={c.image.id}>
                  <Picture
                    image={c}
                    sources={[
                      {
                        di: { w: 675, scaleFit: 'poi' },
                        media: '(min-width: 415px)'
                      },
                      {
                        di: { w: 414, scaleFit: 'poi' }
                      }
                    ]}
                  />
                </div>
              </LazyLoadComponent>
            );
          } else if ('video' in c) {
            contentComponent = (
              <LazyLoadComponent key={index} placeholder={<div className="content-placeholder"></div>}>
                <div key={c.video.id} className="blog-post-video">
                  <Video video={c.video} srcSet={c.srcSet} />
                </div>
              </LazyLoadComponent>
            );
          } else if ('text' in c) {
            contentComponent = (
              <div key={`text${index}`}>
                <ReactMarkdown source={c.text} renderers={MARKDOWN_RENDERERS} />
              </div>
            );
          }
          return contentComponent;
        })}
      </section>
      <style jsx>{`
        .content-placeholder {
          height: 800px;
        }
        section {
          color: ${theme.colors.doveGray};
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          align-items: flex-start;
        }

        section > div {
          margin-top: 15px;
          width: 100%;
        }

        section > div:last-child {
          margin-bottom: 0;
        }

        section :global(table) {
          border-collapse: collapse;
        }

        section :global(th),
        section :global(td) {
          border: 1px solid ${theme.colors.silver};
          padding: 12px;
        }

        section :global(tr:nth-child(odd) td) {
          background-color: ${theme.colors.whiteLilac};
        }

        section :global(p:first-child) {
          margin-top: 0;
        }

        section :global(p:last-child) {
          margin-bottom: 0;
        }

        section :global(img) {
          width: 100%;
        }

        section :global(li) {
          margin-bottom: 8px;
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section > div:first-child {
            margin-top: 15px;
          }

          section :global(pre, li) {
            font-size: ${theme.fonts.size.large};
            font-weight: ${theme.fonts.weight.light};
          }
        }
      `}</style>
    </>
  );
};

export default Content;
