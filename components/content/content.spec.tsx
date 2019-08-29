import ShallowRenderer from 'react-test-renderer/shallow';
import Content from './content';
import { AmplienceContent } from '../../common/interfaces/content.type';
import { MediaType } from '../../common/interfaces/media.interface';

describe('Content', (): void => {
  let renderer;
  beforeEach(() => {
    renderer = ShallowRenderer.createRenderer();
  });
  it('should render different types of content - text, image and video', (): void => {
    const content: AmplienceContent[] = [
      {
        image: {
          defaultHost: 'i1-qa.adis.ws',
          endpoint: 'bloblogltd',
          name: 'casual-wear',
          id: 'e1b511d2-1a33-47e7-8dc7-f460534cb0c7',
          mediaType: MediaType.IMAGE
        },
        altText: 'Casual crotch shot',
        src: '//i1-qa.adis.ws/i/bloblogltd/casual-wear'
      },
      {
        text:
          '# This is my first Bloblog\n\nThis is some sample text.\n\n## Look-a-header\n\nThis is some more sample text'
      },
      {
        video: {
          defaultHost: 'i1-qa.adis.ws',
          endpoint: 'bloblogltd',
          name: 'SampleVideo_1280x720_5mb',
          id: '721044de-d125-4a1a-8ddc-2201b9463f2d',
          mediaType: MediaType.VIDEO
        },
        srcSet: ['http://i1-qa.adis.ws/v/bloblogltd/SampleVideo_1280x720_5mb/mp4_240p']
      }
    ];

    renderer.render(<Content content={content} />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
