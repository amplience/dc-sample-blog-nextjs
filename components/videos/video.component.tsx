import AmplienceVideo from '../../common/interfaces/video.interface';

const Video = (video: AmplienceVideo) => {
  return (
    <video controls>
      <source src={video.src} />
    </video>
  );
};

export default Video;
