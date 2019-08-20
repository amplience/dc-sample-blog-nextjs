import { NextSeo } from 'next-seo';
import theme from '../common/styles/default/theme';
import BlogHeader from '../components/blog-header/blog-header';
import GaPageView from '../components/google-analytics/ga-page-view.component';

interface DefaultLayoutProps {
  children: JSX.Element[];
  title: string;
  description?: string;
}

export default ({ children, title, description }: DefaultLayoutProps) => {
  return (
    <>
      <NextSeo title={title} description={description} />
      <div className="site-container">
        <header>
          <GaPageView />
          <BlogHeader title={title} />
        </header>
        <main>{children}</main>
      </div>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          height: 100%;
          min-height: 100%;
        }

        body {
          font-family: Roboto, Arial, sans-serif;
          font-size: ${theme.fonts.size.root};
          max-width: 100%;
        }

        *,
        ::before,
        ::after {
          box-sizing: border-box;
        }

        #__next,
        .site-container {
          height: 100%;
        }

        main {
          flex: auto;
          overflow-y: auto;
        }

        .site-container {
          margin: 0;
          display: flex;
          flex-direction: column;
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
