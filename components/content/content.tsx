import Image from '../images/image.component';
import Video from '../videos/video.component';
import { AmplienceContent } from '../../common/interfaces/content.type';
import ReactMarkdown from 'react-markdown';
import markdown from '../markdown-renderers/markdown';
import theme from '../../common/styles/default/theme';

const MARKDOWN_RENDERERS = { ...markdown };

const Content = ({ content }: { content: AmplienceContent[] }) => {
  return (
    <>
      <section>
        {content.map((c: AmplienceContent, index: number) => {
          if ('image' in c) {
            return (
              <div key={c.image.id}>
                <Image
                  altText={c.altText}
                  src={c.src}
                  dynamicImagingOptions={[{ w: 675, scaleFit: 'poi' }, { w: 374, scaleFit: 'poi' }]}
                />
              </div>
            );
          } else if ('video' in c) {
            return (
              <div key={c.video.id} className="blog-post-video">
                <Video video={c.video} srcSet={c.srcSet} />
              </div>
            );
          } else if ('text' in c) {
            return (
              <div key={`text${index}`}>
                <ReactMarkdown source={c.text} renderers={MARKDOWN_RENDERERS} />
              </div>
            );
          }
        })}
      </section>
      <style jsx>{`
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

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section > div:first-child {
            margin-top: 15px;
          }

          section :global(pre) {
            font-size: ${theme.fonts.size.small};
          }
        }
      `}</style>
    </>
  );
};

export default Content;
