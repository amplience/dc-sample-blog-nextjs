import BlogPost from '../../pages/blogs/interfaces/blog-post.interface';

export interface BlogListData {
  title: string;
  subTitle: string;
  blogPosts: BlogPost[];
}
