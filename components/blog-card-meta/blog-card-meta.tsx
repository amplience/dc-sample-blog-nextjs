import Author from '../../common/interfaces/author.interface';
import convertToBlogDate from '../../common/services/blog-date.service';
import theme from '../../common/styles/default/theme';

interface BlogCardMetaProps {
  authors: Author[];
  publishedDate: string;
}

const BlogCardMeta = ({ authors, publishedDate }: BlogCardMetaProps) => {
  return (
    <>
      <div className="card-meta">
        <div className="authors">
          <span>by</span>
          {authors.map(a => (
            <span className="author">{a.name}</span>
          ))}
        </div>
        <span className="publish-date">{convertToBlogDate(publishedDate)}</span>
      </div>
      <style jsx>{`
        .card-meta {
          color: ${theme.colors.doveGray};
          display: flex;
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
