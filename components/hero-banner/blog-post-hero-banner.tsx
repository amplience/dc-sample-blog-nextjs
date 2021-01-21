import React, { ReactElement } from 'react';
import HeroBannerHeading from './title/hero-banner-heading';
import theme from '../../common/styles/default/theme';
import HeroBannerSubtitle from './subtitle/subtitle';

const BlogPostHeroBanner = ({ title, subTitle }: { title: string; subTitle?: string }): ReactElement => {
  return (
    <>
      <section>
        <HeroBannerHeading heading={title} />
        <HeroBannerSubtitle subTitle={subTitle} />
      </section>
      <style jsx>{`
        section {
          min-height: 150px;
          display: flex;
          align-items: flex-start;
          justify-content: justified;
          flex-direction: column;
          padding-bottom: 75px;
        }

        section :global(h1) {
          margin-top: 40px;
          margin-bottom: 15px;
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section {
            padding-bottom: 40px;
          }

          section :global(h1) {
            font-size: ${theme.fonts.size.xxxLarge};
            font-weight: ${theme.fonts.weight.bold};
            margin-top: 30px;
            margin-bottom: 20px;
          }

          section :global(h2) {
            font-size: ${theme.fonts.size.xLarge};
            font-weight: ${theme.fonts.weight.light};
            margin-top: 0;
          }
        }
      `}</style>
    </>
  );
};

export default BlogPostHeroBanner;
