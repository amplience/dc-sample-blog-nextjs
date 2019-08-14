import BlogPost from './blog-post.interface';

export interface BlogListData {
  title: string;
  subTitle: string;
  blogPosts: BlogPost[];
}
