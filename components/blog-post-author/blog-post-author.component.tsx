import Author from '../../common/interfaces/author.interface';
import Image from '../../components/images/image.component';
import theme from '../../common/styles/default/theme';

function loadAvatar(author: Author): JSX.Element | undefined {
  if (author.avatar) {
    return (
      <>
        <div className="avatar">
          <Image altText={author.avatar.altText} src={author.avatar.src} sizes={[32]} />
        </div>
        <style jsx>{`
          .avatar :global(img) {
            object-fit: cover;
            height: 52px;
            width: 52px;
            border-radius: 4px;
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
          {
            authors.map(author =>
              <div className="authors">
                {loadAvatar(author)}
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
