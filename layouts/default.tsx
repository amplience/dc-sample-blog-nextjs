import theme from '../common/styles/default/theme';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import CookieBanner from '../components/cookie-banner/cookie-banner';
import GaPageView from '../components/google-analytics/ga-page-view.component';

interface DefaultLayoutProps {
  children: JSX.Element[] | JSX.Element;
}

export default ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <div className="site-container">
        <Header title="PRODUCT BLOG" />
        <div className="site-content">
          <main>{children}</main>
          <Footer />
        </div>
        <CookieBanner></CookieBanner>
        <GaPageView />
      </div>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          height: 100%;
          min-height: 100%;
          overflow-y: scroll;
          scroll-behavior: smooth;
        }

        html {
          font-size: ${theme.fonts.size.root};
        }

        body {
          @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
          font-family: Roboto, Arial, sans-serif;
          font-weight: ${theme.fonts.weight.regular};
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

        .site-container {
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        .site-content {
          flex: auto;
          overflow-y: auto;
        }
        
        @media(max-width: ${theme.layout.narrowPageWidth}) {
          html,
          body {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </>
  );
};
