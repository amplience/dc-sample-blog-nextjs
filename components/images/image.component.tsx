import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Image as DcImage } from 'dc-delivery-sdk-js';
import { defaultClientConfig } from '../../common/services/dynamic-content-client-config';
import AmplienceImage from '../../common/interfaces/image.interface';

export interface DynamicImagingOptions {
  w: number;
  h?: number;
  qlt?: number;
  sm?: string;
  scaleFit?: string;
  poi?: string;
}

export interface MediaQueryOptions {
  mediaFeature?: string;
  mediaSize: string;
  containerSize?: string;
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

function createMediaSizes(mediaQueryOptions: MediaQueryOptions[]): string[] {
  const mediaSizes: string[] = [];

  mediaQueryOptions.forEach((mediaQueryOption: MediaQueryOptions) => {
    if (mediaQueryOption.containerSize) {
      mediaSizes.push(
        `(${mediaQueryOption.mediaFeature}: ${mediaQueryOption.mediaSize}) ${mediaQueryOption.containerSize}`
      );
    } else {
      mediaSizes.push(`${mediaQueryOption.mediaSize}`);
    }
  });

  return mediaSizes;
}

function generateSrcOptions(
  src: string,
  dynamicImagingOptions: DynamicImagingOptions[],
  mediaQueryOptions?: MediaQueryOptions[]
): { srcSet: string; mediaSizes: string } {
  dynamicImagingOptions = sortImageSizes(dynamicImagingOptions);
  const srcSet: string[] = createSrcSet(dynamicImagingOptions, src);
  const mediaSizes: string[] = Array.isArray(mediaQueryOptions) ? createMediaSizes(mediaQueryOptions) : [];

  return { srcSet: srcSet.join(','), mediaSizes: mediaSizes.join(',') };
}

const Image = ({
  image,
  dynamicImagingOptions,
  mediaQueryOptions
}: {
  image: AmplienceImage;
  dynamicImagingOptions: DynamicImagingOptions[];
  mediaQueryOptions?: MediaQueryOptions[];
}) => {
  const dcImage = new DcImage(image.image, defaultClientConfig);
  const src = dcImage.url().build();
  const { srcSet, mediaSizes } = generateSrcOptions(src, dynamicImagingOptions, mediaQueryOptions);

  // Set the visibleByDefault prop if we are within an iframe
  const visibleByDefault = (): boolean => !!(typeof window === 'object' && window.location !== window.parent.location);

  return (
    <>
      <LazyLoadImage
        alt={image.altText}
        src={src}
        sizes={mediaSizes}
        srcSet={srcSet}
        className="lazy-img"
        visibleByDefault={visibleByDefault()}
      />

      <style jsx>{`
        :global(img.lazy-img) {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Image;
