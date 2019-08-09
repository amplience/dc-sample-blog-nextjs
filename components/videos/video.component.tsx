import Video from '../../common/interfaces/video.interface';
import buildMediaUrl from '../../common/services/media.service';

const VideoComponent = (video: Video) => {
  return (
    <video controls>
      <source src={buildMediaUrl(video.video)} />
    </video>
  );
};

export default VideoComponent;
