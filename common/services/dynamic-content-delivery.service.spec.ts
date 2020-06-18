import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { ContentClient } from 'dc-delivery-sdk-js';

const mockGetContentItemById = jest.fn();
const mockGetContentItemByKey = jest.fn();

jest.mock('dc-delivery-sdk-js', (): { ContentClient: unknown } => {
  return {
    ContentClient: jest.fn(() => {
      return {
        getContentItemById: mockGetContentItemById,
        getContentItemByKey: mockGetContentItemByKey
      };
    })
  };
});

describe('DynamicContentDeliveryService', (): void => {
  afterAll((): void => {
    jest.clearAllMocks();
  });

  test('loads a new client', (): void => {
    const opts = {
      hubName: 'DELIVERY_SERVICE_HUB_NAME'
    };
    new DynamicContentDeliveryService(opts);
    expect(ContentClient).toBeCalledWith(opts);
  });

  test('returns content item data when calling getContentItemById', async (): Promise<void> => {
    const contentItemResponse = {
      _meta: {
        schema: 'http://example.com/schema.json',
        deliveryId: 'delivery-id',
        name: 'content-name'
      }
    };
    mockGetContentItemById.mockImplementation(() => contentItemResponse);
    const opts = {
      hubName: 'DELIVERY_SERVICE_ACCOUNT_ID'
    };
    const service = new DynamicContentDeliveryService(opts);
    const result = await service.getContentItemById('123');

    expect(result).toEqual(contentItemResponse);
  });

  test('returns content item data when calling getContentItemByKey', async (): Promise<void> => {
    const contentItemResponse = {
      _meta: {
        schema: 'http://example.com/schema.json',
        deliveryKey: 'delivery-key',
        name: 'content-name'
      }
    };
    mockGetContentItemByKey.mockImplementation(() => contentItemResponse);
    const opts = {
      hubName: 'DELIVERY_SERVICE_ACCOUNT_ID'
    };
    const service = new DynamicContentDeliveryService(opts);
    const result = await service.getContentItemByKey('delivery-key');

    expect(result).toEqual(contentItemResponse);
  });
});
