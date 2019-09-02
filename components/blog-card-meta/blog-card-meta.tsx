import Author from '../../common/interfaces/author.interface';
import convertToBlogDate from '../../common/services/blog-date.service';
import theme from '../../common/styles/default/theme';

interface BlogCardMetaProps {
  authors: Author[];
  publishedDate: string;
  readTime: number;
}

const BlogCardMeta = ({ authors, publishedDate, readTime }: BlogCardMetaProps) => {
  return (
    <>
      <div className="card-meta">
        <div className="authors">
          <span>by</span>
          {authors.map(a => (
            <span key={a.name} className="author">
              {a.name}
            </span>
          ))}
        </div>
        <div className="publish-data">
          <span className="publish-date">{convertToBlogDate(publishedDate)}</span>
          {`${readTime} minutes`}
        </div>
      </div>
      <style jsx>{`
        .card-meta {
          color: ${theme.colors.doveGray};
          display: flex;
          flex-direction: column;
          font-weight: ${theme.fonts.weight.medium};
          font-size: ${theme.fonts.size.small};
          margin-bottom: 12px;
        }

        span {
          max-width: 50%;
        }

        span + span {
          margin-left: 0.25em;
        }

        .author:not(:last-child):after {
          content: ',';
        }

        .publish-data {
          margin-top: 5px;
        }

        .publish-date {
          margin-right: 6px;
          padding-right: 6px;
          border-right: 1px solid black;
        }
      `}</style>
    </>
  );
};

export default BlogCardMeta;
