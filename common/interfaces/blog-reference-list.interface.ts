import { ContentMeta } from 'dc-delivery-sdk-js';

export interface BlogPostReference {
  deliveryKey: string;
}

export interface BlogReferenceList {
  _meta: ContentMeta;
  title: string;
  subTitle: string;
  blogPosts: BlogPostReference[];
}
