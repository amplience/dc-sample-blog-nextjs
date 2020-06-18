import getReferencedBlogPosts from './get-referenced-blog-posts.service';
import { getBlogPostByDeliveryKey } from '../blog-post.service';
import mockConsole from 'jest-mock-console';
jest.mock('../blog-post.service', () => {
  return {
    __esModule: true,
    getBlogPostByDeliveryKey: jest.fn()
  };
});

describe('getReferencedBlogPosts', () => {
  let restoreConsole;
  const mockedConsole = {
    warn: jest.fn()
  };
  beforeEach(() => {
    restoreConsole = mockConsole(mockedConsole);
  });

  afterEach(() => {
    restoreConsole();
    jest.resetAllMocks();
  });

  it('should call getBlogPostByDeliveryKey for each blog post and warn failures', async () => {
    (getBlogPostByDeliveryKey as jest.Mock).mockResolvedValueOnce({});
    (getBlogPostByDeliveryKey as jest.Mock).mockRejectedValueOnce(new Error());

    await expect(
      getReferencedBlogPosts([{ deliveryKey: 'valid' }, { deliveryKey: 'not-valid' }], 'staging-env')
    ).resolves.toEqual([{}]);

    expect(mockedConsole.warn).toHaveBeenCalledTimes(1);
    expect(getBlogPostByDeliveryKey as jest.Mock).toHaveBeenCalledTimes(2);
    expect(getBlogPostByDeliveryKey as jest.Mock).toHaveBeenNthCalledWith(1, 'valid', 'staging-env');
    expect(getBlogPostByDeliveryKey as jest.Mock).toHaveBeenNthCalledWith(2, 'not-valid', 'staging-env');
  });
});
