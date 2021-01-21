import getIndexName from './get-index-name';
import * as nextRouter from 'next/router';

describe('getIndexName', () => {
  beforeAll(() => {
    process.env.SEARCH_INDEX_NAME_PRODUCTION = 'production';
    process.env.SEARCH_INDEX_NAME_STAGING = 'staging';
  });

  afterAll(() => {
    delete process.env.SEARCH_INDEX_NAME_PRODUCTION;
    delete process.env.SEARCH_INDEX_NAME_STAGING;
    jest.restoreAllMocks();
  });

  it('should return the production index', () => {
    expect(getIndexName()).toEqual('production');
  });

  it('should return the staging index if vse query param is present', () => {
    (nextRouter.useRouter as jest.Mock) = jest.fn(() => ({ query: { vse: 'abc' } }));
    expect(getIndexName()).toEqual('staging');
  });
});
