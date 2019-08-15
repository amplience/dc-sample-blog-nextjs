import Author from '../../common/interfaces/author.interface';
import convertToBlogDate from '../../common/services/blog-date.service';

interface BlogCardMetaProps {
  authors: Author[];
  publishedDate: string;
}

const BlogCardMeta = ({ authors, publishedDate }: BlogCardMetaProps) => {
  return (
    <>
      <div className="card-meta">
        <span>by {authors[0].name}</span>
        <span className="publish-date">{convertToBlogDate(publishedDate)}</span>
      </div>
      <style jsx>{`
        .card-meta {
          display: flex;
          font-weight: bold;
          font-size: 0.8rem;
          margin-bottom: 16px;
        }

        .publish-date {
          margin-left: 6px;
          padding-left: 6px;
          border-left: 1px solid black;
        }
      `}</style>
    </>
  );
};

export default BlogCardMeta;
