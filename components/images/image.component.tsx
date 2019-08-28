export interface DynamicImagingOptions {
  w: number;
  h?: number;
  qlt?: number;
  sm?: string;
}

function generateSrcOptions(
  src: string,
  dynamicImagingOptions: DynamicImagingOptions[]
): { srcSet: string; mediaSizes: string } {
  const srcSet: string[] = [];
  const mediaSizes: string[] = [];

  dynamicImagingOptions.forEach((opts, index): void => {
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
      <img alt={image.altText} src={image.src} srcSet={srcSet} sizes={mediaSizes} />
      <style jsx>{`
        img {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Image;
