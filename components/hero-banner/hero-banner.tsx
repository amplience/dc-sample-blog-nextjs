import HeroBannerTitle from './title/title.component';
import HeroBannerSubtitle from './subtitle/subtitle.component';

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
      `}</style>
    </>
  );
};

export default HeroBanner;
