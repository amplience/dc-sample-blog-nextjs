import { Image } from 'dc-delivery-sdk-js';
import { defaultClientConfig } from '../../common/services/dynamic-content-client-config';

function generateDiQueryString(queryOpts: any) {
  const queryString = Object.entries(queryOpts).map(([key, value]: any) => `&${key}=${value}`);
  return `?${queryString.join('')}`;
}

const Picture = ({ image, sources }: any) => {
  const dcImage = new Image(image.image, defaultClientConfig);
  const src = dcImage.url().build();
  const pictureSources = [...sources];
  const defaultSource = pictureSources.pop();
  return (
    <picture>
      {pictureSources.map((source: any) => (
        <>
          <source
            srcSet={`${src}${generateDiQueryString(source.di)}&fmt=webp`}
            media={source.media}
            type="image/webp"
          />
          <source srcSet={`${src}${generateDiQueryString(source.di)}`} media={source.media} />
        </>
      ))}
      <img src={`${src}${generateDiQueryString(defaultSource.di)}`} alt={image.altText} />
    </picture>
  );
};

export default Picture;
