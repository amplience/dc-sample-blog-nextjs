import { ContentClientConfig } from 'dc-delivery-sdk-js';

export const defaultClientConfig: ContentClientConfig = {
  account: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME || ''
};
