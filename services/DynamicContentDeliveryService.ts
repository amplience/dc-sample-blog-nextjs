import { ContentClient, ContentClientConfig } from 'dc-delivery-sdk-js';

export class DynamicContentDeliveryService {
  private client: ContentClient;

  constructor(config: ContentClientConfig) {
    this.client = new ContentClient(config);
  }

  async getContentItemById(id: string) {
    return this.client.getContentItem(id);
  }
}
