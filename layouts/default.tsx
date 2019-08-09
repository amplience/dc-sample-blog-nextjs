import { NextSeo } from 'next-seo';

interface DefaultLayoutProps {
  children: JSX.Element[];
  title: string;
  description?: string;
}

export default ({ children, title, description }: DefaultLayoutProps) => {
  return (
    <>
      <NextSeo title={title} description={description} />
      <main>{children}</main>
      <style jsx global>{`
        body {
          font-family: Roboto, Arial, sans-serif;
          margin: 0;
          max-width: 100%;
          overflow-x: hidden;
        }

        *,
        ::before,
        ::after {
          box-sizing: border-box;
        }

        main {
          margin: auto;
          max-width: 1200px;
        }
      `}</style>
    </>
  );
};
