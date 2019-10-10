import Visualization from './visualization';
import { shallow } from 'enzyme';
import waitUntil from 'async-wait-until';
import toJson from 'enzyme-to-json';
import * as blogPostFixture from './__fixtures__/blogpost.json';
import PageLoader from "../page-loader/page-loader";

const mockGetStagingContentItemById = jest.fn();
jest.mock('../../common/services/vse.service', () => () => mockGetStagingContentItemById());
const mockGetReferencedBlogPosts = jest.fn();
const blogReferenceList = require('../../common/services/blog-reference-list.service');
blogReferenceList.getReferencedBlogPosts = mockGetReferencedBlogPosts;

describe('Visualization', (): void => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  async function renderVisualization(contentItem: any) {
    mockGetStagingContentItemById.mockResolvedValue(contentItem);

    const wrapper = shallow<Visualization>(<Visualization stagingEnvironment="vse" contentId="content" />, {
      lifecycleExperimental: true
    });

    expect(toJson(wrapper)).toMatchSnapshot();

    await waitUntil(() => !wrapper.contains(<PageLoader />));

    expect(mockGetStagingContentItemById).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  }

  it('should render text', async (): Promise<void> => {
    const contentItem = {
      text: '# Markdown Text'
    };
    await renderVisualization(contentItem);
  });

  it('should render image', async (): Promise<void> => {
    const contentItem = {
      altText: 'altText',
      image: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'friends-shopping-bags',
        id: 'edc77f02-0e92-4b1a-88f9-711cacb5d650'
      }
    };

    await renderVisualization(contentItem);
  });

  it('should render video', async (): Promise<void> => {
    const contentItem = {
      video: {
        defaultHost: 'i1-qa.adis.ws',
        endpoint: 'bloblogltd',
        name: 'SampleVideo_1280x720_5mb',
        id: '721044de-d125-4a1a-8ddc-2201b9463f2d'
      },
      srcSet: ['https://i1-qa.adis.ws/v/bloblogltd/SampleVideo_1280x720_5mb/mp4_240p?protocol=https']
    };

    await renderVisualization(contentItem);
  });

  it('should handle vse errors', async (): Promise<void> => {
    mockGetStagingContentItemById.mockRejectedValue({ message: 'Mock Error' });

    const wrapper = shallow<Visualization>(<Visualization stagingEnvironment="vse" contentId="content" />, {
      lifecycleExperimental: true
    });

    expect(toJson(wrapper)).toMatchSnapshot();

    await waitUntil(() => wrapper.state('error') !== undefined);
    expect(mockGetStagingContentItemById).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should only load content when props are provided', async (): Promise<void> => {
    mockGetStagingContentItemById.mockResolvedValue({
      text: '# Markdown Text'
    });

    const wrapper = shallow<Visualization>(<Visualization stagingEnvironment="" contentId="" />, {
      lifecycleExperimental: true
    });

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.setProps({
      stagingEnvironment: 'vse',
      contentId: 'content'
    });

    await waitUntil(() => !wrapper.contains(<PageLoader />));

    expect(mockGetStagingContentItemById).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a blog post', async () => {
    await renderVisualization(blogPostFixture);
  });

  it('should render a blog list', async () => {
    const blogList = {
      title: 'A blog title',
      subTitle: 'A strap line',
      blogPosts: [ blogPostFixture ]
    };
    mockGetReferencedBlogPosts.mockResolvedValue(blogList.blogPosts);

    await renderVisualization(blogList);
    expect(mockGetReferencedBlogPosts).toHaveBeenCalledWith(expect.anything(), 'vse');
  });

  it('should render a blog list without a subtitle', async () => {
    const blogList = {
      title: 'A blog title',
      blogPosts: [ blogPostFixture ]
    };
    mockGetReferencedBlogPosts.mockResolvedValue(blogList.blogPosts);

    await renderVisualization(blogList);
  });

  it('should render a blog list without any blog posts', async () => {
    const blogList = {
      title: 'A blog title',
      blogPosts: []
    };
    mockGetReferencedBlogPosts.mockResolvedValue(blogList.blogPosts);

    await renderVisualization(blogList);
  });
});
