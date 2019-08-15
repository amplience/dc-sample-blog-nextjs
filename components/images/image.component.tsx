const Image = (image: { altText: string; src: string }) => <img alt={image.altText} src={image.src} />;

export default Image;
