import Error from 'next/error';
import Layout from '../layouts/default';
import { NextPage } from 'next';

interface CustomErrorProps {
  statusCode: number | undefined;
}

const CustomError: NextPage<CustomErrorProps> = ({ statusCode = 500 }: CustomErrorProps) => {
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

CustomError.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 500;
  return { statusCode };
};

export default CustomError;
