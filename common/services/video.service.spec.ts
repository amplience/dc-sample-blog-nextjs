import { VideoProfile, getVideoSources } from './video.service';

const mockFetch = jest.fn();
jest.mock('isomorphic-unfetch', (): {} => {
  return (): Function => mockFetch();
});

describe('video.service', (): void => {
  describe('getVideoSources', (): void => {
    test('should return array containing a media src with https query string protocol', async (): Promise<void> => {
      mockFetch.mockImplementationOnce((): { json: Function; status: number } => {
        return {
          json(): VideoProfile {
            return { media: [{ src: 'test-video-src' }] };
          },
          status: 200
        };
      });
      const video = {
        video: {
          id: 'video-id',
          name: 'video-name',
          endpoint: 'video-endpoint',
          defaultHost: 'video-default-host',
          mediaType: 'v'
        }
      };
      const result = await getVideoSources(video);
      expect(result).toEqual(['test-video-src?protocol=https']);
    });

    test('should return array containing an empty array when api returns no sources', async (): Promise<void> => {
      mockFetch.mockImplementationOnce((): { json: Function; status: number } => {
        return {
          json(): VideoProfile {
            //@ts-ignore - so we can return and empty array from the fetch request
            return { media: [] };
          },
          status: 200
        };
      });
      const video = {
        video: {
          id: 'video-id',
          name: 'video-name',
          endpoint: 'video-endpoint',
          defaultHost: 'video-default-host'
        }
      };
      const result = await getVideoSources(video);
      expect(result).toEqual([]);
    });

    test('should throw', async (): Promise<void> => {
      mockFetch.mockImplementationOnce((): { status: number } => {
        return {
          status: 500
        };
      });
      const video = {
        video: {
          id: 'video-id',
          name: 'video-name',
          endpoint: 'video-endpoint',
          defaultHost: 'video-default-host'
        }
      };
      await expect(getVideoSources(video)).rejects.toThrowError(
        `Unable to parse video meta data, API responded with a 500`
      );
    });
  });
});
