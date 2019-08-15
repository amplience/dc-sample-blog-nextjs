import Author from '../../common/interfaces/author.interface';
import Image from '../../components/images/image.component';

const BlogPostAuthor = ({ authors, date, readTime }: { authors: Author[]; date: string; readTime: number }) => {
  return (
    <>
      <p>
        <Image altText={authors[0].avatar.altText} src={authors[0].avatar.src} />
        <b>{authors[0].name}</b> {date} {readTime} mins read
      </p>
    </>
  );
};

export default BlogPostAuthor;
