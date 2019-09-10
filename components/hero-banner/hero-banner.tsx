import HeroBannerTitle from './title/title.component';
import HeroBannerSubtitle from './subtitle/subtitle.component';
import theme from '../../common/styles/default/theme';
const HeroBanner = ({ title, subTitle }: { title: string; subTitle?: string }) => {
  return (
    <>
      <section>
        <HeroBannerTitle title={title} />
        <HeroBannerSubtitle subTitle={subTitle} />
      </section>
      <style jsx>{`
        section {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          background-image: url('/static/images/blog-header_left.png'), url('/static/images/blog-header_right.png');
          background-position: top left, top right;
          background-repeat: no-repeat, no-repeat;
          background-size: auto 100%, auto 100%;
          padding: 0 20px;
        }

        section :global(h1) {
          padding-bottom: 10px;
          border-bottom: 2px solid ${theme.colors.silver};
          font-weight: ${theme.fonts.weight.light};
        }

        @media (max-width: ${theme.layout.widePageWidth}) {
          section {
            height: auto;
            margin: 40px 0;
            background-image: unset;
          }
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section {
            padding-bottom: 16px;
          }
          section :global(h1) {
            font-size: ${theme.fonts.size.xxxLarge};
            line-height: 2.25rem;
          }
          section :global(h2) {
            font-size: ${theme.fonts.size.large};
            margin-top: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default HeroBanner;
