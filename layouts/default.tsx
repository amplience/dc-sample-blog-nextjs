import { NextSeo } from 'next-seo';
import theme from '../common/styles/default/theme';

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
          font-size: ${theme.fonts.size.root};
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

        @media (max-width: ${theme.layout.blogListWidth}) {
          body {
            font-size: ${theme.fonts.size.mobileRoot};
          }
        }
      `}</style>
    </>
  );
};
