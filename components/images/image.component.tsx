function generateSrcOptions(src: string, sizes: number[]): { srcSet: string; mediaSizes: string } {
  const srcSet: string[] = [];
  const mediaSizes: string[] = [];

  sizes.sort((num1, num2): number => num2 - num1);
  sizes.forEach((size, index): void => {
    srcSet.push(`${src}?w=${size} ${size}w`);
    mediaSizes.push(index > 0 ? `(max-width: ${size}px) ${size - 40}px` : `${size}px`);
  });

  return { srcSet: srcSet.join(','), mediaSizes: mediaSizes.join(',') };
}

const Image = (image: { altText: string; src: string; sizes: number[] }) => {
  const { srcSet, mediaSizes } = generateSrcOptions(image.src, image.sizes);

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
