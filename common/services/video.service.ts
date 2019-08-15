import buildMediaUrl from './media.service';
import AmplienceVideo from '../interfaces/video.interface';

interface VideoProfile {
  media: [
    {
      src: string;
    }
  ];
}

export async function getVideoUrl(video: AmplienceVideo): Promise<string> {
  const videoMetaUrl = `${buildMediaUrl(video.video)}.json`;

  try {
    const res = await fetch(videoMetaUrl);
    const videoProfile: VideoProfile = await res.json();

    if (videoProfile.media.length < 1) {
      return '';
    }

    return videoProfile.media[0].src;
  } catch (e) {
    throw e;
  }
}
