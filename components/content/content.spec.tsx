/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import Content from './content';

describe('Content', (): void => {
  let component;
  beforeEach(() => {
    component = ShallowRenderer.createRenderer();
  });
  it('should render different types of content - text, image and video', (): void => {
    const content = [
      {
        image: {
          defaultHost: 'i1-qa.adis.ws',
          endpoint: 'bloblogltd',
          name: 'casual-wear',
          id: 'e1b511d2-1a33-47e7-8dc7-f460534cb0c7'
        },
        altText: 'Casual crotch shot'
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
          id: '721044de-d125-4a1a-8ddc-2201b9463f2d'
        },
        srcSet: ['http://i1-qa.adis.ws/v/bloblogltd/SampleVideo_1280x720_5mb/mp4_240p']
      }
    ];

    component.render(<Content content={content} />);
    expect(component.getRenderOutput()).toMatchSnapshot();
  });

  it('should render different types of content intially with placeholders - text, image and video', (): void => {
    const content = [
      {
        image: {
          defaultHost: 'i1-qa.adis.ws',
          endpoint: 'bloblogltd',
          name: 'casual-wear',
          id: 'e1b511d2-1a33-47e7-8dc7-f460534cb0c7'
        },
        altText: 'Casual crotch shot'
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
          id: '721044de-d125-4a1a-8ddc-2201b9463f2d'
        },
        srcSet: ['http://i1-qa.adis.ws/v/bloblogltd/SampleVideo_1280x720_5mb/mp4_240p']
      }
    ];

    const component = renderer.create(<Content content={content} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
