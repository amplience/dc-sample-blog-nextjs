const MEDIA_HOST = process.env.DYNAMIC_CONTENT_SECURE_MEDIA_HOST || '';

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
  image: string;
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

function generateMediaPath(imagePath: string): string {
  return `//${MEDIA_HOST}/i/${imagePath}`;
}

const Picture = ({ image, sources }: PictureProps) => {
  const pictureSources = [...sources];
  const defaultSource = pictureSources[pictureSources.length - 1];
  return (
    <picture>
      {pictureSources.map((source: PictureSource, index: number) => (
        <source
          key={`source-webp-${index}`}
          srcSet={`${generateMediaPath(image)}${generateDiQueryString(source.di)}&fmt=webp 1x, ${generateMediaPath(
            image
          )}${generateDiQueryString(source.di, 2)}&fmt=webp 2x`}
          type="image/webp"
          media={source.media}
        />
      ))}
      {pictureSources.map((source: PictureSource, index: number) => (
        <source
          key={`source-${index}`}
          srcSet={`${generateMediaPath(image)}${generateDiQueryString(source.di)} 1x, ${generateMediaPath(
            image
          )}${generateDiQueryString(source.di, 2)} 2x`}
          media={source.media}
        />
      ))}
      <img src={`${generateMediaPath(image)}${generateDiQueryString(defaultSource!.di)}`} alt={image} />
    </picture>
  );
};

export default Picture;
