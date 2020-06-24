export interface BlogPostReference {
  deliveryKey: string;
}

export interface BlogReferenceList {
  title: string;
  subTitle: string;
  blogPosts: BlogPostReference[];
}
