const Image = (image: { altText: string; src: string }) => (
  <>
    <img alt={image.altText} src={image.src} />
    <style jsx>{`
      img {
        width: 100%;
      }
    `}</style>
  </>
);

export default Image;
