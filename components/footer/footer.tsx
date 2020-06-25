import React, { ReactElement } from 'react';
import theme from '../../common/styles/default/theme';
import Logo from '../logo/logo';
import FooterLinksList from './footer-links-list';
import footerLinks from './footer-links';
import ExternalLink from '../external-link/external-link';

const Footer = (): ReactElement => {
  const currentYear = new Date().getFullYear();
  const footerLinkSections = footerLinks.map((linkSection, index) => <FooterLinksList key={index} {...linkSection} />);
  return (
    <>
      <footer>
        <section>
          <div className="footer-info">
            <div className="footer-info-top">
              <Logo />
              <div className="social-links">
                <ExternalLink href="//twitter.com/amplience">
                  <img src="/static/images/social/ic_twitter.svg" alt="Twitter logo" />
                </ExternalLink>
                <ExternalLink href="//www.linkedin.com/company/amplience/">
                  <img src="/static/images/social/ic_linkedin.svg" alt="Linkedin logo" />
                </ExternalLink>
              </div>
            </div>
            <div className="copyright">&copy; Copyright Amplience {currentYear}</div>
          </div>
          <div className="footer-links">{footerLinkSections}</div>
        </section>
      </footer>

      <style jsx>{`
        footer {
          display: flex;
          flex: 1 0 auto;
          padding-top: 50px;
          background-color: ${theme.colors.whiteLilac};
          justify-content: center;
        }

        section {
          width: ${theme.layout.widePageWidth};
          min-height: 400px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .footer-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .footer-info-top {
          flex-grow: 1;
        }

        .footer-links {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .social-links {
          display: flex;
          flex-direction: row;
        }

        .social-links :global(img) {
          width: 25px;
          margin: 5px;
        }

        .copyright {
          font-size: ${theme.fonts.size.small};
          margin-bottom: 25px;
          align-self: flex-end;
          color: ${theme.colors.mineShaft};
        }

        @media (max-width: ${theme.layout.widePageWidth}) {
          footer {
            padding: 45px;
          }
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          footer {
            height: auto;
            margin-top: 75px;
            padding: 75px 60px 50px 60px;
          }
          section {
            flex-direction: column-reverse;
          }

          .footer-info {
            margin-top: 150px;
            align-items: flex-start;
          }

          .footer-info :global(.logo) {
            width: 160px;
          }

          .copyright {
            margin-top: 15px;
            align-self: auto;
          }
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          footer {
            margin-top: 75px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
