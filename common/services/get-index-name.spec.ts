import getIndexName from './get-index-name';
import * as nextRouter from 'next/router';

describe('getIndexName', () => {
  beforeAll(() => {
    process.env.ALGOLIA_PRODUCTION_INDEX_NAME = 'production';
    process.env.ALGOLIA_STAGING_INDEX_NAME = 'staging';
  });

  afterAll(() => {
    delete process.env.ALGOLIA_PRODUCTION_INDEX_NAME;
    delete process.env.ALGOLIA_STAGING_INDEX_NAME;
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
