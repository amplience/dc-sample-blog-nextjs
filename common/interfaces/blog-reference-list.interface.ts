export interface BlogPostReference {
  id: string;
}

export interface BlogReferenceList {
  title: string;
  subTitle: string;
  blogPosts: BlogPostReference[];
}

export interface BlogListContent {
  title: string;
  subTitle: string;
}
