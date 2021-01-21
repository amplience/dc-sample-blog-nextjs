import React, { ReactElement } from 'react';
import HeroBannerHeading from './title/hero-banner-heading';
import theme from '../../common/styles/default/theme';

interface HeroBannerProps {
  children?: ReactElement[] | ReactElement;
  heading: string;
}

const HeroBanner = ({ children, heading }: HeroBannerProps): ReactElement => {
  return (
    <>
      <section>
        <HeroBannerHeading heading={heading} />
        <>{children}</>
      </section>
      <style jsx>{`
        section {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          background-color: ${theme.colors.mirage95};
          padding: 40px 20px 20px 20px;
        }

        section :global(h1) {
          color: white;
          font-weight: ${theme.fonts.weight.light};
          padding-bottom: 40px;
        }

        @media (max-width: ${theme.layout.widePageWidth}) {
          section {
            height: auto;
            padding: 40px 16px;
            background-image: unset;
          }
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section {
            padding: 48px 16px;
          }
          section :global(h1) {
            font-size: ${theme.fonts.size.xxxLarge};
            line-height: 2.25rem;
          }
        }
      `}</style>
    </>
  );
};

export default HeroBanner;
