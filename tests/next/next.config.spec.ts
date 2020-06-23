import nextConfig from '../../next.config';

const mockSearch = jest.fn();
jest.mock('algoliasearch', () => () => {
  return {
    ...jest.requireActual('algoliasearch'),
    initIndex: jest.fn(() => {
      return {
        search: mockSearch
      };
    })
  };
});
jest.mock('next-manifest', (): ((config: { [key: string]: string }) => { [key: string]: string }) => {
  return (config): { [key: string]: string } => config;
});
jest.mock('next-offline', (): ((config: { [key: string]: string }) => { [key: string]: string }) => {
  return (config): { [key: string]: string } => config;
});

describe('next.config.js', (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });
  test('exportPathMap should return landing page and a single blog path using the delivery key', async (): Promise<
    void
  > => {
    mockSearch.mockImplementationOnce(() => {
      return {
        hits: [{ deliveryKey: 'test-delivery-key', objectID: 'test-object-id' }]
      };
    });

    const result = await nextConfig.exportPathMap();

    expect(result).toEqual({
      '/blog/test-delivery-key': {
        page: '/blog',
        query: {
          blogId: 'test-object-id',
          slug: 'test-delivery-key'
        }
      },
      '/': {
        page: '/',
        query: {
          vse: ''
        }
      },
      '/preview': {
        page: '/preview',
        query: {
          content: '',
          vse: ''
        }
      },
      '/visualization.html': {
        page: '/visualization',
        query: {
          vse: '',
          content: ''
        }
      }
    });
  });

  test('exportPathMap should return landing page and a single blog path using the object id when delivery key is not set', async (): Promise<
    void
  > => {
    mockSearch.mockImplementationOnce(() => {
      return {
        hits: [{ deliveryKey: '', objectID: 'test-object-id' }]
      };
    });

    const result = await nextConfig.exportPathMap();

    expect(result).toEqual({
      '/blog/test-object-id': {
        page: '/blog',
        query: {
          blogId: 'test-object-id',
          slug: 'test-object-id'
        }
      },
      '/': {
        page: '/',
        query: {
          vse: ''
        }
      },
      '/preview': {
        page: '/preview',
        query: {
          content: '',
          vse: ''
        }
      },
      '/visualization.html': {
        page: '/visualization',
        query: {
          vse: '',
          content: ''
        }
      }
    });
  });

  test('exportPathMap should return an empty array when algolia search returns an empty hits list', async (): Promise<
    void
  > => {
    mockSearch.mockImplementationOnce(() => {
      return {
        hits: []
      };
    });

    const result = await nextConfig.exportPathMap();

    expect(result).toEqual({
      '/': {
        page: '/',
        query: {
          vse: ''
        }
      },
      '/preview': {
        page: '/preview',
        query: {
          content: '',
          vse: ''
        }
      },
      '/visualization.html': {
        page: '/visualization',
        query: {
          vse: '',
          content: ''
        }
      }
    });
  });

  test('exportPathMap should throw an error if algolia search fails', async () => {
    mockSearch.mockImplementationOnce(
      (): Error => {
        throw new Error('Error retrieving search results');
      }
    );

    await expect(nextConfig.exportPathMap()).rejects.toThrowError('Error retrieving search results');
  });
});
