import { NextPage } from 'next';

import { DynamicContentDeliveryService } from '../services/DynamicContentDeliveryService';
import { ContentClientConfig } from 'dc-delivery-sdk-js';

interface IndexProps {
  content: {
    [key: string]: any;
  };
}

const Index: NextPage<IndexProps> = (props: IndexProps) => {
  return (
    <>
      <h1>dc-static-site-nextjs</h1>
      <p>Content retrieved using Amplience Dynamic Content:</p>
      <pre>{JSON.stringify(props.content)}</pre>
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
