/* eslint-env jest */

import * as videoService from './video.service';
import { parseContent } from './blog-post.service';

jest.mock('./video.service');

const mockGetVideoSources = (videoService.getVideoSources as unknown) as jest.Mock;

const mockFetch = jest.fn();
jest.mock('isomorphic-unfetch', () => () => mockFetch());

describe('parseContent', () => {
  test('should not parse image when passed as content', async () => {
    const imageContent = {
      image: {
        defaultHost: 'i1.adis.ws',
        endpoint: 'blogltd',
        name: 'casual-wear',
        id: 'e1b511d2-1a33-47e7-8dc7-f460534cb0c7',
        _meta: {
          schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link'
        }
      },
      altText: 'alt text'
    };
    const expectedImage = JSON.parse(JSON.stringify(imageContent));

    const result = await parseContent([imageContent]);

    expect(result).toEqual([expectedImage]);
  });

  test('should parse video when passed as content', async () => {
    const videoContent = {
      video: {
        defaultHost: 'i1.adis.ws',
        endpoint: 'blogltd',
        name: 'SampleVideo_1280x720_5mb',
        id: '721044de-d125-4a1a-8ddc-2201b9463f2d',
        _meta: {
          schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/video-link'
        }
      }
    };
    const expectedImage = JSON.parse(JSON.stringify(videoContent));
    expectedImage.srcSet = ['//i1.adis.ws/v/blogltd/casual-wear?protocol=https'];

    mockFetch.mockImplementationOnce(() => {
      return {
        status: 200,
        json() {
          return {
            media: [
              {
                src: '//i1.adis.ws/v/blogltd/casual-wear'
              }
            ]
          };
        }
      };
    });

    mockGetVideoSources.mockResolvedValue(['//i1.adis.ws/v/blogltd/casual-wear?protocol=https']);
    const result = await parseContent([videoContent]);

    expect(result).toEqual([expectedImage]);
    expect(mockGetVideoSources).toHaveBeenCalled();
  });

  test('should return an empty array when no content to parse', async () => {
    const result = await parseContent([]);

    expect(result).toEqual([]);
  });
});
