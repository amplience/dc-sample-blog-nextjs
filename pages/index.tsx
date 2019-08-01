import { NextPage } from 'next';

import { DynamicContentDeliveryService } from '../services/DynamicContentDeliveryService';
import { ContentClientConfig } from 'dc-delivery-sdk-js';

import './index.scss';

interface IndexProps {
  content: {
    [key: string]: any;
  };
}

const Index: NextPage<IndexProps> = (props: IndexProps) => {
  return (
    <>
      {/* In this example we are outputting the complete content response from the Dynamic Content Service, this is where you would use props.content to render your site. */}
      <pre>{JSON.stringify(props.content, null, 2)}</pre>
    </>
  );
};

Index.getInitialProps = async ({ query }) => {
  const { id, account } = query;
  const deliveryClient = new DynamicContentDeliveryService({ account } as ContentClientConfig);
  try {
    const content = (await deliveryClient.getContentItemById(id as string)).toJSON();
    return { content };
  } catch (err) {
    throw err;
  }
};

export default Index;
