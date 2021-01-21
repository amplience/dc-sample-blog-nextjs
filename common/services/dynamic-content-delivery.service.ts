import { ContentClient, ContentItem, ContentClientConfigV2 } from 'dc-delivery-sdk-js';

export class DynamicContentDeliveryService {
  private client: ContentClient;

  public constructor(config: ContentClientConfigV2) {
    this.client = new ContentClient(config);
  }

  public async getContentItemById(id: string): Promise<ContentItem> {
    return this.client.getContentItemById(id);
  }

  public async getContentItemByKey(id: string): Promise<ContentItem> {
    return this.client.getContentItemByKey(id);
  }
}
