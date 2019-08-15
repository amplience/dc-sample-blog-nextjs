import Image from '../images/image.component';
import Video from '../videos/video.component';
import Text from '../text/text.component';
import { AmplienceContent } from '../../common/interfaces/content.type';

const Content = ({ content }: AmplienceContent[]) => {
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
          return <Text text={c.text} />;
        }
      })}
    </>
  );
};

export default Content;
