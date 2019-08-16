import Image from '../images/image.component';
import Video from '../videos/video.component';
import CodeBlock from '../code-block/code-block.component';
import { AmplienceContent } from '../../common/interfaces/content.type';
import ReactMarkdown from 'react-markdown';
import InlineCode from '../inline-code/inline-code.component';

const MARKDOWN_RENDERERS = {
  code: CodeBlock,
  inlineCode: InlineCode
};

const Content = ({ content }: { content: AmplienceContent[] }) => {
  return (
    <>
      <section>
        {content.map((c: AmplienceContent) => {
          if ('image' in c) {
            return (
              <div>
                <Image altText={c.altText} src={c.src} />
              </div>
            );
          } else if ('video' in c) {
            return (
              <div className="blog-post-video">
                <Video video={c.video} src={c.src} />
              </div>
            );
          } else if ('text' in c) {
            return (
              <div>
                <ReactMarkdown source={c.text} renderers={MARKDOWN_RENDERERS} />
              </div>
            );
          }
        })}
      </section>
      <style jsx>{`
        section {
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          align-items: flex-start;
        }

        section div {
          width: 100%;
        }

        .blog-post-video :global(video) {
          width: 100%;
        }

        .blog-post-code {
          width: 100%;
        }

        :global(blockquote) {
          padding: 10px;
          border-left: 10px solid #ccc;
          font-size: 1rem;
          font-style: italic;
          font-weight: 300;
          color: #666;
        }

        :global(table) {
          border-collapse: collapse;
        }

        :global(th),
        :global(td) {
          border: 1px solid #666;
          padding: 5px;
        }

        :global(.inline-code) {
          padding: 3px;
          border: 1px solid pink;
          border-radius: 5px;
          background-color: #eee;
        }
      `}</style>
    </>
  );
};

export default Content;
