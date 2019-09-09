import renderer from 'react-test-renderer';
import Video from './video.component';
import AmplienceVideo from '../../common/interfaces/video.interface';
import { MediaType } from '../../common/interfaces/media.interface';

describe('Video', (): void => {
  it('should render an video', (): void => {
    const video: AmplienceVideo = {
      video: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'SampleVideo_1280x720_5mb',
        id: '721044de-d125-4a1a-8ddc-2201b9463f2d',
        mediaType: MediaType.VIDEO
      },
      srcSet: ['http://i1-qa.adis.ws/v/bloblogltd/SampleVideo_1280x720_5mb/mp4_240p']
    };

    const wrapper = renderer.create(<Video video={video.video} srcSet={video.srcSet} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an video', (): void => {
    const video: AmplienceVideo = {
      video: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'SampleVideo_1280x720_5mb',
        id: '721044de-d125-4a1a-8ddc-2201b9463f2d',
        mediaType: MediaType.VIDEO
      },
      srcSet: []
    };

    const wrapper = renderer.create(<Video video={video.video} srcSet={video.srcSet} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
