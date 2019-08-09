import { NextPage } from 'next';
import Layout from '../layouts/default';
import { BlogReferenceList } from './interfaces/blog-reference-list.interface';
import { getBlogReferenceList } from './services/blog-reference-list.service';
import { ContentClientConfig } from 'dc-delivery-sdk-js';
import HeroBanner from '../components/hero-banner/hero-banner';

const Index: NextPage<BlogReferenceList> = ({ title, subTitle, blogPosts }) => {
  return (
    <Layout title={title} description={subTitle}>
      <HeroBanner title={title} subTitle={subTitle}></HeroBanner>
      <pre>{JSON.stringify(blogPosts, null, 2)}</pre>
    </Layout>
  );
};

Index.getInitialProps = async (): Promise<BlogReferenceList> => {
  const id: string = process.env.DYNAMIC_CONTENT_REFERENCE_ID || '';
  const clientConfig: ContentClientConfig = {
    account: process.env.DYNAMIC_CONTENT_ACCOUNT_NAME || '',
    baseUrl: process.env.DYNAMIC_CONTENT_BASE_URL || ''
  };

  try {
    return getBlogReferenceList(id, clientConfig);
  } catch (err) {
    throw err;
  }
};

export default Index;
