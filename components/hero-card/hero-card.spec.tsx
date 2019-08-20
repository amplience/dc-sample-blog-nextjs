/* eslint-env jest */
import renderer from 'react-test-renderer';
import HeroCard from './hero-card';
import { MediaType } from '../../common/interfaces/media.interface';

jest.mock('../images/image.component', () => () => <div className="image-mock" />);
jest.mock('../blog-card-meta/blog-card-meta', () => () => <div className="blog-card-meta-mock" />);

describe('HeroCard', () => {
  test('renders full hero card', async () => {
    const props = {
      blogPost: {
        title: 'blog-post-test',
        date: '2019-08-13',
        description: 'blog-post-description',
        authors: [],
        image: {
          image: {
            id: 'image-id',
            name: 'image-name',
            endpoint: 'image-endpoint',
            defaultHost: 'image-default-host',
            mediaType: MediaType.IMAGE
          },
          altText: ''
        },
        urlSlug: 'url-slug',
        tags: ['test-tag'],
        readTime: 15,
        content: []
      }
    };
    const component = await renderer.create(<HeroCard {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
