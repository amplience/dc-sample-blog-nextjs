import AmplienceVideo from '../../common/interfaces/video.interface';

const Video = (video: AmplienceVideo) => {
  const videoSrcSet = video.srcSet || [];
  return (
    <>
      {videoSrcSet.length > 0 ? (
        <video controls>
          {videoSrcSet.map((src: string) => {
            return <source key={src} src={src} />;
          })}
          <style jsx>{`
            video {
              width: 100%;
            }
          `}</style>
        </video>
      ) : (
        ''
      )}
    </>
  );
};

export default Video;
