export interface BlogPostReference {
  id: string;
}

export interface BlogReferenceList {
  title: string;
  subTitle: string;
  blogPosts: BlogPostReference[];
}
