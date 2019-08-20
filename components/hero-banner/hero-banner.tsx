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
        }

        section :global(h1) {
          padding-bottom: 10px;
          border-bottom: 2px solid ${theme.colors.dustyGray};
          font-weight: ${theme.fonts.weight.light};
        }
      `}</style>
    </>
  );
};

export default HeroBanner;
