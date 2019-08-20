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
        <span>by {authors[0].name}</span>
        <span className="publish-date">{convertToBlogDate(publishedDate)}</span>
      </div>
      <style jsx>{`
        .card-meta {
          color: ${theme.colors.doveGray};
          display: flex;
          font-weight: ${theme.fonts.weight.medium};
          font-size: 0.875rem;
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
