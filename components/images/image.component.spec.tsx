import renderer from 'react-test-renderer';
import Image from './image.component';
import AmplienceImage from '../../common/interfaces/image.interface';
import { MediaType } from '../../common/interfaces/media.interface';

describe('Image', (): void => {
  it('should render an image with width only', (): void => {
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

    const wrapper = renderer
      .create(
        <Image altText={image.altText} src={image.src} dynamicImagingOptions={[{ w: 800 }, { w: 600 }, { w: 400 }]} />
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an image with a height and width', (): void => {
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

    const wrapper = renderer
      .create(<Image altText={image.altText} src={image.src} dynamicImagingOptions={[{ h: 800, w: 600 }]} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an image with a height, width and crop it', (): void => {
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

    const wrapper = renderer
      .create(<Image altText={image.altText} src={image.src} dynamicImagingOptions={[{ h: 800, w: 600, sm: 'c' }]} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
