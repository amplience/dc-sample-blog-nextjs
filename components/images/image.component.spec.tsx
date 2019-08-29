import Image from './image.component';
import AmplienceImage from '../../common/interfaces/image.interface';
import { MediaType } from '../../common/interfaces/media.interface';

import ShallowRenderer from 'react-test-renderer/shallow';

describe('Image', (): void => {
  let renderer;
  beforeEach(() => {
    renderer = ShallowRenderer.createRenderer();
  });
  it('should render a lazy image with width only', (): void => {
    const image: AmplienceImage = {
      altText: 'altText',
      image: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'friends-shopping-bags',
        id: 'edc77f02-0e92-4b1a-88f9-711cacb5d650',
        mediaType: MediaType.IMAGE
      },
      src: '//i1-qa.adis.ws/i/bloblogltd/friends-shopping-bags'
    };

    renderer.render(
      <Image altText={image.altText} src={image.src} dynamicImagingOptions={[{ w: 800 }, { w: 600 }, { w: 400 }]} />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it('should render a lazy image with a height and width', (): void => {
    const image: AmplienceImage = {
      altText: 'altText',
      image: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'friends-shopping-bags',
        id: 'edc77f02-0e92-4b1a-88f9-711cacb5d650',
        mediaType: MediaType.IMAGE
      },
      src: '//i1-qa.adis.ws/i/bloblogltd/friends-shopping-bags'
    };

    renderer.render(<Image altText={image.altText} src={image.src} dynamicImagingOptions={[{ h: 800, w: 600 }]} />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it('should render a lazy image with a height, width and crop it', (): void => {
    const image: AmplienceImage = {
      altText: 'altText',
      image: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'friends-shopping-bags',
        id: 'edc77f02-0e92-4b1a-88f9-711cacb5d650',
        mediaType: MediaType.IMAGE
      },
      src: '//i1-qa.adis.ws/i/bloblogltd/friends-shopping-bags'
    };

    renderer.render(
      <Image altText={image.altText} src={image.src} dynamicImagingOptions={[{ h: 800, w: 600, sm: 'c' }]} />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
