import Media from '../interfaces/media.interface';

export default function buildMediaUrl(media: Media): string {
  return `//${media.defaultHost}/${media.mediaType}/${media.endpoint}/${encodeURIComponent(media.name)}`;
}
