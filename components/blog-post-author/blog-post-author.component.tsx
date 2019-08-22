import Author from '../../common/interfaces/author.interface';
import Image from '../../components/images/image.component';

const BlogPostAuthor = ({ authors, date, readTime }: { authors: Author[]; date: string; readTime: number }) => {
  return (
    <>
      <section>
        <div className="avatar">
          <Image altText={authors[0].avatar.altText} src={authors[0].avatar.src} sizes={[32]} />
        </div>
        <div className="name">{authors[0].name}</div>
        <div className="date">{date}</div>
        <div className="readTime">{readTime} mins read</div>
      </section>
      <style jsx>{`
        section {
          margin-top: 30px;
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #aaa;
        }

        .name {
          font-weight: 500;
          color: #333;
        }

        .date,
        .readTime {
          color: #666;
        }

        section div {
          margin-right: 20px;
        }

        .avatar :global(img) {
          object-fit: cover;
          height: 32px;
          width: 32px;
        }
      `}</style>
    </>
  );
};

export default BlogPostAuthor;
