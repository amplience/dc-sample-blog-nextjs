import Layout from '../layouts/default';
import Visualization from '../components/visualization/visualization';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo/lib';

const VisualizationPage = () => {
  const router = useRouter();
  const stagingEnvironment = router.query.vse ? router.query.vse.toString() : '';
  const contentId = router.query.content ? router.query.content.toString() : '';
  return (
    <>
      <NextSeo noindex={true} />
      <Layout contentOnly={true}>
        <Visualization stagingEnvironment={stagingEnvironment} contentId={contentId} />
      </Layout>
    </>
  );
};

export default VisualizationPage;
