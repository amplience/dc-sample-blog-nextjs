import nextConfig from '../../next.config';
import mockConsole from 'jest-mock-console';

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
  let restoreConsole;
  beforeEach(() => {
    restoreConsole = mockConsole(['log', 'info', 'warn', 'error']);
  });

  afterEach(() => {
    restoreConsole();
  });

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
        page: '/blog/[...slug]',
        query: {
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

  test('exportPathMap should return landing page and omit any blog posts that do not have a delivery key is not set', async (): Promise<
    void
  > => {
    mockSearch.mockImplementationOnce(() => {
      return {
        hits: [{ deliveryKey: '', objectID: 'test-object-id' }]
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
