import { DynamicContentDeliveryService } from './DynamicContentDeliveryService';
import { ContentClient } from 'dc-delivery-sdk-js';

const mockGetContentItem = jest.fn();

jest.mock('dc-delivery-sdk-js', () => {
  return {
    ContentClient: jest.fn(() => {
      return {
        getContentItem: mockGetContentItem
      };
    })
  };
});

describe('DynamicContentDeliveryService', () => {
  afterAll((): void => {
    jest.clearAllMocks();
  });

  test('loads a new client', () => {
    const opts = {
      account: 'DELIVERY_SERVICE_ACCOUNT_ID'
    };
    new DynamicContentDeliveryService(opts);
    expect(ContentClient).toBeCalledWith(opts);
  });

  test('returns content item data when calling getContentItemById', async () => {
    const contentItemResponse = {
      _meta: {
        schema: 'http://example.com/schema.json',
        deliveryId: 'delivery-id',
        name: 'content-name'
      }
    };
    mockGetContentItem.mockImplementation(() => contentItemResponse);
    const opts = {
      account: 'DELIVERY_SERVICE_ACCOUNT_ID'
    };
    const service = new DynamicContentDeliveryService(opts);
    const result = await service.getContentItemById('123');

    expect(result).toEqual(contentItemResponse);
  });
});
