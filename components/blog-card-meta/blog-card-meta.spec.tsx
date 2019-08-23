/* eslint-env jest */
import renderer from 'react-test-renderer';
import BlogCardMeta from './blog-card-meta';
import { MediaType } from '../../common/interfaces/media.interface';

describe('BlogCardMeta', () => {
  test('renders full blog card meta', async () => {
    const props = {
      authors: [
        {
          name: 'test-name',
          avatar: {
            image: {
              id: 'image-id',
              name: 'image-name',
              endpoint: 'image-endpoint',
              defaultHost: 'image-default-host',
              mediaType: MediaType.IMAGE
            },
            altText: ''
          }
        }
      ],
      publishedDate: '2019-08-13'
    };
    const component = await renderer.create(<BlogCardMeta {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('renders full blog card meta with multiple authors', async () => {
    const props = {
      authors: [
        {
          name: 'test-name',
          avatar: {
            image: {
              id: 'image-id',
              name: 'image-name',
              endpoint: 'image-endpoint',
              defaultHost: 'image-default-host',
              mediaType: MediaType.IMAGE
            },
            altText: ''
          }
        },
        {
          name: 'test-name-2',
          avatar: {
            image: {
              id: 'image-id-2',
              name: 'image-name-2',
              endpoint: 'image-endpoint-2',
              defaultHost: 'image-default-host-2',
              mediaType: MediaType.IMAGE
            },
            altText: ''
          }
        }
      ],
      publishedDate: '2019-08-13'
    };
    const component = await renderer.create(<BlogCardMeta {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
