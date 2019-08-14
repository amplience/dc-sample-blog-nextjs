import Image from '../../common/interfaces/image.interface';
import buildMediaUrl from '../../common/services/media.service';

const ImageComponent = (image: Image) => (
  <>
    <img alt={image.altText} src={buildMediaUrl(image.image)} />
    <style jsx>{`
      img {
        width: 100%;
      }
    `}</style>
  </>
);

export default ImageComponent;
