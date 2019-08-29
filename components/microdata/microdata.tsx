import Author from '../../common/interfaces/author.interface';
import { BlogJsonLd } from 'next-seo';

interface MicrodataProps {
  url: string;
  headline: string;
  description: string;
  imageUrl: string;
  authors: Author[];
  datePublished: string;
}

const Microdata = ({ url, headline, description, imageUrl, authors = [], datePublished }: MicrodataProps) => {
  const aspectRatios = ['16:9', '4:3', '1:1'];

  return (
    <BlogJsonLd
      url={url}
      description={description}
      title={headline}
      images={[...aspectRatios.map(ratio => `${imageUrl}?w=1200&sm=aspect&aspect=${ratio}`)]}
      authorName={authors.map(author => author.name).join(',')}
      datePublished={datePublished}
      dateModified={datePublished}
    />
  );
};

export default Microdata;
