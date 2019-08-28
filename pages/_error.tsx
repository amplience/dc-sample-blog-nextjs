import Error from 'next/error';
import Layout from '../layouts/default';
import { NextPage } from 'next';

const CustomError: NextPage<any> = ({ statusCode }: any) => {
  return (
    <Layout title={`${statusCode} Error`} description={`Error on page with status ${statusCode}`}>
      <section>
        <Error statusCode={statusCode} />
      </section>
      <style jsx>{`
        section :global(> div) {
          height: calc(100vh - 75px) !important;
        }
      `}</style>
    </Layout>
  );
};

CustomError.getInitialProps = ({ res, err }: any): any => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default CustomError;
