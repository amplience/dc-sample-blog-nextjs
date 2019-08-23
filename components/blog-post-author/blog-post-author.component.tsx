import Author from '../../common/interfaces/author.interface';
import Image from '../../components/images/image.component';
import theme from '../../common/styles/default/theme';

const BlogPostAuthor = ({ authors, date, readTime }: { authors: Author[]; date: string; readTime: number }) => {
  return (
    <>
      <section>
          {
            authors.map(author =>
              <div className="authors">
                <div className="avatar">
                    <Image altText={author.avatar.altText} src={author.avatar.src} />
                </div>
                <div className="name">{author.name}</div>
              </div>
            )
          }
        <div className="date">{date}</div>
        <div className="readTime">{readTime} mins read</div>
      </section>
      <style jsx>{`
        section {
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          align-items: center;
          margin-top: 75px;
          padding-bottom: 25px;
          border-bottom: 1px solid ${theme.colors.silver};
        }

        .name {
          color: ${theme.colors.mineShaft};
          font-size: ${theme.fonts.size.large};
          font-weight: ${theme.fonts.weight.medium};
        }

        .date,
        .readTime {
          color: ${theme.colors.doveGray};
          font-size: ${theme.fonts.size.large};
          font-weight: ${theme.fonts.weight.regular};
        }

        section div {
          margin-right: 12px;
        }
        
        .authors {
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          align-items: center;
        }

        .avatar :global(img) {
          object-fit: cover;
          height: 52px;
          width: 52px;
          border-radius: 4px;
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section {
            margin-top: 45px;
          }
        }
      `}</style>
    </>
  );
};

export default BlogPostAuthor;
