import renderer from 'react-test-renderer';
import VideoComponent from './video.component';
import Video from '../../common/interfaces/video.interface';
import { MediaType } from '../../common/interfaces/media.interface';

describe('VideoComponent', (): void => {
  it('should render an video', (): void => {
    const video: Video = {
      video: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'SampleVideo_1280x720_5mb',
        id: '721044de-d125-4a1a-8ddc-2201b9463f2d',
        mediaType: MediaType.VIDEO
      }
    };

    const wrapper = renderer.create(<VideoComponent video={video.video} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
