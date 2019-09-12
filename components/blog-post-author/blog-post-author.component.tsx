import Author from '../../common/interfaces/author.interface';
import Image from '../../components/images/image.component';
import theme from '../../common/styles/default/theme';

function loadAuthorDetails(authors: Author[]): { avatars: JSX.Element[]; authorNames: JSX.Element } {
  const avatars: JSX.Element[] = [];
  const authorNames: string[] = [];

  authors.forEach((author: Author, index: number): void => {
    if (author.avatar) {
      avatars.push(
        <div key={index}>
          <div className="avatar">
            <Image
              altText={author.avatar.altText}
              src={author.avatar.src}
              dynamicImagingOptions={[{ w: 72, h: 72, sm: 'c', scaleFit: 'poi' }]}
            />
          </div>
          <style jsx>{`
            .avatar :global(img) {
              object-fit: cover;
              height: 36px;
              width: 36px;
              border-radius: 4px;
              margin-right: 10px;
            }
          `}</style>
        </div>
      );
    }

    authorNames.push(author.name);
  });

  const authorNamesElement = (
    <>
      <div className="name">{authorNames.join(', ')}</div>
      <style jsx>{`
        .name {
          color: ${theme.colors.mineShaft};
          font-size: ${theme.fonts.size.normal};
          font-weight: ${theme.fonts.weight.medium};
        }
        @media (max-width: ${theme.layout.narrowPageWidth}) {
          .name {
            font-size: ${theme.fonts.size.normal};
          }
        }
      `}</style>
    </>
  );

  return { avatars, authorNames: authorNamesElement };
}

const BlogPostAuthor = ({ authors, date, readTime }: { authors: Author[]; date: string; readTime: number }) => {
  const { avatars, authorNames } = loadAuthorDetails(authors);

  return (
    <>
      <section>
        <div className="avatars">{avatars}</div>
        <div className="publish-data">
          <div className="authors">{authorNames}</div>
          <div className="publish-metadata">
            <div className="date">{date}</div>
            <div className="readTime">{readTime} mins read</div>
          </div>
        </div>
      </section>
      <style jsx>{`
        section {
          margin-top: 75px;
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          align-items: center;
          align-content: center;
          padding-bottom: 25px;
          max-width: 740px;
          border-bottom: 1px solid ${theme.colors.silver};
        }

        .date {
          padding-right: 6px;
          margin-right: 6px;
          border-right: 1px solid ${theme.colors.dustyGray};
        }

        .date,
        .readTime {
          color: ${theme.colors.dustyGray};
          font-size: ${theme.fonts.size.large};
          font-weight: ${theme.fonts.weight.regular};
        }

        .publish-data {
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
        }

        .publish-metadata {
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          margin-top: 5px;
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section {
            margin-top: 25px;
            padding-bottom: 15px;
          }

          .date,
          .readTime {
            font-size: ${theme.fonts.size.small};
          }
        }
      `}</style>
    </>
  );
};

export default BlogPostAuthor;
