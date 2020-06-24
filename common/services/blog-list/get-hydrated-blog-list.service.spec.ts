import getHydratedBlogList from './get-hydrated-blog-list.service';
import getBlogReferenceList from './get-blog-reference-list.service';
import getReferencedBlogPosts from '../blog-post/get-referenced-blog-posts.service';

jest.mock('./get-blog-reference-list.service');
jest.mock('../blog-post/get-referenced-blog-posts.service');

describe('getHydratedBlogList', () => {
  afterEach(() => jest.restoreAllMocks());
  it('should call getBlogReferenceList & getReferencedBlogPosts', async () => {
    (getBlogReferenceList as jest.Mock).mockResolvedValue({
      title: 'title',
      subTitle: 'subTitle',
      blogPosts: ['blog-post']
    });
    (getReferencedBlogPosts as jest.Mock).mockResolvedValue([{}]);

    await expect(getHydratedBlogList('delivery-key', 'staging-environment')).resolves.toEqual({
      title: 'title',
      subTitle: 'subTitle',
      blogPosts: [{}]
    });
  });
});
