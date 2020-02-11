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
          background-color: ${theme.colors.mirage95};
          padding: 40 20px;
        }

        section :global(h1) {
          color: white;
          font-weight: ${theme.fonts.weight.light};
          padding-bottom: 10px;
          border-bottom: 1px solid ${theme.colors.dustyGray};
        }

        section :global(h2) {
          color: ${theme.colors.silver};
          font-weight: ${theme.fonts.weight.light};
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
          section :global(h2) {
            font-size: ${theme.fonts.size.large};
            margin-top: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default HeroBanner;
