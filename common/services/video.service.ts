import buildMediaUrl from './media.service';
import AmplienceVideo from '../interfaces/video.interface';
import fetch from 'isomorphic-unfetch';

interface VideoProfile {
  media: [
    {
      src: string;
    }
  ];
}

const httpsAsset = (url: string): string => `${url}?protocol=https`;

export async function getVideoSources(video: AmplienceVideo): Promise<string[]> {
  const videoMetaUrl = httpsAsset(`${buildMediaUrl(video.video)}.json`);

  try {
    const res = await fetch(videoMetaUrl);

    if (res.status !== 200) {
      throw new Error(`Unable to parse video meta data, API responded with a ${res.status}`);
    }

    const videoProfile: VideoProfile = await res.json();
    if (!videoProfile.media || videoProfile.media.length < 1) {
      return [];
    }

    return videoProfile.media.map((media: { src: string }): string => httpsAsset(media.src));
  } catch (e) {
    throw e;
  }
}
