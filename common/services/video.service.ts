import AmplienceVideo from '../interfaces/video.interface';
import fetch from 'isomorphic-unfetch';
import { ImageUrlBuilder, Video as DcVideo } from 'dc-delivery-sdk-js';
import { defaultClientConfig } from './dynamic-content-client-config';

export interface VideoProfile {
  media: {
    src: string;
  }[];
}

const httpsAsset = (url: string): string => `${url}?protocol=https`;

export async function getVideoSources(video: AmplienceVideo): Promise<string[]> {
  const dcVideo = new DcVideo(video.video, defaultClientConfig);
  const url = new ImageUrlBuilder(dcVideo).build();
  const videoMetaUrl = httpsAsset(`${url}.json`);

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
