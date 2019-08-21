import AmplienceVideo from '../../common/interfaces/video.interface';

const Video = (video: AmplienceVideo) => {
  return (
    <video controls>
      <source src={video.src} />
      <style jsx>{`
        video {
          width: 100%;
        }
      `}</style>
    </video>
  );
};

export default Video;
