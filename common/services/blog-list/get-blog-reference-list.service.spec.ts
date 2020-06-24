import getBlogReferenceList from './get-blog-reference-list.service';

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

const mockGetContentItemByKey = jest.fn();
jest.mock('../dynamic-content-delivery.service', () => {
  return {
    DynamicContentDeliveryService: jest.fn(() => {
      return {
        getContentItemByKey: mockGetContentItemByKey
      };
    })
  };
});

describe('getReferencedBlogPosts', () => {
  it('should thrown an error for missing ALGOLIA_APPLICATION_ID env var', async () => {
    delete process.env.ALGOLIA_APPLICATION_ID;
    process.env.ALGOLIA_SEARCH_ONLY_KEY = 'ALGOLIA_SEARCH_ONLY_KEY';
    process.env.ALGOLIA_PRODUCTION_INDEX_NAME = 'ALGOLIA_PRODUCTION_INDEX_NAME';
    await expect(() => getBlogReferenceList('blog-list')).rejects.toThrowError();
  });

  it('should thrown an error for missing ALGOLIA_SEARCH_ONLY_KEY env var', async () => {
    process.env.ALGOLIA_APPLICATION_ID = 'ALGOLIA_APPLICATION_ID';
    delete process.env.ALGOLIA_SEARCH_ONLY_KEY;
    process.env.ALGOLIA_PRODUCTION_INDEX_NAME = 'ALGOLIA_PRODUCTION_INDEX_NAME';
    await expect(() => getBlogReferenceList('blog-list')).rejects.toThrowError();
  });

  it('should thrown an error for missing ALGOLIA_PRODUCTION_INDEX_NAME env var', async () => {
    process.env.ALGOLIA_APPLICATION_ID = 'ALGOLIA_APPLICATION_ID';
    process.env.ALGOLIA_SEARCH_ONLY_KEY = 'ALGOLIA_SEARCH_ONLY_KEY';
    delete process.env.ALGOLIA_PRODUCTION_INDEX_NAME;
    await expect(() => getBlogReferenceList('blog-list')).rejects.toThrowError();
  });

  it('should thrown an error for missing ALGOLIA_PRODUCTION_INDEX_NAME env var', async () => {
    process.env.ALGOLIA_APPLICATION_ID = 'ALGOLIA_APPLICATION_ID';
    process.env.ALGOLIA_SEARCH_ONLY_KEY = 'ALGOLIA_SEARCH_ONLY_KEY';
    process.env.ALGOLIA_PRODUCTION_INDEX_NAME = 'ALGOLIA_PRODUCTION_INDEX_NAME';

    mockSearch.mockReturnValue({ hits: [{ deliveryKey: 'deliveryKey' }] });
    const blog = {
      title: 'title',
      subTitle: 'subTitle'
    };
    mockGetContentItemByKey.mockResolvedValue({
      toJSON: jest.fn(() => blog)
    });

    await expect(getBlogReferenceList('blog-list')).resolves.toEqual({
      title: 'title',
      subTitle: 'subTitle',
      blogPosts: [{ deliveryKey: 'deliveryKey' }]
    });

    expect(mockSearch).toHaveBeenCalledWith('', {
      attributesToHighlight: [],
      attributesToRetrieve: ['deliveryKey'],
      hitsPerPage: 1000
    });
    expect(mockGetContentItemByKey).toHaveBeenCalledWith('blog-list');
  });
});
