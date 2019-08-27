import Author from '../../common/interfaces/author.interface';
import Image from '../../components/images/image.component';
import theme from '../../common/styles/default/theme';

function loadAvatar(author: Author): JSX.Element | undefined {
  if (author.avatar) {
    return (
      <>
        <div className="avatar">
          <Image
            altText={author.avatar.altText}
            src={author.avatar.src}
            dynamicImagingOptions={[{ w: 72, h: 72, sm: 'c' }]}
          />
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
        {loadAvatar(authors[0])}
        <div className="name">{authors[0].name}</div>
        <div className="date">{date}</div>
        <div className="readTime">{readTime} mins read</div>
      </section>
      <style jsx>{`
        section {
          margin-top: 75px;
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
