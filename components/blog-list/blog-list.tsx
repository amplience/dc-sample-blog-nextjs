import BlogPost from '../../pages/blogs/interfaces/blog-post.interface';
import BlogCard from '../blog-card/blog-card';
import theme from '../../common/styles/default/theme';

interface BlogListProps {
  blogPosts: BlogPost[];
}

const BlogList = ({ blogPosts = [] }: BlogListProps) => {
  const blogCards = blogPosts.map((blogPost: BlogPost, index: number) => <BlogCard key={index} blogPost={blogPost} />);
  const noPublishedBlogs = (
    <div className="no-published-blogs">
      <p>No blogs published yet!</p>
      <style jsx>{`
        .no-blogs {
          text-align: center;
          width: 100%;
        }
      `}</style>
    </div>
  );

  return (
    <>
      <section>{blogCards.length ? blogCards : noPublishedBlogs}</section>
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
