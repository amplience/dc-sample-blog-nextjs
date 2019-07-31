import { ContentClient, ContentClientConfig, ContentItem } from 'dc-delivery-sdk-js';

export class DynamicContentDeliveryService {
  private client: ContentClient;

  public constructor(config: ContentClientConfig) {
    this.client = new ContentClient(config);
  }

  public async getContentItemById(id: string): Promise<ContentItem> {
    return this.client.getContentItem(id);
  }
}
