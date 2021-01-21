import { ContentClientConfigV2 } from 'dc-delivery-sdk-js';

export const defaultClientConfig: ContentClientConfigV2 = {
  hubName: process.env.DYNAMIC_CONTENT_HUB_NAME || '',
  secureMediaHost: process.env.DYNAMIC_CONTENT_SECURE_MEDIA_HOST || ''
};
