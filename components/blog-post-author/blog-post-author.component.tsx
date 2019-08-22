import Author from '../../common/interfaces/author.interface';
import Image from '../../components/images/image.component';

function loadAvatar(author: Author): JSX.Element | undefined {
  if (author.avatar) {
    return (
      <>
        <div className="avatar">
          <Image altText={author.avatar.altText} src={author.avatar.src} />
        </div>
        <style jsx>{`
          .avatar :global(img) {
            object-fit: cover;
            height: 32px;
            width: 32px;
            margin-right: 20px;
          }
        `}</style>
      </>
    );
  }
}

const BlogPostAuthor = ({ authors, date, readTime }: { authors: Author[]; date: string; readTime: number }) => {
  return (
    <>
      <section>
        {loadAvatar(authors[0])}
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
      `}</style>
    </>
  );
};

export default BlogPostAuthor;
