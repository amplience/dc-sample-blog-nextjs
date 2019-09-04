import { LazyLoadImage } from 'react-lazy-load-image-component';

export interface DynamicImagingOptions {
  w: number;
  h?: number;
  qlt?: number;
  sm?: string;
  scaleFit?: string;
  poi?: string;
}

export interface MediaSizeOptions {
  maxWidth: number;
  containerSize?: number;
}

function sortImageSizes(dynamicImagingOptions: DynamicImagingOptions[]): DynamicImagingOptions[] {
  dynamicImagingOptions.sort((opts1: DynamicImagingOptions, opts2: DynamicImagingOptions): number => opts2.w - opts1.w);
  dynamicImagingOptions.sort((opts1: DynamicImagingOptions, opts2: DynamicImagingOptions): number =>
    opts1.h && opts2.h ? opts2.h - opts1.h : 0
  );

  return dynamicImagingOptions;
}

function createSrcSet(dynamicImagingOptions: DynamicImagingOptions[], src: string): string[] {
  const srcSet: string[] = [];

  dynamicImagingOptions.forEach((opts): void => {
    const imageQueryParams: string[] = [];

    if (opts.scaleFit === 'poi' && !opts.poi) {
      opts.poi =
        '{$this.metadata.pointOfInterest.x},{$this.metadata.pointOfInterest.y},{$this.metadata.pointOfInterest.w},{$this.metadata.pointOfInterest.h}';
    }

    Object.entries(opts).forEach(([key, value]) => {
      imageQueryParams.push(`${key}=${value}`);
    });

    srcSet.push(`${src}?${imageQueryParams.join('&')} ${opts.w}w`);
  });

  return srcSet;
}

function createMediaSizes(mediaSizeOptions: MediaSizeOptions[]): string[] {
  const mediaSizes: string[] = [];

  mediaSizeOptions.forEach((mediaSizeOption: MediaSizeOptions) => {
    if (mediaSizeOption.containerSize) {
      mediaSizes.push(`(max-width: ${mediaSizeOption.maxWidth}px) ${mediaSizeOption.containerSize}px`);
    } else {
      mediaSizes.push(`${mediaSizeOption.maxWidth}px`);
    }
  });

  return mediaSizes;
}

function generateSrcOptions(
  src: string,
  dynamicImagingOptions: DynamicImagingOptions[],
  mediaSizeOptions?: MediaSizeOptions[]
): { srcSet: string; mediaSizes: string } {
  dynamicImagingOptions = sortImageSizes(dynamicImagingOptions);
  const srcSet: string[] = createSrcSet(dynamicImagingOptions, src);
  const mediaSizes: string[] = Array.isArray(mediaSizeOptions) ? createMediaSizes(mediaSizeOptions) : [];

  return { srcSet: srcSet.join(','), mediaSizes: mediaSizes.join(',') };
}

const Image = (image: {
  altText: string;
  src: string;
  dynamicImagingOptions: DynamicImagingOptions[];
  mediaSizeOptions?: MediaSizeOptions[];
}) => {
  const { srcSet, mediaSizes } = generateSrcOptions(image.src, image.dynamicImagingOptions, image.mediaSizeOptions);

  return (
    <>
      <LazyLoadImage alt={image.altText} src={image.src} sizes={mediaSizes} srcSet={srcSet} className="lazy-img" />

      <style jsx>{`
        :global(img.lazy-img) {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Image;
