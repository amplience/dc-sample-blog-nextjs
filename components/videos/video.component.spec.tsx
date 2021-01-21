import React from 'react';
import renderer from 'react-test-renderer';
import Video from './video.component';
import AmplienceVideo from '../../common/interfaces/video.interface';

describe('Video', (): void => {
  it('should render an video', (): void => {
    const video: AmplienceVideo = {
      video: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'SampleVideo_1280x720_5mb',
        id: '721044de-d125-4a1a-8ddc-2201b9463f2d'
      },
      srcSet: ['http://i1-qa.adis.ws/v/bloblogltd/SampleVideo_1280x720_5mb/mp4_240p']
    };

    const wrapper = renderer.create(<Video {...video} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render nothing when srcSet array is undefined', (): void => {
    const video: AmplienceVideo = {
      video: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'SampleVideo_1280x720_5mb',
        id: '721044de-d125-4a1a-8ddc-2201b9463f2d'
      }
    };

    const wrapper = renderer.create(<Video {...video} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
