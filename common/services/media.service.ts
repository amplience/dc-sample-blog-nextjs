import Media from '../interfaces/media.interface';

export default function buildMediaUrl(media: Media): string {
  return `//${media.defaultHost}/i/${media.endpoint}/${media.name}`;
}
