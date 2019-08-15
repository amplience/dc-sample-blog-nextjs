import Image from '../images/image.component';
import Video from '../videos/video.component';
import CodeBlock from '../code-block/code-block.component';
import { AmplienceContent } from '../../common/interfaces/content.type';
import ReactMarkdown from 'react-markdown';

const MARKDOWN_RENDERERS = {
  code: CodeBlock
};

const Content = ({ content }: { content: AmplienceContent[] }) => {
  return (
    <>
      {content.map((c: AmplienceContent) => {
        if ('image' in c) {
          return (
            <div>
              <Image altText={c.altText} src={c.src} />
            </div>
          );
        } else if ('video' in c) {
          return (
            <div>
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
    </>
  );
};

export default Content;
