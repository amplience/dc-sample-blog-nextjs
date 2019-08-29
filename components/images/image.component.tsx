import { LazyLoadImage } from 'react-lazy-load-image-component';

export interface DynamicImagingOptions {
  w: number;
  h?: number;
  qlt?: number;
  sm?: string;
}

function sortImageSizes(dynamicImagingOptions: DynamicImagingOptions[]): DynamicImagingOptions[] {
  dynamicImagingOptions.sort((opts1: DynamicImagingOptions, opts2: DynamicImagingOptions): number => opts2.w - opts1.w);
  dynamicImagingOptions.sort((opts1: DynamicImagingOptions, opts2: DynamicImagingOptions): number =>
    opts1.h && opts2.h ? opts2.h - opts1.h : 0
  );

  return dynamicImagingOptions;
}

function generateSrcOptions(
  src: string,
  dynamicImagingOptions: DynamicImagingOptions[]
): { srcSet: string; mediaSizes: string } {
  const srcSet: string[] = [];
  const mediaSizes: string[] = [];

  sortImageSizes(dynamicImagingOptions).forEach((opts, index): void => {
    const imageQueryParams: string[] = [];
    Object.entries(opts).forEach(([key, value]) => imageQueryParams.push(`${key}=${encodeURIComponent(value)}`));

    srcSet.push(`${src}?${imageQueryParams.join('&')} ${opts.w}w`);
    mediaSizes.push(index > 0 ? `(max-width: ${opts.w}px) ${opts.w - 40}px` : `${opts.w}px`);
  });

  return { srcSet: srcSet.join(','), mediaSizes: mediaSizes.join(',') };
}

const Image = (image: { altText: string; src: string; dynamicImagingOptions: DynamicImagingOptions[] }) => {
  const { srcSet, mediaSizes } = generateSrcOptions(image.src, image.dynamicImagingOptions);

  return (
    <>
      <LazyLoadImage alt={image.altText} src={image.src} srcSet={srcSet} sizes={mediaSizes} className="lazy-img" />

      <style jsx>{`
        :global(img.lazy-img) {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Image;
