import { DynamicContentDeliveryService } from './dynamic-content-delivery.service';
import { ContentClient } from 'dc-delivery-sdk-js';

const mockGetContentItem = jest.fn();

jest.mock('dc-delivery-sdk-js', (): (() => jest.Mock) => {
  return {
    ...jest.requireActual('dc-delivery-sdk-js'),
    ContentClient: jest.fn((): { getContentItem: jest.Mock } => {
      return {
        getContentItem: mockGetContentItem
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
      account: 'DELIVERY_SERVICE_ACCOUNT_ID'
    };
    new DynamicContentDeliveryService(opts);
    expect(ContentClient).toBeCalledWith(opts);
  });

  test('returns content item data when calling getContentItemById', async (): Promise<void> => {
    interface MockContentItemResponse {
      _meta: {
        schema: string;
        deliveryId: string;
        name: string;
      };
    }
    const contentItemResponse = {
      _meta: {
        schema: 'http://example.com/schema.json',
        deliveryId: 'delivery-id',
        name: 'content-name'
      }
    };
    mockGetContentItem.mockImplementation((): MockContentItemResponse => contentItemResponse);
    const opts = {
      account: 'DELIVERY_SERVICE_ACCOUNT_ID'
    };
    const service = new DynamicContentDeliveryService(opts);
    const result = await service.getContentItemById('123');

    expect(result).toEqual(contentItemResponse);
  });
});
