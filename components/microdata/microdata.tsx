import Author from '../../common/interfaces/author.interface';

interface MicrodataProps {
  headline: string;
  imageUrl: string;
  authors: Author[];
  datePublished: string;
}

const Microdata = ({ headline, imageUrl, authors = [], datePublished }: MicrodataProps) => {
  const aspectRatios = ['16:9', '4:3', '1:1'];
  const jsonLdMicrodata = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    headline: headline,
    image: {
      '@type': 'ImageObject',
      url: [...aspectRatios.map(ratio => `${imageUrl}?w=1200&sm=aspect&aspect=${ratio}`)]
    },
    author: {
      '@type': 'Person',
      name: [...authors.map(author => author.name)]
    },
    datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'Amplience',
      logo: {
        '@type': 'ImageObject',
        url: '//i1.adis.ws/i/ampcomcms/amplience-logo-hidef?$poi$&aspect=1:1'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLdMicrodata)
      }}
    />
  );
};

export default Microdata;
