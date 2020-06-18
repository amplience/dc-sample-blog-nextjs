import { Image } from 'dc-delivery-sdk-js';
import { defaultClientConfig } from '../../common/services/dynamic-content-client-config';
import AmplienceImage from '../../common/interfaces/image.interface';

type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;

interface DiOptions {
  h?: number;
  w?: number;
  sm?: string;
  scaleFit?: string;
}

interface PictureSource {
  di: DiOptions;
  media?: string;
}

interface PictureProps {
  image: AmplienceImage;
  sources: ArrayOneOrMore<PictureSource>;
}

function generateDiQueryString(queryOpts: DiOptions, density = 1) {
  const diOpts = {
    ...queryOpts,
    ...(queryOpts.w ? { w: queryOpts.w * density } : {}),
    ...(queryOpts.h ? { h: queryOpts.h * density } : {}),
    ...(queryOpts.scaleFit
      ? {
          poi:
            queryOpts.scaleFit &&
            '{$this.metadata.pointOfInterest.x},{$this.metadata.pointOfInterest.y},{$this.metadata.pointOfInterest.w},{$this.metadata.pointOfInterest.h}'
        }
      : {})
  };
  const queryString = Object.entries(diOpts).map(([key, value]: any) => `&${key}=${value}`);
  return `?${queryString.join('')}`;
}

const Picture = ({ image, sources }: PictureProps) => {
  const dcImage = new Image(image.image, defaultClientConfig);
  const src = dcImage.url().build();
  const pictureSources = [...sources];
  const defaultSource = pictureSources[pictureSources.length - 1];
  return (
    <picture>
      {pictureSources.map((source: PictureSource, index: number) => (
        <source
          key={`source-webp-${index}`}
          srcSet={`${src}${generateDiQueryString(source.di)}&fmt=webp 1x, ${src}${generateDiQueryString(
            source.di,
            2
          )}&fmt=webp 2x`}
          type="image/webp"
          media={source.media}
        />
      ))}
      {pictureSources.map((source: PictureSource, index: number) => (
        <source
          key={`source-${index}`}
          srcSet={`${src}${generateDiQueryString(source.di)} 1x, ${src}${generateDiQueryString(source.di, 2)} 2x`}
          media={source.media}
        />
      ))}
      <img src={`${src}${generateDiQueryString(defaultSource!.di)}`} alt={image.altText} />
    </picture>
  );
};

export default Picture;
