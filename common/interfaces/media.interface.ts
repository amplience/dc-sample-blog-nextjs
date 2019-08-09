export enum MediaType {
  IMAGE = 'i',
  VIDEO = 'v'
}

export default interface Media {
  id: string;
  name: string;
  endpoint: string;
  defaultHost: string;
  mediaType: MediaType;
}
