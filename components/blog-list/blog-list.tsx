import BlogPost from '../../common/interfaces/blog-post.interface';
import BlogCard from '../blog-card/blog-card';
import theme from '../../common/styles/default/theme';

interface BlogListProps {
  blogPosts: BlogPost[];
}

const BlogList = ({ blogPosts = [] }: BlogListProps) => {
  const blogCards = blogPosts.map((blogPost: BlogPost, index: number) => <BlogCard key={index} blogPost={blogPost} />);

  return (
    <>
      <section>{blogCards.length ? blogCards : ''}</section>
      <style jsx>{`
        section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 55px 30px;
          grid-auto-rows: minmax(100px, auto);
          margin: auto;
          margin-top: 55px;
          max-width: ${theme.layout.widePageWidth};
        }

        @media (max-width: ${theme.layout.widePageWidth}) {
          section {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 20px;
            margin-top: 0;
          }
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section {
            display: block;
            padding: 0 45px;
          }
        }
      `}</style>
    </>
  );
};

export default BlogList;
