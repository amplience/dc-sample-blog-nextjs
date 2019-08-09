import renderer from 'react-test-renderer';
import ImageComponent from './image.component';
import Image from '../../common/interfaces/image.interface';

describe('ImageComponent', () => {
  it('should render an image', function(): void {
    const image: Image = {
      altText: 'altText',
      image: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'friends-shopping-bags',
        id: 'edc77f02-0e92-4b1a-88f9-711cacb5d650'
      }
    };

    const wrapper = renderer.create(<ImageComponent altText={image.altText} image={image.image} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
