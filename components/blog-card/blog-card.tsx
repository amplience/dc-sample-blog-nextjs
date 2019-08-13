import Image from '../images/image.component';
import BlogPost from '../../pages/blogs/interfaces/blog-post.interface';

interface BlogCardProps {
  blogPost: BlogPost;
}

const BlogCard = ({ blogPost }: BlogCardProps) => {
  return (
    <>
      <article>
        <Image {...blogPost.image} />
        <h1>{blogPost.title}</h1>
        <div>{blogPost.authors[0].name}</div>
        <div>{blogPost.date}</div>
        <div>{blogPost.description}</div>
      </article>
      <style jsx>{`
        article {
          width: 31%;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          margin-bottom: 36px;
          padding: 10px;
          box-shadow: -2px 8px 10px #efefef, 2px 8px 10px #efefef;
          background: white;
          cursor: pointer;
        }

        article:hover {
          box-shadow: -2px 8px 10px #969696, 2px 8px 10px #969696;
        }

        @media (max-width: 800px) {
          article {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default BlogCard;
