import buildMediaUrl from './media.service';
import { MediaType } from '../interfaces/media.interface';

describe('media.service', (): void => {
  describe('buildMediaUrl', (): void => {
    test('should return a valid media url', (): void => {
      const media = {
        id: 'media-id',
        name: 'media-name',
        endpoint: 'media-endpoint',
        defaultHost: 'media-default-host',
        mediaType: MediaType.IMAGE
      };

      const result = buildMediaUrl(media);
      expect(result).toEqual('//media-default-host/i/media-endpoint/media-name');
    });
  });
});
