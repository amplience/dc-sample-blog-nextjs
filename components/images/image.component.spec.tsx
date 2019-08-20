import renderer from 'react-test-renderer';
import Image from './image.component';
import AmplienceImage from '../../common/interfaces/image.interface';
import { MediaType } from '../../common/interfaces/media.interface';

describe('Image', (): void => {
  it('should render an image', (): void => {
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

    const wrapper = renderer.create(<Image altText={image.altText} src={image.src} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
