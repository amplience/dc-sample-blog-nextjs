import waitUntil from 'async-wait-until';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { findResultsState } from 'react-instantsearch-dom/server';
import { Blog } from '../../common/interfaces/blog.interface';
import { VideoProfile } from '../../common/services/video.service';
import PageLoader from '../page-loader/page-loader';
import Visualization from './visualization';
import * as blogFixture from './__fixtures__/blog.json';
import * as blogPostFixture from './__fixtures__/blogpost.json';

const mockFetch = jest.fn();
const mockGetContentItemById = jest.fn();
jest.mock('search-insights');
jest.mock('../../common/services/vse.service', () => () => mockGetContentItemById());
jest.mock('react-instantsearch-dom', () => ({
  ...jest.requireActual('react-instantsearch-dom'),
  connectStateResults: templateFn => params => templateFn(params)
}));
jest.mock('algoliasearch', () => () => 'mockSearchClient');
jest.mock('react-instantsearch-dom/server', () => ({
  findResultsState: jest.fn()
}));
jest.mock('isomorphic-unfetch', () => {
  return (): jest.Mock => mockFetch();
});

describe('Visualization', (): void => {
  beforeEach(() => {
    process.env.ALGOLIA_APPLICATION_ID = 'algolia-app-id';
    process.env.SEARCH_API_KEY = 'algolia-search-key';
    process.env.SEARCH_INDEX_NAME_STAGING = 'algolia-index-name';

    mockFetch.mockImplementationOnce((): { json: () => VideoProfile; status: number } => {
      return {
        json(): VideoProfile {
          return {
            media: [{ src: 'https://i1-qa.adis.ws/v/bloblogltd/SampleVideo_1280x720_5mb/mp4_240p' }]
          };
        },
        status: 200
      };
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  async function renderVisualization<T>(contentItem: T) {
    mockGetContentItemById.mockResolvedValue(contentItem);

    const wrapper = shallow<Visualization>(<Visualization stagingEnvironment="vse" contentItemId="content" />, {
      lifecycleExperimental: true
    });

    expect(toJson(wrapper)).toMatchSnapshot();

    await waitUntil(() => !wrapper.contains(<PageLoader />));

    expect(mockGetContentItemById).toHaveBeenCalled();
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
      }
    };

    await renderVisualization(contentItem);
  });

  it('should handle vse errors', async (): Promise<void> => {
    mockGetContentItemById.mockRejectedValue({ message: 'Mock Error' });

    const wrapper = shallow<Visualization>(<Visualization stagingEnvironment="vse" contentItemId="content" />, {
      lifecycleExperimental: true
    });

    expect(toJson(wrapper)).toMatchSnapshot();

    await waitUntil(() => wrapper.state('error') !== undefined);
    expect(mockGetContentItemById).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should only load content when props are provided', async (): Promise<void> => {
    mockGetContentItemById.mockResolvedValue({
      text: '# Markdown Text'
    });

    const wrapper = shallow<Visualization>(<Visualization stagingEnvironment="" contentItemId="" />, {
      lifecycleExperimental: true
    });

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.setProps({
      stagingEnvironment: 'vse',
      contentItemId: 'content'
    });

    await waitUntil(() => !wrapper.contains(<PageLoader />));

    expect(mockGetContentItemById).toHaveBeenCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a blog post', async () => {
    await renderVisualization(blogPostFixture);
  });

  it('should render a blog page', async () => {
    await renderVisualization(blogFixture as Blog);
    expect(findResultsState as jest.Mock).toBeCalled();
  });
});
