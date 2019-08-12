import { NextPage } from 'next';
import Layout from '../layouts/default';
import { BlogReferenceList } from '../common/interfaces/blog-reference-list.interface';
import getBlogReferenceList from '../common/services/get-blog-reference-list.service';
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

  try {
    return await getBlogReferenceList(id);
  } catch (err) {
    throw err;
  }
};

export default Index;
