import BlogPost from '../../pages/blogs/interfaces/blog-post.interface';
import BlogCard from '../blog-card/blog-card';
import theme from '../../common/styles/default/theme';

interface BlogListProps {
  blogPosts: BlogPost[];
}

const BlogList = ({ blogPosts }: BlogListProps) => {
  const blogs = blogPosts.map((blogPost: BlogPost, index: number) => {
    return <BlogCard key={index} blogPost={blogPost} />;
  });
  return (
    <>
      <section>{blogs}</section>
      <style jsx>{`
        section {
          display: flex;
          flex-wrap: wrap;
          margin: auto;
          margin-top: 40px;
          max-width: ${theme.layout.blogListWidth};
          justify-content: space-between;
        }

        @media (max-width: ${theme.layout.blogListWidth}) {
          section {
            display: block;
            padding: 0 20px;
          }
        }
      `}</style>
    </>
  );
};

export default BlogList;
