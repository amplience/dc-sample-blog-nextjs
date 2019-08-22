import AmplienceVideo from '../../common/interfaces/video.interface';

const Video = (video: AmplienceVideo) => {
  return (
    <video controls>
      {video.srcSet.map((src: string) => {
        return <source key={src} src={src} />;
      })}
    </video>
  );
};

export default Video;
