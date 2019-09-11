import HeroBannerTitle from './title/title.component';
import HeroBannerSubtitle from './subtitle/subtitle.component';
import theme from '../../common/styles/default/theme';

const BlogPostHeroBanner = ({ title, subTitle }: { title: string; subTitle?: string }) => {
  return (
    <>
      <section>
        <HeroBannerTitle title={title} />
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

        section :global(h2) {
          line-height: 2.25rem;
        }

        @media (max-width: ${theme.layout.narrowPageWidth}) {
          section {
            padding-bottom: 60px;
          }

          section :global(h1) {
            font-size: ${theme.fonts.size.xxxxLarge};
            font-weight: ${theme.fonts.weight.medium}
            line-height: 2.813rem;
            margin-top: 30px;
            margin-bottom: 20px;
          }

          section :global(h2) {
            font-size: ${theme.fonts.size.xLarge};
            margin-top: 0;
          }
        }
      `}</style>
    </>
  );
};

export default BlogPostHeroBanner;
