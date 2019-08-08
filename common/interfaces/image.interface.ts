export default interface Image {
  altText: string;
  image: {
    id: string;
    name: string;
    endpoint: string;
    defaultHost: string;
    mediaType: string;
  };
}
