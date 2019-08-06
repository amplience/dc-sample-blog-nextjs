/* eslint-env jest */
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Index from '../../pages/index';

const mockGetContentItem = jest.fn();

jest.mock("../../pages/index.scss", () => {
  return { };
});

jest.mock('dc-delivery-sdk-js', () => {
  return {
    ContentClient: jest.fn(() => {
      return {
        getContentItem: mockGetContentItem
      };
    })
  };
});

describe('Index', () => {
  test('renders index with content', async () => {
    const props = {
      content: {
        _meta: {
          schema: 'http://example.com/schema.json',
          deliveryId: 'delivery-id',
          name: 'content-name'
        }
      }
    };

    const component = await renderer.create(<Index {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders pre with prettified content', () => {
    const props = {
      content: {}
    };
    const component = shallow(<Index {...props} />);
    expect(component.find('pre').text()).toEqual(JSON.stringify(props.content, null, 2));
  });

  test('getInitialProps returns content', async () => {
    const contentData = {
      _meta: {
        schema: 'http://example.com/schema.json',
        deliveryId: 'delivery-id',
        name: 'content-name'
      }
    };
    const contentItem = {
      toJSON: () => contentData
    };
    mockGetContentItem.mockImplementation(() => contentItem);
    const query = {
      id: 'test-id',
      account: 'test-acccount'
    };
    const result = await Index.getInitialProps({ query, pathname: '/' });

    expect(result).toEqual({ content: contentData });
  });

  test('getInitialProps throws error when getContentItemById returns an error', async () => {
    mockGetContentItem.mockImplementation(() => {
      throw new Error();
    });
    const query = {
      id: 'test-id',
      account: 'test-acccount'
    };

    await expect(Index.getInitialProps({ query, pathname: '/' })).rejects.toThrowError(Error);
  });
});
